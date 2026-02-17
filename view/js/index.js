// This is a forntend file, used to send requests and send responses to the server.js. There is no frontend framework, just Vanilla JS.

const displayMessage = document.getElementById('message')
const tasksList = document.querySelector('ul')
const displayTasks = document.querySelectorAll('ul li')
let taskIndex = 0 

// Add a task:
async function addTask(e) {
    e.preventDefault()
    const formData = new FormData(this)
    const task = formData.get('addTask')
    
    if (task !== '') {
        try {
            taskIndex++
            const response = await fetch(`http://localhost:8000/API/Routes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({task, taskIndex})
            });

            if (!response.ok) {
                taskIndex--
                return new Error('Failed to send an HTTP request (method:POST)')
            }

            const data = await response.json()
            createElements(data)
        }
        catch (error) {
            console.error(error)
        }
    }
    else {
        displayMessage.textContent = 'The task title is required'
        displayMessage.style.color = '#ff0000'
    }
}

function createElements(data) {

    // append elements to the li elmenet:
    const li = document.createElement('li')
    li.id = `${data.taskIndex}`
    li.appendChild(inputElement(data.taskIndex))
    li.appendChild(selectLabelElement(data.taskIndex))
    li.appendChild(taskLabelElement(data))
    li.appendChild(deleteButtonElement(data.taskIndex))

    tasksList.appendChild(li)
}

// Create an input element of checkbox.
function inputElement(taskIndex) {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.id = `checkbox${taskIndex}`
    return input;
}
// Create a label that holds an icon.
function selectLabelElement(taskIndex) {
    const checkIcon = document.createElement('img')
    checkIcon.width = "25"
    checkIcon.src = "../icons/check_box_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
    checkIcon.alt = "A select icon"

    const selectLabel = document.createElement('label')
    selectLabel.className = 'custome-checkbox'
    selectLabel.htmlFor = `checkbox${taskIndex}`

    selectLabel.appendChild(checkIcon)

    return selectLabel
}
// Create a label for the task.
function taskLabelElement(data) {
    const taskLabel = document.createElement('label')
    taskLabel.htmlFor = `checkbox${data.taskIndex}`
    taskLabel.className = 'task-title'
    taskLabel.textContent = `${data.task}`

    return taskLabel
}
// Create a delete button that holds a delete icon.
function deleteButtonElement(taskIndex) {
    const deleteIcon = document.createElement('img')
    deleteIcon.width = "20"
    deleteIcon.src = "../icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
    deleteIcon.alt = "A delete icon"

    const deleteButton = document.createElement('button')
    deleteButton.type = 'submit'
    deleteButton.appendChild(deleteIcon)

    const form = document.createElement('form')
    form.id = `formDelete${taskIndex}`
    form.appendChild(deleteButton)

    return form
}

const formAdd = document.getElementById('formAddTask')
formAdd.addEventListener("submit", addTask)

// Delete task:
function deleteTask(e) {
    e.preventDefault()
    const formData = new FormData(this)
    
    document.querySelectorAll('ul form button').forEach((button) => {
        button.addEventListener('click', () => {
            const selectedFormDelete = button.parentElement
            const liElement = selectedFormDelete.parentElement
            selectedFormDelete.addEventListener('submit', submitDeleteTask(liElement))
        })
    })
}

// Submiting deletion after clicking a button (part of deleteTask function).
async function submitDeleteTask(liElement) {
    const liElementID = Number(liElement.id)

    try {
        const response = await fetch(`http://localhost:8000/API/Routes/${liElementID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            return new Error('Failed to delete the task')
        }
    }
    catch(error) {
        console.error(error)
    }
}