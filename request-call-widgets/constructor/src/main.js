import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { BootstrapVue } from 'bootstrap-vue'
import cookie from 'vue-cookie';
// Override the default message.
extend('email', {
	...email,
	message: 'Неверный формат'
});

// Override the default message.
extend('required', {
	...required,
	message: 'Обязательное поле'
});

// axios.defaults.withCredentials = true;

const baseURL = (window.location.host == 'iticapital.ru') ? 'https://iticapital.ru/' : 'https://pre-prod.iticapital.ru';

Vue.prototype.$axios =  axios.create({
	baseURL
});

Vue.config.productionTip = false

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(BootstrapVue);
Vue.use(cookie);

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
