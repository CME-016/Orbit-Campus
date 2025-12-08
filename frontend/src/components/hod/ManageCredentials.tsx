
import React, { useState, useMemo } from 'react';
import { Key, Shield, Search, RefreshCw } from 'lucide-react';

// 1. Mock data for teacher credentials
const mockCredentials = [
  { id: 'T001', name: 'Dr. Evelyn Reed', role: 'Teacher', lastLogin: '2023-10-26 09:15 AM', twoFactor: true },
  { id: 'T002', name: 'Mr. Samuel Grant', role: 'Teacher', lastLogin: '2023-10-25 03:45 PM', twoFactor: false },
  { id: 'T003', name: 'Ms. Olivia Chen', role: 'Teacher', lastLogin: '2023-10-26 11:30 AM', twoFactor: true },
  { id: 'T004', name: 'Dr. Benjamin Carter', role: 'Senior Teacher', lastLogin: '2023-10-24 08:00 AM', twoFactor: true },
];

const ManageCredentials: React.FC = () => {
  const [credentials, setCredentials] = useState(mockCredentials);
  const [searchTerm, setSearchTerm] = useState('');

  const handleResetPassword = (teacherId: string) => {
    alert(`Password reset for teacher ${teacherId}. A temporary password has been sent.`);
    // In a real app, this would trigger a backend process
  };

  const handleToggleTwoFactor = (teacherId: string) => {
    setCredentials(credentials.map(cred => 
      cred.id === teacherId ? { ...cred, twoFactor: !cred.twoFactor } : cred
    ));
  };

  const filteredCredentials = useMemo(() => {
    return credentials.filter(cred =>
      cred.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [credentials, searchTerm]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Manage Credentials</h1>
        <p className="text-lg text-gray-600 mt-1">Oversee and secure faculty access and credentials.</p>
      </header>

      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for a teacher..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="bg-white shadow-md rounded-2xl border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Two-Factor Auth</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCredentials.map(cred => (
              <tr key={cred.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">{cred.name}</div>
                  <div className="text-sm text-gray-500">{cred.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cred.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cred.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cred.twoFactor ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {cred.twoFactor ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button 
                    onClick={() => handleResetPassword(cred.id)}
                    className="text-amber-600 hover:text-amber-800 font-semibold flex items-center space-x-1"
                  >
                    <RefreshCw size={14}/>
                    <span>Reset Password</span>
                  </button>
                   <button 
                    onClick={() => handleToggleTwoFactor(cred.id)}
                    className="text-gray-500 hover:text-gray-700 font-semibold flex items-center space-x-1"
                  >
                    <Shield size={14}/>
                    <span>Toggle 2FA</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCredentials;
