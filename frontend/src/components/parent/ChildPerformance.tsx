
import React, { useState } from 'react';
import { BarChart, CheckCircle, XCircle } from 'lucide-react';

// 1. Removed Supabase and useAuth imports

interface Grade {
  subject: string;
  marks: number;
  grade: string;
}

interface Attendance {
  subject: string;
  total_classes: number;
  attended_classes: number;
}

interface PerformanceData {
  grades: Grade[];
  attendance: Attendance[];
}

// 2. Mock data for grades and attendance
const mockPerformanceData: PerformanceData = {
  grades: [
    { subject: 'Mathematics', marks: 88, grade: 'A' },
    { subject: 'Science', marks: 92, grade: 'A+' },
    { subject: 'History', marks: 75, grade: 'B+' },
    { subject: 'English', marks: 81, grade: 'A' },
    { subject: 'Physical Education', marks: 95, grade: 'A+' },
  ],
  attendance: [
    { subject: 'Mathematics', total_classes: 50, attended_classes: 48 },
    { subject: 'Science', total_classes: 52, attended_classes: 50 },
    { subject: 'History', total_classes: 45, attended_classes: 40 },
    { subject: 'English', total_classes: 48, attended_classes: 48 },
  ],
};

const ChildPerformance: React.FC = () => {
  // 3. State initialized with mock data
  const [performance, setPerformance] = useState<PerformanceData | null>(mockPerformanceData);

  // 4. Removed all useEffect, loading, error, and data fetching logic

  const getAttendanceStatus = (attended: number, total: number) => {
      const percentage = (attended / total) * 100;
      if (percentage >= 75) return <CheckCircle className="text-green-500" />;
      return <XCircle className="text-red-500" />;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Child's Performance Overview</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><BarChart className="mr-3 text-blue-500" />Academic Grades</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                    </tr>
                </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                    {performance?.grades.map(g => (
                         <tr key={g.subject}>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{g.subject}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{g.marks}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold text-lg text-gray-800">{g.grade}</td>
                        </tr>
                    ))}
                 </tbody>
            </table>
             {performance?.grades.length === 0 && <p className="text-center py-4 text-gray-500">No grade data available.</p>}
        </div>
      </div>

       <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><CheckCircle className="mr-3 text-green-500" />Attendance Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performance?.attendance.map(a => (
                <div key={a.subject} className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-gray-800">{a.subject}</p>
                        <p className="text-gray-600 text-sm">Attended: {a.attended_classes} / {a.total_classes}</p>
                    </div>
                    <div>
                        {getAttendanceStatus(a.attended_classes, a.total_classes)}
                    </div>
                </div>
            ))}
        </div>
         {performance?.attendance.length === 0 && <p className="text-center py-4 text-gray-500">No attendance data available.</p>}
      </div>

    </div>
  );
};

export default ChildPerformance;
