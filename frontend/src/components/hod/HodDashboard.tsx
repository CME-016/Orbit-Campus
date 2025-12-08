import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, BarChart2, CheckSquare, Bell, Award } from 'lucide-react';

// --- MOCK DATA ---

interface Teacher {
  id: number;
  name: string;
  subject: string;
  load: number; 
  avatar: string;
}

interface DepartmentStats {
  totalStudents: number;
  coursesOffered: number;
  passPercentage: number;
  facultyCount: number;
}

interface RecentActivity {
  id: number;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const mockTeachers: Teacher[] = [
  { id: 1, name: 'Dr. Evelyn Reed', subject: 'Quantum Physics', load: 8, avatar: 'ER' },
  { id: 2, name: 'Mr. Samuel Grant', subject: 'Organic Chemistry', load: 12, avatar: 'SG' },
  { id: 3, name: 'Ms. Olivia Chen', subject: 'Linear Algebra', load: 10, avatar: 'OC' },
];

const mockStats: DepartmentStats = {
  totalStudents: 350,
  coursesOffered: 25,
  passPercentage: 92,
  facultyCount: 15,
};

const mockActivities: RecentActivity[] = [
  { id: 1, description: "New course 'Advanced Thermodynamics' approved.", time: '2h ago', icon: <CheckSquare size={18} className="text-yellow-600" /> },
  { id: 2, description: 'Reminder: Departmental meeting at 3 PM today.', time: '4h ago', icon: <Bell size={18} className="text-yellow-600" /> },
  { id: 3, description: 'Dr. Reed requested a new lab equipment budget.', time: 'Yesterday', icon: <Users size={18} className="text-yellow-600" /> }
];
const HodDashboard: React.FC = () => {
  const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-start space-x-4">
      <div className="bg-yellow-50 p-4 rounded-full text-yellow-600">{icon}</div>
      <div>
        <p className="text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-8 rounded-2xl mb-8 shadow-lg">
        <h1 className="text-4xl font-bold">Welcome back, Head of Department!</h1>
        <p className="text-lg mt-1 opacity-90">Here’s a summary of your department's performance and metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Students" value={mockStats.totalStudents} icon={<Users size={24} />} />
        <StatCard title="Courses Offered" value={mockStats.coursesOffered} icon={<BookOpen size={24} />} />
        <StatCard title="Pass Percentage" value={`${mockStats.passPercentage}%`} icon={<Award size={24} />} />
        <StatCard title="Faculty Count" value={mockStats.facultyCount} icon={<Users size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Teacher Workload</h2>
          <div className="space-y-4">
            {mockTeachers.map(teacher => (
              <div key={teacher.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-yellow-500 text-white flex-shrink-0 flex items-center justify-center font-bold text-xl">{teacher.avatar}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{teacher.name}</p>
                  <p className="text-sm text-gray-500">{teacher.subject}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold text-gray-700">{teacher.load} hrs/week</p>
                    <p className="text-xs text-gray-400">Workload</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link to="/hod/manage-teachers" className="font-medium text-amber-700 hover:text-amber-800">Manage Teachers &rarr;</Link>
          </div>
        </div>

        <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <ul className="space-y-4">
                    {mockActivities.map(activity => (
                        <li key={activity.id} className="flex items-start space-x-3">
                            <div className="text-gray-400 mt-1">{activity.icon}</div>
                            <div>
                                <p className="text-sm text-gray-700">{activity.description}</p>
                                <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex flex-col space-y-3">
                    <Link to="/hod/approve-requests" className="text-md font-medium text-amber-700 hover:text-amber-800">Approve Leave/Budget Requests</Link>
                    <Link to="/hod/department-analytics" className="text-md font-medium text-amber-700 hover:text-amber-800">View Department Analytics</Link>
                    <Link to="/hod/assign-class-teacher" className="text-md font-medium text-amber-700 hover:text-amber-800">Assign Class Teachers</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HodDashboard;
