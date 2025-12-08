export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'staff' | 'parent' | 'admin';
  avatar?: string;
  department?: string;
  studentId?: string;
  employeeId?: string;
  childId?: string;
  phone?: string;
  address?: string;
  joinDate?: Date;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
  targetRole: string[];
  priority?: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

export interface FeeDetail {
  id: string;
  type: string;
  amount: number;
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  semester: string;
  description?: string;
  paidAmount?: number;
  paymentDate?: Date;
  receiptNumber?: string;
}

export interface AcademicRecord {
  id: string;
  subject: string;
  subjectCode: string;
  credits: number;
  grade: string;
  marks: number;
  maxMarks: number;
  semester: string;
  year: string;
  teacher: string;
  attendance: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'approved' | 'pending' | 'rejected' | 'processing';
  requestDate: Date;
  approvalDate?: Date;
  downloadUrl?: string;
  description?: string;
  fees?: number;
  estimatedDays?: number;
}

export interface Scholarship {
  id: string;
  name: string;
  type: 'merit' | 'need' | 'sports' | 'cultural';
  amount: number;
  status: 'applied' | 'under_review' | 'approved' | 'rejected';
  applicationDate: Date;
  deadline: Date;
  description: string;
  eligibility: string[];
}

export interface AcademicMaterial {
  id: string;
  title: string;
  type: 'textbook' | 'pdf' | 'video' | 'lab_manual' | 'assignment';
  subject: string;
  semester: string;
  downloadUrl?: string;
  fileSize?: string;
  uploadDate: Date;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  assignedDate: Date;
  dueDate: Date;
  completedDate?: Date;
  assignedBy: string;
}

export interface Email {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
  starred?: boolean;
  attachments?: string[];
  folder: 'inbox' | 'sent' | 'drafts' | 'trash';
}

export interface TimeTable {
  id: string;
  day: string;
  time: string;
  subject: string;
  subjectCode: string;
  teacher: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

export interface PayrollData {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'processed' | 'pending' | 'hold';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'sick' | 'casual' | 'medical' | 'maternity' | 'emergency';
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: Date;
  approvedBy?: string;
  approvalDate?: Date;
}

export interface Performance {
  id: string;
  studentId: string;
  semester: string;
  cgpa: number;
  sgpa: number;
  credits: number;
  rank: number;
  totalStudents: number;
  attendance: number;
  backlogs: number;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  departmentStats: {
    name: string;
    students: number;
    faculty: number;
    performance: number;
  }[];
  feesCollection: {
    collected: number;
    pending: number;
    overdue: number;
  };
  academicProgress: {
    semester: string;
    averageCGPA: number;
    passPercentage: number;
  }[];
}