import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username : "",
    sessionId:""
  },
  mutations: {
    changeUsername : (state,username) => {
      state.username = username;
    },
    getSessionId : (state, sessionId) =>  {
      state.sessionId = sessionId;
    }
  },

  actions: {
    changeUsername1(context){
      context.commit("changeUsername");
    }
  }
})
