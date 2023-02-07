export default {
  state: {
    todos: [],
  },
  mutations: {
    SET_TODOS(state, payload) {
      state.todos = payload;
    },
    CREATE_TODO(state, payload) {
      state.todos.unshift(payload);
    }
  },
  actions: {
  },
  modules: {
  }
}
