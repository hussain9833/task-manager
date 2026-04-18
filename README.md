# Task Management System - MERN Stack

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application demonstrates authentication, authorization, and role-based permissions for task management.

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

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Environment Variables for Backend

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/task-management
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

### 5. Environment Variables for Frontend (Optional)

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### 1. Start MongoDB

Make sure MongoDB is running on your system:
- For local MongoDB: `mongod`
- For MongoDB Atlas: Ensure your cluster is running

### 2. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Start the Frontend Development Server

Open a new terminal and run:

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`

## Sample User Credentials

You can create your own accounts during registration, or use these sample credentials after creating them:

### User 1
- **Username**: johndoe
- **Email**: john@example.com
- **Password**: password123

### User 2
- **Username**: janedoe
- **Email**: jane@example.com
- **Password**: password123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get all tasks for current user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/users/all` - Get all users for task assignment

## Project Structure

```
task-management-system/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskForm.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Usage Instructions

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View all your tasks (personal and assigned)
3. **Create Task**: Click "Create New Task" to add a new task
4. **Task Types**:
   - **Personal**: Only visible to you
   - **Assigned**: Assign to another user
5. **Edit/Delete**: 
   - Task creators can edit all fields and delete tasks
   - Assignees can only update task status
6. **Status Updates**: Track task progress through Todo → In Progress → Done

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- Protected routes ensure only authenticated users can access resources
- Role-based permissions prevent unauthorized access to tasks
- Environment variables store sensitive configuration

## Deployment

### Backend Deployment (Heroku Example)

1. Install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables: `heroku config:set JWT_SECRET=your-secret MONGODB_URI=your-mongo-uri`
5. Deploy: `git push heroku main`

### Frontend Deployment (Netlify/Vercel)

1. Build the app: `npm run build`
2. Deploy to Netlify/Vercel
3. Set environment variable: `REACT_APP_API_URL=your-backend-url`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For any questions or issues, please create an issue in the repository.
