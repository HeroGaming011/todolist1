// Select elements
const taskInput = document.getElementById("task");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from Local Storage when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add button click event
addBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form refresh

  const taskText = taskInput.value.trim();
  if (taskText === "") return; // Do nothing if input is empty

  addTaskToDOM(taskText); // Add to list in the browser
  saveTask(taskText); // Save to Local Storage
  taskInput.value = ""; // Clear input
});

// Add a task to the page
function addTaskToDOM(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    deleteTask(taskText); // Remove from Local Storage
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save a task to Local Storage
function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete a task from Local Storage
function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from Local Storage into DOM
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task));
}
