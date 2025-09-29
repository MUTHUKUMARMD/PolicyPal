import React, { useState } from 'react';

const SignIn = ({ onSignIn, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('policypal_users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      localStorage.setItem('policypal_currentUser', JSON.stringify(user));
      onSignIn(user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="max-w-md w-full mx-4 p-8 rounded-lg shadow-lg" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In to PolicyPal</h2>
        
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignUp}
            className="text-blue-500 hover:text-blue-600"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;