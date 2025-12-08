import React, { useState } from 'react';
import { mockEmails } from '../../data/mockData';
import { 
  Mail,
  Inbox,
  Send,
  Edit,
  Trash2,
  Star,
  Search,
  Filter,
  Plus,
  Reply,
  Forward,
  MoreHorizontal,
  Paperclip,
  X
} from 'lucide-react';

const CampusEmail: React.FC = () => {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedFolder, setSelectedFolder] = useState<'inbox' | 'sent' | 'drafts' | 'trash'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmail, setNewEmail] = useState({
    to: '',
    cc: '',
    subject: '',
    body: ''
  });

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: emails.filter(e => e.folder === 'inbox').length },
    { id: 'sent', label: 'Sent', icon: Send, count: emails.filter(e => e.folder === 'sent').length },
    { id: 'drafts', label: 'Drafts', icon: Edit, count: emails.filter(e => e.folder === 'drafts').length },
    { id: 'trash', label: 'Trash', icon: Trash2, count: emails.filter(e => e.folder === 'trash').length }
  ];

  const getFilteredEmails = () => {
    let filtered = emails.filter(email => email.folder === selectedFolder);
    
    if (searchTerm) {
      filtered = filtered.filter(email => 
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const handleSendEmail = () => {
    if (!newEmail.to.trim() || !newEmail.subject.trim()) {
      alert('Please fill in recipient and subject fields');
      return;
    }
    
    const email = {
      id: (emails.length + 1).toString(),
      from: 'john.doe@campus.edu', // Current user
      to: newEmail.to.split(',').map(email => email.trim()),
      cc: newEmail.cc ? newEmail.cc.split(',').map(email => email.trim()) : [],
      subject: newEmail.subject,
      body: newEmail.body,
      timestamp: new Date(),
      read: true,
      folder: 'sent' as const
    };

    setEmails([...emails, email]);
    setNewEmail({ to: '', cc: '', subject: '', body: '' });
    setShowCompose(false);
    alert('Email sent successfully!');
  };

  const handleMarkAsRead = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, read: true } : email
    ));
  };

  const handleDeleteEmail = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, folder: 'trash' } : email
    ));
    setSelectedEmail(null);
  };

  const handleStarEmail = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, starred: !email.starred } : email
    ));
  };

  const unreadCount = emails.filter(e => e.folder === 'inbox' && !e.read).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Campus Email</h1>
            <p className="text-blue-100">Secure communication within the campus community.</p>
          </div>
          <button
            onClick={() => setShowCompose(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Compose</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-2">
              {folders.map((folder) => {
                const Icon = folder.icon;
                return (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors ${
                      selectedFolder === folder.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{folder.label}</span>
                    </div>
                    {folder.count > 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedFolder === folder.id ? 'bg-blue-200' : 'bg-gray-200'
                      }`}>
                        {folder.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {unreadCount > 0 && (
              <div className="mt-6 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="text-sm font-medium text-orange-800">
                  {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {selectedEmail ? (
            /* Email Detail View */
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <button
                        onClick={() => setSelectedEmail(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ←
                      </button>
                      <h2 className="text-lg font-semibold text-gray-900">{selectedEmail.subject}</h2>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>From: {selectedEmail.from}</div>
                      <div>To: {selectedEmail.to.join(', ')}</div>
                      {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                        <div>CC: {selectedEmail.cc.join(', ')}</div>
                      )}
                      <div>Date: {selectedEmail.timestamp.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStarEmail(selectedEmail.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        selectedEmail.starred ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEmail(selectedEmail.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedEmail.body}</p>
                </div>

                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Paperclip className="h-4 w-4" />
                      <span>Attachments ({selectedEmail.attachments.length})</span>
                    </div>
                    <div className="space-y-1">
                      {selectedEmail.attachments.map((attachment: string, index: number) => (
                        <div key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                          {attachment}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Reply className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Forward className="h-4 w-4" />
                    <span>Forward</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Email List View */
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 capitalize">{selectedFolder}</h2>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search emails..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {getFilteredEmails().map((email) => (
                  <div
                    key={email.id}
                    onClick={() => {
                      setSelectedEmail(email);
                      if (!email.read) {
                        handleMarkAsRead(email.id);
                      }
                    }}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !email.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <div className={`font-medium ${!email.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {selectedFolder === 'sent' ? `To: ${email.to[0]}` : `From: ${email.from}`}
                          </div>
                          {email.starred && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                          {!email.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <div className={`text-sm mb-1 truncate ${!email.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                          {email.subject}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {email.body.substring(0, 100)}...
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 ml-4">
                        {email.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {getFilteredEmails().length === 0 && (
                <div className="text-center py-12">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No emails in {selectedFolder}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Compose Email</h2>
              <button
                onClick={() => setShowCompose(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  value={newEmail.to}
                  onChange={(e) => setNewEmail({...newEmail, to: e.target.value})}
                  placeholder="recipient@campus.edu"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CC (optional)</label>
                <input
                  type="email"
                  value={newEmail.cc}
                  onChange={(e) => setNewEmail({...newEmail, cc: e.target.value})}
                  placeholder="cc@campus.edu"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newEmail.subject}
                  onChange={(e) => setNewEmail({...newEmail, subject: e.target.value})}
                  placeholder="Email subject"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newEmail.body}
                  onChange={(e) => setNewEmail({...newEmail, body: e.target.value})}
                  placeholder="Type your message here..."
                  rows={8}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handleSendEmail}
                  disabled={!newEmail.to || !newEmail.subject}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={() => setShowCompose(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusEmail;