
import React, { useState } from 'react';
import { UserCheck, ChevronDown } from 'lucide-react';

const studentsData = [
  { id: 1, name: 'Deepak Kumar' },
  { id: 2, name: 'Nandha Kishore' },
  { id: 3, name: 'Jaswanth' },
  { id: 4, name: 'Bala Manohar' },
  { id: 5, name: 'Siddu' },
];

const Attendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Math');
  const [studentAttendance, setStudentAttendance] = useState<{ [key: number]: string }>({});

  const handleAttendanceChange = (studentId: number, attendance: string) => {
    setStudentAttendance(prev => ({ ...prev, [studentId]: attendance }));
  };

  const handleSave = () => {
    console.log('Saved Attendance:', studentAttendance);
    alert('Attendance saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Take Attendance</h1>
          <p className="text-lg text-gray-600">Select a class and mark the attendance for each student.</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 sm:mb-0">Class Selection</h2>
              <div className="relative w-full sm:w-64">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 transition duration-300"
                >
                  <option>Math</option>
                  <option>Science</option>
                  <option>History</option>
                  <option>English</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {studentsData.map((student, index) => (
                <div key={student.id} className={`p-5 rounded-lg transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                        <UserCheck className="text-indigo-500" size={24} />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-500">Student ID: {student.id}</p>
                      </div>
                    </div>
                    <div className="w-full sm:w-48">
                      <select
                        value={studentAttendance[student.id] || ''}
                        onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                      >
                        <option value="">Select</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 px-6 sm:px-8 py-4">
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
              >
                Save All Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
