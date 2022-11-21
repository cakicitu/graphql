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
    test(){
      fetch("http://localhost:8888/graphql", {
        "headers": {
          "accept": "application/json, multipart/mixed",
          "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/json",
          "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin"
        },
        "referrer": "http://localhost:8888/graphiql",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"query\":\"query{\\n  users{\\n    id\\n    name\\n  }\\n}\"}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });
    },
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
    this.test()
  }
}
</script>

<style scoped>

</style>