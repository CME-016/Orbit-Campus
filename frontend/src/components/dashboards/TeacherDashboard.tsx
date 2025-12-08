import React from 'react';
import {
  Users,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Calendar,
  Mail,
  Award,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const stats = [
    {
      title: 'Total Students',
      value: '156',
      change: '3 subjects',
      changeType: 'neutral',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Evaluations',
      value: '23',
      change: 'Due this week',
      changeType: 'warning',
      icon: ClipboardCheck,
      color: 'bg-orange-500'
    },
    {
      title: 'Class Average',
      value: '7.8',
      change: '+0.5 from last sem',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Office Hours',
      value: '12',
      change: 'This week',
      changeType: 'neutral',
      icon: Clock,
      color: 'bg-purple-500'
    }
  ];

  const classes = [
    {
      subject: 'Data Structures',
      code: 'CS201',
      students: 45,
      time: '9:00 AM - 10:30 AM',
      room: 'Room 301',
      attendance: 89
    },
    {
      subject: 'Algorithms',
      code: 'CS301',
      students: 38,
      time: '11:00 AM - 12:30 PM',
      room: 'Room 205',
      attendance: 92
    },
    {
      subject: 'Database Systems',
      code: 'CS401',
      students: 73,
      time: '2:00 PM - 3:30 PM',
      room: 'Room 401',
      attendance: 85
    }
  ];

  const recentActivities = [
    {
      title: 'Assignment Graded',
      description: 'Data Structures - Assignment 3',
      time: '2 hours ago',
      type: 'success'
    },
    {
      title: 'Attendance Marked',
      description: 'Algorithms - Morning session',
      time: '4 hours ago',
      type: 'info'
    },
    {
      title: 'Email Sent',
      description: 'Class announcement to CS201 students',
      time: '1 day ago',
      type: 'info'
    },
    {
      title: 'Marks Updated',
      description: 'Database Systems - Mid-term results',
      time: '2 days ago',
      type: 'success'
    },
    {
      title: 'Office Hours',
      description: '3 students attended consultation',
      time: '3 days ago',
      type: 'info'
    }
  ];

  const upcomingClasses = [
    {
      time: '9:00 AM',
      subject: 'Data Structures',
      room: 'Room 301',
      students: 45
    },
    {
      time: '11:00 AM',
      subject: 'Algorithms',
      room: 'Room 205',
      students: 38
    },
    {
      time: '2:00 PM',
      subject: 'Database Systems',
      room: 'Room 401',
      students: 73
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'attendance':
        alert('Opening attendance marking interface...');
        break;
      case 'marks':
        alert('Opening marks upload interface...');
        break;
      case 'email':
        const subject = prompt('Enter email subject:');
        if (subject) {
          alert('Email composer opened!');
        }
        break;
      case 'schedule':
        alert('Opening class schedule...');
        break;
      case 'reports':
        alert('Generating student reports...');
        break;
      case 'materials':
        alert('Opening course materials...');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Good morning, {user?.name}!</h1>
        <p className="text-green-100">Ready to inspire minds today? Here's your teaching overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'warning' ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Classes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Classes</h2>
          <div className="space-y-4">
            {classes.map((cls, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cls.subject}</h3>
                    <p className="text-sm text-gray-600">{cls.code}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {cls.students} students
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">Time</p>
                    <p>{cls.time}</p>
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{cls.room}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Attendance:</span>
                    <span className={`text-sm font-medium ${
                      cls.attendance >= 90 ? 'text-green-600' :
                      cls.attendance >= 80 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {cls.attendance}%
                    </span>
                  </div>
                  <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-16 text-center">
                  <span className="text-sm font-medium text-green-600">{cls.time}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{cls.subject}</p>
                  <p className="text-xs text-gray-600">{cls.room} • {cls.students} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Mark Attendance', icon: ClipboardCheck, color: 'bg-green-500', action: 'attendance' },
            { label: 'Upload Marks', icon: TrendingUp, color: 'bg-blue-500', action: 'marks' },
            { label: 'Send Email', icon: Mail, color: 'bg-purple-500', action: 'email' },
            { label: 'Class Schedule', icon: Calendar, color: 'bg-orange-500', action: 'schedule' },
            { label: 'Student Reports', icon: Users, color: 'bg-red-500', action: 'reports' },
            { label: 'Course Materials', icon: BookOpen, color: 'bg-indigo-500', action: 'materials' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className={`p-3 rounded-full ${action.color} mb-2`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
