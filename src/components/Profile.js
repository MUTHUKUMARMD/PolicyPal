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
    // Load existing profile when component mounts
    const userId = localStorage.getItem('userId') || 'default';
    fetch(`http://localhost:5000/api/profile/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length > 0) {
          setProfile(data);
        }
      })
      .catch(err => console.error('Error loading profile:', err));
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
            <label className="block text-sm">Age</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
              className="w-full p-2 bg-policypal-light border border-policypal-border rounded"
              placeholder="Enter your age"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-2 bg-policypal-light border border-policypal-border rounded"
              placeholder="Enter your location"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Employment Status</label>
            <select
              value={profile.employment}
              onChange={(e) => setProfile(prev => ({ ...prev, employment: e.target.value }))}
              className="w-full p-2 bg-policypal-light border border-policypal-border rounded"
            >
              <option value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
              <option value="retired">Retired</option>
              <option value="self-employed">Self-employed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Annual Income</label>
            <input
              type="text"
              value={profile.income}
              onChange={(e) => setProfile(prev => ({ ...prev, income: e.target.value }))}
              className="w-full p-2 bg-policypal-light border border-policypal-border rounded"
              placeholder="Enter your annual income"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Education Level</label>
            <select
              value={profile.education}
              onChange={(e) => setProfile(prev => ({ ...prev, education: e.target.value }))}
              className="w-full p-2 bg-policypal-light border border-policypal-border rounded"
            >
              <option value="">Select level</option>
              <option value="high-school">High School</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">Ph.D.</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Family Size</label>
            <input
              type="number"
              value={profile.familySize}
              onChange={(e) => setProfile(prev => ({ ...prev, familySize: e.target.value }))}
              className="w-full p-2 bg-policypal-light border border-policypal-border rounded"
              placeholder="Enter number of family members"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-policypal-border rounded hover:bg-policypal-light transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm bg-policypal-blue hover:bg-blue-600 rounded flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
