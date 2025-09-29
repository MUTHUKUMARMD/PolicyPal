from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import time
from dotenv import load_dotenv
import logging
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Gemini API
genai.configure(api_key="AIzaSyBR99HbxdtTNSwPx4m2YkOuKe3zFmFxOdM")

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
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    safety_settings=safety_settings
)

def generate_fallback_response(user_message):
    """Generate fallback responses when OpenAI quota is exceeded"""
    policy_responses = [
        "Based on policy guidelines, I can help you understand the relevant regulations. This appears to be a policy-related inquiry that requires careful consideration of current frameworks and compliance requirements.",
        "Let me analyze this policy question and provide you with the appropriate guidance. This involves understanding the regulatory landscape and best practices in policy implementation.",
        "This is an important policy consideration. Here's what the current framework suggests: policies should be clear, consistent, and aligned with organizational objectives while meeting regulatory requirements.",
        "I understand your policy inquiry. Let me provide some insights based on best practices: effective policies should be well-documented, regularly reviewed, and communicated clearly to all stakeholders.",
        "That's a great policy question! Let me break down the key considerations: policy development should involve stakeholder input, risk assessment, and clear implementation guidelines.",
        "From a policy perspective, this involves several important factors to consider: compliance requirements, organizational impact, stakeholder needs, and implementation feasibility.",
        "I can help you navigate this policy matter. Here's what you should know: policies should be designed to achieve specific objectives while maintaining flexibility for future changes.",
        "This policy question requires careful analysis. Let me share some relevant information: successful policy implementation depends on clear communication, training, and ongoing monitoring.",
        "I understand you're looking for policy guidance. Here's what I can tell you: policies should be regularly evaluated for effectiveness and updated as needed to reflect changing circumstances.",
        "This is an interesting policy challenge. Let me provide some context and recommendations: focus on clarity, consistency, and stakeholder engagement throughout the policy lifecycle."
    ]
    # Simple keyword-based response selection
    user_lower = user_message.lower()
    if any(word in user_lower for word in ['gdpr', 'data protection', 'privacy']):
        return "Regarding data protection and privacy policies, organizations must ensure compliance with relevant regulations like GDPR. This includes implementing appropriate technical and organizational measures, conducting regular audits, and maintaining clear documentation of data processing activities."
    elif any(word in user_lower for word in ['compliance', 'regulatory', 'regulation']):
        return "Compliance policies should establish clear frameworks for meeting regulatory requirements. This includes regular monitoring, reporting mechanisms, and training programs to ensure all stakeholders understand their responsibilities."
    elif any(word in user_lower for word in ['security', 'cybersecurity', 'information security']):
        return "Information security policies should address data protection, access controls, incident response procedures, and regular security assessments. These policies are crucial for protecting organizational assets and maintaining stakeholder trust."
    else:
        return policy_responses[len(user_message) % len(policy_responses)]

def get_ai_response(user_message, user_profile=None):
    """Get response from Gemini API with retry logic"""
    try:
        logger.info(f"Generating AI response for message: {user_message[:100]}...")
        logger.info(f"User profile provided: {bool(user_profile)}")
        
        profile_context = ""
        if user_profile:
            profile_context = f"""
            User Profile Information:
            - Age: {user_profile.get('age', 'Not specified')}
            - Location: {user_profile.get('location', 'Not specified')}
            - Employment Status: {user_profile.get('employment', 'Not specified')}
            - Annual Income: {user_profile.get('income', 'Not specified')}
            - Education Level: {user_profile.get('education', 'Not specified')}
            - Family Size: {user_profile.get('familySize', 'Not specified')}
            
            Please consider this user profile information when providing recommendations for government schemes and policies.
            """
            logger.info("Added profile context to prompt")

        system_prompt = f"""You are PolicyPal, an AI-powered government scheme and policy assistant for Indian citizens. Your role is to provide accurate, helpful information about government schemes, especially focusing on education, financial aid, and welfare programs.

        {profile_context}

        Important Guidelines:
        1. Focus on providing SPECIFIC government schemes and policies that match the user's needs
        2. Always include eligibility criteria and benefits for each scheme
        3. Provide step-by-step application process
        4. Include links to official websites or portals where available
        5. Mention required documents for applications
        6. Explain any financial benefits, scholarships, or subsidies in detail

        For education-related queries, always check and mention:
        - Scholarships (Central and State)
        - Education Loans
        - Merit-based schemes
        - Special category benefits
        - Skill development programs
        - Research fellowships

        Format your response in a clear, structured way:
        1. Relevant Schemes (with brief descriptions)
        2. Eligibility Criteria
        3. Benefits Offered
        4. Application Process
        5. Required Documents
        6. Important Deadlines (if any)
        7. Additional Resources

        User's question: """
        
        full_prompt = system_prompt + user_message
        logger.info("Sending request to Gemini API")
        response = model.generate_content(full_prompt)
        
        if not response.text or len(response.text.strip()) < 50:
            logger.error("Received empty or too short response from API")
            raise Exception("Invalid response received from API")
            
        logger.info("Successfully received valid response from Gemini API")
        logger.info(f"Response length: {len(response.text)}")
        
        return response.text
    except Exception as e:
        logger.error(f"Error in Gemini API call: {str(e)}")
        if "429" in str(e):  # Rate limit error
            retry_seconds = 60
            if "retry_delay" in str(e):
                try:
                    retry_seconds = int(str(e).split("seconds:")[1].split("}")[0].strip())
                except:
                    pass
            logger.info(f"Rate limit exceeded. Waiting {retry_seconds} seconds...")
            time.sleep(retry_seconds)
            try:
                response = model.generate_content(full_prompt)
                return response.text
            except Exception as retry_error:
                logger.error(f"Error after retry: {retry_error}")
                return generate_fallback_response(user_message)
        logger.error(f"Error getting AI response: {e}")
        return generate_fallback_response(user_message)

# In-memory storage for demo purposes. In production, use a proper database
user_profiles = {}

@app.route('/api/profile', methods=['POST'])
def update_profile():
    """Update user profile"""
    try:
        data = request.get_json()
        user_id = data.get('userId')
        profile_data = {
            'age': data.get('age'),
            'location': data.get('location'),
            'employment': data.get('employment'),
            'income': data.get('income'),
            'education': data.get('education'),
            'familySize': data.get('familySize')
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

        # Get user profile if available
        user_profile = user_profiles.get(user_id)
        ai_response = get_ai_response(user_message, user_profile)
        return jsonify({
            'response': ai_response,
            'model': 'gemini-1.5-flash'
        })

    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        fallback_response = generate_fallback_response(user_message)
        return jsonify({
            'response': fallback_response,
            'model': 'fallback'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'PolicyPal API is running',
        'model': 'gemini-1.5-flash'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
