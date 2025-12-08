
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';

// 1. Updated mock data with the new list of students
const mockStudents = [
  { id: 'S001', name: 'Deepak', course: 'Computer Science', year: 2, attendance: 95, overallGrade: 91, avatar: 'D' },
  { id: 'S002', name: 'Kumar', course: 'Organic Chemistry', year: 3, attendance: 88, overallGrade: 85, avatar: 'K' },
  { id: 'S003', name: 'Nandha Kishore', course: 'Linear Algebra', year: 1, attendance: 92, overallGrade: 88, avatar: 'NK' },
  { id: 'S004', name: 'Siddu', course: 'Astrophysics', year: 4, attendance: 98, overallGrade: 96, avatar: 'S' },
  { id: 'S005', name: 'Bala Manohar', course: 'Computer Science', year: 2, attendance: 85, overallGrade: 82, avatar: 'BM' },
  { id: 'S006', name: 'Jaswanth', course: 'Quantum Physics', year: 3, attendance: 99, overallGrade: 94, avatar: 'J' },
  { id: 'S007', name: 'Karthik', course: 'Linear Algebra', year: 1, attendance: 91, overallGrade: 89, avatar: 'K' },
];

const StudentOverview: React.FC = () => {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const [sortKey, setSortKey] = useState('name');

  const courses = ['All', ...new Set(mockStudents.map(s => s.course))];

  // 2. Dynamic filtering and sorting logic
  const processedStudents = useMemo(() => {
    return students
      .filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(student =>
        filterCourse === 'All' || student.course === filterCourse
      )
      .sort((a, b) => {
        if (sortKey === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortKey === 'overallGrade' || sortKey === 'attendance') {
          return b[sortKey] - a[sortKey];
        }
        return 0;
      });
  }, [students, searchTerm, filterCourse, sortKey]);

  // 3. UI with search, filter, and sort functionality
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Student Overview</h1>
        <p className="text-lg text-gray-600 mt-1">Monitor all students within your department.</p>
      </header>

      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or course..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterCourse}
              onChange={e => setFilterCourse(e.target.value)}
              className="w-full pl-10 pr-4 py-2 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              {courses.map(course => <option key={course} value={course}>{course}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
          <div className="relative">
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
             <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value)}
              className="w-full pl-10 pr-4 py-2 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="name">Sort by Name</option>
              <option value="overallGrade">Sort by Grade</option>
              <option value="attendance">Sort by Attendance</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Grade</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {processedStudents.map(student => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex-shrink-0 flex items-center justify-center font-bold">{student.avatar}</div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.course}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{student.attendance}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{student.overallGrade}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentOverview;
