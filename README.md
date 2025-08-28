# PolicyPal

A complete AI-powered policy assistant built with React.js, featuring an intuitive interface for policy guidance and compliance support.

## Features

- ✅ **New Policy Chat Creation** - Start fresh policy discussions with the "New Policy Chat" button
- ✅ **Chat History** - View and select from previous policy conversations
- ✅ **Real-time Messaging** - Send policy questions and receive AI guidance
- ✅ **Typing Indicators** - Visual feedback when AI is responding
- ✅ **Message Copying** - Copy AI responses to clipboard
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Dark Theme** - Professional dark interface
- ✅ **Chat Deletion** - Remove unwanted conversations
- ✅ **Auto-scroll** - Automatically scrolls to latest messages
- ✅ **Keyboard Shortcuts** - Enter to send, Shift+Enter for new line

## Screenshots

The interface includes:
- Sidebar with policy chat history and new chat button
- Main chat area with message bubbles
- Input area with send button
- Mobile-responsive design
- Professional PolicyPal styling

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Python 3.7 or higher
- OpenAI API key

### Installation

#### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   npm install
   ```

2. **Start the React development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

4. **Get OpenAI API Key**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key to your `.env` file

5. **Start the Flask backend server**
   ```bash
   python app.py
   ```
   
   The backend will start on `http://localhost:5000`

### Running Both Servers

You need both servers running simultaneously:

**Terminal 1 (Frontend):**
```bash
npm start
```

**Terminal 2 (Backend):**
```bash
cd backend
python app.py
```

## Project Structure

```
├── src/                    # React frontend source code
│   ├── components/
│   │   ├── Sidebar.js      # Chat history sidebar
│   │   └── ChatArea.js     # Main chat display area
│   ├── App.js              # Main application component
│   ├── index.js           # React entry point
│   └── index.css          # Global styles and Tailwind imports
├── backend/                # Flask backend server
│   ├── app.py             # Main Flask application
│   ├── requirements.txt   # Python dependencies
│   ├── env.example        # Environment variables template
│   └── README.md          # Backend documentation
├── public/                 # Static assets
└── package.json           # Frontend dependencies
```

## Key Components

### App.js
- Main application state management
- Chat creation and deletion logic
- Message handling and AI response simulation
- Sidebar toggle functionality

### Sidebar.js
- Chat history display
- New chat creation
- Chat selection and deletion
- Responsive mobile overlay

### ChatArea.js
- Message display with user/AI avatars
- Typing indicators
- Message copying functionality
- Auto-scroll to latest messages

## Customization

### Styling
The app uses Tailwind CSS with custom PolicyPal colors defined in `tailwind.config.js`:
- `policypal-gray`: Main background
- `policypal-dark`: Sidebar and message backgrounds
- `policypal-blue`: Accent color for buttons and user messages

### AI Responses
The application now uses OpenAI's GPT-3.5-turbo model for intelligent policy responses. The backend handles:
1. OpenAI API communication
2. Error handling and rate limiting
3. Policy-focused system prompts
4. Response formatting and delivery

## Technologies Used

### Frontend
- **React 18** - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Icon library
- **CSS Animations** - Smooth transitions and typing indicators

### Backend
- **Flask** - Python web framework
- **OpenAI API** - GPT-3.5-turbo for AI responses
- **Flask-CORS** - Cross-origin resource sharing
- **Python-dotenv** - Environment variable management

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

### Code Style

The project follows React best practices:
- Functional components with hooks
- Proper state management
- Responsive design principles
- Accessibility considerations

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is for educational purposes. The PolicyPal interface design is inspired by modern AI chat interfaces.

## Acknowledgments

- Modern AI chat interfaces for design inspiration
- Lucide for the beautiful icons
- Tailwind CSS for the utility-first styling approach
