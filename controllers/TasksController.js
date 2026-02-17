let tasks = []
let tasksIndexes = []

// Get all tasks:
const getAllTasks = (req, res, next) => {

}

// Add a task:
const addTask = (req, res, next) => {
    const task = req.body.task
    const taskIndex = req.body.taskIndex

    if (!task) {
        return console.log('Error in accepting the request')
    }
    else if (tasks.find(t => t === task)) {
        return console.log('The task is alerady in the list')
    }
    console.log(task)
    console.log(taskIndex)

    tasks.push(task)
    tasksIndexes.push(taskIndex)
    res.status(200).json({task, taskIndex})
}

// Delete a task:
const deleteTask = (req, res, next) => {
    const taskIndex = Number(req.params.id)

    if (isNaN(taskIndex)) {
        return console.log('could not delete the task by that id')
    }

    console.log(tasks[taskIndex])
    console.log(taskIndex)

    tasksIndexes =  tasksIndexes.filter((task) => task !== taskIndex)
    tasks = tasks.filter((task) => task !== tasks[taskIndex])
    res.status(200).json({message: `The task "${tasks[taskIndex]}" is deleted`})
}

module.exports = {addTask, deleteTask, getAllTasks};