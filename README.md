# Task Manager App

A modern task management application with role-based permissions, built with React and Node.js. Perfect for teams and personal task tracking.

## 🌟 Features

- **User Authentication**: Secure login and registration system
- **Task Management**: Create, edit, delete, and track tasks
- **Role-Based Permissions**: 
  - **Creators** can create and manage tasks
  - **Assignees** can update task status
  - Smart permission controls for assigned vs personal tasks
- **Real-time Status Updates**: Quick status toggle (Todo, In Progress, Done)
- **User Assignment**: Assign tasks to team members
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Auto Keep-Alive**: Prevents server spin-down delays

## 🚀 Quick Start

### Demo Credentials
Try the app immediately with these demo accounts:

**Creator Account:**
- Email: `khwajaatzar@gmail.com`
- Password: `@Skkhwaja98`

**Assignee Account:**
- Email: `hussain@gmail.com`
- Password: `@Skkhwaja98`

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcryptjs
- Protected routes and middleware

### Task Management
- Create, read, update, and delete tasks
- Two types of tasks: Personal and Assigned
- Role-based permissions for task operations
- Task status tracking (Todo, In Progress, Done)
- Due date management

### Role-Based Permissions
- **Personal Tasks**: Full access for the creator
- **Assigned Tasks**:
  - **Assignee**: Can only update task status
  - **Assigner**: Can view, set/update due date, but cannot update status

### Frontend Features
- Clean and responsive UI using Tailwind CSS
- Loading states and error handling
- Protected routes
- Real-time task management

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

### 1. **Clone the repository**
```bash
git clone https://github.com/hussain9833/task-manager.git
cd task-manager
```

### 2. **Backend Setup**
```bash
cd backend
npm install
```

### 3. **Create Backend Environment File**
Create `.env` file in backend folder:
```env
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your-secret-key-here
PORT=5000
```

### 4. **Start Backend Server**
```bash
npm start
```

### 5. **Frontend Setup**
```bash
cd ../frontend
npm install
```

### 6. **Create Frontend Environment File**
Create `.env` file in frontend folder:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 7. **Start Frontend**
```bash
npm start
```

### 8. **Open the App**
Visit `http://localhost:3000` in your browser

## 📖 How to Use

### 1. **Create an Account**
- Click "Register" on the login page
- Enter your username, email, and password
- Or use the demo credentials above

### 2. **Create Your First Task**
- Click "Create New Task" on the dashboard
- Fill in task details:
  - **Title**: Brief task name
  - **Description**: Detailed task information (supports Markdown)
  - **Type**: Personal (for yourself) or Assigned (for team members)
  - **Due Date**: When the task should be completed
  - **Assign To**: Select team member (for assigned tasks)

### 3. **Task Permissions**

#### **Personal Tasks**
- You (creator) can: Edit everything, update status, delete task
- Status buttons: ✅ Enabled for you

#### **Assigned Tasks**
- **Creator** (who created the task):
  - Can: Edit title, description, due date
  - Can: Delete task
  - Cannot: Update status (only assignee can)
  - Status buttons: ❌ Disabled

- **Assignee** (who received the task):
  - Can: Update task status only
  - Cannot: Edit other details
  - Status buttons: ✅ Enabled

### 4. **Update Task Status**
- **For Assignees**: Click the status buttons (📝 Todo, 🔄 In Progress, ✅ Done)
- **For Creators**: Only on personal tasks, not assigned tasks

### 5. **Edit or Delete Tasks**
- Click the "✏️ Edit" or "🗑️ Delete" buttons
- Only available to task creators

## 🎯 Demo Workflow

1. **Login as Khwaja** (creator)
2. **Create a task** and assign it to Hussain
3. **Notice**: Status buttons are disabled (you're the creator)
4. **Logout and login as Hussain** (assignee)
5. **See the task** with enabled status buttons
6. **Update the status** from Todo → In Progress → Done
7. **Switch back to Khwaja** to see the updated status

## 🏗️ Project Structure

```
task-manager/
├── backend/
│   ├── models/          # Database models (User, Task)
│   ├── routes/          # API routes (auth, tasks)
│   ├── middleware/      # Authentication middleware
│   ├── .env            # Backend environment variables
│   └── server.js       # Main server file with keep-alive
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── context/     # React context (Auth)
│   │   └── types/       # TypeScript types
│   ├── .env            # Frontend environment variables
│   └── package.json
└── README.md
```

## 🔧 Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React** with TypeScript
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Markdown Editor** for task descriptions

## 🌐 Deployment

### Backend Deployment (Render/Heroku)
1. Push code to GitHub
2. Connect your repository to Render/Heroku
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` (usually set automatically)

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder
3. Set environment variable: `REACT_APP_API_URL` (your deployed backend URL)

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Role-based access control
- Input validation and sanitization

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot connect to backend"**
   - Ensure backend is running on port 5000
   - Check `REACT_APP_API_URL` in frontend .env

2. **"Login not working"**
   - Verify MongoDB connection
   - Check JWT_SECRET in backend .env

3. **"Status buttons disabled"**
   - This is correct behavior for creators of assigned tasks
   - Only assignees can update assigned task status

4. **"Server spin-down delay"**
   - Keep-alive feature prevents this automatically
   - Server pings itself every 14 minutes

## 📝 License

This project is for educational purposes. Feel free to use and modify for your learning.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please check the troubleshooting section above or create an issue in the repository.

---

**Happy Task Managing! 🎉**
