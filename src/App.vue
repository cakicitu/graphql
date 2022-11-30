<template>
  <router-view></router-view>
</template>

<script>
// import Login from "./graphql/mutations/Login";
import Layout from "./components/Layout.vue";
import Login from "./views/Login.vue";

export default {
name: "App",
  components: {Login, Layout},
  data(){
  return{
    user: null
  }
},
methods:{
  logout(){
    console.log("logging out")
    this.user = null
    localStorage.removeItem('user')
  }
},
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
</script>

<style scoped lang="scss">

</style>
