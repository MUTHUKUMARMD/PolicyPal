import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, Settings, User } from 'lucide-react';

const Sidebar = ({ 
  chats, 
  currentChatId, 
  onChatSelect, 
  onCreateNewChat, 
  onDeleteChat, 
  isOpen, 
  onToggle 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    if (showDeleteConfirm === chatId) {
      onDeleteChat(chatId);
      setShowDeleteConfirm(null);
    } else {
      setShowDeleteConfirm(chatId);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-policypal-dark border-r border-policypal-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* New Chat Button */}
          <div className="p-4 border-b border-policypal-border">
                          <button
                onClick={onCreateNewChat}
                className="w-full flex items-center gap-3 p-3 text-left border border-policypal-border rounded-lg hover:bg-policypal-light transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Policy Chat</span>
              </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                                     className={`
                     relative group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                     ${currentChatId === chat.id 
                       ? 'bg-policypal-light text-white' 
                       : 'hover:bg-policypal-light text-gray-300 hover:text-white'
                     }
                   `}
                  onClick={() => onChatSelect(chat.id)}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-medium">
                      {chat.title}
                    </div>
                    {chat.messages.length > 0 && (
                      <div className="text-xs text-gray-400 truncate">
                        {formatTime(chat.messages[chat.messages.length - 1].timestamp)}
                      </div>
                    )}
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className={`
                      opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-600 transition-all
                      ${showDeleteConfirm === chat.id ? 'opacity-100 bg-red-600' : ''}
                    `}
                    title="Delete chat"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
                     <div className="p-4 border-t border-policypal-border">
            <div className="space-y-2">
                             <button className="w-full flex items-center gap-3 p-3 text-left text-gray-300 hover:bg-policypal-light rounded-lg transition-colors">
                 <User className="w-4 h-4" />
                 <span className="text-sm">My Account</span>
               </button>
               <button className="w-full flex items-center gap-3 p-3 text-left text-gray-300 hover:bg-policypal-light rounded-lg transition-colors">
                 <Settings className="w-4 h-4" />
                 <span className="text-sm">Settings</span>
               </button>
             </div>
             
             <div className="mt-4 pt-4 border-t border-policypal-border">
               <p className="text-xs text-gray-400 text-center">
                 PolicyPal v1.0.0
               </p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
