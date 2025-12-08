
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface Teacher {
  id: number;
  name: string;
}

// Use the explicit, full path to the backend API, bypassing the Vite proxy.
const API_URL = 'http://localhost/php/api/hod/manage_class_teacher_credentials.php';

const ManageClassTeacherCredentials: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsFetching(true);
    setFetchError(null);
    try {
      // Append a cache-busting query parameter
      const response = await axios.get(`${API_URL}?_=${new Date().getTime()}`);
      if (response.data.success && Array.isArray(response.data.data)) {
        setTeachers(response.data.data);
      } else {
        const errorMessage = response.data.message || 'Received invalid data from the server.';
        setFetchError(errorMessage);
        setTeachers([]);
      }
    } catch (error) {
        const axiosError = error as AxiosError<any>;
        let errorMessage = 'An unexpected error occurred while fetching the teacher list.';
        if (axiosError.response) {
            errorMessage = `Error ${axiosError.response.status}: ${axiosError.response.data.message || 'Could not connect to the server.'}`;
        } else if (axiosError.request) {
            // This error typically means a network error or CORS issue.
            errorMessage = 'No response from server. Please ensure your XAMPP (Apache) server is running and accessible.';
        }
        setFetchError(errorMessage);
        toast.error(errorMessage, { autoClose: 8000 });
        setTeachers([]);
    } finally {
        setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher || !username || !password) {
      toast.warn('Please select a teacher and fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        teacher_id: selectedTeacher,
        username,
        password,
      });
      if (response.data.success) {
        toast.success('Credentials saved successfully!');
        setUsername('');
        setPassword('');
        setSelectedTeacher('');
      } else {
        toast.error(response.data.message || 'Failed to save credentials.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
    setLoading(false);
  };

  const renderTeacherSelect = () => {
    if (isFetching) {
      return <p className="text-gray-500">Loading teachers from your XAMPP server...</p>;
    }

    if (fetchError) {
      return <div className="text-red-600 bg-red-100 p-3 rounded-md">
          <p><strong>Error:</strong> {fetchError}</p>
          <p className="text-sm mt-2">Please check the browser console for more details and ensure your XAMPP Apache server is running.</p>
      </div>;
    }

    if (teachers.length === 0) {
      return <div className="text-blue-600 bg-blue-100 p-3 rounded-md">
          <p><strong>No class teachers found.</strong></p>
          <p className="text-sm mt-1">Please go to the "Assign Class Teacher" page to assign a teacher to a class first.</p>
      </div>;
    }

    return (
      <select 
        id="teacher" 
        value={selectedTeacher} 
        onChange={(e) => setSelectedTeacher(e.target.value)} 
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select a Teacher</option>
        {teachers.map(teacher => (
          <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
        ))}
      </select>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Class Teacher Credentials</h1>
      <p className="mb-6">Here you can assign and manage the secure, second-login credentials for teachers who have been assigned as Class Teachers.</p>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create/Update Credentials</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="teacher" className="block text-sm font-medium text-gray-700 mb-1">Class Teacher</label>
            {renderTeacherSelect()}
          </div>

          {teachers.length > 0 && (
            <>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Second-Login Username</label>
                <input 
                  type="text" 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., teacher.jane.doe"
                />
              </div>
              <div>
                <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1">Special Password</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter a strong, unique password"
                />
              </div>
              <button type="submit" disabled={loading || teachers.length === 0} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Saving...' : 'Save Credentials'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ManageClassTeacherCredentials;
