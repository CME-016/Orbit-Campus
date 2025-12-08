
import React, { useState } from 'react';
import { IndianRupee, Download, History, AlertCircle } from 'lucide-react';

// 1. Removed Supabase and useAuth imports

interface Fee {
  id: number;
  student_id: string;
  description: string;
  amount: number;
  due_date: string;
  status: 'pending' | 'paid'; // Simplified status
  paid_on: string | null;
}

// 2. Mock data to replace Supabase call
const mockFees: Fee[] = [
  { id: 1, student_id: 'STU123', description: 'Term 1 Tuition Fee', amount: 75000, due_date: '2024-07-31', status: 'pending', paid_on: null },
  { id: 2, student_id: 'STU123', description: 'Bus Transportation Fee', amount: 8000, due_date: '2024-07-31', status: 'pending', paid_on: null },
  { id: 3, student_id: 'STU123', description: 'Annual Development Fee', amount: 12000, due_date: '2024-06-30', status: 'paid', paid_on: '2024-06-20' },
  { id: 4, student_id: 'STU123', description: 'Term 4 Tuition Fee (2023)', amount: 72000, due_date: '2024-03-31', status: 'paid', paid_on: '2024-03-15' },
];

const ParentFeeManagement: React.FC = () => {
  // 3. State initialized with mock data
  const [fees, setFees] = useState<Fee[]>(mockFees);

  // 4. Removed all useEffect, loading, error, and data fetching logic

  const totalDue = fees.filter(f => f.status === 'pending').reduce((acc, f) => acc + f.amount, 0);
  const totalPaid = fees.filter(f => f.status === 'paid').reduce((acc, f) => acc + f.amount, 0);
  
  const handlePayNow = () => {
    alert("This is a demo. The payment gateway is not integrated yet.");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Fee Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-red-600">Total Amount Due</h2>
          <p className="text-3xl font-bold flex items-center"><IndianRupee size={28}/>{totalDue.toLocaleString()}</p>
           <p className="text-sm text-gray-500">Across all pending invoices.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-green-600">Total Amount Paid</h2>
          <p className="text-3xl font-bold flex items-center"><IndianRupee size={28}/>{totalPaid.toLocaleString()}</p>
           <p className="text-sm text-gray-500">This academic year.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Pending Invoices</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                    {fees.filter(f => f.status === 'pending').map(fee => (
                        <tr key={fee.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{fee.due_date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{fee.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={handlePayNow} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Pay Now</button>
                            </td>
                        </tr>
                    ))}
                 </tbody>
            </table>
             {fees.filter(f => f.status === 'pending').length === 0 && <p className="text-center py-4 text-gray-500">No pending fees.</p>}
        </div>
      </div>

       <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center"><History className="mr-2"/>Payment History</h2>
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Paid</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Receipt</th>
                    </tr>
                </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                    {fees.filter(f => f.status === 'paid').map(fee => (
                        <tr key={fee.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{fee.paid_on}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{fee.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 flex items-center ml-auto"><Download size={16} className="mr-1"/> Download</button>
                            </td>
                        </tr>
                    ))}
                 </tbody>
            </table>
             {fees.filter(f => f.status === 'paid').length === 0 && <p className="text-center py-4 text-gray-500">No payment history found.</p>}
        </div>
       </div>
    </div>
  );
};

export default ParentFeeManagement;
