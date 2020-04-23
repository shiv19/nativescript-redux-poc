export const migrations = {
  2: (state) =>
    // migration to add a new key called awesomeNewKey
    ({
      ...state,
      awesomeNewKey: 'MultiShiv19'
    }),
  3: (state) =>
    // migration to clear the user's todo list
    ({
      visibilityFilter: state.visibilityFilter,
      todos: {
        ...state.todos,
        present: [],
        past: [],
        future: []
      }
    })
};
