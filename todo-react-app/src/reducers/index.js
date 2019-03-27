import { combineReducers } from 'redux';
import todos from './todos';
import sidebar from './sidebar';

export default combineReducers({
  todos,
  sidebar,
});
