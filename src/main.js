import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ImageUploader from './components/ImageUploader.vue';
import Notes from './components/Notes.vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;


const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        {path: '/', redirect: '/upload'},
        {path: '/upload', component: ImageUploader},
        {path: '/notes', component: Notes}
    ]
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
