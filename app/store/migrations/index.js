export const migrations = {
  1: (state) =>
    // migration to clear the todo list
    ({
      ...state,
      present: [],
      past: [],
      future: []
    })
};
