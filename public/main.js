(() => {

  "use strict";

  const body = document.getElementById('body');

  const path = "http://localhost:3000/list/";

  document.body.onload = () => {
    fetchTodoList();
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
      saveTodo(e.target.closest(".todo-block"));
    }
  });

  body.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (e.target.classList.contains('add-item-btn')) {
        e.preventDefault();
        addTodoItem(e);
      } else if (e.target.classList.contains('item-title')) {
        e.preventDefault();
        if (e.target.value.trim()) {
          saveTodo(e.target.closest(".todo-block"));
        }
      }
    }
  });

  const fetchAndReload = (path, params) => {
    fetch(path, params).then(() => {
      fetchTodoList()
    }).catch((error) => {
      console.error(error);
    });
  };

  const fetchTodoList = () => {
    fetch(path).then((response) => {
      return response.json();
    }).then((data) => {
      loadTodoList(data);
    }).catch((error) => {
      console.error(error);
    });
  };

  const addTodo = (data) => {
    fetchAndReload(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  const saveTodo = (todo) => {
    const data = getTodo(todo);
    fetchAndReload(path + data.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  const removeTodo = (id) => {
    fetchAndReload(path + id, {
      method: 'DELETE'
    });
  };

  const loadTodoList = (data) => {
    document.getElementById("main").innerHTML = '';
    data.forEach((item) => {
      document.getElementById("main").innerHTML
          += new TodoListBlock(item).build();
    });
  };

  const addTodoList = () => {
    closeSidebar();

    const items = Array.from(
        document.querySelectorAll('#new-todo-items>li>label>span.label')
    ).map((span) => {return new TodoItem(guid(), span.textContent, false);});

    const data = new TodoList(
        guid(),
        document.getElementById("new-todo-title").value,
        items
    );

    document.getElementById("new-todo-title").value = '';

    Array.from(
        document.querySelectorAll('#new-todo-items>li.li-item')
    ).map((li) => {li.parentNode.removeChild(li)});

    addTodo(data);
  };

  const removeTodoList = (e) => {
    const todo = e.target.closest(".todo-block");
    const id = todo.getAttribute("data-id");
    removeTodo(id);
  };

  const addTodoItem = (e) => {
    if (e.target.value.trim()) {
      const item = new TodoItem(guid(), e.target.value, false);
      let todo = e.target.closest(".todo-block");
      let ul = e.target.closest("ul");
      ul.innerHTML = new TodoItemBlock(item).build() + ul.innerHTML;
      if (todo.getAttribute('data-id')) {
        saveTodo(todo);
      }
    }
  };

  const openSidebar = () => {
    document.getElementById("sidebar").style.right = "0";
  };

  const closeSidebar = () => {
    document.getElementById("sidebar").style.right = "-350px";
  };

  const getTodo = (todo) => {
    const listId = todo.getAttribute("data-id");
    const title = todo.getElementsByClassName('item-title')[0].value;
    const items = Array.from(
        todo.querySelectorAll('.todo-list>li.li-item')
    ).map((li) => {
      return new TodoItem(
          li.getAttribute('data-id'),
          li.firstElementChild.children[1].innerHTML,
          li.firstElementChild.children[0].checked
      );
    });

    return new TodoList(
        listId,
        title,
        items
    );
  };

  const guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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
            <span class="label">${this.item.description}</span>
            <span class="check-mark"></span>
          </label>
        </li>         
      `
    }

    getCheckedAttr() {
      return this.item.isDone ? "checked" : "";
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
    constructor(id, description, isDone) {
      this.id = id;
      this.description = description;
      this.isDone = isDone;
    }
  }

})();