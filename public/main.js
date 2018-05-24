(() => {

  "use strict";

  let content = document.getElementById('content');

  content.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-list-btn')) {
      e.preventDefault();
      addTodoList();
    }
  });

  content.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-list-btn')) {
      e.preventDefault();
      removeTodoList(e);
    }
  });

  content.addEventListener('keypress', (e) => {
    if (e.target.classList.contains('add-item-btn') && e.key === 'Enter') {
      e.preventDefault();
      addTodoItem(e);
    }
  });

  let addTodoList = () => {
    document.getElementById("main").appendChild(createElement({
      element: "div",
      classes: ["todo-block"],
      children: [
        createElement({
          element: "div",
          classes: ["todo-header"],
          children: [
            createElement({
              element: "div",
              classes: ["todo-header-bar"],
              children: [createElement({
                element: "button",
                classes: ["remove-list-btn"]
              })]
            }),
            createElement({
              element: "div",
              classes: ["todo-header-content"],
              children: [createElement({
                element: "label",
                children: [createElement({
                  element: "input",
                  type: "text",
                  placeholder: "TODO List Name"
                })]
              })]
            })
          ]
        }),
        createElement({
          element: "ul",
          classes: ["todo-list"],
          children: [createElement({
            element: "li",
            children: [createElement({
              element: "label",
              children: [createElement({
                element: "input",
                type: "text",
                placeholder: "Add to-do",
                classes: ["add-item-btn", "label"]
              })]
            })]
          })]
        })
      ]
    }));
  };

  let removeTodoList = (e) => {
    e.target.closest(".todo-block").style.display = "none";
  };

  let addTodoItem = (e) => {
    if (e.target.value.trim()) {
      e.target.closest("ul").insertBefore(
          createElement({
            element: "li",
            children: [createElement({
              element: "label",
              classes: ["checkbox-container"],
              children: [
                createElement({element: "input", type: "checkbox"}),
                createElement({element: "span", text: e.target.value, classes: ["label"]}),
                createElement({element: "span", classes: ["check-mark"]})]
            })]
          }),
          e.target.closest("li")
      );
      e.target.value = "";
    }
  };

  let createElement = (props) => {
    let element = document.createElement(props.element);

    if (props.children) {
      props.children.map(function (child) {
        return element.appendChild(child);
      });
    }

    if (props.classes) {
      props.classes.map(function (className) {
        return element.classList.add(className);
      });
    }

    if (props.type) {
      element.type = props.type;
    }

    if (props.placeholder) {
      element.placeholder = props.placeholder;
    }

    if (props.text) {
      element.textContent = props.text;
    }

    return element;
  }

})();