import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Activity,
  Award,
  BookOpen,
  AlertTriangle
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('users');

  const analyticsData = {
    overview: {
      totalUsers: 3101,
      activeUsers: 2847,
      newRegistrations: 156,
      retentionRate: 94.2
    },
    userMetrics: {
      students: { total: 2847, growth: 12.3, active: 2654 },
      teachers: { total: 156, growth: 8.7, active: 148 },
      staff: { total: 98, growth: 5.2, active: 94 },
      parents: { total: 1247, growth: 15.6, active: 1156 },
      admins: { total: 8, growth: 0, active: 8 }
    },
    academicMetrics: {
      averageCGPA: 7.8,
      passRate: 92.4,
      attendanceRate: 87.6,
      completionRate: 89.3
    },
    financialMetrics: {
      totalRevenue: 12450000,
      collectionRate: 87.2,
      pendingAmount: 2340000,
      scholarshipsPaid: 890000
    },
    systemMetrics: {
      uptime: 99.8,
      responseTime: 245,
      errorRate: 0.02,
      storageUsage: 78.4
    }
  };

  const departmentPerformance = [
    { name: 'Computer Science', students: 856, avgCGPA: 8.2, attendance: 89.5, satisfaction: 4.6 },
    { name: 'Electronics', students: 623, avgCGPA: 7.9, attendance: 87.2, satisfaction: 4.4 },
    { name: 'Mechanical', students: 734, avgCGPA: 7.6, attendance: 85.8, satisfaction: 4.2 },
    { name: 'Civil', students: 445, avgCGPA: 7.8, attendance: 88.1, satisfaction: 4.3 },
    { name: 'Chemical', students: 189, avgCGPA: 8.0, attendance: 90.2, satisfaction: 4.5 }
  ];

  const monthlyTrends = [
    { month: 'Aug', users: 2650, revenue: 10200000, cgpa: 7.6 },
    { month: 'Sep', users: 2720, revenue: 10800000, cgpa: 7.7 },
    { month: 'Oct', users: 2780, revenue: 11400000, cgpa: 7.7 },
    { month: 'Nov', users: 2820, revenue: 11900000, cgpa: 7.8 },
    { month: 'Dec', users: 2847, revenue: 12450000, cgpa: 7.8 }
  ];

  const handleExportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      timeframe,
      ...analyticsData
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${timeframe}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-purple-100">Comprehensive insights into campus operations and performance metrics.</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-white text-purple-600 px-3 py-2 rounded-lg text-sm focus:outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button
              onClick={handleExportReport}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12.3% from last month</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(analyticsData.financialMetrics.totalRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-green-600">+8.7% from last month</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average CGPA</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.academicMetrics.averageCGPA}</p>
              <p className="text-sm text-green-600">+0.2 from last semester</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.systemMetrics.uptime}%</p>
              <p className="text-sm text-green-600">Excellent performance</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trend</h2>
          <div className="space-y-4">
            {monthlyTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{trend.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{trend.users.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">users</p>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(trend.users / 3000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h2>
          <div className="space-y-4">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{dept.name}</h3>
                  <span className="text-sm text-gray-600">{dept.students} students</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">CGPA</p>
                    <p className="font-semibold text-green-600">{dept.avgCGPA}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Attendance</p>
                    <p className="font-semibold text-blue-600">{dept.attendance}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Satisfaction</p>
                    <p className="font-semibold text-purple-600">{dept.satisfaction}/5</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Breakdown</h2>
          <div className="space-y-3">
            {Object.entries(analyticsData.userMetrics).map(([role, data]) => (
              <div key={role} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 capitalize">{role}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{data.total}</p>
                  <p className={`text-xs ${data.growth > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                    {data.growth > 0 ? '+' : ''}{data.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pass Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analyticsData.academicMetrics.passRate}%` }}></div>
                </div>
                <span className="text-sm font-semibold text-green-600">{analyticsData.academicMetrics.passRate}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Attendance Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analyticsData.academicMetrics.attendanceRate}%` }}></div>
                </div>
                <span className="text-sm font-semibold text-blue-600">{analyticsData.academicMetrics.attendanceRate}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${analyticsData.academicMetrics.completionRate}%` }}></div>
                </div>
                <span className="text-sm font-semibold text-purple-600">{analyticsData.academicMetrics.completionRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Uptime</span>
              </div>
              <span className="text-sm font-semibold text-green-600">{analyticsData.systemMetrics.uptime}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600">Response Time</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">{analyticsData.systemMetrics.responseTime}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-gray-600">Error Rate</span>
              </div>
              <span className="text-sm font-semibold text-orange-600">{analyticsData.systemMetrics.errorRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">Storage Usage</span>
              </div>
              <span className="text-sm font-semibold text-purple-600">{analyticsData.systemMetrics.storageUsage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;