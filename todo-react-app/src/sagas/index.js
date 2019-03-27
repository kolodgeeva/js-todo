import {
  put, call, takeEvery, takeLatest, all,
} from 'redux-saga/effects';
import {
  loadTodosFinished, addTodoFinished, saveTodoFinished, loadTodosFailed,
  addTodoFailed, deleteTodoFailed, saveTodoFailed,
} from '../actions';

import {
  loadTodosFetch, addTodoFetch, saveTodoFetch, deleteTodoFetch,
} from '../api';

export function* loadTodos() {
  try {
    const todos = yield call(loadTodosFetch);
    yield put(loadTodosFinished(todos));
  } catch (e) {
    yield put(loadTodosFailed(e));
  }
}

function* watchLoadTodos() {
  yield takeLatest('LOAD_TODOS', loadTodos);
}

export function* addTodoList(action) {
  try {
    const todo = yield call(addTodoFetch, action.todo);
    yield put(addTodoFinished(todo));
  } catch (e) {
    yield put(addTodoFailed(e));
  }
}

function* watchAddTodoList() {
  yield takeEvery('ADD_TODO', addTodoList);
}

export function* saveTodoList(action) {
  try {
    const todo = yield call(saveTodoFetch, action.todo);
    yield put(saveTodoFinished(todo));
  } catch (e) {
    yield put(saveTodoFailed(e));
  }
}

function* watchSaveTodoList() {
  yield takeEvery('SAVE_TODO', saveTodoList);
}

export function* deleteTodoList(action) {
  try {
    yield call(deleteTodoFetch, action.id);
    yield call(loadTodos);
  } catch (e) {
    yield put(deleteTodoFailed(e));
  }
}

function* watchDeleteTodoList() {
  yield takeEvery('DELETE_TODO', deleteTodoList);
}

export function* rootSaga() {
  yield all([
    watchLoadTodos(),
    watchAddTodoList(),
    watchSaveTodoList(),
    watchDeleteTodoList(),
  ]);
}
