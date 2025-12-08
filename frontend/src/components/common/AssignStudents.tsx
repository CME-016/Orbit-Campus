
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Book, AlertTriangle, Loader, CheckCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Student {
  id: number;
  name: string;
  email: string;
  semester_id: number | null;
}

interface Semester {
    id: number;
    name: string;
}

const AssignStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, semestersResponse] = await Promise.all([
          axios.get('http://localhost/php/api/users/get_students.php'),
          axios.get('http://localhost/php/api/semesters/get_semesters.php')
        ]);

        if (studentsResponse.data.success) {
          setStudents(studentsResponse.data.data);
        } else {
          setError(studentsResponse.data.message);
        }

        if (semestersResponse.data.success) {
          setSemesters(semestersResponse.data.data);
        } else {
          setError(semestersResponse.data.message);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSemesterChange = async (studentId: number, semesterId: number) => {
    const originalStudents = [...students];
    // Immediately update the UI for responsiveness
    setStudents(students.map(s => s.id === studentId ? { ...s, semester_id: semesterId } : s));

    try {
      const response = await axios.post('http://localhost/php/api/users/assign_semester.php', {
        student_id: studentId,
        semester_id: semesterId
      });

      if (response.data.success) {
        toast.success(`Successfully assigned semester!`, { autoClose: 2000 });
      } else {
        // Revert the change on failure
        setStudents(originalStudents);
        toast.error(response.data.message || 'Failed to update.');
      }
    } catch (err: any) {
        // Revert the change on error
        setStudents(originalStudents);
        toast.error(err.response?.data?.message || 'An error occurred.');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-10"><Loader className="animate-spin h-8 w-8" /></div>;
  }

  if (error) {
    return <div className="p-6 bg-red-100 text-red-700 rounded-lg flex items-center"><AlertTriangle className="h-5 w-5 mr-3" /> {error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <ToastContainer position="top-right" />
      <div className="flex items-center space-x-3">
        <Users className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold">Assign Students to Semester</h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Semester</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {students.map(student => (
                        <tr key={student.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <select 
                                    value={student.semester_id || ''}
                                    onChange={(e) => handleSemesterChange(student.id, parseInt(e.target.value))}
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="" disabled>Select a semester...</option>
                                    {semesters.map(semester => (
                                        <option key={semester.id} value={semester.id}>{semester.name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AssignStudents;
