<template>
  <form action="POST" @submit.prevent="createBook">
    title:
    <input type="text" name="title" v-model="book.title">
    title:
    <input type="text" name="author"  v-model="book.author">
    title:
    <input type="text" name="description"  v-model="book.description">
    category:
    <ApolloQuery  :query="categoryQuery">
      <template  v-slot="{ result: { data }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <select v-if="data" style="display: flex; flex-direction: column" v-model="book.category">
          <option class="categories" value="all">All</option>
          <option class="categories" value="featured">Featured</option>
          <option
              class="categories"
              value="category.id"
              v-for="category of data.categories" :key="category.id">
             {{ category.name }}
          </option>
          <RouterLink to="/book/create">create</RouterLink>
        </select>
      </template>
    </ApolloQuery>

    <input type="submit" >
  </form>

</template>

<script>
import categoryQuery from '/src/graphql/queries/Category'
import createBook from '/src/graphql/mutations/createBook'
import gql from "graphql-tag";
export default {
  name: "createBook",
  data()
  {
    return{
      categoryQuery,
      book: {
        title: '',
        author: '',
        description: '',
        category: 'all',
      }
    }
  },
  methods:{
    createBook(){
      this.$apollo.mutate({
        mutation: createBook,
        variables: {
          title: this.book.title,
          author: this.book.author,
          description: this.book.description,
          category_id: this.book.category
        }
      }).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log("err: " ,err)
      })
    }
  }

}
</script>

<style scoped>

</style>