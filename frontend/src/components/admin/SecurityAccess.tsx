
import React, { useState } from 'react';
import { Shield, Lock, Key, User, Briefcase, GraduationCap, Users } from 'lucide-react';

const mockRoles = {
  Admin: {
    permissions: [
      { id: 'manage-users', label: 'Manage Users & Roles', enabled: true },
      { id: 'access-analytics', label: 'Access Full Analytics', enabled: true },
      { id: 'system-settings', label: 'Configure System Settings', enabled: true },
      { id: 'manage-billing', label: 'Manage Billing & Subscriptions', enabled: false },
    ],
    icon: Shield,
  },
  HOD: {
    permissions: [
      { id: 'manage-teachers', label: 'Manage Department Teachers', enabled: true },
      { id: 'view-department-analytics', label: 'View Department Analytics', enabled: true },
      { id: 'approve-requests', label: 'Approve Department Requests', enabled: true },
      { id: 'assign-courses', label: 'Assign Courses to Teachers', enabled: false },
    ],
    icon: Briefcase,
  },
  Teacher: {
    permissions: [
      { id: 'manage-grades', label: 'Manage Student Grades', enabled: true },
      { id: 'take-attendance', label: 'Take Class Attendance', enabled: true },
      { id: 'upload-materials', label: 'Upload Course Materials', enabled: true },
      { id: 'view-student-profiles', label: 'View Student Profiles', enabled: false },
    ],
    icon: GraduationCap,
  },
  Student: {
    permissions: [
      { id: 'access-courses', label: 'Access Enrolled Courses', enabled: true },
      { id: 'view-grades', label: 'View Personal Grades', enabled: true },
      { id: 'submit-assignments', label: 'Submit Assignments', enabled: true },
      { id: 'access-library', label: 'Access Digital Library', enabled: false },
    ],
    icon: User,
  },
  Parent: {
    permissions: [
      { id: 'view-child-grades', label: "View Child's Grades", enabled: true },
      { id: 'communicate-teachers', label: 'Communicate with Teachers', enabled: true },
      { id: 'pay-fees', label: 'Pay School Fees Online', enabled: true },
      { id: 'view-attendance', label: "View Child's Attendance", enabled: false },
    ],
    icon: Users,
  },
};

type Role = keyof typeof mockRoles;

const SecurityAccess: React.FC = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role>('Admin');

  const handleToggle = (permissionId: string) => {
    const updatedRoles = { ...roles };
    const permissions = updatedRoles[selectedRole].permissions;
    const permissionIndex = permissions.findIndex(p => p.id === permissionId);
    if (permissionIndex > -1) {
      permissions[permissionIndex].enabled = !permissions[permissionIndex].enabled;
      setRoles(updatedRoles);
    }
  };

  const RoleIcon = roles[selectedRole].icon;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Security & Access Control</h1>
        <p className="text-lg text-gray-600 mt-1">Manage roles and permissions across the platform.</p>
      </header>

      <div className="flex space-x-8">
        {/* Role Selection Sidebar */}
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Roles</h2>
            <nav className="space-y-2">
              {(Object.keys(roles) as Role[]).map(role => {
                const Icon = roles[role].icon;
                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left rounded-lg transition-all duration-200 ${
                      selectedRole === role
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{role}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Permissions Panel */}
        <div className="w-3/4">
          <div className="bg-white p-8 rounded-2xl shadow-lg border">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <RoleIcon className="text-red-600" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">{selectedRole} Permissions</h2>
            </div>
            
            <div className="space-y-5">
              {roles[selectedRole].permissions.map(permission => (
                <div key={permission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <p className="font-semibold text-gray-700">{permission.label}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permission.enabled}
                      onChange={() => handleToggle(permission.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-red-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAccess;
