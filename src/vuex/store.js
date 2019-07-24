import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username : "",
  },
  mutations: {
    changeUsername : (state,username) => {
      state.username = username;
    }
  },

  actions: {
    changeUsername1(context){
      context.commit("changeUsername");
    }
  }
})
