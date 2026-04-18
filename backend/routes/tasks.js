const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks for the current user
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({
            $or: [
                { createdBy: req.user._id },
                { assignedTo: req.user._id }
            ]
        })
        .populate('createdBy', 'username email')
        .populate('assignedTo', 'username email')
        .sort({ createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new task
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, dueDate, type, assignedTo } = req.body;

        // Validate assignedTo for assigned tasks
        let assignedToId = null;
        if (type === 'assigned') {
            if (!assignedTo) {
                return res.status(400).json({ message: 'assignedTo is required for assigned tasks' });
            }
            // Check if assignedTo is a valid ObjectId format
            const mongoose = require('mongoose');
            if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
                return res.status(400).json({ message: 'Invalid user ID for assignment' });
            }
            assignedToId = assignedTo;
        }

        const task = new Task({
            title,
            description,
            dueDate,
            type: type || 'personal',
            createdBy: req.user._id,
            assignedTo: assignedToId
        });

        await task.save();
        await task.populate('createdBy', 'username email');
        await task.populate('assignedTo', 'username email');

        res.status(201).json(task);
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single task
router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('createdBy', 'username email')
            .populate('assignedTo', 'username email');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if user has access to this task
        if (task.createdBy._id.toString() !== req.user._id.toString() && 
            task.assignedTo?._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(task);
    } catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if user has access to this task
        const isCreator = task.createdBy.toString() === req.user._id.toString();
        const isAssignee = task.assignedTo?.toString() === req.user._id.toString();

        if (!isCreator && !isAssignee) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { title, description, status, dueDate } = req.body;

        // Apply role-based permissions
        if (isAssignee && !isCreator) {
            // Assignee can only update status
            if (title || description || dueDate) {
                return res.status(403).json({ 
                    message: 'Assignee can only update task status' 
                });
            }
            if (status) {
                task.status = status;
            }
        } else if (isCreator) {
            // Creator can update everything except status for assigned tasks
            if (task.type === 'assigned' && status) {
                return res.status(403).json({ 
                    message: 'Creator cannot update status of assigned tasks' 
                });
            }
            if (title) task.title = title;
            if (description) task.description = description;
            if (dueDate) task.dueDate = dueDate;
            if (status && task.type === 'personal') task.status = status;
        }

        await task.save();
        await task.populate('createdBy', 'username email');
        await task.populate('assignedTo', 'username email');

        res.json(task);
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Only creator can delete tasks
        if (task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only creator can delete tasks' });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users for task assignment
router.get('/users/all', auth, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } })
            .select('username email')
            .sort({ username: 1 });

        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
