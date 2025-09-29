from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import time
import logging
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyD7b7jJcFsNWr4M-V99d3TMus73CJwiO2o"
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Gemini model with generation config
generation_config = {
    "temperature": 0.7,
    "top_p": 0.8,
    "top_k": 40,
    "max_output_tokens": 2048,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings
)

def get_ai_response(user_message, user_profile=None):
    """Get response from Gemini API with retry logic"""
    try:
        logger.info(f"Generating AI response for message: {user_message[:20]}...")
        logger.info(f"User profile provided: {bool(user_profile)}")
        
        # Create system prompt
        system_prompt = """You are PolicyPal, an AI-powered government scheme assistant for Indian citizens.
        Your role is to provide specific information about government schemes and policies.
        
        When responding about schemes, always include:
        1. Scheme name and description
        2. Eligibility criteria
        3. Benefits offered
        4. How to apply
        5. Required documents
        6. Important deadlines
        7. Official website or contact information
        """
        
        # Add user profile context if available
        if user_profile:
            profile_context = f"""
            Consider this user profile:
            - Age: {user_profile.get('age')}
            - Employment: {user_profile.get('employment')}
            - Education: {user_profile.get('education')}
            - Income: {user_profile.get('income')}
            - Family Size: {user_profile.get('familySize')}
            """
            system_prompt += profile_context
        
        # Add user message
        full_prompt = f"{system_prompt}\n\nUser Query: {user_message}"
        
        logger.info("Sending request to Gemini API")
        response = model.generate_content(full_prompt)
        
        if not response.text or len(response.text.strip()) < 50:
            logger.error("Received empty or too short response from API")
            raise Exception("Invalid response received from API")
            
        logger.info("Successfully received valid response from Gemini API")
        return response.text
        
    except Exception as e:
        logger.error(f"Error in Gemini API call: {str(e)}")
        return generate_fallback_response(user_message)

def generate_fallback_response(user_message):
    """Generate fallback responses when API fails"""
    responses = [
        "Based on policy guidelines, I can help you understand relevant government schemes and policies. Please provide more details about your specific needs.",
        "Let me assist you with finding appropriate government schemes. Could you please specify your requirements more clearly?",
        "I can help you navigate various government policies and schemes. What specific assistance are you looking for?",
    ]
    return responses[hash(user_message) % len(responses)]

# User profiles storage
user_profiles = {}

@app.route('/api/profile', methods=['POST'])
def update_profile():
    """Update user profile"""
    try:
        data = request.get_json()
        user_id = data.get('userId')
        profile_data = {
            'age': data.get('age'),
            'gender': data.get('gender'),
            'occupation': data.get('occupation'),
            'financialStatus': data.get('financialStatus'),
            'primaryNeeds': data.get('primaryNeeds'),
        }
        user_profiles[user_id] = profile_data
        return jsonify({'message': 'Profile updated successfully'})
    except Exception as e:
        logger.error(f"Error updating profile: {e}")
        return jsonify({'error': 'Failed to update profile'}), 500

@app.route('/api/profile/<user_id>', methods=['GET'])
def get_profile(user_id):
    """Get user profile"""
    profile = user_profiles.get(user_id, {})
    return jsonify(profile)

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat requests from frontend"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        user_id = data.get('userId', '')
        
        logger.info(f"Received chat request from user {user_id}")
        logger.info(f"Message content length: {len(user_message)}")
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
            
        user_profile = user_profiles.get(user_id)
        ai_response = get_ai_response(user_message, user_profile)
        
        return jsonify({
            'response': ai_response,
            'model': 'gemini-1.5-pro'
        })

    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({
            'response': generate_fallback_response(user_message),
            'model': 'fallback'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'PolicyPal API is running'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
