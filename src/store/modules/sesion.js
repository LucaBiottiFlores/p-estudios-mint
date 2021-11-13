import Firebase from "firebase";

export const ModuloSesion = {
  namespaced: true,
  state: {
    user: "",
  },
  mutations: {
    SET_USUARIO(state, newUser) {
      state.user = newUser;
    },
  },
  actions: {
    configUser(context, user) {
      context.commit("SET_USUARIO", user);
    },
    subscribeToAuth(context) {
      Firebase.auth().onAuthStateChanged((user) => {
        context.commit("SET_USUARIO", user || "");
      });
    },
    async initSesion(_context, credentials) {
      await Firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
    },
    async logOut() {
      await Firebase.auth().signOut();
    },
  },
};