import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, X, CheckCircle, Clock, PlusCircle, Server, Info } from 'lucide-react';

// --- TypeScript Interfaces ---
interface FeeRecord {
  id: number;
  student_id: number;
  student_name: string;
  academic_year: string;
  total_amount: string;
  paid_amount: string;
  due_amount: number;
  due_date: string;
  status: 'Paid' | 'Unpaid' | 'Partially Paid';
}

// --- Static Fee Structure ---
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
const totalFee = Object.values(feeStructure).reduce((sum, amount) => sum + amount, 0);

// --- Notification Component ---
const Notification = ({ message, type, onDismiss }: { message: string, type: 'success' | 'error' | 'info', onDismiss: () => void }) => {
    const config = {
        success: { icon: CheckCircle, color: 'green' },
        error: { icon: X, color: 'red' },
        info: { icon: Info, color: 'blue' },
    };
    const { icon: Icon, color } = config[type];

    useEffect(() => {
        const timer = setTimeout(onDismiss, 5000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className={`fixed top-20 right-5 z-50 flex items-center p-4 rounded-lg shadow-lg bg-white border-l-4 border-${color}-500`}>
            <Icon className={`h-6 w-6 text-${color}-500`} />
            <p className="ml-3 text-sm font-medium text-gray-700">{message}</p>
            <button onClick={onDismiss} className="ml-4 p-1 text-gray-400 hover:text-gray-600 rounded-full focus:outline-none">
                <X className="h-5 w-5" />
            </button>
        </div>
    );
};

// --- Fee Breakdown Modal ---
const FeeDetailModal = ({ record, onClose }: { record: FeeRecord | null; onClose: () => void }) => {
  if (!record) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Fee Details</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800"><X /></button>
        </div>
        <div className="space-y-4">
            <p><strong>Student:</strong> {record.student_name} (ID: {record.student_id})</p>
            <p><strong>Academic Year:</strong> {record.academic_year}</p>
            <p><strong>Status:</strong> {record.status}</p>
            <hr/>
            <h3 className="font-semibold text-gray-800">Fee Breakdown</h3>
            <ul className="text-sm text-gray-700 space-y-2 max-h-60 overflow-y-auto pr-2">
                {Object.entries(feeStructure).map(([name, amount]) => (
                    <li key={name} className="flex justify-between border-b pb-2">
                        <span>{name}</span>
                        <span className="font-mono">₹{amount.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between font-bold text-base pt-2 text-gray-900">
                <span>Total Fee</span>
                <span className="font-mono">₹{totalFee.toFixed(2)}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Admin Fee Management Component ---
const FeeManagement: React.FC = () => {
  const [allRecords, setAllRecords] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchAllFeeRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost/php/api/get_fee_records.php?t=${new Date().getTime()}`);
      const data = await response.json();
      setAllRecords(data.records || []);
    } catch (error) {
      setNotification({ message: 'Error fetching fee records.', type: 'error' });
      console.error('Error fetching fee records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFeeRecords();
  }, []);

  const handleGenerateRecords = async () => {
    setIsGenerating(true);
    setNotification({ message: 'Generating records... Please wait.', type: 'info' });
    try {
        const response = await fetch(`http://localhost/php/api/generate_fee_records.php`, { method: 'POST' });
        const result = await response.json();
        if (result.success) {
            setNotification({ message: `${result.new_records_created} new records created. ${result.records_skipped_as_existing} were already up to date.`, type: 'success' });
            fetchAllFeeRecords(); // Refresh the list after generation
        } else {
            throw new Error(result.message || 'An unknown error occurred.');
        }
    } catch (error: any) {
        setNotification({ message: `Generation failed: ${error.message}`, type: 'error' });
    } finally {
        setIsGenerating(false);
    }
  };

  const filteredRecords = useMemo(() => {
    return allRecords
      .filter(record => 
        filterStatus === 'All' || record.status === filterStatus
      )
      .filter(record => 
        record.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.student_id.toString().includes(searchTerm)
      );
  }, [allRecords, searchTerm, filterStatus]);

    const getStatusChip = (status: string) => {
        const config = {
            Paid: { icon: CheckCircle, text: 'Paid', color: 'text-green-700', bg: 'bg-green-100' },
            'Partially Paid': { icon: Clock, text: 'Partial', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            Unpaid: { icon: Clock, text: 'Unpaid', color: 'text-red-700', bg: 'bg-red-100' },
        };
        const { icon: Icon, text, color, bg } = config[status as keyof typeof config] || config.Unpaid;
        return <span className={`inline-flex items-center space-x-2 px-2.5 py-1 text-xs font-semibold rounded-full ${bg} ${color}`}><Icon className="h-3.5 w-3.5"/><span>{text}</span></span>;
    };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
        {notification && <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification(null)} />}
        
        <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800">Admin Fee Management</h1>
            <button 
                onClick={handleGenerateRecords} 
                disabled={isGenerating}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors duration-300"
            >
                {isGenerating ? <Server className="h-5 w-5 animate-spin" /> : <PlusCircle className="h-5 w-5" />}
                <span>{isGenerating ? 'Generating...' : 'Generate Missing Records'}</span>
            </button>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                        type="text"
                        placeholder="Search by student name or ID..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
                <div className="relative">
                    <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 appearance-none"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Partially Paid">Partially Paid</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
                <div className="text-center p-8">Loading records...</div>
            ) : (
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            {['Student', 'Year', 'Total', 'Paid', 'Due', 'Status', 'Action'].map(h => 
                                <th key={h} className="px-6 py-3 text-left font-medium tracking-wider">{h}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                        {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-semibold text-gray-900">{record.student_name}</div>
                                    <div className="text-xs text-gray-500">ID: {record.student_id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{record.academic_year}</td>
                                <td className="px-6 py-4 font-mono">₹{parseFloat(record.total_amount).toLocaleString()}</td>
                                <td className="px-6 py-4 font-mono text-green-600">₹{parseFloat(record.paid_amount).toLocaleString()}</td>
                                <td className="px-6 py-4 font-mono text-red-600">₹{record.due_amount.toLocaleString()}</td>
                                <td className="px-6 py-4">{getStatusChip(record.status)}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => setSelectedRecord(record)} className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
                                        <Eye className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={7} className="text-center py-12 text-gray-500">
                                    No fee records found for the selected criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>

        <FeeDetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
    </div>
  );
};

export default FeeManagement;
