import ToDoList from './ToDoList.js';
import Task from './Task.js';

const toDoList = new ToDoList();

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('task-title').value;

    if (title) {
        const task = new Task(title);
        toDoList.addTask(task);
        displayTasks();
        this.reset();
    }
});

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasks = toDoList.getTasks();
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);
        taskItem.innerHTML = `
            <span>${task.title}</span>
            <div>
                <button onclick="toggleComplete(${task.id})"><i class="fas fa-check"></i></button>
                <button onclick="deleteTask(${task.id})"><i class="fas fa-times"></i></button>
            </div>
        `;
        taskItem.querySelector('span').addEventListener('click', () => toggleComplete(task.id));
        taskList.appendChild(taskItem);
    });
}

window.toggleComplete = function(id) {
    toDoList.toggleComplete(id);
    displayTasks();
};

window.deleteTask = function(id) {
    toDoList.deleteTask(id);
    displayTasks();
};

// Initial display
displayTasks();
