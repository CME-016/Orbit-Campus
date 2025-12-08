
import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Search, Folder, Filter, ChevronDown } from 'lucide-react';

// Mock data for staff documents
const mockDocuments = [
  { id: 1, name: 'Finance_Report_July.xlsx', category: 'Financial Reports', date: '2024-08-01', size: '0.5 MB' },
  { id: 2, name: 'Admission_Policy_2024.pdf', category: 'Policy Documents', date: '2024-03-10', size: '1.8 MB' },
  { id: 3, name: 'IT_Maintenance_Schedule.pdf', category: 'Schedules', date: '2024-07-25', size: '0.3 MB' },
  { id: 4, name: 'Staff_Handbook_Revised.docx', category: 'Handbooks', date: '2024-01-15', size: '2.2 MB' },
  { id: 5, name: 'Event_Proposal_Annual_Day.pdf', category: 'Proposals', date: '2024-06-05', size: '1.1 MB' },
];

const categories = ['All', 'Financial Reports', 'Policy Documents', 'Schedules', 'Handbooks', 'Proposals'];

const StaffDocuments: React.FC = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDocuments = documents
    .filter(doc => selectedCategory === 'All' || doc.category === selectedCategory)
    .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Staff Documents</h1>

       <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div className="relative text-right">
                 <select 
                    onChange={(e) => setSelectedCategory(e.target.value)} 
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-full focus:outline-none w-full md:w-auto"
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button className="text-purple-600 hover:text-purple-900" title="Download"><Download className="h-5 w-5"/></button>
                    <button className="text-red-600 hover:red-900" title="Delete"><Trash2 className="h-5 w-5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDocuments.length === 0 && (
            <div className="text-center py-10">
                <Folder className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No documents found.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default StaffDocuments;
