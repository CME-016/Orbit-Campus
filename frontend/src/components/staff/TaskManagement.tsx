import React, { useState } from 'react';
import { 
  ClipboardList, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  User,
  Filter,
  Search,
  Plus,
  Eye,
  Edit
} from 'lucide-react';

const TaskManagement: React.FC = () => {
  const [tasks] = useState([
    {
      id: '1',
      title: 'Library Maintenance',
      description: 'Clean and organize library books on the second floor',
      location: 'Central Library - 2nd Floor',
      priority: 'high',
      status: 'in_progress',
      assignedDate: new Date('2024-01-10'),
      dueDate: new Date('2024-01-15'),
      completedDate: null,
      assignedBy: 'Library Head',
      estimatedHours: 8,
      actualHours: 5,
      category: 'maintenance'
    },
    {
      id: '2',
      title: 'AC Repair - Room 301',
      description: 'Fix air conditioning unit in Computer Science classroom',
      location: 'Computer Science Block - Room 301',
      priority: 'medium',
      status: 'pending',
      assignedDate: new Date('2024-01-12'),
      dueDate: new Date('2024-01-16'),
      completedDate: null,
      assignedBy: 'Facilities Manager',
      estimatedHours: 4,
      actualHours: 0,
      category: 'repair'
    },
    {
      id: '3',
      title: 'Garden Maintenance',
      description: 'Trim bushes and water plants in the main campus garden',
      location: 'Main Campus Grounds',
      priority: 'low',
      status: 'completed',
      assignedDate: new Date('2024-01-08'),
      dueDate: new Date('2024-01-12'),
      completedDate: new Date('2024-01-11'),
      assignedBy: 'Grounds Supervisor',
      estimatedHours: 6,
      actualHours: 5.5,
      category: 'maintenance'
    },
    {
      id: '4',
      title: 'Equipment Setup - Lab 205',
      description: 'Install new computers and network equipment',
      location: 'Electronics Lab 205',
      priority: 'high',
      status: 'pending',
      assignedDate: new Date('2024-01-13'),
      dueDate: new Date('2024-01-17'),
      completedDate: null,
      assignedBy: 'IT Manager',
      estimatedHours: 12,
      actualHours: 0,
      category: 'installation'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    if (filter !== 'all') {
      filtered = filtered.filter(task => task.status === filter);
    }
    
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'maintenance':
        return 'bg-blue-100 text-blue-700';
      case 'repair':
        return 'bg-red-100 text-red-700';
      case 'installation':
        return 'bg-purple-100 text-purple-700';
      case 'cleaning':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewTask = (taskId: string) => {
    console.log('Viewing task:', taskId);
    alert('Task details would open here');
  };

  const handleUpdateStatus = (taskId: string, newStatus: string) => {
    console.log('Updating task status:', taskId, newStatus);
    
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: newStatus as any,
              completedDate: newStatus === 'completed' ? new Date() : null,
              actualHours: newStatus === 'completed' ? task.estimatedHours : task.actualHours
            }
          : task
      )
    );
    
    alert(`Task status updated to ${newStatus.replace('_', ' ')}`);
  };

  const handleReportIssue = () => {
    const issue = prompt('Describe the issue you want to report:');
    if (issue) {
      console.log('Reporting issue:', issue);
      alert('Issue reported successfully. Your supervisor will be notified.');
    }
  };

  const handleRequestLeave = () => {
    const reason = prompt('Enter reason for leave request:');
    if (reason) {
      console.log('Leave request:', reason);
      alert('Leave request submitted successfully. You will receive a notification once reviewed.');
    }
  };

  const handleMarkAttendance = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log('Marking attendance at:', timeString);
    alert(`Attendance marked successfully at ${timeString}`);
  };

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.status === 'overdue').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">My Tasks</h1>
        <p className="text-purple-100">Manage your assigned tasks, track progress, and update completion status.</p>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{taskStats.total}</p>
            <p className="text-sm text-gray-600">Total Tasks</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{taskStats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{taskStats.overdue}</p>
            <p className="text-sm text-gray-600">Overdue</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-gray-400" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {getFilteredTasks().map((task) => (
          <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(task.category)}`}>
                    {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{task.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{task.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Assigned by: {task.assignedBy}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Due: {task.dueDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {task.actualHours}h / {task.estimatedHours}h
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(task.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewTask(task.id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  
                  {task.status !== 'completed' && (
                    <div className="relative">
                      <select
                        onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                        className="appearance-none bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>Update Status</option>
                        {task.status === 'pending' && <option value="in_progress">Start Task</option>}
                        {task.status === 'in_progress' && <option value="completed">Mark Complete</option>}
                        <option value="pending">Mark Pending</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Math.round((task.actualHours / task.estimatedHours) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    task.status === 'completed' ? 'bg-green-600' :
                    task.status === 'in_progress' ? 'bg-blue-600' : 'bg-gray-400'
                  }`}
                  style={{ 
                    width: `${Math.min((task.actualHours / task.estimatedHours) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getFilteredTasks().length === 0 && (
        <div className="text-center py-12">
          <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No tasks found matching your criteria</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            onClick={handleMarkAttendance}
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Mark Attendance</div>
              <div className="text-xs text-gray-500">Check in for today</div>
            </div>
          </button>
            onClick={handleReportIssue}

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Report Issue</div>
              <div className="text-xs text-gray-500">Report equipment problems</div>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            onClick={handleRequestLeave}
            <Calendar className="h-6 w-6 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Request Leave</div>
              <div className="text-xs text-gray-500">Apply for time off</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;