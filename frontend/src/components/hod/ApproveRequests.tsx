
import React, { useState, useMemo } from 'react';
import { Check, X, Filter, Search } from 'lucide-react';

// 1. Mock data for different types of requests
const mockRequests = [
  { id: 'R001', type: 'Leave', applicant: 'Dr. Evelyn Reed', details: 'Requesting 3 days of professional leave for a conference.', status: 'Pending', date: '2023-10-26' },
  { id: 'R002', type: 'Budget', applicant: 'Mr. Samuel Grant', details: 'Requesting $500 for new lab equipment.', status: 'Pending', date: '2023-10-25' },
  { id: 'R003', type: 'Leave', applicant: 'Ms. Olivia Chen', details: 'Requesting 1 day of sick leave.', status: 'Approved', date: '2023-10-24' },
  { id: 'R004', type: 'Budget', applicant: 'Dr. Benjamin Carter', details: 'Requesting $1,200 for research materials.', status: 'Rejected', date: '2023-10-22' },
  { id: 'R005', type: 'Leave', applicant: 'Dr. Evelyn Reed', details: 'Requesting 2 days of personal leave.', status: 'Pending', date: '2023-10-28' },
];

type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

const ApproveRequests: React.FC = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Dynamic filtering for requests
  const filteredRequests = useMemo(() => {
    return requests
      .filter(req => 
        filterStatus === 'All' || req.status === filterStatus
      )
      .filter(req => 
        req.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [requests, filterStatus, searchTerm]);

  const handleUpdateRequest = (id: string, newStatus: RequestStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  // 3. Card-based UI for reviewing requests
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Approve Requests</h1>
        <p className="text-lg text-gray-600 mt-1">Review and manage requests from your department.</p>
      </header>

      <div className="mb-6 flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by applicant or details..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
            className="w-48 pl-10 pr-4 py-2.5 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map(req => (
          <div key={req.id} className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${getStatusColor(req.status as RequestStatus)}`}>{req.status}</span>
                <span className="text-sm text-gray-500">{req.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{req.applicant}</h3>
              <p className="text-sm text-gray-500 mb-4 font-medium">{req.type} Request</p>
              <p className="text-gray-700">{req.details}</p>
            </div>

            {req.status === 'Pending' && (
              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => handleUpdateRequest(req.id, 'Approved')}
                  className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Check size={18} />
                  <span>Approve</span>
                </button>
                <button 
                  onClick={() => handleUpdateRequest(req.id, 'Rejected')}
                  className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <X size={18} />
                  <span>Reject</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveRequests;
