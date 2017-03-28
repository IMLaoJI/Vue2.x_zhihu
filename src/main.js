import 'lib-flexible'
import App from './App';
import FastClick from 'fastclick'
window.FastClick = FastClick
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import moment from 'moment/moment.js'
import Mint from 'mint-ui';
Vue.use(Mint);

import routes from './router';

import Swiper from 'swiper'
window.Swiper = Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'font-awesome/css/font-awesome.min.css'



import filters from './filters'
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)

const jsonBird = 'https://bird.ioliu.cn/v1/?url='
const zhihu = 'http://news-at.zhihu.com'
var url = jsonBird + zhihu
    // Vue.prototype.$url = url
    // Vue.prototype.$http = axios
Vue.filter('imageUrlPrefix', (value) => {
    const url = value.substr(7)
    const prefix = 'https://images.weserv.nl/?url='
    return prefix + url
})
Vue.filter('transTimeFull', function(value) {
    return moment.unix(value).format('YYYY-MM-DD HH:mm:ss');
});





const router = new VueRouter({
    routes,

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            console.log("ceshi");
            return savedPosition
        } else {
            console.log("ceshi2");
            return { x: 0, y: 0 }
        }
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');