<template>
  <v-app>
    <c-header />
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
    <c-side-bar />
    <c-footer />

    <c-alert />

    <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <component :is="currentComponent"></component>
      </v-dialog>  
    </keep-alive>

  </v-app>
</template>

<script>
import CHeader from '@/components/CHeader.vue'
import CSideBar from '@/components/CSideBar.vue'
import CFooter from '@/components/CFooter.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    CHeader, CSideBar, CFooter, 
    CAlert: ()   => import(/* webpackChunkName: "c-alert" */ '@/components/CAlert.vue'),
    Search: ()   => import(/* webpackChunkName: "search" */ '@/views/Search.vue'),
    Login: ()    => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    Register: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
    //Cart: ()     => import(/* webpackChunkName: "cart" */ '@/views/Cart.vue'),
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      setStatusDialog   : 'dialog/setStatus',
    }),
  },
  computed: {
    ...mapGetters({
      statusDialog  : 'dialog/status',
      currentComponent: 'dialog/component'
    }),
    dialog: {
      get () {
        return this.statusDialog
      },
      set (value) {
        this.setStatusDialog(value)
      }
    },
  },
}
</script>
