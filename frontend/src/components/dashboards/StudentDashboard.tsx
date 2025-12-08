import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  BookOpen,
  Award,
  FileText,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [statsRes, notificationsRes, eventsRes] = await Promise.all([
          fetch(`http://localhost/php/api/get_student_dashboard_data.php?user_id=${user.id}`),
          fetch(`http://localhost/php/api/notifications.php?user_id=${user.id}`),
          fetch('http://localhost/php/api/calendar/get_events.php')
        ]);

        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data);
        } else {
          setError("Failed to fetch stats");
        }

        if (notificationsRes.ok) {
          const data = await notificationsRes.json();
          setRecentActivities(data.data || []);
        } else {
          setError("Failed to fetch notifications");
        }

        if (eventsRes.ok) {
          const data = await eventsRes.json();
          setUpcomingEvents(data.events || []);
        } else {
          setError("Failed toetch events");
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const statItems = [
    {
      title: 'Current CGPA',
      value: stats?.cgpa || '9.2',
      change: '+0.2',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Fees',
      value: stats?.pending_fees || 'N/A',
      change: 'Due: Jan 15',
      changeType: 'warning',
      icon: CreditCard,
      color: 'bg-orange-500'
    },
    {
      title: 'Credits Earned',
      value: stats?.credits_earned || 'N/A',
      change: '70% Complete',
      changeType: 'positive',
      icon: Award,
      color: 'bg-blue-500'
    },
    {
      title: 'Attendance',
      value: stats?.attendance || 'N/A',
      change: 'Good Standing',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-green-500'
    }
  ];

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Here's what's happening with your academic journey today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, index) => {
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
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.message}</p>
                </div>
                <span className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className={`text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                <p className="text-xs text-gray-600">{new Date(event.start).toLocaleDateString()}</p>
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
            { label: 'Pay Fees', icon: CreditCard, color: 'bg-blue-500' },
            { label: 'View Marks', icon: TrendingUp, color: 'bg-green-500' },
            { label: 'Download Books', icon: BookOpen, color: 'bg-purple-500' },
            { label: 'Request Document', icon: FileText, color: 'bg-orange-500' },
            { label: 'Apply Scholarship', icon: Award, color: 'bg-red-500' },
            { label: 'Academic Calendar', icon: Calendar, color: 'bg-indigo-500' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
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

export default StudentDashboard;