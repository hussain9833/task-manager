import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Task, TaskFormData, User } from '../types';
import { taskAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    dueDate: '',
    type: 'personal',
    assignedTo: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        type: task.type,
        assignedTo: task.assignedTo?._id || '',
      });
    }
    fetchUsers();
  }, [task]);

  const fetchUsers = async () => {
    try {
      const usersData = await taskAPI.getUsers();
      setUsers(usersData);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Submitting task data:', formData); // Debug log
      
      if (task) {
        await taskAPI.updateTask(task._id, formData);
      } else {
        await taskAPI.createTask(formData);
      }
      onSubmit();
    } catch (err: any) {
      console.error('Task submission error:', err); // Debug log
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setIsLoading(false);
    }
  };

  const isCreator = task?.createdBy._id === user?._id;
  const isAssignee = task?.assignedTo?._id === user?._id;
  const canEditAllFields = !task || isCreator;
  const canOnlyEditStatus = isAssignee && !isCreator;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {task ? 'Edit Task' : 'Create New Task'}
        </h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {canEditAllFields && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={canOnlyEditStatus}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div data-color-mode="light">
                    <MDEditor
                      value={formData.description}
                      onChange={(value) => setFormData(prev => ({ ...prev, description: value || '' }))}
                      preview="edit"
                      hideToolbar={canOnlyEditStatus}
                      height={200}
                      textareaProps={{
                        disabled: canOnlyEditStatus,
                        placeholder: "Enter task description..."
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.type}
                    onChange={handleChange}
                    disabled={canOnlyEditStatus || !!task}
                  >
                    <option value="personal">Personal</option>
                    <option value="assigned">Assigned</option>
                  </select>
                </div>

                {formData.type === 'assigned' && !task && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assign To
                    </label>
                    <select
                      name="assignedTo"
                      required={formData.type === 'assigned'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.assignedTo}
                      onChange={handleChange}
                    >
                      <option value="">Select a user</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.dueDate}
                    onChange={handleChange}
                    disabled={canOnlyEditStatus}
                  />
                </div>
              </>
            )}

            {canOnlyEditStatus && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue={task?.status}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      status: e.target.value as 'Todo' | 'In Progress' | 'Done'
                    }));
                  }}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
