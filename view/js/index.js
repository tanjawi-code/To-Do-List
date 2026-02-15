// This is a forntend file, used to send requests and send responses to the server.js. There is no frontend framework, just Vanilla JS.

const displayMessage = document.getElementById('message')
const tasksList = document.querySelector('.tasks-section ul')
const displayTasks = document.querySelectorAll('.tasks-section ul il')


async function addTask(e) {
    e.preventDefault()
    const formData = new FormData(this)
    const task = formData.get('addTask')
    
    if (task !== '') {
        // Send HTTP requests and hanlde responoses
    }
    else {
        displayMessage.textContent = 'The task title is required'
        displayMessage.style.color = '#ff0000'
    }
}

const form = document.getElementById('formTask')
form.addEventListener("submit", addTask)