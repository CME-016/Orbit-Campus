
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GraduationCap, Lock } from 'lucide-react';

const ClassTeacherLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { classTeacherLogin } = useAuth(); // We will add this function to AuthContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // This is a new function we will create in our context
      // It will handle the separate login logic for class teachers
      const success = await classTeacherLogin(username, password);
      if (success) {
        navigate('/teacher/my-class'); // Redirect to the protected page on success
      } else {
        setError('Invalid credentials. Please check the username and password provided by your HOD.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <GraduationCap className="w-16 h-16 mx-auto text-green-600" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Class Teacher Login</h1>
            <p className="mt-2 text-sm text-gray-600">
                This is a secure area for assigned Class Teachers only.
            </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-bold text-gray-700">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter username provided by HOD"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your secure password"
            />
          </div>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              <Lock className="w-5 h-5 mr-2" />
              Access My Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassTeacherLogin;

