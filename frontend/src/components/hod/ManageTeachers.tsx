
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Teacher {
  id: number;
  name: string;
  email: string;
  role: string;
}

const ManageTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // CORRECTED: Using the full, absolute path to the backend API endpoint.
        const response = await axios.get('http://localhost/php/api/get_teachers.php');

        if (response.data && Array.isArray(response.data.data)) {
            setTeachers(response.data.data);
        } else {
            setTeachers([]);
            setError('Received data is not in the expected format.');
        }
      } catch (err) {
        setError('An error occurred while fetching teachers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleManageClick = (teacherId: number) => {
    // The path is now correct and final.
    navigate(`/hod/manage-teachers/${teacherId}`);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Teachers</h1>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {teachers.length > 0 ? (
                teachers.map(teacher => (
                  <tr key={teacher.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{teacher.id}</td>
                    <td className="py-3 px-6 text-left">{teacher.name}</td>
                    <td className="py-3 px-6 text-left">{teacher.email}</td>
                    <td className="py-3 px-6 text-center">
                      <button 
                        onClick={() => handleManageClick(teacher.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={4} className="py-3 px-6 text-center">No teachers found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTeachers;
