import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'; 
import { Users, AlertTriangle, Loader, Search } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
}

const ViewStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      if (!user || user.role !== 'teacher') {
        setError('Access denied. You must be a teacher to view this page.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost/php/api/teacher/get_assigned_students.php?teacher_id=${user.id}`);
        if (response.data.success) {
          setStudents(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
            setError(err.response.data.message || 'You are not assigned as a class teacher for any semester.');
        } else {
            setError(err.response?.data?.message || 'An unexpected error occurred while fetching students.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [user]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold">My Assigned Students</h1>
            </div>
        </div>

      {loading && <div className="flex justify-center p-10"><Loader className="animate-spin h-8 w-8" /></div>}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
            <AlertTriangle className="h-5 w-5 mr-3" />
            <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white shadow-lg rounded-xl border border-gray-200">
          <div className="p-4 border-b">
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input 
                      type="text"
                      placeholder="Search by name or email..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                  />
              </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                        {students.length > 0 ? 'No students match your search.' : 'No students are assigned to your class yet.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
