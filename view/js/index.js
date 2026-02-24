// This is a forntend file, used to send requests and send responses to the server.js. There is no frontend framework, just Vanilla JS.

const displayMessage = document.getElementById('message')
const tasksList = document.querySelector('ul')
let taskIndex = 0 

// Add a task:
async function addTask(e) {
    e.preventDefault()
    const formData = new FormData(this)
    const task = formData.get('addTask')
    
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
            const errorMessage = await response.json()
            throw new Error(errorMessage.message)
        }

        else {
            const data = await response.json()
            displayMessage.textContent = ''
            createElements(data)
        }
    }
    catch (error) {
        displayMessage.textContent = `${error.message}`
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
    li.appendChild(deleteButtonElement())

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
    taskLabel.id = `task${data.taskIndex}`
    taskLabel.htmlFor = `checkbox${data.taskIndex}`
    taskLabel.className = 'task-title'
    taskLabel.textContent = `${data.task}`

    return taskLabel
}
// Create a delete button that holds a delete icon.
function deleteButtonElement() {
    const deleteIcon = document.createElement('img')
    deleteIcon.width = "20"
    deleteIcon.src = "../icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
    deleteIcon.alt = "A delete icon"

    const deleteButton = document.createElement('button')
    deleteButton.appendChild(deleteIcon)

    // Handle the user clicks on the button.
    deleteButton.addEventListener('click' , () => {
        const liElement = deleteButton.parentElement
        const taskLabel = liElement.querySelector(`#task${liElement.id}`)
        submitDeleteTask(liElement, taskLabel)
    })

    return deleteButton
}

const formAdd = document.getElementById('formAddTask')
formAdd.addEventListener("submit", addTask)

// Submiting deletion after clicking a button (part of deleteButtonElement function).
async function submitDeleteTask(liElement, taskLabel) {
    const liElementID = Number(liElement.id)
    const taskTitle = taskLabel.textContent

    try {
        const response = await fetch(`http://localhost:8000/API/Routes/${liElementID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({taskTitle})
        })

        if (!response.ok) {
            const errorMessage = await response.json()
            throw new Error(errorMessage.message)
        }

        const data = await response.json()
        displayMessage.textContent = `${data.sucussMessage}`
        displayMessage.style.color = '#ffffff'
        tasksList.removeChild(liElement)
    }
    catch(error) {
        displayMessage.textContent = `${error.message}`
        displayMessage.style.color = '#ff0000'
    }
}