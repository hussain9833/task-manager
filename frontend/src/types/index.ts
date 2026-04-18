export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done';
  dueDate: string;
  type: 'personal' | 'assigned';
  createdBy: User;
  assignedTo: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  type: 'personal' | 'assigned';
  assignedTo?: string;
  status?: 'Todo' | 'In Progress' | 'Done';
}
