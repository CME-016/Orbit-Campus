
import React, { useState } from 'react';
import { CheckSquare, Square, Filter, ChevronDown, PlusCircle } from 'lucide-react';

// Mock data for staff tasks
const mockTasks = [
  { id: 1, description: 'Process pending admission applications', department: 'Admissions', priority: 'High', completed: false, dueDate: '2024-08-10' },
  { id: 2, description: 'Compile monthly financial summary for July', department: 'Finance', priority: 'High', completed: true, dueDate: '2024-08-05' },
  { id: 3, description: 'Update IT inventory list', department: 'IT', priority: 'Medium', completed: false, dueDate: '2024-08-15' },
  { id: 4, description: 'Organize files for the upcoming audit', department: 'Administration', priority: 'Low', completed: false, dueDate: '2024-09-01' },
  { id: 5, description: 'Respond to support tickets in the helpdesk queue', department: 'IT', priority: 'Medium', completed: true, dueDate: '2024-08-01' },
];

const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800',
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState('All');

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const filteredTasks = tasks.filter(task => {
      if (filter === 'All') return true;
      if (filter === 'Completed') return task.completed;
      if (filter === 'Pending') return !task.completed;
      return true;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
        <button className="flex items-center space-x-2 px-4 py-2 mt-4 md:mt-0 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700">
            <PlusCircle className="h-5 w-5" />
            <span>Add New Task</span>
          </button>
      </div>

        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-end">
            <div className="relative">
                <select onChange={(e) => setFilter(e.target.value)} className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-full focus:outline-none">
                    <option>All</option>
                    <option>Completed</option>
                    <option>Pending</option>
                </select>
                 <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
        </div>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className={`bg-white p-5 rounded-lg shadow-sm flex items-start space-x-4 border-l-4 ${task.completed ? 'border-gray-300' : 'border-purple-500'}`}>
             <button onClick={() => toggleTaskCompletion(task.id)} className="flex-shrink-0 mt-1">
                {task.completed ? <CheckSquare className="h-6 w-6 text-gray-400" /> : <Square className="h-6 w-6 text-purple-600" />}
            </button>
            <div className={`flex-1 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                <p className="font-medium">{task.description}</p>
                <div className="flex items-center space-x-4 text-sm mt-2">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`}>{task.priority} Priority</span>
                    <span className="text-gray-500">Dept: {task.department}</span>
                    <span className="text-gray-500">Due: {task.dueDate}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
