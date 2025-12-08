import React, { useState, useEffect } from 'react';

const mockStudents = [
    { id: '1', name: 'Deepak Kumar' },
    { id: '2', name: 'Nandha Kishore' },
    { id: '3', name: 'Jaswanth' },
    { id: '4', name: 'Bala Manohar' },
    { id: '5', name: 'Siddu' },
  ];
  
  const mockSemesters = [
    { id: '1', semester_name: 'Semester 1' },
    { id: '2', semester_name: 'Semester 2' },
    { id: '3', semester_name: 'Semester 3' },
    { id: '4', semester_name: 'Semester 4' },
    { id: '5', semester_name: 'Semester 5' },
    { id: '6', semester_name: 'Semester 6' },
  ];
  
  const mockSubjects = [
    { id: '1', subject_name: 'Data Structures' },
    { id: '2', subject_name: 'Algorithms' },
    { id: '3', subject_name: 'Database Systems' },
    { id: '4', subject_name: 'Operating Systems' },
  ];

const Grading = () => {
    const [students] = useState(mockStudents);
    const [semesters] = useState(mockSemesters);
    const [subjects] = useState(mockSubjects);
    const [grades, setGrades] = useState<any>({});

    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGrades({ ...grades, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const gradeData = {
            ...grades,
            student_id: selectedStudent,
            subject_id: selectedSubject,
            semester: selectedSemester,
        };
        console.log('Saving grades:', gradeData);
        alert('Grades saved successfully!');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Grading</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                    <label htmlFor="student" className="block text-sm font-medium text-gray-700">Student</label>
                    <select id="student" name="student" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
                        <option value="">Select a student</option>
                        {students.map((student: any) => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                    <select id="semester" name="semester" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" onChange={(e) => setSelectedSemester(e.target.value)} value={selectedSemester}>
                        <option value="">Select a semester</option>
                        {semesters.map((semester: any) => (
                            <option key={semester.id} value={semester.id}>{semester.semester_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <select id="subject" name="subject" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" onChange={(e) => setSelectedSubject(e.target.value)} value={selectedSubject}>
                        <option value="">Select a subject</option>
                        {subjects.map((subject: any) => (
                            <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedStudent && selectedSemester && selectedSubject && (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label htmlFor="unit1_marks" className="block text-sm font-medium text-gray-700">Unit 1 Marks</label>
                            <input type="number" name="unit1_marks" id="unit1_marks" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={grades.unit1_marks || ''} onChange={handleInputChange} />
                        </div>
                        <div className="relative">
                            <label htmlFor="unit2_marks" className="block text-sm font-medium text-gray-700">Unit 2 Marks</label>
                            <input type="number" name="unit2_marks" id="unit2_marks" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={grades.unit2_marks || ''} onChange={handleInputChange} />
                        </div>
                        <div className="relative">
                            <label htmlFor="unit3_marks" className="block text-sm font-medium text-gray-700">Unit 3 Marks</label>
                            <input type="number" name="unit3_marks" id="unit3_marks" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={grades.unit3_marks || ''} onChange={handleInputChange} />
                        </div>
                        <div className="relative">
                            <label htmlFor="lab_internal1_marks" className="block text-sm font-medium text-gray-700">Lab Internal 1 Marks</label>
                            <input type="number" name="lab_internal1_marks" id="lab_internal1_marks" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={grades.lab_internal1_marks || ''} onChange={handleInputChange} />
                        </div>
                        <div className="relative">
                            <label htmlFor="lab_internal2_marks" className="block text-sm font-medium text-gray-700">Lab Internal 2 Marks</label>
                            <input type="number" name="lab_internal2_marks" id="lab_internal2_marks" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={grades.lab_internal2_marks || ''} onChange={handleInputChange} />
                        </div>
                        <div className="relative">
                            <label htmlFor="external_lab_marks" className="block text-sm font-medium text-gray-700">External Lab Exam Marks</label>
                            <input type="number" name="external_lab_marks" id="external_lab_marks" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={grades.external_lab_marks || ''} onChange={handleInputChange} />
                        </div>
                        <div className="relative">
                            <label htmlFor="semester_exam_marks" className="block text-sm font-medium text-gray-700">Semester Exam Marks</label>
                            <input type="number" name="semester_exam_marks" id="semester_exam_marks" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={grades.semester_exam_marks || ''} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save Grades
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Grading;
