const express = require('express')
const router = express.Router()
const controllers  = require('../controllers/TasksController.js')

// Add a task
router.post('', controllers.addTask)

// Delete a task
router.delete('', controllers.deleteTask)

module.exports = router;