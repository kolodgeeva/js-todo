const path = 'http://localhost:3003/list';

export const loadTodosFetch = () => (
  fetch(path).then(response => response.json())
);

export const addTodoFetch = data => (
  fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
);

export const saveTodoFetch = todo => (
  fetch(`${path}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then(response => response.json())
);

export const deleteTodoFetch = id => (
  fetch(`${path}/${id}`, {
    method: 'DELETE',
  })
);
