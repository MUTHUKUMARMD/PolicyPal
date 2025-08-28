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

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Chat history sidebar
│   └── ChatArea.js         # Main chat display area
├── App.js                  # Main application component
├── index.js               # React entry point
└── index.css              # Global styles and Tailwind imports
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
Currently uses simulated policy-focused responses. To integrate with a real AI API:
1. Replace the `generateAIResponse` function in `App.js`
2. Add your API key and endpoint
3. Update the response handling logic

## Technologies Used

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Icon library
- **CSS Animations** - Smooth transitions and typing indicators

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
