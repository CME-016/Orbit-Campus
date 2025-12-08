import { User, FeeDetail, AcademicRecord, Document, Scholarship, AcademicMaterial, Task, Email, TimeTable, Performance } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@campus.edu',
    role: 'student',
    studentId: 'ST2024001',
    department: 'Computer Science',
    phone: '+91 9876543210',
    address: '123 Campus Road, University City',
    joinDate: new Date('2023-08-15'),
    status: 'active'
  },
  {
    id: '2',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@campus.edu',
    role: 'teacher',
    employeeId: 'EMP001',
    department: 'Computer Science',
    phone: '+91 9876543211',
    joinDate: new Date('2020-06-01'),
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@campus.edu',
    role: 'staff',
    employeeId: 'EMP002',
    department: 'Administration',
    phone: '+91 9876543212',
    joinDate: new Date('2021-03-15'),
    status: 'active'
  },
  {
    id: '4',
    name: 'Mary Smith',
    email: 'mary.smith@campus.edu',
    role: 'parent',
    childId: 'ST2024001',
    phone: '+91 9876543213',
    status: 'active'
  },
  {
    id: '5',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@campus.edu',
    role: 'admin',
    employeeId: 'ADM001',
    department: 'Administration',
    phone: '+91 9876543214',
    joinDate: new Date('2019-01-10'),
    status: 'active'
  }
];

export const mockFeeDetails: FeeDetail[] = [
  {
    id: '1',
    type: 'Tuition Fee',
    amount: 50000,
    dueDate: new Date('2024-01-15'),
    status: 'pending',
    semester: 'Spring 2024',
    description: 'Semester tuition fee'
  },
  {
    id: '2',
    type: 'Hostel Fee',
    amount: 15000,
    dueDate: new Date('2024-01-20'),
    status: 'paid',
    semester: 'Spring 2024',
    paidAmount: 15000,
    paymentDate: new Date('2024-01-10'),
    receiptNumber: 'RCP001'
  },
  {
    id: '3',
    type: 'Lab Fee',
    amount: 5000,
    dueDate: new Date('2024-01-25'),
    status: 'pending',
    semester: 'Spring 2024',
    description: 'Computer lab usage fee'
  },
  {
    id: '4',
    type: 'Library Fee',
    amount: 2000,
    dueDate: new Date('2024-01-30'),
    status: 'paid',
    semester: 'Spring 2024',
    paidAmount: 2000,
    paymentDate: new Date('2024-01-12'),
    receiptNumber: 'RCP002'
  }
];

export const mockAcademicRecords: AcademicRecord[] = [
  {
    id: '1',
    subject: 'Data Structures',
    subjectCode: 'CS201',
    credits: 4,
    grade: 'A',
    marks: 85,
    maxMarks: 100,
    semester: 'Fall 2023',
    year: '2023',
    teacher: 'Dr. Sarah Wilson',
    attendance: 92
  },
  {
    id: '2',
    subject: 'Computer Networks',
    subjectCode: 'CS301',
    credits: 3,
    grade: 'B+',
    marks: 78,
    maxMarks: 100,
    semester: 'Fall 2023',
    year: '2023',
    teacher: 'Prof. Michael Brown',
    attendance: 88
  },
  {
    id: '3',
    subject: 'Database Systems',
    subjectCode: 'CS401',
    credits: 4,
    grade: 'A+',
    marks: 92,
    maxMarks: 100,
    semester: 'Spring 2024',
    year: '2024',
    teacher: 'Dr. Lisa Wang',
    attendance: 95
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Study Certificate',
    type: 'certificate',
    status: 'approved',
    requestDate: new Date('2024-01-08'),
    approvalDate: new Date('2024-01-10'),
    downloadUrl: '/documents/study-cert-001.pdf',
    description: 'Certificate for study purposes',
    fees: 100,
    estimatedDays: 3
  },
  {
    id: '2',
    name: 'Transcript',
    type: 'academic',
    status: 'processing',
    requestDate: new Date('2024-01-12'),
    description: 'Official academic transcript',
    fees: 500,
    estimatedDays: 7
  },
  {
    id: '3',
    name: 'Bonafide Certificate',
    type: 'certificate',
    status: 'pending',
    requestDate: new Date('2024-01-14'),
    description: 'Bonafide certificate for bank loan',
    fees: 50,
    estimatedDays: 2
  }
];

