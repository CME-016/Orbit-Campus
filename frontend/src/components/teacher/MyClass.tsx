
import React from 'react';

// Mock data for students
const students = [
  { id: 1, name: 'Deepak Kumar', attendance: '95%', grades: 'A' },
  { id: 2, name: 'Nandha Kishore', attendance: '92%', grades: 'B' },
  { id: 3, name: 'Jaswanth', attendance: '98%', grades: 'A-' },
  { id: 4, name: 'Bala Manohar', attendance: '88%', grades: 'C' },
  { id: 5, name: 'Siddu', attendance: '91%', grades: 'B+' },
];

const MyClass: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Class Dashboard</h1>
      <p className="mt-2">Welcome, Class Teacher. This is your dedicated area for managing your assigned class.</p>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Student List</h2>
        <div className="mt-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Attendance</th>
                <th className="py-2 px-4 border-b">Grades</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b text-center">{student.id}</td>
                  <td className="py-2 px-4 border-b text-center">{student.name}</td>
                  <td className="py-2 px-4 border-b text-center">{student.attendance}</td>
                  <td className="py-2 px-4 border-b text-center">{student.grades}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClass;
