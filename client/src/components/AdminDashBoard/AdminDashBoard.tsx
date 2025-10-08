import { useEffect, useState } from 'react';
import { Search, LogOut, Trash2, Edit, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../redux/store';
import { logoutAdmin } from '../../redux/middleware/logoutAdmin';
import { getUsersAdmin } from '../../redux/middleware/getUsersAdmin';
import { useNavigate } from 'react-router-dom';
import { deleteUserAdmin } from '../../redux/middleware/deleteUserAdimin';
import { setEditPop } from '../../redux/slice/adminSlice/adminSlice';

const UserTable = () => {

  const navigate = useNavigate();
  const { admin, users, loading } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim() !== '') {
        dispatch(getUsersAdmin(query));
      } else {
        dispatch(getUsersAdmin());
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, dispatch]);

  useEffect(() => {
    if (!admin) navigate('/admin');
    dispatch(getUsersAdmin());
  }, [admin, dispatch, navigate, loading]);

  const handleLogout = () => {
    dispatch(logoutAdmin());
  };

  const handleEdit = (id: string) => {
    dispatch(setEditPop());
    navigate(`/edit-user/${id}`);
  };

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    userId: null as string | null,
    userName: '',
  });

  const deleteUser = (userId: string, userName: string) => {
    setDeleteModal({
      isOpen: true,
      userId,
      userName,
    });
  };

  const confirmDelete = (id: string) => {
    dispatch(deleteUserAdmin(id))
    setDeleteModal({ isOpen: false, userId: null, userName: '' });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, userId: null, userName: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with search and logout */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Users ({users.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(user._id)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit user"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user._id, user.name)}
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete User
              </h3>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteModal.userName}"? This
              action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteModal.userId)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
