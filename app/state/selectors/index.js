import { createSelector } from 'reselect';

const getVisibilityFilter = state => state.visibilityFilter;
const getTodos = state => state.todos;

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos.present.map((v, id) => ({ ...v, id: id }));
      case 'SHOW_COMPLETED':
        return todos.present.map((v, id) => ({ ...v, id: id })).filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.present.map((v, id) => ({ ...v, id: id })).filter(t => !t.completed);
      default: break;
    }
  }
);

const getKeyword = state => state.keyword;

export const getVisibleTodosFilteredByKeyword = createSelector(
  [getVisibleTodos, getKeyword],
  (visibleTodos, keyword) =>
    visibleTodos.filter(todo => todo.text.indexOf(keyword) > -1)
);
