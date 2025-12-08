import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DollarSign, CheckCircle, Clock, CreditCard, ChevronDown, ChevronUp, X } from 'lucide-react';

// Define the structure for a single fee record from the backend
interface FeeRecord {
  id: number;
  student_id: number;
  student_name: string;
  academic_year: string;
  total_amount: string; // Comes as string from backend
  paid_amount: string;  // Comes as string from backend
  due_amount: number;
  due_date: string;
  status: 'Paid' | 'Unpaid' | 'Partially Paid';
}

// The detailed breakdown of fees for a year
const feeStructure = {
  "Admission Fee": 100.00,
  "Tuition Fee 1": 500.00,
  "Tuition Fee 2": 400.00,
  "Tuition Fee 3": 100.00,
  "Tuition Fee 4": 500.00,
  "Tuition Fee 5": 500.00,
  "GAMES": 100.00,
  "ASSOCIATION": 100.00,
  "COURSE WORK 1": 300.00,
  "LABS": 900.00,
  "LIBRARY": 400.00,
  "SYLLABUS BOOK": 100.00,
  "BOARD RECOGNITION FEE": 250.00,
  "ALUMINI": 100.00,
  "MIS 2": 300.00,
  "TECH FEST 2": 50.00,
};

// --- Payment Modal Component ---
const PaymentModal = ({ isOpen, onClose, record, onPaymentSuccess }: any) => {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const dueAmount = record ? parseFloat(record.total_amount) - parseFloat(record.paid_amount) : 0;

  useEffect(() => {
    // Suggest the full due amount when modal opens
    if(dueAmount > 0) setAmount(dueAmount.toFixed(2));
  }, [dueAmount]);

  if (!isOpen) return null;

  const handlePayment = async () => {
    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
        setError('Please enter a valid positive amount.');
        return;
    }
    if (paymentAmount > dueAmount) {
        setError(`You cannot pay more than the due amount of ₹${dueAmount.toFixed(2)}.`);
        return;
    }

    setIsProcessing(true);
    setError('');

    try {
        const response = await fetch('http://localhost/php/api/process_payment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fee_record_id: record.id, amount: paymentAmount })
        });
        const result = await response.json();

        if (response.ok && result.success) {
            onPaymentSuccess();
            onClose();
        } else {
            setError(result.message || 'Payment failed. Please try again.');
        }
    } catch (err) {
        setError('An unexpected network error occurred.');
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Make a Payment</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800"><X /></button>
        </div>
        <div className="space-y-4">
            <p>Academic Year: <span className="font-semibold">{record.academic_year}</span></p>
            <p>Total Due: <span className="font-semibold text-red-600">₹{dueAmount.toFixed(2)}</span></p>
            <div>
                <label className="block text-sm font-medium text-gray-700">Payment Amount (INR)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter amount to pay" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handlePayment} 
            disabled={isProcessing}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400">
            <CreditCard className="h-4 w-4 mr-2"/>
            {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Fee Management Component ---
const FeeManagement: React.FC = () => {
  const { user } = useAuth();
  const [feeRecord, setFeeRecord] = useState<FeeRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const fetchFeeRecord = async () => {
    if (user?.id) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost/php/api/get_fee_records.php?student_id=${user.id}`);
        const data = await response.json();
        // The API returns an array, we'll work with the first record for this year
        if (data.records && data.records.length > 0) {
          setFeeRecord(data.records[0]); 
        } else {
          setFeeRecord(null);
        }
      } catch (error) {
        console.error('Error fetching fee records:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFeeRecord();
  }, [user]);

  const totalFee = useMemo(() => Object.values(feeStructure).reduce((sum, amount) => sum + amount, 0), []);

  const getStatusChip = (status: string) => {
    const config = {
        Paid: { icon: CheckCircle, text: 'Paid', color: 'text-green-700', bg: 'bg-green-100' },
        'Partially Paid': { icon: Clock, text: 'Partially Paid', color: 'text-yellow-700', bg: 'bg-yellow-100' },
        Unpaid: { icon: Clock, text: 'Unpaid', color: 'text-red-700', bg: 'bg-red-100' },
    };
    const { icon: Icon, text, color, bg } = config[status as keyof typeof config] || config.Unpaid;
    return <span className={`flex items-center space-x-2 px-3 py-1 text-xs font-medium rounded-full ${bg} ${color}`}><Icon className="h-4 w-4"/><span>{text}</span></span>;
  };

  if (loading) {
    return <div className="p-6 animate-pulse">Loading fee details...</div>;
  }

  if (!feeRecord) {
    return <div className="p-6 text-center text-gray-500">No fee records found for your account.</div>;
  }

  const paidAmount = parseFloat(feeRecord.paid_amount);
  const totalAmount = parseFloat(feeRecord.total_amount);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <h1 className="text-3xl font-bold">Fee Management</h1>
            <p className="text-purple-100 mt-1">Your financial overview for the academic year {feeRecord.academic_year}.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border"><p className="text-sm text-gray-600">Total Annual Fees</p><p className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</p></div>
            <div className="bg-white rounded-xl p-6 shadow-sm border"><p className="text-sm text-gray-600">Amount Paid</p><p className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</p></div>
            <div className="bg-white rounded-xl p-6 shadow-sm border"><p className="text-sm text-gray-600">Amount Due</p><p className="text-2xl font-bold text-red-600">₹{pendingAmount.toLocaleString()}</p></div>
        </div>

        {/* Main Details & Payment Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex flex-wrap justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Academic Year: {feeRecord.academic_year}</h2>
                    <p className="text-sm text-gray-500">Due Date: {new Date(feeRecord.due_date).toLocaleDateString()}</p>
                </div>
                {getStatusChip(feeRecord.status)}
            </div>

            {/* Call to Action: Pay Now */}
            {pendingAmount > 0 && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-purple-800">You have an outstanding balance.</p>
                    <p className="text-sm text-purple-700">Click the button to clear your dues.</p>
                  </div>
                  <button 
                      onClick={() => setPaymentModalOpen(true)} 
                      className="flex items-center px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md transition-transform hover:scale-105">
                      <CreditCard className="h-5 w-5 mr-2"/>Pay Now
                  </button>
              </div>
            )}
            {feeRecord.status === 'Paid' && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                    <p className="font-semibold text-green-800">All dues for this academic year have been cleared. Thank you!</p>
                </div>
            )}

            {/* Detailed Fee Breakdown */}
            <div className="mt-8">
                <button onClick={() => setShowBreakdown(!showBreakdown)} className="w-full text-left font-semibold text-gray-800 flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                    <span>Detailed Fee Breakdown</span>
                    {showBreakdown ? <ChevronUp className="h-5 w-5"/> : <ChevronDown className="h-5 w-5"/>}
                </button>
                {showBreakdown && (
                    <div className="mt-2 px-2 py-4 bg-gray-50 rounded-lg">
                      <ul className="text-sm text-gray-700 space-y-2">
                          {Object.entries(feeStructure).map(([name, amount]) => (
                              <li key={name} className="flex justify-between border-b pb-2">
                                  <span>{name}</span>
                                  <span className="font-mono">₹{amount.toFixed(2)}</span>
                              </li>
                          ))}
                          <li className="flex justify-between font-bold text-base pt-2 text-gray-900">
                              <span>Total</span>
                              <span className="font-mono">₹{totalFee.toFixed(2)}</span>
                          </li>
                      </ul>
                    </div>
                )}
            </div>
        </div>
        
        {/* Render the Payment Modal */}
        <PaymentModal 
          isOpen={isPaymentModalOpen} 
          onClose={() => setPaymentModalOpen(false)} 
          record={feeRecord}
          onPaymentSuccess={() => {
            // Re-fetch data to show the latest status after successful payment
            fetchFeeRecord();
          }}
        />
    </div>
  );
};

export default FeeManagement;
