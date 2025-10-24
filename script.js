// ✅ Select elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const stats = document.getElementById("stats");
const addBtn = document.getElementById("addBtn");

// ✅ Load tasks from localStorage (or empty array)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ✅ Debug check
console.log("✅ script.js loaded successfully!");

// ✅ Button click event
addBtn.addEventListener("click", () => {
  console.log("➕ Add button clicked!");
  addTask();
});

// ✅ Press Enter to add task
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    console.log("⌨️ Enter pressed!");
    addTask();
  }
});

// ✅ Update stats
function updateStats() {
  const completed = tasks.filter(t => t.completed).length;
  stats.textContent = `✅ ${completed} done / 📌 ${tasks.length} total`;
}

// ✅ Save tasks in localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ✅ Render tasks on screen
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
        <span>${task.text}</span>
      <div class="actions">
        <button class="complete-btn" onclick="toggleTask(${index})">✔</button>
        <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  updateStats();
  saveTasks();
}

// ✅ Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    console.log("⚠️ Empty task ignored");
    return;
  }
  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks();
}

// ✅ Toggle complete/incomplete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// ✅ Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// ✅ Initial render when page loads
renderTasks();
