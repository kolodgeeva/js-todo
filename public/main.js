(() => {

  "use strict";

  const body = document.getElementById('body');

  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-list-btn')) {
      e.preventDefault();
      openSidebar();
    }
  });

  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-sidebar')) {
      e.preventDefault();
      closeSidebar();
    }
  });

  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
      e.preventDefault();
      addTodoList();
    }
  });

  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-list-btn')) {
      e.preventDefault();
      removeTodoList(e);
    }
  });

  body.addEventListener('keypress', (e) => {
    if (e.target.classList.contains('add-item-btn') && e.key === 'Enter') {
      e.preventDefault();
      addTodoItem(e);
      this.focus();
    }
  });

  const openSidebar = () => {
    document.getElementById("sidebar").style.right = "0";
  };

  const closeSidebar = () => {
    document.getElementById("sidebar").style.right = "-350px";
  };

  const addTodoList = () => {
    closeSidebar();

    document.getElementById("main").innerHTML += Object.create(TodoListBlock)
      .build(
          document.getElementById("new-todo-title").value,
          Array.from(
              document.querySelectorAll('#new-todo-items>li>label>span.label')
          ).map((span) => {return span.textContent;})
      );

    document.getElementById("new-todo-title").value = '';

    Array.from(
        document.querySelectorAll('#new-todo-items>li.li-item')
    ).map((li) => {li.parentNode.removeChild(li)})
  };

  const TodoListBlock = {
    title: "",
    items: [],
    build: (title, items) => {
      this.title = title;
      this.items = items;
      return `
        <div class="todo-block">
          <div class="todo-header">
            <div class="todo-header-bar">
              <button class="remove-list-btn"></button>
            </div>
            <div class="todo-header-content">
              <label>
                <input type="text" placeholder="Add title" value="${this.title}">
              </label>
            </div>
          </div>
          <ul class="todo-list">
            ${this.items.map((item) => Object.create(TodoListItem).build(item)).join('')}
            <li><label>
              <input class="add-item-btn label" type="text" placeholder="Add to-do">
            </label></li>
          </ul>
        </div>`
    }
  };

  const TodoListItem = {
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

  const removeTodoList = (e) => {
    e.target.closest(".todo-block").style.display = "none";
  };

  const addTodoItem = (e) => {
    if (e.target.value.trim()) {
      e.target.closest("ul").innerHTML =
          Object.create(TodoListItem).build(e.target.value) + e.target.closest("ul").innerHTML;
    }
  };

})();