import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  Calculator, 
  Calendar, 
  HelpCircle,
  Lightbulb,
  Clock,
  X
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AcademicChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Academic Support Assistant. I can help you with:\n\n• Course information and schedules\n• Assignment deadlines and requirements\n• Study tips and resources\n• Academic policies and procedures\n• Fee and scholarship information\n\nHow can I assist you today?',
      timestamp: new Date(),
      suggestions: ['Show my assignments', 'Calculate my CGPA', 'Upcoming deadlines', 'Study tips']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    if (message.includes('assignment') || message.includes('homework')) {
      response = 'Here are your upcoming assignments:\n\n📚 Data Structures - Assignment 3\nDue: January 20, 2024\nStatus: In Progress\n\n💻 Database Systems - Project Report\nDue: January 25, 2024\nStatus: Not Started\n\n🔬 Computer Networks - Lab Report\nDue: January 22, 2024\nStatus: Submitted\n\nWould you like more details about any specific assignment?';
      suggestions = ['Assignment details', 'Extension request', 'Submission guidelines'];
    } else if (message.includes('cgpa') || message.includes('gpa') || message.includes('grade')) {
      response = 'Your current academic performance:\n\n🎯 Current CGPA: 8.4/10.0\n📊 Current SGPA: 8.2/10.0\n🏆 Class Rank: 8/45\n📈 Trend: Improving (+0.2 from last semester)\n\nSubject-wise performance:\n• Data Structures: A (85/100)\n• Computer Networks: B+ (78/100)\n• Database Systems: A+ (92/100)\n• Software Engineering: A- (81/100)\n\nKeep up the great work!';
      suggestions = ['Detailed transcript', 'Grade improvement tips', 'Subject analysis'];
    } else if (message.includes('deadline') || message.includes('due')) {
      response = 'Your upcoming deadlines:\n\n⏰ This Week:\n• Data Structures Assignment - Jan 20\n• Computer Networks Lab - Jan 22\n\n📅 Next Week:\n• Database Project Report - Jan 25\n• Software Engineering Quiz - Jan 27\n\n🗓️ This Month:\n• Mid-term Exams - Jan 29-Feb 2\n• Fee Payment - Jan 30\n\nWould you like me to set reminders for any of these?';
      suggestions = ['Set reminders', 'Exam schedule', 'Study plan'];
    } else if (message.includes('study') || message.includes('tip') || message.includes('help')) {
      response = 'Here are some effective study tips:\n\n📖 Active Learning:\n• Take notes by hand\n• Teach concepts to others\n• Create mind maps\n\n⏰ Time Management:\n• Use Pomodoro Technique (25min focus + 5min break)\n• Prioritize difficult subjects\n• Start assignments early\n\n🧠 Memory Techniques:\n• Spaced repetition\n• Practice problems daily\n• Form study groups\n\n💡 Exam Preparation:\n• Review past papers\n• Create summary sheets\n• Get adequate sleep\n\nWhich subject would you like specific study tips for?';
      suggestions = ['Data Structures tips', 'Database study guide', 'Exam strategies'];
    } else if (message.includes('fee') || message.includes('payment') || message.includes('scholarship')) {
      response = 'Your financial information:\n\n💰 Fee Status:\n• Total Fees: ₹72,000\n• Paid: ₹47,000\n• Pending: ₹25,000\n• Due Date: January 15, 2024\n\n🏆 Scholarships:\n• Merit Scholarship: ₹25,000 (Approved)\n• Sports Excellence: ₹15,000 (Under Review)\n\n💳 Payment Options:\n• Online payment portal\n• Bank transfer\n• Campus payment center\n\nWould you like help with payment or scholarship applications?';
      suggestions = ['Pay fees online', 'Scholarship status', 'Payment history'];
    } else if (message.includes('schedule') || message.includes('timetable') || message.includes('class')) {
      response = 'Your class schedule for today:\n\n🕘 9:00 AM - 10:30 AM\nData Structures (CS201)\nRoom 301, Dr. Sarah Wilson\n\n🕚 11:00 AM - 12:30 PM\nComputer Networks (CS301)\nRoom 205, Prof. Michael Brown\n\n🕐 1:30 PM - 3:00 PM\nDatabase Systems (CS401)\nRoom 401, Dr. Lisa Wang\n\n🕒 3:30 PM - 5:00 PM\nSoftware Engineering Lab\nLab 501, Prof. David Chen\n\nNext class starts in 45 minutes. Need directions to any classroom?';
      suggestions = ['Room directions', 'Weekly schedule', 'Teacher contact'];
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      response = 'Hello! Great to see you again! 👋\n\nI\'m here to help with all your academic needs. Whether you need information about assignments, grades, schedules, or just some study tips, I\'ve got you covered!\n\nWhat would you like to know today?';
      suggestions = ['My assignments', 'Grade status', 'Today\'s schedule', 'Study help'];
    } else {
      response = 'I understand you\'re asking about "' + userMessage + '". Let me help you with that!\n\nI can assist you with:\n\n📚 Academic Information:\n• Assignments and deadlines\n• Grades and CGPA calculation\n• Class schedules and timetables\n\n💡 Study Support:\n• Study tips and techniques\n• Exam preparation strategies\n• Subject-specific guidance\n\n💰 Administrative Help:\n• Fee payment information\n• Scholarship applications\n• Document requests\n\nCould you please be more specific about what you\'d like to know?';
      suggestions = ['Show assignments', 'Calculate CGPA', 'Study tips', 'Fee information'];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: 'My Assignments', icon: BookOpen, query: 'Show my assignments' },
    { label: 'Calculate CGPA', icon: Calculator, query: 'Calculate my CGPA' },
    { label: 'Class Schedule', icon: Calendar, query: 'Show my class schedule' },
    { label: 'Study Tips', icon: Lightbulb, query: 'Give me study tips' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Academic Support Assistant</h1>
            <p className="text-purple-100">Get instant help with assignments, grades, schedules, and study guidance.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(action.query)}
                    className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Icon className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <HelpCircle className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Need Help?</span>
              </div>
              <p className="text-xs text-purple-700">
                Ask me anything about your academics, assignments, grades, or study tips!
              </p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Academic Assistant</h3>
                  <p className="text-xs text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Bot className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {messages.length > 0 && messages[messages.length - 1].suggestions && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your academics..."
                    className="w-full resize-none border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={1}
                    style={{ minHeight: '40px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicChatbot;