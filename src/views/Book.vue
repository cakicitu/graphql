<template>
  <div class="content">
    <ApolloQuery  :query="bookQuery"
                  :variables="{ id: $route.params.id }"
    >
      <template  v-slot="{ result: { data }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="data" style="display: flex; flex-direction: column;
      ">
            <div
                style="border: 2px solid green;
             padding: 12px;
"
           class="category" >
              {{ data.book.id }}
              {{data.book.author}}
              {{ data.book.author }}
              {{ data.book.description }}
              <p>edit</p>
              <p>delete</p>
            </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import bookQuery from '/src/graphql/queries/BookDetails'
export default {
  name: "Book",
  data(){
    return{
      bookQuery,
    }
  },
  mounted() {
    console.log("params: ", this.$route.params.id)
  }
}
</script>

<style scoped>

</style>