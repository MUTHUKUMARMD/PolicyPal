import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    theme: theme,
    fontSize: 'medium',
    notifications: true,
    language: 'en',
    autoSave: true
  });

  const handleSave = () => {
    localStorage.setItem('policypal_settings', JSON.stringify(settings));
    setTheme(settings.theme);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-policypal-dark rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-policypal-border">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-policypal-light rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
              className="w-full p-2 bg-policypal-light border border-policypal-border rounded"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Font Size</label>
            <select
              value={settings.fontSize}
              onChange={(e) => setSettings(prev => ({ ...prev, fontSize: e.target.value }))}
              className="w-full p-2 bg-policypal-light border border-policypal-border rounded"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
              className="w-full p-2 bg-policypal-light border border-policypal-border rounded"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm">Enable Notifications</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-policypal-blue"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm">Auto-save Messages</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-policypal-blue"></div>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-policypal-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-policypal-border rounded hover:bg-policypal-light transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-policypal-blue hover:bg-blue-600 rounded transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
