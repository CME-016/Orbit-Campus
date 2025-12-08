
import React, { useState } from 'react';
import { Calendar, Plus, Send, CheckCircle, XCircle, Clock, Filter, ChevronDown } from 'lucide-react';

// Mock data for leave requests
const mockLeaveRequests = [
  { id: 1, type: 'Annual Leave', startDate: '2024-08-20', endDate: '2024-08-25', reason: 'Family vacation', status: 'Approved' },
  { id: 2, type: 'Sick Leave', startDate: '2024-07-15', endDate: '2024-07-16', reason: 'Flu', status: 'Approved' },
  { id: 3, type: 'Casual Leave', startDate: '2024-08-01', endDate: '2024-08-01', reason: 'Personal appointment', status: 'Pending' },
  { id: 4, type: 'Unpaid Leave', startDate: '2024-06-10', endDate: '2024-06-12', reason: 'Extended travel', status: 'Rejected' },
];

// Mock data for leave balance
const mockLeaveBalance = {
  annual: { total: 20, used: 8, available: 12 },
  sick: { total: 10, used: 3, available: 7 },
  casual: { total: 10, used: 5, available: 5 },
};

type Status = 'Approved' | 'Pending' | 'Rejected';

const getStatusPill = (status: Status) => {
    switch(status) {
        case 'Approved': return <span className="flex items-center text-green-600"><CheckCircle className="mr-1.5 h-4 w-4"/>Approved</span>;
        case 'Pending': return <span className="flex items-center text-yellow-600"><Clock className="mr-1.5 h-4 w-4"/>Pending</span>;
        case 'Rejected': return <span className="flex items-center text-red-600"><XCircle className="mr-1.5 h-4 w-4"/>Rejected</span>;
    }
}

const LeaveManagement: React.FC = () => {
  const [requests, setRequests] = useState(mockLeaveRequests);
  const [filter, setFilter] = useState('All');

  const filteredRequests = requests.filter(req => filter === 'All' || req.status === filter);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Annual Leave</p>
            <p className="text-2xl font-semibold text-gray-800">{mockLeaveBalance.annual.available} <span className="text-base font-normal">/ {mockLeaveBalance.annual.total} days</span></p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Sick Leave</p>
            <p className="text-2xl font-semibold text-gray-800">{mockLeaveBalance.sick.available} <span className="text-base font-normal">/ {mockLeaveBalance.sick.total} days</span></p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Casual Leave</p>
            <p className="text-2xl font-semibold text-gray-800">{mockLeaveBalance.casual.available} <span className="text-base font-normal">/ {mockLeaveBalance.casual.total} days</span></p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><Plus className="mr-3 text-indigo-500" /> Apply for New Leave</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input type="date" className="p-2 border border-gray-300 rounded-md" />
              <input type="date" className="p-2 border border-gray-300 rounded-md" />
              <select className="p-2 border border-gray-300 rounded-md">
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Unpaid Leave</option>
              </select>
              <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 flex items-center justify-center"><Send className="mr-2 h-4 w-4"/>Submit</button>
          </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">My Leave Requests</h2>
           <div className="relative">
            <select onChange={(e) => setFilter(e.target.value)} className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-lg focus:outline-none">
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map(req => (
                <tr key={req.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{req.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.startDate} to {req.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{getStatusPill(req.status as Status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         {filteredRequests.length === 0 && <p className="text-center text-gray-500 py-8">No requests match this filter.</p>}
      </div>
    </div>
  );
};

export default LeaveManagement;
