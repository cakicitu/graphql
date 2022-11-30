<template>
  <ApolloQuery  :query="categoryQuery">
    <template  v-slot="{ result: { data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-if="data" style="display: flex; flex-direction: column">
        <span class="categories" @click="selectCategory('all')">All</span>
        <span class="categories" @click="selectCategory('featured')">Featured</span>
        <span
            class="categories"
           @click="selectCategory(category.id)"
           v-for="category of data.categories" :key="category.id">
          {{ category.name }}
        </span>
        <RouterLink to="/book/create">create</RouterLink>
      </div>
    </template>
  </ApolloQuery>
  <ApolloQuery  :query="selectedCategoryQuery"
                :variables="{ id: selectedCategory }"
    >
    <template  v-slot="{ result: { data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="data" style="display: flex; flex-direction: column;
      ">
        <template v-if="selectedCategory == 'all'">
          <div
              style="border: 2px solid green;
             padding: 12px;
"
              v-for="book in data.books" class="category" :key="book.id">
            {{ book.id }}
            <router-link :to="'/book/' + book.id">   {{ book.title }}</router-link>

            {{ book.author }}
          </div>
        </template>
        <template v-else-if="selectedCategory == 'featured'">
          <div
              style="border: 2px solid green;
             padding: 12px;
"
              v-for="book in data.booksByFeatured" class="category" :key="book.id">
            {{ book.id }}
            <router-link :to="'/book/' + book.id">   {{ book.title }}</router-link>
            {{ book.author }}
          </div>
        </template>
        <template v-else>
          <div
              style="border: 2px solid green;
             padding: 12px;
"
              v-for="book in data.category.books" class="category" :key="book.id">
            {{ book.id }}
            <router-link :to="'/book/' + book.id">   {{ book.title }}</router-link>

            {{ book.author }}
          </div>
        </template>

      </div>
    </template>
  </ApolloQuery>

</template>

<script>
import categoryQuery from '/src/graphql/queries/Category'
import bookQuery from '/src/graphql/queries/Book'
import featuredBooksQuery from '/src/graphql/queries/featuredBooks'
import books from '/src/graphql/queries/Books'

export default {

  name: "Apollo",
  data(){
    return{
      categoryQuery,
      bookQuery,
      books,
      featuredBooksQuery,
      selectedCategory: 'all',
      categories: [],
      selectedBook: null
    }
  },
  computed: {
    selectedCategoryQuery(){
      if (this.selectedCategory  === 'all'){
        return this.books
      }else if(this.selectedCategory  === 'featured'){
        return this.featuredBooksQuery
      }else {
        return this.bookQuery
      }
    }
  },
  methods:{
    selectCategory(categoryId){
      this.selectedCategory = categoryId
    },
    fetch(query, variables = null){
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      }

      return fetch('http://localhost/graphql', options).then(res => res.json())
          .catch(err => this.handleError(err));
    },
    handleError(err){
      console.log("err: ", err)
    },
},
  apollo: {
    $client: 'a',
  },
mounted() {
  }
}
</script>

<style scoped>
.categories{
  cursor: pointer;
}
</style>