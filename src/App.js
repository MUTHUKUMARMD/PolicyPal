import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { Send } from 'lucide-react';

function App() {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: 'New Policy Chat',
      messages: []
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Policy Chat',
      messages: []
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setInputMessage('');
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    // Update current chat with user message
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, userMessage],
            title: chat.messages.length === 0 ? inputMessage.slice(0, 30) + '...' : chat.title
          }
        : chat
    ));

    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        content: generateAIResponse(inputMessage),
        role: 'assistant',
        timestamp: new Date().toISOString()
      };

      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      ));

      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput) => {
    const responses = [
      "Based on policy guidelines, I can help you understand the relevant regulations...",
      "Let me analyze this policy question and provide you with the appropriate guidance.",
      "This is an important policy consideration. Here's what the current framework suggests...",
      "I understand your policy inquiry. Let me provide some insights based on best practices.",
      "That's a great policy question! Let me break down the key considerations for you.",
      "From a policy perspective, this involves several important factors to consider.",
      "I can help you navigate this policy matter. Here's what you should know...",
      "This policy question requires careful analysis. Let me share some relevant information.",
      "I understand you're looking for policy guidance. Here's what I can tell you...",
      "This is an interesting policy challenge. Let me provide some context and recommendations."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const deleteChat = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      } else {
        createNewChat();
      }
    }
  };

  const renameChat = (chatId, newTitle) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
  };

      return (
      <div className="flex h-screen bg-policypal-gray">
        {/* Sidebar */}
               <Sidebar
         chats={chats}
         currentChatId={currentChatId}
         onChatSelect={setCurrentChatId}
         onCreateNewChat={createNewChat}
         onDeleteChat={deleteChat}
         onRenameChat={renameChat}
         isOpen={sidebarOpen}
         onToggle={() => setSidebarOpen(!sidebarOpen)}
       />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-policypal-border bg-policypal-dark">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-policypal-light rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold">PolicyPal</h1>
            <div className="w-10"></div>
          </div>

        {/* Chat Messages */}
        <ChatArea 
          messages={currentChat?.messages || []} 
          isLoading={isLoading}
        />

        {/* Input Area */}
        <div className="p-4 border-t border-policypal-border bg-policypal-dark">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about policies, regulations, or compliance..."
                className="w-full p-4 pr-12 bg-policypal-light border border-policypal-border rounded-lg resize-none focus:outline-none focus:border-policypal-blue transition-colors"
                rows="1"
                style={{ minHeight: '52px', maxHeight: '200px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute right-2 top-2 p-2 bg-policypal-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              PolicyPal. Your AI-powered policy assistant. Get instant guidance on policies, regulations, and compliance matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
