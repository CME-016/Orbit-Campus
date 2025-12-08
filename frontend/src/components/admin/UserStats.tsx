import React from 'react';
import { Users, GraduationCap, Briefcase, User } from 'lucide-react';

const UserStats: React.FC = () => {
  const stats = [
    { title: 'Total Users', count: 7, icon: <Users size={28} />, color: 'bg-blue-500' },
    { title: 'Students', count: 3, icon: <GraduationCap size={28} />, color: 'bg-green-500' },
    { title: 'Teachers', count: 1, icon: <Briefcase size={28} />, color: 'bg-purple-500' },
    { title: 'Staff', count: 1, icon: <User size={28} />, color: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
          </div>
          <div className={`p-4 rounded-full text-white ${stat.color}`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
