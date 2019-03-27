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

  body.addEventListener('change', (e) => {
    if (e.target.classList.contains('checkbox-item')) {
      saveTodoItemChecked(e);
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
    Object.keys(storage).forEach((key) => {
      if (key !== ID) {
        loadTodoList(JSON.parse(storage.getItem(key)));
      }
    });
  };

  const loadTodoList = (data) => {
    document.getElementById("main").innerHTML += new TodoListBlock(data).build();

    storage.setItem(data.id, JSON.stringify(data));
    storage.setItem(ID, id.toString());

    document.getElementById("new-todo-title").value = '';
    Array.from(
        document.querySelectorAll('#new-todo-items>li.li-item')
    ).map((li) => {li.parentNode.removeChild(li)})
  };

  const addTodoList = () => {
    closeSidebar();

    let items = Array.from(
        document.querySelectorAll('#new-todo-items>li>label>span.label')
    ).map((span) => {return new TodoItem(id++, span.textContent, false);});

    let data = new TodoList(
        ++id,
        document.getElementById("new-todo-title").value,
        items
    );

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

      const item = new TodoItem(++id, e.target.value, false);
      const listId = e.target.closest(".todo-block").getAttribute("data-id");

      let data = JSON.parse(storage.getItem(listId));
      if (data) {
        data.items.push(item);
        storage.setItem(listId, JSON.stringify(data));
        storage.setItem(ID, id.toString());
      }

      e.target.closest("ul").innerHTML =
          new TodoItemBlock(item).build() + e.target.closest("ul").innerHTML;
    }
  };

  const saveTodoItemChecked = (e) => {
    const checked = e.target.checked;
    const listId = e.target.closest(".todo-block").getAttribute("data-id");
    let data = JSON.parse(storage.getItem(listId));
    if (data) {
      const itemId = Number.parseInt(
          e.target.closest(".li-item").getAttribute("data-id")
      );
      data.items.forEach((item) => {
        if (item.id === itemId) {
          item.checked = checked;
        }
      });
      storage.setItem(listId, JSON.stringify(data));
    }
  };

  const saveTodoTitle = (e) => {
    if (e.target.value.trim()) {
      const title = e.target.value;
      const listId = e.target.closest(".todo-block").getAttribute("data-id");

      let data = JSON.parse(storage.getItem(listId));
      if (data) {
        data.title = title;
        storage.setItem(listId, JSON.stringify(data));
      }
    }
  };

  class TodoListBlock {
    constructor(data) {
      this.data = data;
    }

    build() {
      return `
        <div class="todo-block" data-id="${this.data.id}">
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
            ${this.data.items.map((item) => new TodoItemBlock(item).build()).join('')}
            <li><label>
              <input class="add-item-btn label" type="text" placeholder="Add to-do">
            </label></li>
          </ul>
        </div>`
    }
  }

  class TodoItemBlock {
    constructor(item) {
      this.item = item || new TodoItem()
    }

    build() {
      return `
        <li class="li-item" data-id="${this.item.id}">
          <label class="checkbox-container">
            <input class="checkbox-item" type="checkbox" ${this.getCheckedAttr()} >
            <span class="label">${this.item.text}</span>
            <span class="check-mark"></span>
          </label>
        </li>         
      `
    }

    getCheckedAttr() {
      return this.item.checked ? "checked" : "";
    }
  }

  class TodoList {
    constructor(id, title, items) {
      this.id = id;
      this.title = title;
      this.items = items;
    }
  }

  class TodoItem {
    constructor(id, text, checked) {
      this.id = id;
      this.text = text || "";
      this.checked = checked || false;
    }
  }

})();