<template>
<p>Hello, </p>
</template>

<script>
import {gql} from "@apollo/client/core";

export default {
  name: "Apollo",
  data(){
    return{
      categories: []
    }
  },
  apollo: {
    categories: gql`{
          categories{
          id
          name
          }
      }`
  }
}
</script>

<style scoped>

</style>