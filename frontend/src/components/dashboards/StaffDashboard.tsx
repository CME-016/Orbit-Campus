import React from 'react';
import {
  ClipboardList,
  MapPin,
  Clock,
  CheckCircle,
  Calendar,
  FileText,
  AlertTriangle,
  Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const stats = [
    {
      title: 'Tasks Assigned',
      value: '12',
      change: '3 pending',
      changeType: 'warning',
      icon: ClipboardList,
      color: 'bg-purple-500'
    },
    {
      title: 'Attendance Rate',
      value: '96%',
      change: 'This month',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Leave Balance',
      value: '18',
      change: 'Days remaining',
      changeType: 'neutral',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Work Hours',
      value: '8.5',
      change: 'Today',
      changeType: 'neutral',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  const currentTasks = [
    {
      id: 1,
      title: 'Library Maintenance',
      location: 'Central Library - 2nd Floor',
      priority: 'High',
      dueDate: 'Today, 3:00 PM',
      status: 'in_progress'
    },
    {
      id: 2,
      title: 'AC Repair - Room 301',
      location: 'Computer Science Block',
      priority: 'Medium',
      dueDate: 'Tomorrow, 10:00 AM',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Garden Maintenance',
      location: 'Main Campus Grounds',
      priority: 'Low',
      dueDate: 'Jan 20, 2024',
      status: 'pending'
    }
  ];

  const recentActivities = [
    {
      title: 'Task Completed',
      description: 'Electrical repair in Lab 205',
      time: '2 hours ago',
      type: 'success'
    },
    {
      title: 'Attendance Marked',
      description: 'Check-in at 9:00 AM',
      time: '6 hours ago',
      type: 'info'
    },
    {
      title: 'Leave Request',
      description: 'Applied for medical leave',
      time: '2 days ago',
      type: 'warning'
    }
  ];

  const upcomingSchedule = [
    {
      time: '9:00 AM',
      task: 'Daily Safety Inspection',
      location: 'Engineering Block',
      priority: 'high'
    },
    {
      time: '11:00 AM',
      task: 'Equipment Maintenance',
      location: 'Physics Lab',
      priority: 'medium'
    },
    {
      time: '2:00 PM',
      task: 'Cleaning Supervision',
      location: 'Administrative Building',
      priority: 'low'
    },
    {
      time: '4:00 PM',
      task: 'Security Round',
      location: 'Campus Perimeter',
      priority: 'high'
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'attendance':
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        alert(`Attendance marked successfully at ${timeString}`);
        break;
      case 'report':
        const issue = prompt('Describe the issue you want to report:');
        if (issue) {
          alert('Issue reported successfully. Your supervisor will be notified.');
        }
        break;
      case 'tasks':
        alert('Opening task management interface...');
        break;
      case 'leave':
        const reason = prompt('Enter reason for leave request:');
        if (reason) {
          alert('Leave request submitted successfully.');
        }
        break;
      case 'payslip':
        alert('Downloading latest payslip...');
        break;
      case 'supervisor':
        const message = prompt('Enter message for supervisor:');
        if (message) {
          alert('Message sent to supervisor successfully.');
        }
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-purple-100">Here's your work overview and task assignments for today.</p>
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
        {/* Current Tasks */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Tasks</h2>
          <div className="space-y-4">
            {currentTasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{task.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'High' ? 'bg-red-100 text-red-700' :
                      task.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Due: {task.dueDate}</span>
                  <button className="text-purple-600 hover:text-purple-800 font-medium">
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
            {upcomingSchedule.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-16 text-center">
                  <span className="text-sm font-medium text-purple-600">{item.time}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.task}</p>
                  <p className="text-xs text-gray-600">{item.location}</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                    item.priority === 'high' ? 'bg-red-100 text-red-700' :
                    item.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-600">{activity.description}</p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Mark Attendance', icon: CheckCircle, color: 'bg-green-500', action: 'attendance' },
            { label: 'Report Issue', icon: AlertTriangle, color: 'bg-red-500', action: 'report' },
            { label: 'View Tasks', icon: ClipboardList, color: 'bg-purple-500', action: 'tasks' },
            { label: 'Request Leave', icon: Calendar, color: 'bg-blue-500', action: 'leave' },
            { label: 'Download Payslip', icon: FileText, color: 'bg-orange-500', action: 'payslip' },
            { label: 'Contact Supervisor', icon: Users, color: 'bg-indigo-500', action: 'supervisor' }
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
export default StaffDashboard;