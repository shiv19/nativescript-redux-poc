import {
  ADD_TODO,
  DELETE_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_TODO,
  VisibilityFilters
} from '~/store/actions';
import { createMigrate, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import createAppStorage from '~/utils/createAppStorage';
import { migrations } from '~/store/migrations';
import undoable from 'redux-undo';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }

        return todo;
      });
    case DELETE_TODO:
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
}

const persistConfig = {
  key: 'persistedTodos',
  version: 1,
  storage: createAppStorage(),
  // only the keys in this whitelist will be persisted
  whitelist: [
    'present'
  ],
  migrate: createMigrate(migrations, { debug: false })
};
const persistedTodoReducer = persistReducer(persistConfig, undoable(todos));

const rootReducer = combineReducers({
  visibilityFilter,
  todos: persistedTodoReducer
});

export default rootReducer;
