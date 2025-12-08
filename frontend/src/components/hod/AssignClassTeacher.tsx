
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ChevronDown, CheckCircle, AlertTriangle, User, BookOpen } from 'lucide-react';

// Define interfaces for better type safety
interface Teacher {
  id: string;
  name: string;
}

interface Semester {
  id: string;
  name: string;
}

const AssignClassTeacher: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [currentAssignment, setCurrentAssignment] = useState<string | null>(null);
    const [fetchingAssignment, setFetchingAssignment] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [teachersRes, semestersRes] = await Promise.all([
                    axios.get('http://localhost/php/api/users/get_teachers.php'),
                    axios.get('http://localhost/php/api/semesters/get_semesters.php')
                ]);

                if (teachersRes.data.success) {
                    setTeachers(teachersRes.data.data);
                } else {
                    setError('Failed to fetch teachers.');
                }

                if (semestersRes.data.success) {
                    setSemesters(semestersRes.data.data);
                } else {
                    setError('Failed to fetch semesters.');
                }
            } catch (err) {
                setError('An error occurred while fetching initial data.');
                console.error(err);
            }
        };
        fetchInitialData();
    }, []);

    const fetchCurrentAssignment = useCallback(async (semesterId: string) => {
        if (!semesterId) {
            setCurrentAssignment(null);
            return;
        }
        setFetchingAssignment(true);
        try {
            const response = await axios.get(`http://localhost/php/api/hod/get_current_assignment.php?semester_id=${semesterId}`);
            if (response.data.success && response.data.data) {
                setCurrentAssignment(response.data.data.teacher_name);
            } else {
                setCurrentAssignment(null);
            }
        } catch (err) {
            console.error('Failed to fetch current assignment:', err);
            setCurrentAssignment(null); // Clear on error
        } finally {
            setFetchingAssignment(false);
        }
    }, []);

    useEffect(() => {
        fetchCurrentAssignment(selectedSemester);
    }, [selectedSemester, fetchCurrentAssignment]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage('');
        setError('');

        if (!selectedTeacher || !selectedSemester) {
            setError('Please select both a teacher and a semester.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost/php/api/hod/assign_class_teacher.php', {
                teacher_id: selectedTeacher,
                semester_id: selectedSemester
            });

            if (response.data.success) {
                setMessage(response.data.message);
                // Refresh current assignment display
                const updatedTeacher = teachers.find(t => t.id === selectedTeacher);
                if (updatedTeacher) {
                    setCurrentAssignment(updatedTeacher.name);
                }
                // Optionally reset selections after a delay
                setTimeout(() => {
                    setSelectedTeacher('');
                    setSelectedSemester('');
                    setMessage('');
                }, 3000);
            } else {
                setError(response.data.message || 'An unknown error occurred.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred while assigning the teacher.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Assign Class Teacher</h1>
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                {message && (
                    <div className="flex items-center space-x-3 bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg mb-6">
                        <CheckCircle className="h-5 w-5" />
                        <span>{message}</span>
                    </div>
                )}
                {error && (
                    <div className="flex items-center space-x-3 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-lg mb-6">
                        <AlertTriangle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                        <select
                            id="semester"
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(e.target.value)}
                            className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select a Semester</option>
                            {semesters.map(semester => (
                                <option key={semester.id} value={semester.id}>{semester.name}</option>
                            ))}
                        </select>
                        {fetchingAssignment ? (
                           <div className="text-sm text-gray-500 mt-2">Checking...</div>
                        ) : currentAssignment ? (
                            <div className="mt-2 p-3 bg-gray-100 rounded-lg text-sm">
                                <span className="font-semibold">Currently Assigned:</span> {currentAssignment}
                            </div>
                        ) : selectedSemester && (
                           <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                                No teacher is currently assigned to this semester.
                           </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="teacher" className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
                         <select
                            id="teacher"
                            value={selectedTeacher}
                            onChange={(e) => setSelectedTeacher(e.target.value)}
                            className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select a Teacher</option>
                            {teachers.map(teacher => (
                                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !selectedSemester || !selectedTeacher}
                            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Assigning...' : 'Assign Teacher'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignClassTeacher;
