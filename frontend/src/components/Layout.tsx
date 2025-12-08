import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import NotificationBell from './common/NotificationBell';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  GraduationCap,
  Home,
  CreditCard,
  BookOpen,
  FileText,
  Mail,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  Users,
  Calendar,
  BarChart3,
  UserCheck,
  ClipboardList,
  Award,
  Download,
  MessageSquare,
  Clock,
  MapPin,
  DollarSign,
  TrendingUp,
  Shield,
  Lock,
  Key
} from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: Home },
      { id: 'notifications', path: '/notifications', label: 'Notifications', icon: Bell },
      { id: 'email', path: '/email', label: 'Campus Email', icon: Mail },
      { id: 'profile', path: '/profile', label: 'Profile', icon: Settings }
    ];

    const roleSpecificItems = {
      student: [
        { id: 'fees', path: '/student/fees', label: 'Fee Management', icon: CreditCard },
        { id: 'academics', path: '/student/academics', label: 'Academic Records', icon: TrendingUp },
        { id: 'materials', path: '/student/materials', label: 'Study Materials', icon: BookOpen },
        { id: 'documents', path: '/student/documents', label: 'Document Requests', icon: FileText },
        { id: 'scholarships', path: '/student/scholarships', label: 'Scholarships', icon: Award },
        { id: 'timetable', path: '/student/timetable', label: 'Time Table', icon: Calendar },
        { id: 'chatbot', path: '/student/chatbot', label: 'Academic Support', icon: MessageSquare }
      ],
      teacher: [
        { id: 'my-class', path: '/teacher/my-class', label: 'My Class', icon: Lock },
        { id: 'students', path: '/teacher/students', label: 'My Students', icon: Users },
        { id: 'marks', path: '/teacher/marks', label: 'Marks', icon: UserCheck },
        { id: 'grading', path: '/teacher/grading', label: 'Submit Grades', icon: Award },
        { id: 'attendance', path: '/teacher/attendance', label: 'Attendance', icon: UserCheck },
        { id: 'materials', path: '/teacher/materials', label: 'Course Materials', icon: BookOpen },
        { id: 'schedule', path: '/teacher/schedule', label: 'Class Schedule', icon: Calendar },
        { id: 'payroll', path: '/teacher/payroll', label: 'Payroll', icon: DollarSign },
        { id: 'documents', path: '/teacher/documents', label: 'Documents', icon: FileText }
      ],
      staff: [
        { id: 'tasks', path: '/staff/tasks', label: 'My Tasks', icon: ClipboardList },
        { id: 'attendance', path: '/staff/attendance', label: 'Attendance', icon: UserCheck },
        { id: 'leave', path: '/staff/leave', label: 'Leave Management', icon: Calendar },
        { id: 'payroll', path: '/staff/payroll', label: 'Payroll', icon: DollarSign },
        { id: 'location', path: '/staff/locations', label: 'Work Locations', icon: MapPin },
        { id: 'documents', path: '/staff/documents', label: 'Documents', icon: FileText }
      ],
      parent: [
        { id: 'child-performance', path: '/parent/child-performance', label: 'Child Performance', icon: BarChart3 },
        { id: 'fees', path: '/parent/fees', label: 'Fee Management', icon: CreditCard },
        { id: 'communication', path: '/parent/communication', label: 'Teacher Communication', icon: MessageSquare },
        { id: 'reports', path: '/parent/reports', label: 'Progress Reports', icon: FileText },
        { id: 'ptm', path: '/parent/ptm', label: 'PTM Schedule', icon: Calendar }
      ],
      admin: [
        { id: 'users', path: '/admin/users', label: 'User Management', icon: Users },
        { id: 'analytics', path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'calendar', path: '/admin/calendar', label: 'Academic Calendar', icon: Calendar },
        { id: 'documents', path: '/admin/documents', label: 'Document Workflow', icon: FileText },
        { id: 'fees', path: '/admin/fees', label: 'Fee Management', icon: CreditCard },
        { id: 'parent-student-links', path: '/admin/parent-student-links', label: 'Parent-Student Links', icon: Users },
        { id: 'communications', path: '/admin/communications', label: 'Communications', icon: Mail },
        { id: 'security-access', path: '/admin/security-access', label: 'Security & Access', icon: Shield }
      ],
      hod: [
        { id: 'manage-teachers', path: '/hod/manage-teachers', label: 'Manage Teachers', icon: Users },
        { id: 'student-overview', path: '/hod/student-overview', label: 'Student Overview', icon: Users },
        { id: 'department-analytics', path: '/hod/department-analytics', label: 'Department Analytics', icon: BarChart3 },
        { id: 'approve-requests', path: '/hod/approve-requests', label: 'Approve Requests', icon: ClipboardList },
        { id: 'assign-class-teacher', path: '/hod/assign-class-teacher', label: 'Assign Class Teacher', icon: UserCheck },
        { id: 'manage-credentials', path: '/hod/manage-credentials', label: 'Manage Credentials', icon: Key },
        { id: 'assign-students', path: '/hod/assign-students', label: 'Assign Students', icon: UserCheck },
      ]
    };

    return [
      ...baseItems.slice(0, 1), // Dashboard first
      ...(roleSpecificItems[user?.role || 'student'] || []),
      ...baseItems.slice(1) // Rest of base items
    ];
  };

  const navigationItems = getNavigationItems();

  const getRoleColor = (role: string) => {
    const colors = {
      student: 'bg-blue-600',
      teacher: 'bg-green-600',
      staff: 'bg-purple-600',
      parent: 'bg-orange-600',
      admin: 'bg-red-600',
      hod: 'bg-amber-600'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-600';
  };

  const getRoleGradient = (role: string) => {
    const gradients = {
      student: 'from-blue-600 to-blue-800',
      teacher: 'from-green-600 to-green-800',
      staff: 'from-purple-600 to-purple-800',
      parent: 'from-orange-600 to-orange-800',
      admin: 'from-red-600 to-red-800',
      hod: 'from-amber-600 to-amber-800'
    };
    return gradients[role as keyof typeof gradients] || 'from-gray-600 to-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className={`flex items-center justify-between h-16 px-6 bg-gradient-to-r ${getRoleGradient(user?.role || '')} text-white`}>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">Campus Sphere</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col h-full px-4 py-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-6">
            <div className={`w-10 h-10 rounded-full ${getRoleColor(user?.role || '')} flex items-center justify-center text-white font-semibold`}>
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role} • {user?.department}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.id === 'dashboard' && location.pathname === '/');
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200 ${
                    isActive
                      ? `${getRoleColor(user?.role || '')} text-white shadow-md`
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={logout}
            className="flex items-center space-x-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-4"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <NotificationBell />
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-medium">Live</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.studentId || user?.employeeId || user?.childId}</p>
            </div>
            <div className={`w-8 h-8 rounded-full ${getRoleColor(user?.role || '')} flex items-center justify-center text-white font-semibold text-sm`}>
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
