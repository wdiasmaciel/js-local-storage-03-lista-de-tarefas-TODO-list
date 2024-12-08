function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push({ text: task, completed: false });
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function removeTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function toggleTaskCompletion(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function renderTasks() {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTaskCompletion(${index})">${task.completed ? 'Desmarcar' : 'Concluir'}</button>
                <button onclick="removeTask(${index})">Remover</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

document.getElementById('addTaskButton').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

renderTasks();