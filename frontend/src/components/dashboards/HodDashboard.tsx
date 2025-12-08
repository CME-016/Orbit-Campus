import React from 'react';
import { Link } from 'react-router-dom';

const HodDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">HOD Dashboard</h1>
      <p className="mb-6">Welcome to the Head of Department Dashboard.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/hod/manage-teachers" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Teachers</h2>
          <p>Assign courses, and manage teacher data.</p>
        </Link>
        <Link to="/hod/student-overview" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Student Overview</h2>
          <p>View and manage student records and performance.</p>
        </Link>
        <Link to="/hod/department-analytics" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Department Analytics</h2>
          <p>Analyze departmental performance and metrics.</p>
        </Link>
        <Link to="/hod/approve-requests" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Approve Requests</h2>
          <p>Review and approve requests from students and faculty.</p>
        </Link>
        <Link to="/hod/assign-class-teacher" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Assign Class Teacher</h2>
          <p>Assign a class teacher to a semester.</p>
        </Link>
        <Link to="/hod/assign-students" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Assign Students to Semester</h2>
          <p>Assign students to their respective semesters.</p>
        </Link>
      </div>
    </div>
  );
};

export default HodDashboard;
