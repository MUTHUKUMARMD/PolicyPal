import React, { useEffect, useRef } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const ChatArea = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const sendMessage = async (message) => {
    const userId = localStorage.getItem('policypal_currentUser');
    const profile = JSON.parse(localStorage.getItem('policypal_profile') || '{}');
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          userId,
          profile
        }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      return 'Sorry, there was an error processing your request.';
    }
  };

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-policypal-blue rounded-full flex items-center justify-center">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">How can I help with your policy questions?</h1>
          <p className="text-gray-400 text-sm">
            I'm PolicyPal, your AI-powered policy assistant. Ask me about regulations, compliance, or any policy-related matters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
                 {messages.map((message) => (
           <div
             key={message.id}
             className={`py-6 border-b border-policypal-border ${
               message.role === 'user' ? 'bg-policypal-gray' : 'bg-policypal-dark'
             }`}
           >
            <div className="flex gap-4 px-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                   message.role === 'user' 
                     ? 'bg-policypal-blue' 
                     : 'bg-policypal-light'
                 }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                                     <span className="text-sm font-medium text-gray-300">
                     {message.role === 'user' ? 'You' : 'PolicyPal'}
                   </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="p-1 hover:bg-policypal-light rounded transition-colors"
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

                 {/* Loading Indicator */}
         {isLoading && (
           <div className="py-6 border-b border-policypal-border bg-policypal-dark">
             <div className="flex gap-4 px-4">
               <div className="flex-shrink-0">
                 <div className="w-8 h-8 rounded-full bg-policypal-light flex items-center justify-center">
                   <Bot className="w-4 h-4 text-white" />
                 </div>
               </div>
               <div className="flex-1">
                 <div className="flex items-center mb-2">
                   <span className="text-sm font-medium text-gray-300">PolicyPal</span>
                 </div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;
