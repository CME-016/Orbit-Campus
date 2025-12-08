
import React, { useState } from 'react';
import { DollarSign, Download, Briefcase, FileText, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';

// Mock data for payroll slips for a staff member
const mockPayrollData = {
  '2024-07': {
    id: 'PAY-STAFF-001',
    month: 'July 2024',
    basicSalary: 35000,
    allowances: 8000, // Travel, Food, etc.
    deductions: 5500, // PF, ESI, etc.
    netSalary: 37500,
    earnings: [
        { name: 'Basic Salary', amount: 35000 },
        { name: 'Travel Allowance', amount: 5000 },
        { name: 'Food Allowance', amount: 3000 },
    ],
    deductionsList: [
        { name: 'Provident Fund (PF)', amount: 3000 },
        { name: 'Employee State Insurance (ESI)', amount: 1000 },
        { name: 'Professional Tax', amount: 1500 },
    ]
  },
  '2024-06': {
    id: 'PAY-STAFF-002',
    month: 'June 2024',
    basicSalary: 35000,
    allowances: 8000,
    deductions: 5500,
    netSalary: 37500,
    earnings: [
        { name: 'Basic Salary', amount: 35000 },
        { name: 'Travel Allowance', amount: 5000 },
        { name: 'Food Allowance', amount: 3000 },
    ],
    deductionsList: [
        { name: 'Provident Fund (PF)', amount: 3000 },
        { name: 'Employee State Insurance (ESI)', amount: 1000 },
        { name: 'Professional Tax', amount: 1500 },
    ]
  },
};

type PayrollMonth = keyof typeof mockPayrollData;

const StaffPayroll: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<PayrollMonth>('2024-07');
  const selectedSlip = mockPayrollData[selectedMonth];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">My Payroll</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-xl font-semibold text-gray-800">{formatCurrency(selectedSlip.basicSalary + selectedSlip.allowances)}</p>
            </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
                <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
                <p className="text-sm text-gray-500">Total Deductions</p>
                <p className="text-xl font-semibold text-gray-800">{formatCurrency(selectedSlip.deductions)}</p>
            </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
                <p className="text-sm text-gray-500">Net Salary</p>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(selectedSlip.netSalary)}</p>
            </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center"><FileText className="mr-3"/>Salary Slip for {selectedSlip.month}</h2>
            <div className="relative mt-4 sm:mt-0">
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value as PayrollMonth)}
                    className="appearance-none w-full sm:w-auto bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-purple-500"
                >
                    {Object.keys(mockPayrollData).map(month => (
                        <option key={month} value={month}>{mockPayrollData[month as PayrollMonth].month}</option>
                    ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Earnings & Deductions details */}
            <div>
                <h3 className="text-lg font-medium text-green-600 mb-3">Earnings</h3>
                <ul className="space-y-2">
                    {selectedSlip.earnings.map(item => (
                        <li key={item.name} className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">{item.name}</span>
                            <span className="font-medium text-gray-800">{formatCurrency(item.amount)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-medium text-red-600 mb-3">Deductions</h3>
                <ul className="space-y-2">
                    {selectedSlip.deductionsList.map(item => (
                        <li key={item.name} className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">{item.name}</span>
                            <span className="font-medium text-gray-800">{formatCurrency(item.amount)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="mt-8 pt-4 border-t-2 border-dashed">
            <div className="flex justify-between items-center font-bold text-lg">
                <span className="text-gray-800">Net Salary Payable</span>
                <span className="text-purple-600">{formatCurrency(selectedSlip.netSalary)}</span>
            </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffPayroll;
