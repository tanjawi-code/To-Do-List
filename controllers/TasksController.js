let tasks = []

// Add a task:
const addTask = (req, res, next) => {
    // Next time: Adding checking if the task is alerady stored, and sent the corecct status code with a simple message.
    const task = req.body.task

    if (!task) {
        return console.log('Error in accepting the request')
    }

    tasks.push(task)
    res.status(200).json({task})
}

// Delete a task:
const deleteTask = (req, res, next) => {

}

module.exports = {addTask, deleteTask};