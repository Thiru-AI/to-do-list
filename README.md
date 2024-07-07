### TO-DO-LIST

## CODE

index.html
~~
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Work To-Dos</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="container">
        <h1>WORK TO-DOS</h1>
        <p style="color: rgb(177, 241, 15);">Enter text into the input field to add items to your list.</p><br>
        <p style="color: rgb(15, 236, 15);"><span>Click the item to mark it as complete.</span></p><br>
        <p style="margin-bottom: 50x;">Click the "X" to remove the item from your list.</p><br>
        <form id="task-form">
            <input type="text" id="task-title" placeholder="New item..." required>
            <button type="submit"><i class="fas fa-pencil-alt"></i></button>
        </form>
        <ul id="task-list"></ul>
    </div>
    <script type="module" src="js/app.js"></script>
</body>
</html>

~~
style.css
~~~
body {
    font-family: Arial, sans-serif;
    background-color: #00aabb;
    color: #fff;
    text-align: center;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
}

h1 {
    margin-bottom: 20px;
    font-size: 50px;
}

p {
    margin: 5px 0;
    font-size: 20px ;
}

form {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

input[type="text"] {
    width: 80%;
    padding: 10px;
    border: none;
    border-radius: 5px;
}

button {
    padding: 10px;
    background: #fff;
    color: #008b8b;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button i {
    font-size: 18px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background: #fff;
    color: #008b8b;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li.completed {
    text-decoration: line-through;
}

li button {
    background: transparent;
    border: none;
    color: #008b8b;
    cursor: pointer;
}

~~~

Javascript
~~~
app.js
~~~
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

~~~
to-do.js
~~~
import Task from './Task.js';

export default class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    toggleComplete(id) {
        this.tasks = this.tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        this.saveTasks();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    getTasks() {
        return this.tasks;
    }
}

~~~
task.js
~~~
export default class Task {
    constructor(title, completed = false) {
        this.title = title;
        this.completed = completed;
        this.id = Date.now();
    }
}

~~~
~~~  
### OUTPUT

![Screenshot 2024-07-07 214511](https://github.com/Thiru-AI/to-do-list/assets/94980741/11e7e0a6-e458-4680-9993-8eab4c11236d)
