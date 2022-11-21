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
  methods:{
    getUsers(){
      const query = `
                   query{
                    users{
                      id
                      name
                   }
              }
              `;

      let variables = {
        // page: page ? page : 1,
        // perPage: 15,
        // sortBy: this.sortBy
      };

      this.fetch(query, variables).then(res => {
        console.log("res ", res)
      })
    },
    fetch(query, variables = null){
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      }

      return fetch('http://localhost:8888/graphiql', options).then(response => this.handleResponse(response))
          .catch(err => this.handleError(err));
    },
    handleResponse(res){
      return res.json().then(function (json) {
        return res.ok ? json : Promise.reject(json);
      });
    },
    handleError(err){
      console.log("err: ", err)
    },
  // apollo: {
  //   categories: gql`{
  //         categories{
  //         id,
  //         name
  //         }
  //     }`
  // }
},
mounted() {
    this.getUsers()
  }
}
</script>

<style scoped>

</style>