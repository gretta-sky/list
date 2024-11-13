const addBtn = document.querySelector("button.addBtn");
const editBtn = document.querySelector("button.editBtn");
const taskInput = document.querySelector("input.taskInput");
const tasksList = document.querySelector("ul.tasksList");

let tasks = [];

let currentId = 0;
let currentEditTaskTextEl = null;
let currentEditTask = null;

const handleTaskClick = (task, containerEl) => {
    tasks.forEach((t, i) => {
      if (t.id === task.id) {
        tasks[i].isComplete = !task.isComplete;
        containerEl.classList.toggle("checked");
      }
    });
};

const toggleAddAndEditBtns = () => {
    addBtn.classList.toggle("hidden");
    editBtn.classList.toggle("hidden");
  };

  const handleEditTask = (task, textEl) => {
    if (currentEditTask) return;
  
    toggleAddAndEditBtns();

    currentEditTaskEl = textEl;
    currentEditTask = task;
    taskInput.value = task.text;
  };

  const handleCloseTask = (task, containerEl) => {
    tasks = tasks.filter((t) => t.id !== task.id);
    containerEl.remove();
  };

  const renderTask = (task) => {
    const container = document.createElement("li");
    const textBox = document.createElement("div");
    const btnBox = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
  
    textBox.classList.add("val");
    editBtn.classList.add("edit");
    deleteBtn.classList.add("close");
  
    textBox.textContent = task.text;
    editBtn.innerHTML = "&#9998";
    deleteBtn.innerHTML = "\u00D7";
  
    container.addEventListener("click", () => handleTaskClick(task, container));
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleEditTask(task, textBox);
    });
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleCloseTask(task, container);
    });
  
    btnBox.append(editBtn, deleteBtn);
    container.append(textBox, btnBox);
  
    tasksList.prepend(container);
    taskInput.value = "";
  };

  const editTask = () => {
    const newText = taskInput.value.trim();
  
    currentEditTaskEl.textContent = newText;
    currentEditTaskEl = null;
  
    tasks.forEach((task, i) => {
      if (task.id === currentEditTask.id) {
        tasks[i].text = newText;
      }
    });
    currentEditTask = null;

    toggleAddAndEditBtns();
    taskInput.value = "";
  };

  const createTask = () => {
    const text = taskInput.value;
    const task = {
      id: currentId,
      text,
      completed: false,
    };
  
    currentId++;
    tasks.unshift(task);
  
    renderTask(task);
  };

  taskInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      currentEditTask ? editTask() : createTask();
    }
  });
  
  addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;
  
    createTask();
  });
  
  editBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;
  
    editTask();
  });
  


















