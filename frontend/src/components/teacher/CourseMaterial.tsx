
import React, { useState } from 'react';
import { Upload, FileText, Trash2, Download, Folder } from 'lucide-react';

// Mock data for course materials
const mockMaterials = [
  { id: 1, course: 'CS101', fileName: 'Lecture 1 - Intro to CS.pdf', uploadDate: '2024-01-15', fileUrl: '#' },
  { id: 2, course: 'CS101', fileName: 'Syllabus.pdf', uploadDate: '2024-01-12', fileUrl: '#' },
  { id: 3, course: 'MA202', fileName: 'Chapter 1 - Matrices.docx', uploadDate: '2024-01-18', fileUrl: '#' },
  { id: 4, course: 'CS101', fileName: 'Assignment 1.pdf', uploadDate: '2024-01-20', fileUrl: '#' },
];

// Mock data for courses
const mockCourses = [
    { id: 'CS101', name: 'Introduction to Computer Science' },
    { id: 'MA202', name: 'Linear Algebra' },
    { id: 'PHY101', name: 'Physics I' },
];

const CourseMaterial: React.FC = () => {
  const [materials, setMaterials] = useState(mockMaterials);
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0].id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }
    const newMaterial = {
        id: materials.length + 1,
        course: selectedCourse,
        fileName: selectedFile.name,
        uploadDate: new Date().toISOString().split('T')[0],
        fileUrl: '#'
    };
    setMaterials(prev => [...prev, newMaterial]);
    setSelectedFile(null);
    alert('File uploaded successfully (mock)!');
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = "";
  };

  const handleDelete = (materialId: number) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(prev => prev.filter(m => m.id !== materialId));
      alert('Material deleted successfully (mock)!');
    }
  };

  const filteredMaterials = materials.filter(m => m.course === selectedCourse);

  return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-bold text-gray-800">Course Materials</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
              <label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select a Course:
              </label>
              <select
                  id="course-select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                  {mockCourses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
              </select>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><Upload className="mr-3 text-indigo-500" /> Upload New Material</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <input
                      type="file"
                      id="file-upload"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                      onChange={handleFileChange}
                  />
                  <button
                      onClick={handleUpload}
                      disabled={!selectedFile}
                      className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg disabled:bg-gray-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                      Upload File
                  </button>
              </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><Folder className="mr-3 text-indigo-500" /> Uploaded Materials for {selectedCourse}</h2>
              {filteredMaterials.length > 0 ? (
                  <ul className="space-y-3">
                      {filteredMaterials.map(material => (
                          <li key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                              <div className="flex items-center">
                                  <FileText className="h-6 w-6 text-gray-500 mr-4" />
                                  <div>
                                      <p className="font-medium text-gray-800">{material.fileName}</p>
                                      <p className="text-sm text-gray-500">Uploaded on: {material.uploadDate}</p>
                                  </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                  <a href={material.fileUrl} download className="text-blue-600 hover:text-blue-800" title="Download">
                                      <Download className="h-5 w-5" />
                                  </a>
                                  <button onClick={() => handleDelete(material.id)} className="text-red-600 hover:text-red-800" title="Delete">
                                      <Trash2 className="h-5 w-5" />
                                  </button>
                              </div>
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="text-gray-500 mt-4">No materials uploaded for this course yet.</p>
              )}
          </div>
      </div>
  );
};

export default CourseMaterial;
