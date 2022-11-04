let tasks = [];
let users = [];

Promise.all([
    getUsers(),
    getTodos()
]).then((response) => {
    const [loadedUsers, loadedTasks] = response;
    tasks = loadedTasks;
    users = loadedUsers;

    loadUsers();
    updateTaskDOM();
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    if (document.querySelector('#user-todo').value === 'select user') return;

    const taskTitle = document.querySelector('#new-todo').value;
    const userId = +document.querySelector('#user-todo').value;
    const completed = false;

    const task = {
        userId: userId,
        title: taskTitle,
        completed, completed
    }

    sendTask(task).then((newTask) => {
        if (!newTask) return;

        document.querySelector('#new-todo').value = '';
        document.querySelector('#user-todo').value = 'select user';


        tasks.push(newTask);
        updateTaskDOM();
    })
})

function updateTaskDOM() {
    const taskList = document.querySelector('#todo-list');
    taskList.innerHTML = '';

    for (let i = tasks.length - 1; i >= 0; i--) {
        const task = tasks[i];

        const taskLi = document.createElement('li');
        taskLi.classList.add('todo-item')

        const username = users.find((user) => user.id === task.userId).name;

        taskLi.innerHTML = `<input type='checkbox' ${(task.completed) ? 'checked' : ''} <span>${task.title}</span> <span style="font-style: italic;">by</span> <span style="font-weight: bold;">${username}</span> <div class="close">x</div>`;
        taskList.appendChild(taskLi);

        taskLi.querySelector('input').addEventListener('click', (e) => {
            e.preventDefault();

            updateTaskStatus(task.id, e.target.checked).then((updatedTask) => {
                tasks.find((taskF) => taskF.id === task.id).completed = updatedTask.completed;
                updateTaskDOM();
            })
        });

        taskLi.querySelector('.close').addEventListener('click', (e) => {
            e.preventDefault();

            deleteTask(task.id).then((isDeleted) => {
                if (isDeleted) {
                    tasks = tasks.filter((taskF) => taskF.id != task.id);
                    updateTaskDOM();
                }
            });
        });
    }
}

function loadUsers() {
    const select = document.querySelector('#user-todo');

    users.forEach((user) => {
        const option = document.createElement('option');
        option.innerHTML = user.name;
        option.value = user.id;

        select.appendChild(option);
    })
}

async function getUsers() {
    try {
        const response = await fetch('http://jsonplaceholder.typicode.com/users');
        const loadedUsers = await response.json();

        return loadedUsers;
    } catch (err) {
        alert(err.message)
    }
}

async function getTodos() {
    try {
        const response = await fetch('http://jsonplaceholder.typicode.com/todos')
        const todos = await response.json();

        return todos;
    } catch (err) {
        alert(err.message);
    }
}

async function sendTask(task) {
    try {
        const response = await fetch(`http://jsonplaceholder.typicode.com/todos/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        })

        const newTask = await response.json();

        return newTask;
    } catch (err) {
        alert(err.message);
        return null;
    }
}

async function updateTaskStatus(taskId, isCompleted) {
    try {
        const response = await fetch(`http://jsonplaceholder.typicode.com/todos/${taskId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: isCompleted})
        });
        const updatedTask = await response.json();

        return updatedTask;
    } catch (err) {
        alert(err.message);
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://jsonplaceholder.typicode.com/todos/${taskId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })

        return response.ok;
    } catch (err) {
        alert(err.message);
    }
}