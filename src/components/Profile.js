import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const Profile = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState({
    age: '',
    location: '',
    employment: '',
    income: '',
    education: '',
    familySize: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load user profile from local storage
    const currentUser = JSON.parse(localStorage.getItem('policypal_currentUser'));
    if (currentUser) {
      setProfile({
        age: currentUser.age || '',
        gender: currentUser.gender || '',
        occupation: currentUser.occupation || '',
        financialStatus: currentUser.financialStatus || '',
        primaryNeeds: currentUser.primaryNeeds || '',
        email: currentUser.email || ''
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const userId = localStorage.getItem('userId') || 'default';
      await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...profile
        }),
      });
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-policypal-dark rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-policypal-border">
          <h2 className="text-xl font-semibold">My Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-policypal-light rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <div className="w-full p-2 bg-policypal-light border border-policypal-border rounded text-gray-300">
              {profile.email}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Age</label>
            <div className="w-full p-2 bg-policypal-light border border-policypal-border rounded text-gray-300">
              {profile.age}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Gender</label>
            <div className="w-full p-2 bg-policypal-light border border-policypal-border rounded text-gray-300">
              {profile.gender}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Occupation</label>
            <div className="w-full p-2 bg-policypal-light border border-policypal-border rounded text-gray-300">
              {profile.occupation}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Financial Status</label>
            <div className="w-full p-2 bg-policypal-light border border-policypal-border rounded text-gray-300">
              {profile.financialStatus}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Primary Needs</label>
            <div className="w-full p-2 bg-policypal-light border border-policypal-border rounded text-gray-300">
              {profile.primaryNeeds}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-policypal-border rounded hover:bg-policypal-light transition-colors"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
