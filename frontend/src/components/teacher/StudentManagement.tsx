import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download,
  TrendingUp,
  UserCheck,
  BookOpen,
  Calendar,
  Mail,
  Award
} from 'lucide-react';

const StudentManagement: React.FC = () => {
  const [students] = useState([
    {
      id: 'ST2024001',
      name: 'Deepak Kumar',
      rollNumber: 'CS21001',
      semester: 'Semester 6',
      cgpa: 8.4,
      attendance: 92,
      subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
      email: 'deepak.kumar@campus.edu',
      status: 'active',
      lastActivity: '2 hours ago'
    },
    {
      id: 'ST2024002',
      name: 'Nandha Kishore',
      rollNumber: 'CS21002',
      semester: 'Semester 6',
      cgpa: 9.1,
      attendance: 96,
      subjects: ['Data Structures', 'Algorithms'],
      email: 'nandha.kishore@campus.edu',
      status: 'active',
      lastActivity: '1 day ago'
    },
    {
      id: 'ST2024003',
      name: 'Jaswanth',
      rollNumber: 'CS21003',
      semester: 'Semester 6',
      cgpa: 7.8,
      attendance: 88,
      subjects: ['Database Systems'],
      email: 'jaswanth@campus.edu',
      status: 'active',
      lastActivity: '3 hours ago'
    },
    {
      id: 'ST2024004',
      name: 'Bala Manohar',
      rollNumber: 'CS21004',
      semester: 'Semester 6',
      cgpa: 8.2,
      attendance: 95,
      subjects: ['Data Structures', 'Database Systems'],
      email: 'bala.manohar@campus.edu',
      status: 'active',
      lastActivity: '5 hours ago'
    },
    {
      id: 'ST2024005',
      name: 'Siddu',
      rollNumber: 'CS21005',
      semester: 'Semester 6',
      cgpa: 7.5,
      attendance: 85,
      subjects: ['Algorithms'],
      email: 'siddu@campus.edu',
      status: 'inactive',
      lastActivity: '3 days ago'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['Data Structures', 'Algorithms', 'Database Systems'];

  const getFilteredStudents = () => {
    let filtered = students;
    
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(student => 
        student.subjects.includes(selectedSubject)
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleSendEmail = (studentEmail: string, studentName: string) => {
    console.log('Sending email to:', studentEmail);
    
    const subject = prompt(`Enter email subject for ${studentName}:`);
    if (subject) {
      const message = prompt('Enter your message:');
      if (message) {
        console.log('Email details:', { to: studentEmail, subject, message });
        alert(`Email sent successfully to ${studentName}!`);
      }
    }
  };

  const handleViewProfile = (studentId: string) => {
    console.log('Viewing profile for student:', studentId);
    const student = students.find(s => s.id === studentId);
    if (student) {
      alert(`Student Profile:\n\nName: ${student.name}\nRoll: ${student.rollNumber}\nCGPA: ${student.cgpa}\nAttendance: ${student.attendance}%\nEmail: ${student.email}`);
    }
  };

  const handleEditMarks = (studentId: string) => {
    console.log('Editing marks for student:', studentId);
    const student = students.find(s => s.id === studentId);
    if (student) {
      const newMarks = prompt(`Enter new marks for ${student.name} (current CGPA: ${student.cgpa}):`);
      if (newMarks && !isNaN(Number(newMarks))) {
        alert(`Marks updated successfully for ${student.name}!`);
      }
    }
  };

  const handleBulkEmail = () => {
    const subject = prompt('Enter email subject for all students:');
    if (subject) {
      const message = prompt('Enter your message:');
      if (message) {
        const filteredStudents = getFilteredStudents();
        console.log('Bulk email to:', filteredStudents.map(s => s.email));
        alert(`Email sent successfully to ${filteredStudents.length} students!`);
      }
    }
  };

  const handleExportStudents = () => {
    const filteredStudents = getFilteredStudents();
    const csvContent = [
      ['Name', 'Roll Number', 'Email', 'CGPA', 'Attendance', 'Subjects'],
      ...filteredStudents.map(student => [
        student.name,
        student.rollNumber,
        student.email,
        student.cgpa.toString(),
        `${student.attendance}%`,
        student.subjects.join('; ')
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students-${selectedSubject}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert(`Student data exported successfully! (${filteredStudents.length} students)`);
  };

  const handleScheduleMeeting = () => {
    const date = prompt('Enter meeting date (YYYY-MM-DD):');
    if (date) {
      const time = prompt('Enter meeting time (HH:MM):');
      if (time) {
        console.log('Meeting scheduled:', { date, time });
        alert(`Office hours meeting scheduled for ${date} at ${time}`);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">My Students</h1>
        <p className="text-green-100">Manage and track your students\' academic progress and performance.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average CGPA</p>
              <p className="text-2xl font-bold text-green-600">
                {(students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Attendance</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Students</p>
              <p className="text-2xl font-bold text-purple-600">
                {students.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-gray-400" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Student List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subjects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredStudents().map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold mr-3">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.rollNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.semester}</div>
                    <div className="text-sm text-gray-500">Last active: {student.lastActivity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-xs text-gray-500">CGPA:</span>
                          <span className={`ml-1 font-medium ${
                            student.cgpa >= 8.5 ? 'text-green-600' :
                            student.cgpa >= 7.0 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {student.cgpa}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Attendance:</span>
                          <span className={`ml-1 font-medium ${
                            student.attendance >= 90 ? 'text-green-600' :
                            student.attendance >= 75 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {student.attendance}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewProfile(student.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleEditMarks(student.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Marks</span>
                      </button>
                      <button
                        onClick={() => handleSendEmail(student.email, student.name)}
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {getFilteredStudents().length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No students found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={handleExportStudents} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-6 w-6 text-green-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Export Student List</div>
              <div className="text-xs text-gray-500">Download as Excel/PDF</div>
            </div>
          </button>
          <button onClick={handleBulkEmail} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="h-6 w-6 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Send Bulk Email</div>
              <div className="text-xs text-gray-500">Email all students</div>
            </div>
          </button>
          <button onClick={handleScheduleMeeting} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-purple-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Schedule Meeting</div>
              <div className="text-xs text-gray-500">Office hours booking</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;