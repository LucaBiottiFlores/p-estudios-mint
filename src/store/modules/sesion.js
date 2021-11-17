export const ModuloSesion = {
  namespaced: true,
  state: {
    user: null
  },

  getters: {
    sendingUser(state) {
      return state.user
    }
  },

  mutations: {
    MUTATE_LOCAL_USER(state, userData) {
      state.user = userData
    }
  },

  actions: {
    loadingUser({ commit }, userData) {
      commit('MUTATE_LOCAL_USER', userData)
    }
  }
}
