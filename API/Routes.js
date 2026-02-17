const express = require('express')
const router = express.Router()
const controllers  = require('../controllers/TasksController.js')

// Get tasks.
router.get('/', controllers.getAllTasks)

// Add a task
router.post('/API/Routes', controllers.addTask)

// Delete a task
router.delete('/:id', controllers.deleteTask)

module.exports = router;