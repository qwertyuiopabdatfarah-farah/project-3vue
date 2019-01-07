import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import( /* webpackChunkName: "categories" */ './views/Categories.vue')
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import( /* webpackChunkName: "category" */ './views/Category.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import( /* webpackChunkName: "categories" */ './views/Books.vue')
    },
    {
      path: '/book/:slug',
      name: 'book',
      component: () => import( /* webpackChunkName: "book" */ './views/Book.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import( /* webpackChunkName: "checkout" */ './views/Checkout.vue'),
      meta: { auth: true }
    },
     {
      path: '/payment',
      name: 'payment',
      component: () => import('./views/Payment.vue'),
      meta: { auth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      meta: { auth: true }
    },
    {
      path: '/my-order',
      name: 'my-order',
      component: () => import('./views/MyOrder.vue'),
      meta: { auth: true }
    },
    { 
      path: '*', 
      redirect: { 
        name: 'home' 
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if(store.getters['auth/guest']){
      store.dispatch('alert/set', {
        status : true,
        text  : 'Login first',
        type  : 'error',
      })
      store.dispatch('setPrevUrl', to.path)
      store.dispatch('dialog/setComponent', 'login')
      store.dispatch('dialog/setStatus', true)
    }
    else{
      next()
    } 
  }
  else{
      next()
  }
})

export default router