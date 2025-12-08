import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import CampusEmail from './components/common/CampusEmail';

// Dashboards
import StudentDashboard from './components/dashboards/StudentDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import StaffDashboard from './components/dashboards/StaffDashboard';
import ParentDashboard from './components/dashboards/ParentDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import HodDashboard from './components/hod/HodDashboard';

// Student Components
import StudentFeeManagement from './components/student/FeeManagement';
import AcademicRecords from './components/student/AcademicRecords';
import StudyMaterials from './components/student/StudyMaterials';
import DocumentRequest from './components/student/DocumentRequest';
import NewDocumentRequest from './components/student/NewDocumentRequest';
import Scholarships from './components/student/Scholarships';
import TimeTable from './components/student/TimeTable';
import AcademicChatbot from './components/student/AcademicChatbot';

// Teacher Components
import ViewStudents from './components/teacher/ViewStudents';
import Marks from './components/teacher/Marks';
import Attendance from './components/teacher/Attendance';
import SubmitGrades from './components/teacher/SubmitGrades';
import ClassTeacherLogin from './components/teacher/ClassTeacherLogin';
import MyClass from './components/teacher/MyClass';
import CourseMaterial from './components/teacher/CourseMaterial';
import ClassSchedule from './components/teacher/ClassSchedule';
import Payroll from './components/teacher/Payroll';
import Documents from './components/teacher/Documents';

// Staff Components
import Tasks from './components/staff/Tasks';
import LeaveManagement from './components/staff/LeaveManagement';
import StaffPayroll from './components/staff/Payroll';
import WorkLocations from './components/staff/WorkLocations';
import StaffAttendance from './components/staff/Attendance';
import StaffDocuments from './components/staff/Documents';

// Parent Components
import ChildPerformance from './components/parent/ChildPerformance';
import ParentFeeManagement from './components/parent/FeeManagement';
import TeacherCommunication from './components/parent/TeacherCommunication';
import ProgressReports from './components/parent/ProgressReports';
import PTMSchedule from './components/parent/PTMSchedule';


// Common Components
import ProfileSettings from './components/common/ProfileSettings';
import Notifications from './components/common/Notifications';
import AssignStudents from './components/common/AssignStudents';

// Admin Components
import UserManagement from './components/admin/UserManagement';
import Analytics from './components/admin/Analytics';
import AcademicCalendar from './components/admin/AcademicCalendar';
import AdminFeeManagement from './components/admin/FeeManagement';
import DocumentManagement from './components/admin/DocumentManagement';
import ParentStudentLinks from './components/admin/ParentStudentLinks';
import Communications from './components/admin/Communications';
import SecurityAccess from './components/admin/SecurityAccess';

// HOD Components
import ManageTeachers from './components/hod/ManageTeachers';
import TeacherDetails from './components/hod/TeacherDetails';
import StudentOverview from './components/hod/StudentOverview';
import DepartmentAnalytics from './components/hod/DepartmentAnalytics';
import ApproveRequests from './components/hod/ApproveRequests';
import AssignClassTeacher from './components/hod/AssignClassTeacher';
import ManageCredentials from './components/hod/ManageCredentials';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user, isClassTeacherAuthenticated } = useAuth();

  const getDashboard = () => {
    switch (user?.role) {
      case 'student': return <StudentDashboard />;
      case 'teacher': return <TeacherDashboard />;
      case 'staff': return <StaffDashboard />;
      case 'parent': return <ParentDashboard />;
      case 'admin': return <AdminDashboard />;
      case 'hod': return <HodDashboard />;
      default: return <Navigate to="/login" />;
    }
  };
  
  const ClassTeacherRoute = () => {
    return isClassTeacherAuthenticated ? <Outlet /> : <Navigate to="/teacher/my-class-login" />;
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher/my-class-login" element={<ClassTeacherLogin />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={getDashboard()} />
        <Route path="dashboard" element={getDashboard()} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="email" element={<CampusEmail />} />
        <Route path="profile" element={<ProfileSettings />} />

        {/* Admin Routes */}
        <Route path="admin/users" element={<UserManagement />} />
        <Route path="admin/analytics" element={<Analytics />} />
        <Route path="admin/calendar" element={<AcademicCalendar />} />
        <Route path="admin/fees" element={<AdminFeeManagement />} />
        <Route path="admin/documents" element={<DocumentManagement />} />
        <Route path="admin/parent-student-links" element={<ParentStudentLinks />} />
        <Route path="admin/assign-students" element={<AssignStudents />} />
        <Route path="admin/communications" element={<Communications />} />
        <Route path="admin/security-access" element={<SecurityAccess />} />

        {/* Student Routes */}
        <Route path="student/fees" element={<StudentFeeManagement />} />
        <Route path="student/academics" element={<AcademicRecords />} />
        <Route path="student/materials" element={<StudyMaterials />} />
        <Route path="student/documents" element={<DocumentRequest />} />
        <Route path="student/documents/new" element={<NewDocumentRequest />} />
        <Route path="student/scholarships" element={<Scholarships />} />
        <Route path="student/timetable" element={<TimeTable />} />
        <Route path="student/chatbot" element={<AcademicChatbot />} />

        {/* Teacher Routes */}
        <Route path="teacher/students" element={<ViewStudents />} />
        <Route path="teacher/marks" element={<Marks />} />
        <Route path="teacher/grading" element={<SubmitGrades />} />
        <Route path="teacher/attendance" element={<Attendance />} />
        <Route path="teacher/materials" element={<CourseMaterial />} />
        <Route path="teacher/schedule" element={<ClassSchedule />} />
        <Route path="teacher/payroll" element={<Payroll />} />
        <Route path="teacher/documents" element={<Documents />} />
        
        {/* Class Teacher Special Routes */}
        <Route path="/teacher/my-class-login" element={<ClassTeacherLogin />} />
        <Route element={<ClassTeacherRoute />}>
            <Route path="/teacher/my-class" element={<MyClass />} />
        </Route>

        {/* Staff Routes */}
        <Route path="staff/tasks" element={<Tasks />} />
        <Route path="staff/leave" element={<LeaveManagement />} />
        <Route path="staff/payroll" element={<StaffPayroll />} />
        <Route path="staff/locations" element={<WorkLocations />} />
        <Route path="staff/attendance" element={<StaffAttendance />} />
        <Route path="staff/documents" element={<StaffDocuments />} />

        {/* Parent Routes */}
        <Route path="parent/child-performance" element={<ChildPerformance />} />
        <Route path="parent/fees" element={<ParentFeeManagement />} />
        <Route path="parent/communication" element={<TeacherCommunication />} />
        <Route path="parent/reports" element={<ProgressReports />} />
        <Route path="parent/ptm" element={<PTMSchedule />} />

        
        {/* HOD Routes */}
        <Route path="hod/dashboard" element={<HodDashboard />} /> 
        <Route path="hod/manage-teachers" element={<ManageTeachers />} />
        <Route path="hod/manage-teachers/:teacherId" element={<TeacherDetails />} />
        <Route path="hod/student-overview" element={<StudentOverview />} />
        <Route path="hod/department-analytics" element={<DepartmentAnalytics />} />
        <Route path="hod/approve-requests" element={<ApproveRequests />} />
        <Route path="hod/assign-class-teacher" element={<AssignClassTeacher />} />
        <Route path="hod/manage-credentials" element={<ManageCredentials />} />
        <Route path="hod/assign-students" element={<AssignStudents />} />

        <Route path="*" element={<div className="p-6">Page not found</div>} />
      </Route>
    </Routes>
  );
};

function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default AppWrapper;
