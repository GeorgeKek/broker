import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	itCheckstr: '',
  	itEntry: '',
  },
  mutations: {
  	setItCheckstr(state, newValue)
  	{
  		console.log('setItCheckstr', newValue);
  		this.state.itCheckstr = newValue;
  	},
	setItEntry(state, newValue)
	{
		console.log('setItEntry', newValue);
		this.state.itEntry = newValue;
	},
  },
  actions: {
  },
  modules: {
  }
})
