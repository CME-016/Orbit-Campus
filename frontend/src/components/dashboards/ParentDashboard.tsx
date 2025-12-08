
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart, Calendar, CreditCard, MessageSquare, BookOpen, Users } from 'lucide-react';

// --- MOCK DATA ---

interface DashboardData {
  studentName: string;
  recentGrade: string;
  attendancePercentage: number;
  pendingFees: number;
  unreadMessages: number;
}

interface RecentMessage {
    id: number;
    teacherName: string;
    subject: string;
    message: string;
    time: string;
    avatar: string;
}

const mockDashboardData: DashboardData = {
  studentName: 'Anaya Sharma',
  recentGrade: 'A-',
  attendancePercentage: 95,
  pendingFees: 2,
  unreadMessages: 3, 
};

// 1. Updated mock data for recent messages
const mockRecentMessages: RecentMessage[] = [
    { id: 1, teacherName: 'Bindhu', subject: 'Mathematics', message: 'No, a standard scientific calculator will be sufficient.', time: '1h ago', avatar: 'B' },
    { id: 2, teacherName: 'Padmaja', subject: 'Science', message: 'Anaya did a great job on her science project!', time: 'Yesterday', avatar: 'P' },
    { id: 3, teacherName: 'Sridevi', subject: 'History', message: 'The field trip form is due tomorrow.', time: '2 days ago', avatar: 'S' },
];


const ParentDashboard: React.FC = () => {
  const [data] = useState<DashboardData>(mockDashboardData);

  const QuickLink = ({ to, icon, title, subtitle }: { to: string, icon: React.ReactNode, title: string, subtitle: string }) => (
    <Link to={to} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow flex items-center space-x-4 border border-gray-200/80">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <ArrowRight className="ml-auto text-gray-400" size={20} />
    </Link>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Mrs. Sharma</h1>
        <p className="text-lg text-gray-600">Here is a summary for your child, {data.studentName}.</p>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Cards for key metrics */}
          <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-gray-200/80">
              <p className="text-base font-medium text-gray-500">Recent Grade</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{data.recentGrade}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-gray-200/80">
              <p className="text-base font-medium text-gray-500">Attendance</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{data.attendancePercentage}%</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-gray-200/80">
              <p className="text-base font-medium text-gray-500">Pending Fees</p>
              <p className="text-4xl font-bold text-red-600 mt-2">{data.pendingFees}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-gray-200/80">
              <p className="text-base font-medium text-gray-500">Unread Messages</p>
              <p className="text-4xl font-bold text-orange-600 mt-2">{data.unreadMessages}</p>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Quick Links */}
        <div className="lg:col-span-1 space-y-4">
            <QuickLink to="/parent/child-performance" icon={<BarChart className="text-blue-500" />} title="Child Performance" subtitle="View detailed analytics" />
            <QuickLink to="/parent/fees" icon={<CreditCard className="text-red-500" />} title="Fee Management" subtitle="Pay fees and view history" />
            <QuickLink to="/parent/reports" icon={<BookOpen className="text-green-500" />} title="Progress Reports" subtitle="Download term reports" />
            <QuickLink to="/parent/ptm" icon={<Calendar className="text-purple-500" />} title="PTM Schedule" subtitle="Book parent-teacher meetings" />
        </div>

        {/* 2. Right Column: Recent Messages */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Recent Messages</h2>
                <Link to="/parent/communication" className="text-sm font-medium text-blue-600 hover:underline flex items-center space-x-1">
                    <span>View All</span>
                    <ArrowRight size={16} />
                </Link>
            </div>
            <div className="space-y-4">
                {mockRecentMessages.map(msg => (
                    <div key={msg.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex-shrink-0 flex items-center justify-center font-bold">{msg.avatar}</div>
                        <div className="flex-1">
                            <div className="flex justify-between items-baseline">
                                <p className="font-semibold text-gray-900">{msg.teacherName}</p>
                                <p className="text-xs text-gray-500">{msg.time}</p>
                            </div>
                            <p className="text-sm text-gray-500">{msg.subject}</p>
                            <p className="text-sm text-gray-700 mt-1">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
