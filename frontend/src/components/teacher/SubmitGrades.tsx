
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { CheckCircle, AlertTriangle, Book, User } from 'lucide-react';

// MOCK: In a real app, you would get this from a global state/context after login.
const MOCK_TEACHER_ID = '1'; // Assuming the logged-in teacher has ID 1. Change as needed.

interface Student {
  id: string;
  name: string;
  semester_id: string;
}

interface Grade {
  marks: string;
  feedback: string;
}

interface GradesState {
  [studentId: string]: Grade;
}

interface StatusState {
    [studentId: string]: { message: string; error: boolean } | null;
}

const SubmitGrades: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [grades, setGrades] = useState<GradesState>({});
    const [status, setStatus] = useState<StatusState>({});
    const [loading, setLoading] = useState(true);
    const [globalError, setGlobalError] = useState('');

    const fetchStudents = useCallback(async () => {
        try {
            setGlobalError('');
            const response = await axios.get(`http://localhost/php/api/teacher/get_assigned_students.php?teacher_id=${MOCK_TEACHER_ID}`);
            if (response.data.success) {
                setStudents(response.data.data);
                // Initialize grades state
                const initialGrades: GradesState = {};
                response.data.data.forEach((student: Student) => {
                    initialGrades[student.id] = { marks: '', feedback: '' };
                });
                setGrades(initialGrades);
            } else {
                setGlobalError(response.data.message || 'Failed to fetch students.');
            }
        } catch (err) {
            setGlobalError('An error occurred while fetching students.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleInputChange = (studentId: string, field: keyof Grade, value: string) => {
        setGrades(prev => ({ ...prev, [studentId]: { ...prev[studentId], [field]: value } }));
    };

    const handleSubmit = async (studentId: string) => {
        const student = students.find(s => s.id === studentId);
        if (!student) return;

        const studentGrade = grades[studentId];

        if (!studentGrade.marks) {
            setStatus(prev => ({...prev, [studentId]: { message: 'Marks are required.', error: true }}));
            return;
        }

        setStatus(prev => ({...prev, [studentId]: { message: 'Submitting...', error: false }}));

        try {
            const response = await axios.post('http://localhost/php/api/teacher/submit_grades.php', {
                student_id: student.id,
                semester_id: student.semester_id,
                teacher_id: MOCK_TEACHER_ID,
                marks: studentGrade.marks,
                feedback: studentGrade.feedback
            });

            if (response.data.success) {
                setStatus(prev => ({...prev, [studentId]: { message: response.data.message, error: false }}));
            } else {
                setStatus(prev => ({...prev, [studentId]: { message: response.data.message, error: true }}));
            }
        } catch (err: any) {
            setStatus(prev => ({...prev, [studentId]: { message: err.response?.data?.message || 'An error occurred.', error: true }}));
        }
    };

    if (loading) {
        return <div className="p-6">Loading students...</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Submit Grades</h1>
            {globalError && (
                <div className="flex items-center space-x-3 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-lg">
                    <AlertTriangle className="h-5 w-5" />
                    <span>{globalError}</span>
                </div>
            )}
            {students.length === 0 && !loading && !globalError && (
                <div className="text-center py-12 px-6 bg-white rounded-lg shadow">
                    <Book className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No Students Assigned</h3>
                    <p className="mt-1 text-sm text-gray-500">You do not have any students assigned to you yet.</p>
                 </div>
            )}
            <div className="space-y-4">
                {students.map(student => (
                    <div key={student.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><User />{student.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor={`marks-${student.id}`} className="block text-sm font-medium text-gray-700">Marks</label>
                                <input 
                                    type="number" 
                                    id={`marks-${student.id}`}
                                    value={grades[student.id]?.marks || ''}
                                    onChange={e => handleInputChange(student.id, 'marks', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder='e.g., 85'
                                />
                            </div>
                            <div>
                                <label htmlFor={`feedback-${student.id}`} className="block text-sm font-medium text-gray-700">Feedback</label>
                                <textarea 
                                    id={`feedback-${student.id}`}
                                    value={grades[student.id]?.feedback || ''}
                                    onChange={e => handleInputChange(student.id, 'feedback', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder='e.g., "Excellent work"'
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-4">
                            {status[student.id] && (
                                <div className={`text-sm mr-4 flex items-center gap-2 ${status[student.id]?.error ? 'text-red-600' : 'text-green-600'}`}>
                                    {status[student.id]?.error ? <AlertTriangle size={16}/> : <CheckCircle size={16}/>}
                                    {status[student.id]?.message}
                                </div>
                            )}
                            <button
                                onClick={() => handleSubmit(student.id)}
                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit Grades
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubmitGrades;
