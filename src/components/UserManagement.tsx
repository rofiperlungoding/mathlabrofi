import React, { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { User, Plus, Settings, Trash2, RotateCcw, Crown, Clock } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const {
    currentUser,
    allUsers,
    createNewUser,
    switchToUser,
    deleteUser,
    updateUserName,
    resetProgress,
    resetAllProgress,
    progress
  } = useProgress();
  
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleCreateUser = () => {
    if (newUserName.trim()) {
      createNewUser(newUserName.trim());
      setNewUserName('');
      setShowUserModal(false);
    }
  };

  const handleEditUser = (userId: string, currentName: string) => {
    setEditingUserId(userId);
    setEditName(currentName);
  };

  const handleSaveEdit = () => {
    if (editingUserId && editName.trim()) {
      updateUserName(editingUserId, editName.trim());
      setEditingUserId(null);
      setEditName('');
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? All progress will be lost.')) {
      deleteUser(userId);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      resetProgress();
    }
  };

  const handleResetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset ALL user progress? This cannot be undone.')) {
      resetAllProgress();
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-primary flex items-center gap-2 dark:text-white">
          <User size={20} />
          User Management
        </h3>
        <button
          onClick={() => setShowUserModal(true)}
          className="btn btn-primary text-sm flex items-center gap-2"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Current User Info */}
      {currentUser && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{currentUser.avatar}</div>
              <div>
                <h4 className="font-medium text-primary dark:text-white flex items-center gap-2">
                  <Crown size={16} className="text-yellow-500" />
                  {currentUser.name}
                </h4>
                <p className="text-sm text-secondary dark:text-neutral-400">Current User</p>
              </div>
            </div>
            <button
              onClick={handleResetProgress}
              className="btn btn-secondary text-xs flex items-center gap-1"
            >
              <RotateCcw size={12} />
              Reset Progress
            </button>
          </div>
          
          {/* Progress Summary */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{progress.level}</div>
              <div className="text-xs text-secondary dark:text-neutral-400">Level</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">{progress.totalXP}</div>
              <div className="text-xs text-secondary dark:text-neutral-400">XP</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{progress.completedLessons.length}</div>
              <div className="text-xs text-secondary dark:text-neutral-400">Lessons</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{progress.currentStreak}</div>
              <div className="text-xs text-secondary dark:text-neutral-400">Streak</div>
            </div>
          </div>
        </div>
      )}

      {/* All Users List */}
      <div className="space-y-3">
        <h4 className="font-medium text-primary dark:text-white">All Users ({allUsers.length})</h4>
        
        {allUsers.map((user) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
              currentUser?.id === user.id
                ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-xl">{user.avatar}</div>
              <div>
                {editingUserId === user.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="input input-sm w-32"
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                      autoFocus
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="btn btn-primary btn-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUserId(null)}
                      className="btn btn-secondary btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="font-medium text-primary dark:text-white flex items-center gap-2">
                      {user.name}
                      {currentUser?.id === user.id && (
                        <Crown size={14} className="text-yellow-500" />
                      )}
                    </div>
                    <div className="text-xs text-secondary dark:text-neutral-400 flex items-center gap-1">
                      <Clock size={12} />
                      Last active: {formatDate(user.lastActive)}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {currentUser?.id !== user.id && (
                <button
                  onClick={() => switchToUser(user.id)}
                  className="btn btn-secondary btn-sm"
                >
                  Switch
                </button>
              )}
              
              <button
                onClick={() => handleEditUser(user.id, user.name)}
                className="btn btn-ghost btn-sm p-2"
              >
                <Settings size={14} />
              </button>
              
              {allUsers.length > 1 && (
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="btn btn-ghost btn-sm p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <h4 className="font-medium text-red-600 dark:text-red-400 mb-3">Danger Zone</h4>
        <button
          onClick={handleResetAllProgress}
          className="btn btn-secondary text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset All User Progress
        </button>
      </div>

      {/* Create User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">Create New User</h3>
            
            <div className="mb-4">
              <label className="block text-sm text-secondary dark:text-neutral-300 mb-2">User Name</label>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="input w-full"
                placeholder="Enter user name..."
                onKeyDown={(e) => e.key === 'Enter' && handleCreateUser()}
                autoFocus
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleCreateUser}
                disabled={!newUserName.trim()}
                className="btn btn-primary flex-1 disabled:opacity-50"
              >
                Create User
              </button>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setNewUserName('');
                }}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};