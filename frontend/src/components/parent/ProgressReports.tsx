
import React from 'react';
import { Download, FileText, AlertCircle } from 'lucide-react';


const ProgressReports: React.FC = () => {
  // Mock data for progress reports
  const mockReports = [
    { id: 1, term: 'Mid-Term, Fall 2023', date: '2023-10-15', fileUrl: '#' },
    { id: 2, term: 'Final, Fall 2023', date: '2023-12-20', fileUrl: '#' },
    { id: 3, term: 'Mid-Term, Spring 2024', date: '2024-03-10', fileUrl: '#' },
  ];


  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Progress Reports</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
          <FileText className="mr-3 text-blue-500" />
          Available Reports
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Term</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Issued</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Download</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockReports.map(report => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{report.term}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <a 
                      href={report.fileUrl}
                      download
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {mockReports.length === 0 && (
            <p className="text-center py-4 text-gray-500">No progress reports available at this time.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressReports;
