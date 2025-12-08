import React from 'react';
import { Link } from 'react-router-dom';
import UserStats from '../admin/UserStats';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 p-6 bg-red-600 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white">Welcome, {user?.name}!</h1>
        <p className="text-white">Comprehensive overview of campus operations and management.</p>
      </div>
      <UserStats />

      <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Administrative Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/admin/assign-students" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">Assign Students to Semester</h3>
                  <p className="text-gray-600">Manage student semester assignments.</p>
              </Link>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
