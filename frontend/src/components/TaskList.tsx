import React, { useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, status: 'Todo' | 'In Progress' | 'Done') => void;
  currentUserId: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onUpdateStatus, currentUserId }) => {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Done':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Todo':
        return '📝';
      case 'In Progress':
        return '🔄';
      case 'Done':
        return '✅';
      default:
        return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'personal' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-orange-50 text-orange-700 border-orange-200';
  };

  const getTypeIcon = (type: string) => {
    return type === 'personal' ? '👤' : '👥';
  };

  const isCreator = (task: Task) => task.createdBy._id === currentUserId;
  const isAssignee = (task: Task) => task.assignedTo?._id === currentUserId;

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const handleStatusToggle = (task: Task, newStatus: 'Todo' | 'In Progress' | 'Done') => {
    if (task.status !== newStatus) {
      onUpdateStatus(task._id, newStatus);
    }
  };

  const getTaskCardStyle = (task: Task) => {
    if (isCreator(task)) {
      return 'border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white';
    } else if (isAssignee(task)) {
      return 'border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white';
    }
    return 'border-l-4 border-l-gray-300 bg-white';
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Get started by creating your first task.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md ${getTaskCardStyle(task)}`}
        >
          {/* Task Header */}
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Title and Badges */}
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                    <span className="mr-1">{getStatusIcon(task.status)}</span>
                    {task.status}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeColor(task.type)}`}>
                    <span className="mr-1">{getTypeIcon(task.type)}</span>
                    {task.type}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-3">
                  {expandedTasks.has(task._id) ? (
                    <div className="prose prose-sm max-w-none">
                      <MarkdownPreview 
                        source={task.description} 
                        style={{ backgroundColor: 'transparent' }}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-600 line-clamp-2">
                      {task.description.replace(/[#*`]/g, '').substring(0, 150)}...
                    </p>
                  )}
                  {task.description.length > 150 && (
                    <button
                      onClick={() => toggleTaskExpansion(task._id)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
                    >
                      {expandedTasks.has(task._id) ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-1">📅</span>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">👤</span>
                    Created by: <span className="font-medium text-gray-700 ml-1">{task.createdBy.username}</span>
                  </div>
                  {task.assignedTo && (
                    <div className="flex items-center">
                      <span className="mr-1">🎯</span>
                      Assigned to: <span className="font-medium text-gray-700 ml-1">{task.assignedTo.username}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 ml-4">
                {isCreator(task) && (
                  <>
                    <button
                      onClick={() => onEdit(task)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete(task._id)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Status Toggle Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Quick Status Update:</span>
                <div className="flex space-x-2">
                  {(['Todo', 'In Progress', 'Done'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusToggle(task, status)}
                      disabled={
                        !isAssignee(task)
                      }
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        task.status === status
                          ? getStatusColor(status)
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      } ${
                        !isAssignee(task)
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer hover:scale-105'
                      }`}
                    >
                      <span className="mr-1">{getStatusIcon(status)}</span>
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Role Indicator */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {isCreator(task) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                      👑 Creator - Full Access
                    </span>
                  )}
                  {isAssignee(task) && !isCreator(task) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                      🎯 Assignee - Status Update Only
                    </span>
                  )}
                </span>
                <span className="text-xs text-gray-400">
                  Created {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
