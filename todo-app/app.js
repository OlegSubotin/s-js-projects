const formEl = document.querySelector('#form');
const inputEl = document.querySelector('#input');
const listEl = document.querySelector('#list');
const STORAGE_KEY_TODO = 'todos'; 

formEl.addEventListener('submit', onFormSubmit);

checkTodoInLocalStorage();

function checkTodoInLocalStorage() {
    if (localStorage.getItem(STORAGE_KEY_TODO) === null) {
        return;
    } else {
        let todos = JSON.parse(localStorage.getItem(STORAGE_KEY_TODO));
        for (const todo of todos) {
            let todoEl = document.createElement('li');
    todoEl.classList.add('item');
    if (todo.completed === true) {
        todoEl.classList.add('completed');
    };
        todoEl.innerHTML = `
            ${todo.text}
            <button class="close-btn" type="button">x</button>
        `;
        listEl.appendChild(todoEl);
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLocalStorage();
        });
        let deleteBtn = todoEl.querySelector('.close-btn');
        deleteBtn.addEventListener('click', () => { 
            alert("do u wanna delete it");
            todoEl.remove();
        });

        inputEl.value = '';
        updateLocalStorage();
        };    
    };  
};

function onFormSubmit(evt) {
    evt.preventDefault();
    let todoText = inputEl.value;
    if (todoText) {
        let todoEl = document.createElement('li');
        todoEl.classList.add('item')
        todoEl.innerHTML = `
            ${todoText}
            <button class="close-btn" type="button">x</button>
        `;
        listEl.appendChild(todoEl);
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLocalStorage();
        });
        let deleteBtn = todoEl.querySelector('.close-btn');
        deleteBtn.addEventListener('click', () => { 
            alert("do u wanna delete it");
            todoEl.remove();
        });

        inputEl.value = '';
        updateLocalStorage();
    };
};

function updateLocalStorage() {
    let todoEls = document.querySelectorAll('.item');
    let todosArr = [];
    todoEls.forEach(todo => {
        todosArr.push({
            text: todo.innerText.slice(0, -2),
            completed: todo.classList.contains('completed'),
        });
    });
    localStorage.setItem(STORAGE_KEY_TODO, JSON.stringify(todosArr));
};
