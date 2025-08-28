# PolicyPal Backend

Flask backend server for PolicyPal that communicates with OpenAI API to provide AI-powered policy assistance.

## Features

- **OpenAI Integration**: Uses GPT-3.5-turbo for intelligent policy responses
- **RESTful API**: Clean API endpoints for chat functionality
- **Error Handling**: Comprehensive error handling for API failures
- **CORS Support**: Cross-origin resource sharing enabled for frontend integration
- **Logging**: Detailed logging for debugging and monitoring

## API Endpoints

### POST /api/chat
Send a message to get AI response.

**Request Body:**
```json
{
  "message": "What are the key compliance requirements for data protection?"
}
```

**Response:**
```json
{
  "response": "Based on current data protection regulations...",
  "model": "gpt-3.5-turbo",
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 150,
    "total_tokens": 200
  }
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "PolicyPal API is running"
}
```

### GET /api/models
Get available OpenAI models.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Configuration
Copy the example environment file:
```bash
cp env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 3. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

### 4. Run the Server
```bash
python app.py
```

The server will start on `http://localhost:5000`

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `FLASK_ENV`: Flask environment (development/production)
- `FLASK_DEBUG`: Enable debug mode
- `PORT`: Server port (default: 5000)

## Error Handling

The API handles various error scenarios:
- **Authentication Error**: Invalid OpenAI API key
- **Rate Limit Error**: OpenAI rate limit exceeded
- **API Error**: OpenAI service issues
- **Network Error**: Connection problems

## Security Notes

- Never commit your `.env` file to version control
- Keep your OpenAI API key secure
- Consider implementing rate limiting for production use
- Add authentication for production deployments

## Development

### Running in Development Mode
```bash
export FLASK_ENV=development
export FLASK_DEBUG=True
python app.py
```

### Testing the API
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test chat endpoint
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is GDPR compliance?"}'
```
