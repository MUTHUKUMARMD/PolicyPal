import React, { useState } from 'react';

const SignUp = ({ onSignUp, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    age: '',
    gender: 'male',
    occupation: 'student',
    otherOccupation: '',
    financialStatus: 'middle',
    primaryNeeds: 'education',
    otherPrimaryNeeds: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('policypal_users') || '[]');
    
    if (users.some(user => user.email === formData.email)) {
      setError('Email already exists');
      return;
    }

    const newUser = {
      ...formData,
      occupation: formData.occupation === 'others' ? formData.otherOccupation : formData.occupation,
      primaryNeeds: formData.primaryNeeds === 'others' ? formData.otherPrimaryNeeds : formData.primaryNeeds,
      id: Date.now().toString()
    };

    users.push(newUser);
    localStorage.setItem('policypal_users', JSON.stringify(users));
    // Don't automatically log in after signup
    onSwitchToSignIn(); // Redirect to sign in page instead
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8" style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="max-w-md w-full mx-4 p-8 rounded-lg shadow-lg" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up for PolicyPal</h2>
        
        {error && (
          <div className="mb-4 p-3 rounded bg-red-500 bg-opacity-10 text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              required
              min="1"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Occupation</label>
            <select
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              required
            >
              <option value="student">Student</option>
              <option value="farmer">Farmer</option>
              <option value="business">Business</option>
              <option value="vendor">Vendor</option>
              <option value="unemployed">Unemployed</option>
              <option value="others">Others</option>
            </select>
          </div>

          {formData.occupation === 'others' && (
            <div>
              <label className="block text-sm font-medium mb-1">Specify Occupation</label>
              <input
                type="text"
                value={formData.otherOccupation}
                onChange={(e) => setFormData({ ...formData, otherOccupation: e.target.value })}
                className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
                style={{ 
                  backgroundColor: 'var(--background-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Financial Status</label>
            <select
              value={formData.financialStatus}
              onChange={(e) => setFormData({ ...formData, financialStatus: e.target.value })}
              className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              required
            >
              <option value="low">Low</option>
              <option value="upper-low">Upper Low</option>
              <option value="middle">Middle</option>
              <option value="upper-middle">Upper Middle</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Primary Needs</label>
            <select
              value={formData.primaryNeeds}
              onChange={(e) => setFormData({ ...formData, primaryNeeds: e.target.value })}
              className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              required
            >
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="business">Business</option>
              <option value="employment">Employment</option>
              <option value="insurance">Insurance</option>
              <option value="pension">Pension</option>
              <option value="others">Others</option>
            </select>
          </div>

          {formData.primaryNeeds === 'others' && (
            <div>
              <label className="block text-sm font-medium mb-1">Specify Primary Needs</label>
              <input
                type="text"
                value={formData.otherPrimaryNeeds}
                onChange={(e) => setFormData({ ...formData, otherPrimaryNeeds: e.target.value })}
                className="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
                style={{ 
                  backgroundColor: 'var(--background-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <button
            onClick={onSwitchToSignIn}
            className="text-blue-500 hover:text-blue-600"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;