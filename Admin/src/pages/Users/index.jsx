import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import axios from 'axios';
import debounce from 'lodash.debounce';

// Helper function to format the date
const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

const UserList = () => {
  const [users, setUsers] = useState([]); // Store users
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users for pagination
  const [page, setPage] = useState(1); // Current page
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for view details
  const [isConfirmDelete, setIsConfirmDelete] = useState(null); // Delete confirmation state

  const pageSize = 10; // Number of users per page

  // Fetch users from API with pagination and search query
  const fetchUsers = async (page, searchQuery = '') => {
    try {
      const response = await axios.get('https://api.example.com/users', {
        params: {
          page,
          pageSize,
          search: searchQuery,
        },
      });

      setUsers(response.data.users); // Set the users
      setTotalUsers(response.data.totalUsers); // Set the total number of users for pagination
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users when the page or search query changes
  useEffect(() => {
    fetchUsers(page, searchQuery);
  }, [page, searchQuery]);

  // Debounced search handler
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page on search
  }, 500); // Delay 500ms after typing stops

  // Handle pagination click
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle user details view
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Handle delete confirmation
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    setIsConfirmDelete(null); // Close confirmation modal
  };

  // Cancel delete action
  const cancelDelete = () => {
    setIsConfirmDelete(null);
  };

  const totalPages = Math.ceil(totalUsers / pageSize); // Calculate total pages

  // Check if the Next button should be disabled
  const isNextDisabled = users.length < pageSize || page === totalPages;

  return (
    <AdminLayout title="Users">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold leading-tight">User List</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="px-4 py-2 border border-gray-300 rounded-lg"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              {users.length === 0 ? (
                <div className="py-4 px-6 text-center text-gray-500">No Data Found</div>
              ) : (
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight ${
                              user.status === 'Active' ? 'bg-green-200' : 'bg-red-200'
                            }`}
                          >
                            <span
                              aria-hidden
                              className="absolute inset-0 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">{user.status}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{formatDate(user.createdAt)}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                          <button
                            type="button"
                            className="inline-block text-gray-500 hover:text-gray-700 mr-2"
                            onClick={() => handleViewDetails(user)}
                          >
                            <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                              <path
                                d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="inline-block text-red-500 hover:text-red-700"
                            onClick={() => setIsConfirmDelete(user.id)}
                          >
                            <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                              <path
                                d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={isNextDisabled}
              className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-semibold">User Details</h3>
            <p className="mt-4">
              <strong>Name: </strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email: </strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role: </strong> {selectedUser.role}
            </p>
            <p>
              <strong>Status: </strong> {selectedUser.status}
            </p>
            <p>
              <strong>Created At: </strong> {formatDate(selectedUser.createdAt)}
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isConfirmDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold">Are you sure you want to delete this user?</h3>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => handleDelete(isConfirmDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserList;
