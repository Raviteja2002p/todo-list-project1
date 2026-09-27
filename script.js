const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addTaskBtn.addEventListener("click", addTask);

// Add task when pressing Enter
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        // Complete task
        li.querySelector("span").addEventListener("click", function () {

            task.completed = !task.completed;

            saveTasks();
            displayTasks();
        });

        // Delete task
        li.querySelector(".delete-btn").addEventListener("click", function () {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        });

        taskList.appendChild(li);
    });
}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}