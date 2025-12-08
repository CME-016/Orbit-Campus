import React, { useEffect, useState } from 'react';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost/php/api/get_users.php')
      .then(response => response.json())
      .then(data => {
        if (data.records) {
          setUsers(data.records);
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch('http://localhost/php/api/delete_user.php', {
        method: 'POST', // Using POST as specified in the PHP file
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId })
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          fetchUsers(); // Refresh the user list
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost/php/api/update_user.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedUser)
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setIsEditModalOpen(false);
        fetchUsers(); // Refresh the user list
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleEdit(user)} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Edit User</h3>
            <form onSubmit={handleUpdateUser}>
              <div className="mt-4">
                <label>Name</label>
                <input 
                  type="text" 
                  value={selectedUser.name} 
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})} 
                  className="w-full p-2 border border-gray-300 rounded mt-1" />
              </div>
              <div className="mt-4">
                <label>Email</label>
                <input 
                  type="email" 
                  value={selectedUser.email} 
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})} 
                  className="w-full p-2 border border-gray-300 rounded mt-1" />
              </div>
              <div className="mt-4">
                <label>Role</label>
                <select 
                  value={selectedUser.role} 
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})} 
                  className="w-full p-2 border border-gray-300 rounded mt-1">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="staff">Staff</option>
                  <option value="parent">Parent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
