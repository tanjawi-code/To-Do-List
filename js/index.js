const display_User_tasks_div = document.getElementById("user-tasks"); // this is for creating elements for task (h2 for titles) and (p for details).
const div_task_info = document.getElementById("div-info"); // this is for showing the inputs to write the title and details of the task.
const message = document.getElementById("message");
const taskTitle = document.getElementById("taskTitle");
const taskInput = document.getElementById("taskInput");

function addTask() {
    div_task_info.style.display  = "flex";
}

function confrimAddingTask() {
    let title = taskTitle.value;
    let details = taskInput.value; 

    if (title === "") {
        message.textContent = "Fill out the details above to add a task.";
    }
    else {
        message.textContent = "The task is added successfully.";
        message.style.color = "#0dff00";
        addUserTask(title, details)
    }    
}

function addUserTask(title, details) {
    let h3 = document.createElement("h2");
    let p = document.createElement("p");
    h3.textContent = title;
    p.textContent = details;

    document.getElementById("user-tasks").append(h3);
    document.getElementById("user-tasks").append(p);
}