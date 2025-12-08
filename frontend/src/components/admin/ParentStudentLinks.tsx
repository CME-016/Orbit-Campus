import React, { useState, useEffect } from 'react';

const ParentStudentLinks = () => {
    const [parents, setParents] = useState([]);
    const [students, setStudents] = useState([]);
    const [links, setLinks] = useState([]);
    const [selectedParent, setSelectedParent] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');

    const fetchLinks = async () => {
        try {
            const linksResponse = await fetch('http://localhost/php/api/get_parent_student_links.php');
            if (!linksResponse.ok) {
                const errorText = await linksResponse.text();
                throw new Error(`HTTP error! status: ${linksResponse.status}, text: ${errorText}`);
            }
            const linksData = await linksResponse.json();
            setLinks(linksData.records || []); // Ensure we have an array
        } catch (error) {
            console.error('Error fetching links:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const usersResponse = await fetch('http://localhost/php/api/get_users.php');
            if (!usersResponse.ok) {
                const errorText = await usersResponse.text();
                throw new Error(`HTTP error! status: ${usersResponse.status}, text: ${errorText}`);
            }
            const usersData = await usersResponse.json();
            const users = usersData.records || []; // Ensure we have an array

            setParents(users.filter(user => user.role === 'parent'));
            setStudents(users.filter(user => user.role === 'student'));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchLinks();
    }, []);

    const handleLink = async () => {
        if (!selectedParent || !selectedStudent) {
            alert('Please select a parent and a student.');
            return;
        }

        try {
            const response = await fetch('http://localhost/php/api/link_parent_student.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parent_id: selectedParent, student_id: selectedStudent }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                fetchLinks(); // Refresh links
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error linking parent and student:', error);
        }
    };

    const handleRemoveLink = async (parentId, studentId) => {
        try {
            const response = await fetch('http://localhost/php/api/remove_parent_student_link.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parent_id: parentId, student_id: studentId }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                fetchLinks(); // Refresh links
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error removing link:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
             <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Parent-Student Links</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Create New Link</h3>
                <div className="flex flex-wrap items-center space-x-0 sm:space-x-4">
                    <select
                        value={selectedParent}
                        onChange={(e) => setSelectedParent(e.target.value)}
                        className="p-2 border rounded w-full sm:w-auto mb-2 sm:mb-0"
                    >
                        <option value="">Select Parent</option>
                        {parents.map(parent => (
                            <option key={parent.id} value={parent.id}>{parent.name}</option>
                        ))}
                    </select>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="p-2 border rounded w-full sm:w-auto mb-2 sm:mb-0"
                    >
                        <option value="">Select Student</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleLink}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
                    >
                        Link
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">Existing Links</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white ">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">Parent</th>
                                <th className="py-2 px-4 text-left">Student</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {links && links.length > 0 ? links.map(link => (
                                <tr key={`${link.parent_id}-${link.student_id}`} className="border-b">
                                    <td className="px-4 py-2">{link.parent_name} ({link.parent_email})</td>
                                    <td className="px-4 py-2">{link.student_name} ({link.student_email})</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleRemoveLink(link.parent_id, link.student_id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">No links found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ParentStudentLinks;
