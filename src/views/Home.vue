<template>
  <Layout>
    <Landing></Landing>
  </Layout>
</template>

<script>
import Layout from "../components/Layout.vue";
import Landing from "./Landing.vue";
export default {
  name: "Home",
  components: {Landing, Layout},
  apollo: {
    $client: 'ani',
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>