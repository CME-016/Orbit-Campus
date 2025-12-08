
import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Search, Folder } from 'lucide-react';

// Mock data for teacher documents
const mockDocuments = [
  { id: 1, name: 'Math_Midterm_Question_Paper.pdf', category: 'Question Papers', date: '2024-05-10', size: '1.2 MB' },
  { id: 2, name: 'Science_Project_Guidelines.docx', category: 'Project Guidelines', date: '2024-04-22', size: '0.8 MB' },
  { id: 3, name: 'Class_10_Syllabus.pdf', category: 'Syllabus', date: '2024-03-15', size: '2.5 MB' },
  { id: 4, name: 'Faculty_Meeting_Minutes_April.pdf', category: 'Meeting Minutes', date: '2024-04-30', size: '0.5 MB' },
  { id: 5, name: 'Professional_Development_Certificate.jpg', category: 'Certificates', date: '2023-11-20', size: '3.1 MB' },
];

const categories = ['All', 'Question Papers', 'Project Guidelines', 'Syllabus', 'Meeting Minutes', 'Certificates'];

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newDoc = {
        id: documents.length + 1,
        name: selectedFile.name,
        category: 'Uncategorized', // Or have a category selector for uploads
        date: new Date().toISOString().split('T')[0],
        size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
      };
      setDocuments(prev => [newDoc, ...prev]);
      setSelectedFile(null);
      alert('Document uploaded successfully (mock)!');
      // Reset file input
      const fileInput = document.getElementById('doc-upload') as HTMLInputElement;
      if(fileInput) fileInput.value = "";
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      alert('Document deleted successfully (mock)!');
    }
  };

  const filteredDocuments = documents
    .filter(doc => selectedCategory === 'All' || doc.category === selectedCategory)
    .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">My Documents</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><Upload className="mr-3 text-indigo-500" /> Upload New Document</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <input
                  type="file"
                  id="doc-upload"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                  onChange={handleFileChange}
              />
              <button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg disabled:bg-gray-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                  Upload
              </button>
          </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {categories.map(category => (
                <button 
                    key={category} 
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {category}
                </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button className="text-indigo-600 hover:text-indigo-900" title="Download"><Download className="h-5 w-5"/></button>
                    <button onClick={() => handleDelete(doc.id)} className="text-red-600 hover:red-900" title="Delete"><Trash2 className="h-5 w-5"/></button>
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

export default Documents;
