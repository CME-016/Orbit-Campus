
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, Award, TrendingUp, UserCheck } from 'lucide-react';

// 1. Mock data for departmental analytics
const passPercentageData = [
  { year: '2020', rate: 85 },
  { year: '2021', rate: 88 },
  { year: '2022', rate: 92 },
  { year: '2023', rate: 95 },
];

const enrollmentData = [
  { month: 'Jan', enrolled: 30 },
  { month: 'Mar', enrolled: 45 },
  { month: 'Jun', enrolled: 60 },
  { month: 'Sep', enrolled: 50 },
  { month: 'Nov', enrolled: 70 },
];

const facultyWorkload = [
  { name: 'High Workload', value: 4 },
  { name: 'Medium Workload', value: 8 },
  { name: 'Low Workload', value: 3 },
];

const COLORS = ['#FF8042', '#FFBB28', '#00C49F'];

// 2. Main component for Department Analytics
const DepartmentAnalytics: React.FC = () => {
  const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center space-x-4">
      <div className="bg-amber-100 p-4 rounded-full text-amber-600">{icon}</div>
      <div>
        <p className="text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Department Analytics</h1>
        <p className="text-lg text-gray-600 mt-1">In-depth metrics and performance of your department.</p>
      </header>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Students" value={350} icon={<Users size={24} />} />
        <StatCard title="Courses Offered" value={25} icon={<BookOpen size={24} />} />
        <StatCard title="Average Pass Rate" value="92%" icon={<Award size={24} />} />
        <StatCard title="Faculty Count" value={15} icon={<UserCheck size={24} />} />
      </div>

      {/* Charts and Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pass Percentage Over Years */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Annual Pass Percentage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={passPercentageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rate" fill="#FFC658" name="Pass Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Enrollment Trends */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Enrollment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="enrolled" stroke="#FF8042" strokeWidth={2} name="New Students" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Faculty Workload Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Faculty Workload Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={facultyWorkload} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                {facultyWorkload.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DepartmentAnalytics;
