import React, { useState } from 'react';
import { mockAcademicMaterials } from '../../data/mockData';
import { 
  BookOpen, 
  Download, 
  Video, 
  FileText, 
  Search,
  Filter,
  Eye,
  Calendar,
  HardDrive,
  Play
} from 'lucide-react';

const StudyMaterials: React.FC = () => {
  const [materials] = useState(mockAcademicMaterials);
  const [filter, setFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredMaterials = () => {
    let filtered = materials;
    
    if (filter !== 'all') {
      filtered = filtered.filter(material => material.type === filter);
    }
    
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(material => material.subject === subjectFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(material => 
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'textbook':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-purple-600" />;
      case 'lab_manual':
        return <BookOpen className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'textbook':
        return 'bg-blue-100 text-blue-700';
      case 'pdf':
        return 'bg-red-100 text-red-700';
      case 'video':
        return 'bg-purple-100 text-purple-700';
      case 'lab_manual':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const subjects = [...new Set(materials.map(m => m.subject))];
  const materialTypes = [...new Set(materials.map(m => m.type))];

  const handleDownload = (materialId: string, title: string) => {
    console.log('Downloading material:', materialId, title);
    alert(`Downloading ${title}...`);
  };

  const handlePreview = (materialId: string, title: string) => {
    console.log('Previewing material:', materialId, title);
    // Create a mock preview window
    const previewWindow = window.open('', '_blank', 'width=800,height=600');
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head><title>Preview: ${title}</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>${title}</h2>
            <p>This is a preview of the study material. In a real application, this would show the actual content.</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3>Sample Content:</h3>
              <p>• Introduction to the topic</p>
              <p>• Key concepts and definitions</p>
              <p>• Examples and illustrations</p>
              <p>• Practice exercises</p>
              <p>• Summary and conclusions</p>
            </div>
            <button onclick="window.close()" style="background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close Preview</button>
          </body>
        </html>
      `);
    }
  };

  const materialTypeLabels = {
    textbook: 'Textbook',
    pdf: 'PDF Document',
    video: 'Video Lecture',
    lab_manual: 'Lab Manual',
    assignment: 'Assignment'
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Study Materials</h1>
        <p className="text-purple-100">Access textbooks, PDFs, video lectures, lab manuals, and other academic resources.</p>
      </div>

      {/* Material Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {materialTypes.map((type) => {
          const count = materials.filter(m => m.type === type).length;
          return (
            <div key={type} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                {getTypeIcon(type)}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {materialTypeLabels[type as keyof typeof materialTypeLabels] || type}
                  </p>
                  <p className="text-2xl font-bold text-gray-700">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Types</option>
                {materialTypes.map(type => (
                  <option key={type} value={type}>
                    {materialTypeLabels[type as keyof typeof materialTypeLabels] || type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-gray-400" />
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredMaterials().map((material) => (
          <div key={material.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getTypeIcon(material.type)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(material.type)}`}>
                  {materialTypeLabels[material.type as keyof typeof materialTypeLabels] || material.type}
                </span>
              </div>
              {material.type === 'video' && (
                <Play className="h-5 w-5 text-purple-600" />
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {material.title}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <BookOpen className="h-4 w-4" />
                <span>{material.subject}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{material.semester}</span>
              </div>
              {material.fileSize && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <HardDrive className="h-4 w-4" />
                  <span>{material.fileSize}</span>
                </div>
              )}
            </div>

            {material.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {material.description}
              </p>
            )}

            <div className="text-xs text-gray-500 mb-4">
              Uploaded: {material.uploadDate.toLocaleDateString()}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleDownload(material.id, material.title)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              {(material.type === 'pdf' || material.type === 'video') && (
                <button
                  onClick={() => handlePreview(material.id, material.title)}
                  className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {getFilteredMaterials().length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No study materials found matching your criteria</p>
        </div>
      )}

      {/* Quick Access */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setFilter('textbook')}
            className="flex items-center space-x-3 p-4 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <BookOpen className="h-6 w-6 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Textbooks</div>
              <div className="text-xs text-gray-500">Core course textbooks</div>
            </div>
          </button>

          <button
            onClick={() => setFilter('video')}
            className="flex items-center space-x-3 p-4 border border-purple-200 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Video className="h-6 w-6 text-purple-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Video Lectures</div>
              <div className="text-xs text-gray-500">Recorded lectures</div>
            </div>
          </button>

          <button
            onClick={() => setFilter('lab_manual')}
            className="flex items-center space-x-3 p-4 border border-green-200 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <BookOpen className="h-6 w-6 text-green-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Lab Manuals</div>
              <div className="text-xs text-gray-500">Practical guides</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;