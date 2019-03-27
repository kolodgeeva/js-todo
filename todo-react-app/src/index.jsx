import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import './index.css';
import App from './containers/App';
import { rootSaga } from './sagas';
import {
  loadTodos, addTodo, saveTodo, deleteTodo,
} from './actions';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
const action = (type, payload) => store.dispatch(type(payload));

ReactDOM.render(
  <Provider store={store}>
    <App
      onLoadTodos={() => action(loadTodos)}
      onAddTodo={todo => action(addTodo, todo)}
      onSaveTodo={todo => action(saveTodo, todo)}
      onDeleteTodo={id => action(deleteTodo, id)}
    />
  </Provider>,
  document.getElementById('root'),
);
