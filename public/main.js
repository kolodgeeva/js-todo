(() => {

  "use strict";

const body = document.getElementById('body');
const ID = "id";

let id = -1;
let storage = window.localStorage;

document.body.onload = () => {
  if (storage.getItem(ID)) {
    id = Number.parseInt(storage.getItem(ID));
  } else {
    storage.setItem(ID, id.toString());
  }
  loadLists();
};

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-list-btn')) {
  e.preventDefault();
  openSidebar();
} else if (e.target.classList.contains('add-btn')) {
  e.preventDefault();
  addTodoList();
} else if (e.target.classList.contains('close-sidebar')) {
  e.preventDefault();
  closeSidebar();
} else if (e.target.classList.contains('remove-list-btn')) {
  e.preventDefault();
  removeTodoList(e);
}
});

body.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
  if (e.target.classList.contains('add-item-btn')) {
    e.preventDefault();
    addTodoItem(e);
  } else if (e.target.classList.contains('item-title')) {
    e.preventDefault();
    saveTodoTitle(e);
  }
}
});

const openSidebar = () => {
  document.getElementById("sidebar").style.right = "0";
};

const closeSidebar = () => {
  document.getElementById("sidebar").style.right = "-350px";
};

const loadLists = () => {
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key !== ID) {
      loadTodoList(JSON.parse(storage.getItem(key)));
    }
  }
};

const loadTodoList = (data) => {
  document.getElementById("main").innerHTML += Object.create(TodoListBlock)
  .build(data);

  storage.setItem(data.id, JSON.stringify(data));
  storage.setItem(ID, id.toString());

  document.getElementById("new-todo-title").value = '';
  Array.from(
      document.querySelectorAll('#new-todo-items>li.li-item')
  ).map((li) => {li.parentNode.removeChild(li)})
};

const addTodoList = () => {
  closeSidebar();
  let data = Object.create(TodoList);
  data.id = ++id;
  data.title = document.getElementById("new-todo-title").value;
  data.items = Array.from(
      document.querySelectorAll('#new-todo-items>li>label>span.label')
  ).map((span) => {return span.textContent;});
  loadTodoList(data);
};

const removeTodoList = (e) => {
  let block = e.target.closest(".todo-block");
  const id = block.getAttribute("data-id");
  storage.removeItem(id);
  block.parentNode.removeChild(block);
};

const addTodoItem = (e) => {
  if (e.target.value.trim()) {

    const item = e.target.value;
    const id = e.target.closest(".todo-block").getAttribute("data-id");

    let data = JSON.parse(storage.getItem(id));
    if (data) {
      data.items.push(item);
      storage.setItem(id, JSON.stringify(data));
    }

    e.target.closest("ul").innerHTML =
        Object.create(TodoListItemBlock).build(item) + e.target.closest("ul").innerHTML;
  }
};

const saveTodoTitle = (e) => {
  if (e.target.value.trim()) {
    const title = e.target.value;
    const id = e.target.closest(".todo-block").getAttribute("data-id");

    let data = JSON.parse(storage.getItem(id));
    if (data) {
      data.title = title;
      storage.setItem(id, JSON.stringify(data));
    }
  }
};

const TodoListBlock = {
  data: null,
  build: (data) => {
  this.data = data;
return `
        <div class="todo-block" data-id="${data.id}">
          <div class="todo-header">
            <div class="todo-header-bar">
              <button class="remove-list-btn"></button>
            </div>
            <div class="todo-header-content">
              <label>
                <input type="text" class="item-title" placeholder="Add title" value="${this.data.title}">
              </label>
            </div>
          </div>
          <ul class="todo-list">
            ${this.data.items.map((item) => Object.create(TodoListItemBlock).build(item)).join('')}
            <li><label>
              <input class="add-item-btn label" type="text" placeholder="Add to-do">
            </label></li>
          </ul>
        </div>`
}
};

const TodoListItemBlock = {
  title: "",
  build: (title) => {
  this.title = title;
return `
        <li class="li-item">
          <label class="checkbox-container">
            <input type="checkbox">
            <span class="label">${this.title}</span>
            <span class="check-mark"></span>
          </label>
        </li>         
      `
}
};

const TodoList = {
  id: -1,
  title: '',
  items: []
};

})();