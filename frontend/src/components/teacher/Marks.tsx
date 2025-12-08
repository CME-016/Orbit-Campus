import React, { useState, useEffect } from 'react';
import { Book, ChevronDown } from 'lucide-react';

interface Course {
  id: number;
  course_code: string;
  course_name: string;
}

interface Student {
  student_id: number;
  student_name: string;
  unit1: string | null;
  unit2: string | null;
  mid_term: string | null;
  final_exam: string | null;
}

interface Mark {
  student_id: number;
  unit1?: string;
  unit2?: string;
  mid_term?: string;
  final_exam?: string;
}

const mockCourses: Course[] = [
    { id: 1, course_code: 'CS101', course_name: 'Introduction to Computer Science' },
    { id: 2, course_code: 'MA202', course_name: 'Linear Algebra' },
];

const mockStudents: Student[] = [
    { student_id: 1, student_name: 'Deepak Kumar', unit1: '85', unit2: '90', mid_term: '88', final_exam: null },
    { student_id: 2, student_name: 'Nandha Kishore', unit1: '92', unit2: '88', mid_term: '90', final_exam: null },
    { student_id: 3, student_name: 'Jaswanth', unit1: '78', unit2: '82', mid_term: '80', final_exam: null },
    { student_id: 4, student_name: 'Bala Manohar', unit1: '88', unit2: '91', mid_term: '89', final_exam: null },
    { student_id: 5, student_name: 'Siddu', unit1: '95', unit2: '94', mid_term: '95', final_exam: null },
];

const Marks: React.FC = () => {
  const [courses] = useState<Course[]>(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<string>(mockCourses.length > 0 ? mockCourses[0].id.toString() : '');
  const [students] = useState<Student[]>(mockStudents);
  const [marks, setMarks] = useState<Mark[]>(mockStudents.map(s => ({
    student_id: s.student_id,
    unit1: s.unit1 || '',
    unit2: s.unit2 || '',
    mid_term: s.mid_term || '',
    final_exam: s.final_exam || '',
  })));
  const isAuthenticated = true; // Mock authentication

  const handleMarksChange = (studentId: number, field: keyof Mark, value: string) => {
    setMarks(prevMarks => {
      const existingMarkIndex = prevMarks.findIndex(mark => mark.student_id === studentId);
      if (existingMarkIndex > -1) {
        const updatedMarks = [...prevMarks];
        updatedMarks[existingMarkIndex] = { ...updatedMarks[existingMarkIndex], [field]: value };
        return updatedMarks;
      } else {
        return [...prevMarks, { student_id: studentId, [field]: value }];
      }
    });
  };

  const handleSave = () => {
    console.log('Saving marks:', { course_id: selectedCourse, marks });
    alert('Marks saved successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-lg text-gray-600">Please log in to view and manage marks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Enter Marks</h1>
          <p className="text-lg text-gray-600">Select a course and enter the marks for each student.</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 sm:mb-0">Course Selection</h2>
              {courses.length > 0 ? (
                <div className="relative w-full sm:w-64">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 transition duration-300"
                  >
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.course_name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={20} />
                  </div>
                </div>
              ) : (
                <p className="text-lg text-gray-600">You have no courses assigned.</p>
              )}
            </div>

            {courses.length > 0 && (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit 1
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit 2
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mid Term
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Final Exam
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map(student => (
                        <tr key={student.student_id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                                <Book className="text-indigo-500" size={20} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{student.student_name}</p>
                                <p className="text-sm text-gray-500">ID: {student.student_id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              placeholder="N/A"
                              value={marks.find(m => m.student_id === student.student_id)?.unit1 || ''}
                              onChange={(e) => handleMarksChange(student.student_id, 'unit1', e.target.value)}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              placeholder="N/A"
                              value={marks.find(m => m.student_id === student.student_id)?.unit2 || ''}
                              onChange={(e) => handleMarksChange(student.student_id, 'unit2', e.target.value)}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              placeholder="N/A"
                              value={marks.find(m => m.student_id === student.student_id)?.mid_term || ''}
                              onChange={(e) => handleMarksChange(student.student_id, 'mid_term', e.target.value)}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              placeholder="N/A"
                              value={marks.find(m => m.student_id === student.student_id)?.final_exam || ''}
                              onChange={(e) => handleMarksChange(student.student_id, 'final_exam', e.target.value)}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 px-6 sm:px-8 py-4">
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                    >
                      Save All Marks
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marks;
