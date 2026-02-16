// This is a forntend file, used to send requests and send responses to the server.js. There is no frontend framework, just Vanilla JS.

const displayMessage = document.getElementById('message')
const tasksList = document.querySelector('.tasks-section ul')
const displayTasks = document.querySelectorAll('.tasks-section ul li')
const userTasks = []


async function addTask(e) {
    e.preventDefault()
    const formData = new FormData(this)
    const task = formData.get('addTask')
    
    if (task !== '') {
        try {
            const response = await fetch(`http://localhost:8000/API/Routes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({task})
            });

            if (!response.ok) {
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
    userTasks.push(data.task)

    // append elements to the li:
    const li = document.createElement('li')
    li.appendChild(inputElement(userTasks))
    li.appendChild(selectLabelElement(userTasks))
    li.appendChild(taskLabelElement(userTasks, data))
    li.appendChild(deleteButtonElement())

    tasksList.appendChild(li)
}

// Create an input element of checkbox.
function inputElement(userTasks) {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.id = `${userTasks.length}`
    return input;
}
// Create a label that holds an icon.
function selectLabelElement(userTasks) {
    const checkIcon = document.createElement('img')
    checkIcon.width = "25"
    checkIcon.src = "../icons/check_box_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
    checkIcon.alt = "A select icon"

    const selectLabel = document.createElement('label')
    selectLabel.className = 'custome-checkbox'
    selectLabel.htmlFor = `${userTasks.length}`

    selectLabel.appendChild(checkIcon)

    return selectLabel
}
// Create a label for the task.
function taskLabelElement(userTasks, data) {
    const taskLabel = document.createElement('label')
    taskLabel.htmlFor = `${userTasks.length}`
    taskLabel.className = 'task-title'
    taskLabel.textContent = `${data.task}`

    return taskLabel
}
// Create a delete button that holds a delete icon.
function deleteButtonElement() {
    const deleteIcon = document.createElement('img')
    deleteIcon.width = "15"
    deleteIcon.src = "../icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
    deleteIcon.alt = "A delete icon"

    const deleteButton = document.createElement('button')
    deleteButton.appendChild(deleteIcon)

    return deleteButton
}

// Delete button.

const form = document.getElementById('formTask')
form.addEventListener("submit", addTask)