export const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Merit Scholarship',
    type: 'merit',
    amount: 25000,
    status: 'approved',
    applicationDate: new Date('2023-12-01'),
    deadline: new Date('2023-12-31'),
    description: 'Scholarship based on academic merit',
    eligibility: ['CGPA > 8.5', 'No backlogs', 'Regular attendance']
  },
  {
    id: '2',
    name: 'Sports Excellence Award',
    type: 'sports',
    amount: 15000,
    status: 'under_review',
    applicationDate: new Date('2024-01-05'),
    deadline: new Date('2024-01-31'),
    description: 'For outstanding performance in sports',
    eligibility: ['State level participation', 'CGPA > 7.0']
  }
];

export const mockAcademicMaterials: AcademicMaterial[] = [
  {
    id: '1',
    title: 'Data Structures Textbook',
    type: 'textbook',
    subject: 'Data Structures',
    semester: 'Semester 3',
    downloadUrl: '/materials/ds-textbook.pdf',
    fileSize: '15.2 MB',
    uploadDate: new Date('2024-01-01'),
    description: 'Complete textbook for Data Structures course'
  },
  {
    id: '2',
    title: 'Algorithm Analysis Lab Manual',
    type: 'lab_manual',
    subject: 'Algorithms',
    semester: 'Semester 4',
    downloadUrl: '/materials/algo-lab.pdf',
    fileSize: '8.5 MB',
    uploadDate: new Date('2024-01-02'),
    description: 'Lab exercises and experiments'
  },
  {
    id: '3',
    title: 'Database Design Video Lecture',
    type: 'video',
    subject: 'Database Systems',
    semester: 'Semester 4',
    downloadUrl: '/materials/db-lecture-1.mp4',
    fileSize: '245 MB',
    uploadDate: new Date('2024-01-03'),
    description: 'Introduction to database design principles'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Library Maintenance',
    description: 'Clean and organize library books',
    location: 'Central Library - 2nd Floor',
    priority: 'high',
    status: 'in_progress',
    assignedDate: new Date('2024-01-10'),
    dueDate: new Date('2024-01-15'),
    assignedBy: 'Library Head'
  },
  {
    id: '2',
    title: 'AC Repair - Room 301',
    description: 'Fix air conditioning unit',
    location: 'Computer Science Block',
    priority: 'medium',
    status: 'pending',
    assignedDate: new Date('2024-01-12'),
    dueDate: new Date('2024-01-16'),
    assignedBy: 'Facilities Manager'
  }
];

export const mockEmails: Email[] = [
  {
    id: '1',
    from: 'sarah.wilson@campus.edu',
    to: ['john.doe@campus.edu'],
    subject: 'Assignment Submission Reminder',
    body: 'Dear John, This is a reminder that your Data Structures assignment is due tomorrow. Please submit it on time.',
    timestamp: new Date('2024-01-14T10:30:00'),
    read: false,
    folder: 'inbox'
  },
  {
    id: '2',
    from: 'admin@campus.edu',
    to: ['john.doe@campus.edu'],
    subject: 'Fee Payment Reminder',
    body: 'Your semester fee payment is due on January 15th. Please make the payment to avoid late fees.',
    timestamp: new Date('2024-01-13T14:15:00'),
    read: true,
    folder: 'inbox'
  }
];

export const mockTimeTable: TimeTable[] = [
  {
    id: '1',
    day: 'Monday',
    time: '09:00 - 10:30',
    subject: 'Data Structures',
    subjectCode: 'CS201',
    teacher: 'Dr. Sarah Wilson',
    room: 'Room 301',
    type: 'lecture'
  },
  {
    id: '2',
    day: 'Monday',
    time: '11:00 - 12:30',
    subject: 'Computer Networks',
    subjectCode: 'CS301',
    teacher: 'Prof. Michael Brown',
    room: 'Room 205',
    type: 'lecture'
  },
  {
    id: '3',
    day: 'Tuesday',
    time: '09:00 - 11:00',
    subject: 'Database Lab',
    subjectCode: 'CS401L',
    teacher: 'Dr. Lisa Wang',
    room: 'Lab 401',
    type: 'lab'
  }
];

export const mockPerformance: Performance = {
  id: '1',
  studentId: 'ST2024001',
  semester: 'Fall 2023',
  cgpa: 8.4,
  sgpa: 8.2,
  credits: 84,
  rank: 8,
  totalStudents: 45,
  attendance: 92,
  backlogs: 0
};