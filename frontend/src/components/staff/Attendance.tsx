
import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Calendar, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';

// Mock data for staff attendance for a month
const mockAttendance = {
  '2024-08': [
    { date: '2024-08-01', status: 'Present', checkIn: '08:55', checkOut: '17:05' },
    { date: '2024-08-02', status: 'Present', checkIn: '09:00', checkOut: '17:02' },
    { date: '2024-08-03', status: 'Absent' },
    { date: '2024-08-04', status: 'Holiday', reason: 'Sunday' },
    { date: '2024-08-05', status: 'Present', checkIn: '08:50', checkOut: '17:00' },
    { date: '2024-08-06', status: 'On Leave', reason: 'Sick Leave' },
     // ... more entries for August
  ],
  '2024-07': [
    { date: '2024-07-31', status: 'Present', checkIn: '09:05', checkOut: '17:10' },
    // ... more entries for July
  ],
};

type AttendanceStatus = 'Present' | 'Absent' | 'On Leave' | 'Holiday';

const getStatusPill = (status: AttendanceStatus, record?: any) => {
    switch(status) {
        case 'Present': return <span className="flex items-center text-sm font-medium text-green-600"><CheckCircle className="mr-1.5 h-4 w-4"/>Present</span>;
        case 'Absent': return <span className="flex items-center text-sm font-medium text-red-600"><XCircle className="mr-1.5 h-4 w-4"/>Absent</span>;
        case 'On Leave': return <span className="flex items-center text-sm font-medium text-yellow-600"><Clock className="mr-1.5 h-4 w-4"/>On Leave</span>;
        case 'Holiday': return <span className="flex items-center text-sm font-medium text-gray-500"><Calendar className="mr-1.5 h-4 w-4"/>Holiday</span>;
    }
}

const StaffAttendance: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + offset);
      return newDate;
    });
  };

  const monthKey = currentMonth.toISOString().slice(0, 7);
  const attendanceForMonth = mockAttendance[monthKey as keyof typeof mockAttendance] || [];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">My Attendance</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div className="text-center">
          <p className="text-xl font-semibold text-purple-600">{currentMonth.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
        </div>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceForMonth.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(record.status as AttendanceStatus)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.checkIn || '--:--'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.checkOut || '--:--'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{(record as any).reason || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {attendanceForMonth.length === 0 && (
            <div className="text-center py-10">
                <UserCheck className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No attendance records for this month.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default StaffAttendance;
