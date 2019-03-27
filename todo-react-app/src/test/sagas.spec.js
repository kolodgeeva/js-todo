import test from 'tape';
import { call, put } from 'redux-saga/effects';

import {
  addTodoList,
  deleteTodoList,
  loadTodos,
  saveTodoList,
} from '../sagas/index';
import {
  addTodoFetch,
  deleteTodoFetch,
  loadTodosFetch,
  saveTodoFetch,
} from '../api';
import { addTodoFinished, loadTodosFinished, saveTodoFinished } from '../actions';

test('loadTodos Saga test', (assert) => {
  const gen = loadTodos();

  assert.deepEqual(
    gen.next().value,
    call(loadTodosFetch),
    'loadTodos Saga must call loadTodosFetch',
  );

  assert.deepEqual(
    gen.next().value,
    put(loadTodosFinished(undefined)),
    'loadTodos Saga must dispatch an loadTodosFinished action',
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'loadTodos Saga must be done',
  );

  assert.end();
});

test('addTodoList Saga test', (assert) => {
  const todo = { id: 123, title: 'Some title', items: [] };
  const gen = addTodoList({ todo });

  assert.deepEqual(
    gen.next().value,
    call(addTodoFetch, todo),
    'addTodoList Saga must call addTodoFetch',
  );

  assert.deepEqual(
    gen.next().value,
    put(addTodoFinished(undefined)),
    'addTodoList Saga must dispatch an addTodoFinished action',
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'addTodoList Saga must be done',
  );

  assert.end();
});

test('saveTodoList Saga test', (assert) => {
  const todo = { id: 123, title: 'Some title', items: [] };
  const gen = saveTodoList({ todo });

  assert.deepEqual(
    gen.next().value,
    call(saveTodoFetch, todo),
    'saveTodoList Saga must call saveTodoFetch',
  );

  assert.deepEqual(
    gen.next().value,
    put(saveTodoFinished(undefined)),
    'saveTodoList Saga must dispatch an saveTodoFinished action',
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'saveTodoList Saga must be done',
  );

  assert.end();
});

test('deleteTodoList Saga test', (assert) => {
  const id = 123;
  const gen = deleteTodoList({ id });

  assert.deepEqual(
    gen.next().value,
    call(deleteTodoFetch, id),
    'deleteTodoList Saga must call deleteTodoFetch',
  );

  assert.deepEqual(
    gen.next().value,
    call(loadTodos),
    'deleteTodoList Saga must call loadTodos',
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'deleteTodoList Saga must be done',
  );

  assert.end();
});
