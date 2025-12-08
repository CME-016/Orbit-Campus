
import React, { useState } from 'react';
import { Send, MessageSquare, Users, GraduationCap, Briefcase } from 'lucide-react';

const mockAnnouncements = [
  {
    id: 1,
    title: 'Upcoming Holiday Schedule',
    content: 'Please be advised that the campus will be closed for the upcoming public holiday on Friday. All classes and administrative activities will be suspended.',
    recipients: 'All',
    date: '2024-07-28',
  },
  {
    id: 2,
    title: 'Final Exam Timetable Released',
    content: 'The final examination timetable for the current semester is now available on the student portal. Please review your schedules and report any clashes immediately.',
    recipients: 'Students',
    date: '2024-07-27',
  },
  {
    id: 3,
    title: 'Faculty Development Workshop',
    content: 'A mandatory faculty development workshop on modern teaching methodologies will be held next Monday. All teaching staff are required to attend.',
    recipients: 'Teachers',
    date: '2024-07-26',
  },
  {
    id: 4,
    title: 'Parent-Teacher Meeting Invitation',
    content: 'We invite all parents to the scheduled Parent-Teacher Meeting this Saturday to discuss your child’s academic progress and overall development.',
    recipients: 'Parents',
    date: '2024-07-25',
  },
];

const Communications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredAnnouncements = mockAnnouncements.filter(announcement => activeTab === 'All' || announcement.recipients === activeTab);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Communications Hub</h1>
        <p className="text-lg text-gray-600 mt-1">Send and manage announcements for all campus members.</p>
      </header>

      {/* Announcement Composer */}
      <div className="mb-10 bg-white p-6 rounded-2xl shadow-md border">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Announcement</h2>
        <textarea
          placeholder="What’s on your mind? Broadcast a message to the campus..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-28 focus:ring-2 focus:ring-red-500"
        />
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">To: All</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">To: Students</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">To: Teachers</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">To: Parents</button>
          </div>
          <button className="bg-red-600 text-white font-medium py-2.5 px-6 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors">
            <Send size={18} />
            <span>Send Announcement</span>
          </button>
        </div>
      </div>

      {/* Sent Announcements */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sent Announcements</h2>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button onClick={() => setActiveTab('All')} className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${activeTab === 'All' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500'}`}>
            <MessageSquare size={16} />
            <span>All</span>
          </button>
          <button onClick={() => setActiveTab('Students')} className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${activeTab === 'Students' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500'}`}>
            <GraduationCap size={16} />
            <span>Students</span>
          </button>
          <button onClick={() => setActiveTab('Teachers')} className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${activeTab === 'Teachers' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500'}`}>
            <Briefcase size={16} />
            <span>Teachers</span>
          </button>
          <button onClick={() => setActiveTab('Parents')} className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${activeTab === 'Parents' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500'}`}>
            <Users size={16} />
            <span>Parents</span>
          </button>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map(announcement => (
            <div key={announcement.id} className="bg-white p-5 rounded-xl shadow-md border transition-shadow hover:shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg text-gray-800">{announcement.title}</p>
                  <p className="text-sm text-gray-500">To: {announcement.recipients} • {announcement.date}</p>
                </div>
              </div>
              <p className="mt-3 text-gray-700">{announcement.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communications;
