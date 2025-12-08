
import React, { useState, useMemo } from 'react';
import { Send, Paperclip, User } from 'lucide-react';

// --- DYNAMIC MOCK DATA ---

interface Teacher {
  id: number;
  name: string;
  subject: string;
  avatar: string;
}

interface Message {
  id: number;
  sender: 'parent' | 'teacher';
  text: string;
  timestamp: string; 
}

interface Conversation {
  teacherId: number;
  messages: Message[];
}

const mockTeachers: Teacher[] = [
  { id: 1, name: 'Bindhu', subject: 'Mathematics', avatar: 'B' },
  { id: 2, name: 'Padmaja', subject: 'Science', avatar: 'P' },
  { id: 3, name: 'Sridevi', subject: 'History', avatar: 'S' },
  { id: 4, name: 'P.V.L.Narayana', subject: 'English', avatar: 'N' },
];

const mockConversations: Conversation[] = [
  {
    teacherId: 1,
    messages: [
      { id: 1, sender: 'teacher', text: 'Hi, just a reminder about the math test on Friday.', timestamp: '2024-05-20T10:00:00Z' },
      { id: 2, sender: 'parent', text: 'Thanks for the reminder! Will Anaya need a special calculator?', timestamp: '2024-05-20T11:30:00Z' },
      { id: 3, sender: 'teacher', text: 'No, a standard scientific calculator will be sufficient.', timestamp: '2024-05-20T11:35:00Z' },
    ],
  },
  {
    teacherId: 2,
    messages: [
      { id: 1, sender: 'teacher', text: 'Anaya did a great job on her science project!', timestamp: '2024-05-19T14:00:00Z' },
    ],
  },
];

const TeacherCommunication: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number>(mockTeachers[0].id);
  const [newMessage, setNewMessage] = useState('');

  const selectedTeacher = mockTeachers.find(t => t.id === selectedTeacherId);

  const activeConversation = useMemo(() => {
    return conversations.find(c => c.teacherId === selectedTeacherId);
  }, [conversations, selectedTeacherId]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedTeacherId) {
      const message: Message = {
        id: Date.now(),
        sender: 'parent',
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      const updatedConversations = [...conversations];
      const conversationIndex = updatedConversations.findIndex(c => c.teacherId === selectedTeacherId);

      if (conversationIndex > -1) {
        updatedConversations[conversationIndex].messages.push(message);
      } else {
        updatedConversations.push({ teacherId: selectedTeacherId, messages: [message] });
      }

      setConversations(updatedConversations);
      setNewMessage('');
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col p-4 font-sans">
        <header className="mb-4">
             <h1 className="text-3xl font-bold text-gray-800">Teacher Communication</h1>
        </header>
        <div className="flex-1 flex bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Teacher List Sidebar */}
        <aside className="w-1/3 border-r border-gray-200 bg-gray-50/50">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">Teachers</h2>
          </div>
          <ul className="overflow-y-auto h-full p-2">
            {mockTeachers.map(teacher => (
              <li key={teacher.id}>
                <button 
                  onClick={() => setSelectedTeacherId(teacher.id)} 
                  className={`w-full text-left p-4 rounded-xl flex items-center space-x-4 transition-colors ${
                    selectedTeacherId === teacher.id ? 'bg-orange-600 text-white shadow' : 'hover:bg-gray-200'
                  }`}>
                  <div className={`w-12 h-12 rounded-full ${selectedTeacherId === teacher.id ? 'bg-orange-500' : 'bg-gray-300'} flex-shrink-0 flex items-center justify-center font-bold text-lg text-white`}>
                      {teacher.avatar}
                  </div>
                  <div>
                      <p className="font-bold text-base">{teacher.name}</p>
                      <p className={`text-sm ${selectedTeacherId === teacher.id ? 'text-orange-100' : 'text-gray-500'}`}>{teacher.subject}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat Area */}
        <main className="w-2/3 flex flex-col">
          {selectedTeacher && (
            <>
              {/* Chat Header */}
              <header className="p-4 border-b border-gray-200 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center font-bold text-lg text-white">{selectedTeacher.avatar}</div>
                  <div>
                      <h2 className="text-xl font-bold text-gray-800">{selectedTeacher.name}</h2>
                      <p className="text-sm text-gray-500">{selectedTeacher.subject}</p>
                  </div>
              </header>

              {/* 2. Messages Display with new colors */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-100/30">
                {activeConversation?.messages.map(message => (
                  <div key={message.id} className={`flex items-end gap-3 ${message.sender === 'parent' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full ${message.sender === 'teacher' ? 'bg-orange-600' : 'bg-blue-600'} text-white flex items-center justify-center font-bold text-sm`}>
                        {message.sender === 'teacher' ? selectedTeacher.avatar.slice(0,1) : <User size={16}/>}
                    </div>
                    <div className={`p-4 rounded-2xl max-w-md ${message.sender === 'teacher' ? 'bg-orange-600 text-white' : 'bg-blue-600 text-white'}`}>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === 'teacher' ? 'text-orange-100' : 'text-blue-100'} text-right`}>{formatTimestamp(message.timestamp)}</p>
                    </div>
                  </div>
                ))}
                {!activeConversation && <div className='text-center text-gray-500'>No messages yet. Start the conversation!</div>}
              </div>

              {/* Message Input */}
              <footer className="p-4 bg-white border-t border-gray-200">
                <div className="relative">
                    <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={`Message ${selectedTeacher.name}...`} 
                        className="w-full pl-5 pr-28 py-3 bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200"><Paperclip size={20} /></button>
                        <button onClick={handleSendMessage} className="p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 shadow-sm">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
              </footer>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherCommunication;
