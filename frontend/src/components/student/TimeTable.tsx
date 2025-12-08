import React, { useState } from 'react';
import { mockTimeTable } from '../../data/mockData';
import { 
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  User,
  Download,
  Filter,
  Grid,
  List
} from 'lucide-react';

const TimeTable: React.FC = () => {
  const [schedule] = useState(mockTimeTable);
  const [view, setView] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState('Monday');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '09:00 - 10:30',
    '11:00 - 12:30',
    '13:30 - 15:00',
    '15:30 - 17:00'
  ];

  const getClassesForDay = (day: string) => {
    return schedule.filter(item => item.day === day);
  };

  const getClassForDayAndTime = (day: string, time: string) => {
    return schedule.find(item => item.day === day && item.time === time);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'lab':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'tutorial':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTodayClasses = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return getClassesForDay(today);
  };

  const getNextClass = () => {
    const todayClasses = getTodayClasses();
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    for (const cls of todayClasses) {
      const [startTime] = cls.time.split(' - ');
      const [hours, minutes] = startTime.split(':').map(Number);
      const classTime = hours * 100 + minutes;
      
      if (classTime > currentTime) {
        return cls;
      }
    }
    return null;
  };

  const handleDownloadTimeTable = () => {
    console.log('Downloading timetable...');
    alert('Timetable download would be implemented here');
  };

  const nextClass = getNextClass();
  const todayClasses = getTodayClasses();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Class Time Table</h1>
            <p className="text-indigo-100">View your class schedule, room assignments, and daily agenda.</p>
          </div>
          <button
            onClick={handleDownloadTimeTable}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Class */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Next Class</h2>
          {nextClass ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <span className="font-medium text-gray-900">{nextClass.subject}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{nextClass.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{nextClass.room}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{nextClass.teacher}</span>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(nextClass.type)}`}>
                {nextClass.type.charAt(0).toUpperCase() + nextClass.type.slice(1)}
              </span>
            </div>
          ) : (
            <p className="text-gray-500">No more classes today</p>
          )}
        </div>

        {/* Today's Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Classes</span>
              <span className="font-semibold text-gray-900">{todayClasses.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Lectures</span>
              <span className="font-semibold text-blue-600">
                {todayClasses.filter(c => c.type === 'lecture').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Labs</span>
              <span className="font-semibold text-green-600">
                {todayClasses.filter(c => c.type === 'lab').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tutorials</span>
              <span className="font-semibold text-purple-600">
                {todayClasses.filter(c => c.type === 'tutorial').length}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Overview</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Classes/Week</span>
              <span className="font-semibold text-gray-900">{schedule.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Days</span>
              <span className="font-semibold text-gray-900">
                {[...new Set(schedule.map(s => s.day))].length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Subjects</span>
              <span className="font-semibold text-gray-900">
                {[...new Set(schedule.map(s => s.subject))].length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Teachers</span>
              <span className="font-semibold text-gray-900">
                {[...new Set(schedule.map(s => s.teacher))].length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* View Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('week')}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    view === 'week' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                  <span>Week</span>
                </button>
                <button
                  onClick={() => setView('day')}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    view === 'day' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span>Day</span>
                </button>
              </div>
            </div>

            {view === 'day' && (
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <span className={`inline-flex px-2 py-1 rounded-full bg-blue-100 text-blue-700`}>
              Lecture
            </span>
            <span className={`inline-flex px-2 py-1 rounded-full bg-green-100 text-green-700`}>
              Lab
            </span>
            <span className={`inline-flex px-2 py-1 rounded-full bg-purple-100 text-purple-700`}>
              Tutorial
            </span>
          </div>
        </div>
      </div>

      {/* Timetable Display */}
      {view === 'week' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    Time
                  </th>
                  {daysOfWeek.map(day => (
                    <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeSlots.map(time => (
                  <tr key={time}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      {time}
                    </td>
                    {daysOfWeek.map(day => {
                      const classItem = getClassForDayAndTime(day, time);
                      return (
                        <td key={`${day}-${time}`} className="px-6 py-4 text-sm">
                          {classItem ? (
                            <div className={`p-3 rounded-lg border-2 ${getTypeColor(classItem.type)}`}>
                              <div className="font-medium">{classItem.subject}</div>
                              <div className="text-xs opacity-75">{classItem.subjectCode}</div>
                              <div className="text-xs mt-1">{classItem.room}</div>
                              <div className="text-xs">{classItem.teacher}</div>
                            </div>
                          ) : (
                            <div className="h-16 flex items-center justify-center text-gray-400">
                              -
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{selectedDay} Schedule</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {getClassesForDay(selectedDay).length > 0 ? (
                getClassesForDay(selectedDay).map((classItem, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${getTypeColor(classItem.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{classItem.subject}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(classItem.type)}`}>
                            {classItem.type}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{classItem.room}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{classItem.teacher}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{classItem.subjectCode}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No classes scheduled for {selectedDay}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTable;