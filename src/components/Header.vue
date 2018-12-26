<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon v-on:click="setSideBar(!sideBar)"></v-toolbar-side-icon> 
     <v-btn v-if="!isHome" icon @click="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title class="white--text">{{ appName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-badge left overlap color="orange">
        <span slot="badge">1</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>
    <v-text-field
      slot="extension" 
      hide-details
      append-icon="mic"
      flat
      label="Search"
      prepend-inner-icon="search"
      solo-inverted
    ></v-text-field>
  </v-toolbar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      setSideBar  : 'setSideBar',
    }),
    search(){
        this.setSideBar(false)
    },
    cart(){
        this.setSideBar(false)
    }
  },
  computed: {
    ...mapGetters({
      sideBar   : 'sideBar',
    }),
    isHome () {
      return (this.$route.path==='/')
    },
  }
}
</script>