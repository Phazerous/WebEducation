// НЕЯСНО КАК РАБОТАТЬ С НЕСУЩЕСТВУЮЩИМИ ЭЛЕМЕНТАМИ, КОТОРЫЕ ДАЖЕ ПРОВЕРИТЬ НЕЛЬЗЯ С ПОМОЩЬЮ FETCH
// ЛЕГЧЕ УЖ СОЗДАТЬ СВОЙ СЕРВЕР, ЧТОБЫ РЕАЛЬНО ВИДЕТЬ, ЧТО ПРОИСХОДИТ :-)

const userOptions = document.querySelector('#user-todo');

async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    return data;
}

async function addUsers() {
    const users = await getUsers();

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.name;
        option.innerHTML = user.name;
        userOptions.appendChild(option);
    });
}

addUsers();

const addButton = document.querySelector('button');
const addField = document.querySelector('#new-todo');
const todoList = document.querySelector('#todo-list');

const IDHandler = {
    storage: [],
    exist: function(el) {return this.storage.includes(el)},
    remove: function (el) {
        if (this.exist(el)) {
            this.storage.splice(this.storage.indexOf(el), 1);
            return 1;
        }
    },
    add: function (el) {
        if (!this.exist(el)) {
            this.storage.push(el);
            return 1;
        }
    }
}

addButton.addEventListener('click', (e) => {
    e.preventDefault();

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const taskName = addField.value;

    const by = document.createElement('span');
    by.classList.add('by');
    by.innerHTML = 'by';

    const author = document.createElement('span');
    author.classList.add('author');
    author.innerHTML = userOptions.value;

    const div = document.createElement('div');
    div.classList.add('inline-div');
    div.innerHTML = `${taskName} ${by.outerHTML} ${author.outerHTML}`

    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-times');
    icon.setAttribute('aria-hidden', 'true');

    const btn = document.createElement('button');
    btn.classList.add('remove-btn');
    btn.appendChild(icon);

    li.appendChild(checkbox);
    li.appendChild(div);
    li.appendChild(btn);

    todoList.appendChild(li);

    btn.addEventListener('click', () => {
        li.remove();
        
        console.log('An element has been removed');
        removeTask()
        .then(response => response.json())
        .then(console.log)
    });

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.setAttribute('id', 'done');
        } else {
            if (li.getAttribute('id')) {
                li.removeAttribute('id');
            }
        }
    })

    console.log('An element has been added');
    addTask(_.random(1, 10), _.random(201, 1000), addField.value, false)
    .then(response => response.json())
    .then(console.log)

    userOptions.selectedIndex = 0;
    addField.value = "";
});

async function addTask(userId, id, title, completed) {
    return await fetch('https://jsonplaceholder.typicode.com/todos', 
    {
        method: 'POST',
        body: JSON.stringify(userId, id, title, completed)
    })
}

async function removeTask() {
    return await fetch('https://jsonplaceholder.typicode.com/todos/random', 
    {
        method: 'DELETE',
    })
}