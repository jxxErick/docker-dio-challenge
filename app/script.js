const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector("#list");

let tasks = [];

function addTask(event) {
  event.preventDefault();
  const taskText = input.value.trim();

  if (taskText === "") {
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText
  };

  tasks.push(task);
  saveTasks();
  input.value = "";
  displayTasks();
}

function displayTasks() {
  list.innerHTML = "";
  tasks.forEach(function(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(span);

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete");
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function deleteTask(event) {
  if (event.target.classList.contains("delete")) {
    const taskId = event.target.parentElement.getAttribute("data-id");
    tasks = tasks.filter(function(task) {
      return task.id !== parseInt(taskId);
    });
    saveTasks();
    displayTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

form.addEventListener("submit", addTask);
list.addEventListener("click", deleteTask);
