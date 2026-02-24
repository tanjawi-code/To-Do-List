let tasks = []
let tasksIndexes = []

// Add a task:
const addTask = (req, res, next) => {
    const task = req.body.task
    const taskIndex = req.body.taskIndex

    if (!task) {
        return next(passError(400, 'The task is required to be added'))
    }
    else if (tasks.find(t => t === task)) {
        return next(passError(400, 'The task is alerady in the list'))
    }

    tasks.push(task)
    tasksIndexes.push(taskIndex)
    res.status(200).json({task, taskIndex})
}

// Delete a task:
const deleteTask = (req, res, next) => {
    const taskIndex = parseInt(req.params.id)
    const taskTitle = req.body.taskTitle
    
    if (isNaN(taskIndex)) {
        return next(passError(400, `Error while trying to delete the task.`))
    }

    tasksIndexes = tasksIndexes.filter((i) => i !== taskIndex)
    tasks = tasks.filter((t) => t !== taskTitle)

    res.status(200).json({sucussMessage: `The task "${taskTitle}" is deleted`})
}

function passError(status, message) {
    const error = new Error(message)
    error.status = status
    return error;
}

module.exports = {addTask, deleteTask};