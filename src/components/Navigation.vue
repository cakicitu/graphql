<template>
  <nav>
    <RouterLink to="/" @click="resetState()">Home</RouterLink>
    <HoverDropdown :options="animeOptions"></HoverDropdown>
    <HoverDropdown :options="mangaOptions"></HoverDropdown>
    <RouterLink to="/forum">Forum</RouterLink>
    <div class="searchArea">
      <input class="search" type="text" placeholder="search" v-model="search" v-on:keyup.enter="submitSearch()">
      <button class="searchButton"  @click="submitSearch()">Submit</button>
    </div>
    <div class="space"></div>
    <TButton v-if="!$root.user" :dark="true" @click="$router.push('/login')">Login</TButton>
    <HoverDropdown v-if="$root.user"  :options="profileOptions" style="grid-column:  span 2;"></HoverDropdown>
    <TButton v-if="!$root.user" :light="true" @click="$router.push('/register')">Sign Up </TButton>
  </nav>
</template>

<script>
import TButton from "./TButton.vue";
import Login from "../graphql/mutations/Login";
import HoverDropdown from "./HoverDropdown.vue";
import Search from "../graphql/queries/Search";
import gql from "graphql-tag";
export default {
  name: "Navigation",
  components: {HoverDropdown, TButton},
  data(){
    return{
      Search,
      search: '',
      animeOptions: {
        title: 'Anime',
        tabs: [
          {
            tab: 'Search',
            link: 'test'
          },
          {
            tab: 'Categories',
            link: 'test'
          },
          {
            tab: 'Top',
            link: '/list/topAnime',
            function: () =>{
              this.$router.push('/list/TopAnime')
            }
          },
          {
            tab: 'Popular',
            link: 'test',
            function: () =>{
              this.$router.push('/list/PopularAnime')
            }
          },
        ]
      },
      mangaOptions: {
        title: 'Manga',
        tabs: [
          {
            tab: 'Search',
            link: 'test'
          },
          {
            tab: 'Categories',
            link: 'test'
          },
          {
            tab: 'Top',
            link: 'test',
            function: () =>{
              this.$router.push('/list/TopManga')
            }
          },
          {
            tab: 'Popular',
            link: 'test',
            function: () =>{
              this.$router.push('/list/PopularManga')
            }
          },
        ]
      }
    }
  },
  computed:{
    // searchResult(){
    //     let res = null
    //     this.$apollo.query({
    //       query: Search,
    //       variables: {search: this.search},
    //       client: 'ani'
    //     }).then(res => {
    //       console.log("SEARCH RESULT: ", res)
    //       this.$emit('search', res.data.Page.media)
    //        res = res.data.Page.media
    //     })
    //
    //   return res
    // },
    profileOptions(){
     return {
        title: 'Hello, ' + this.$root.user.user.name,
            tabs: [
          {
            tab: 'ausloggen',
            link: 'test',
            function: () =>{
              this.$root.logout()
            }
          }
        ]
      }
    }
  },
  methods:{
    resetState(){
      this.search = ''
      this.$emit('reset')
    },
    submitSearch(){
      this.$emit('setSearch', this.search)
    }
  },
  apollo: {
      $client: 'backend',
  }
}
</script>

<style scoped lang="scss">
*{
  font-size: 16px;
}
nav {
  height: 41px;
  display: grid;
  grid-template-columns: 80px 80px 80px 80px 350px 1fr 130px 130px;
  grid-template-rows: auto;
  grid-template-areas:
    "home anime manga forum searchbar space login sign";

  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
  padding: 20px;

  a {
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);


    display: flex;
    justify-content: center;
    align-items: center;
  }

  a:first-of-type {
    border: 0;
  }

  .searchArea{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .search{
      text-decoration: none;
      border: none;
      background: var(--primary);
      border-radius: 7px;
      padding: 8px 8px 8px 20px;
      outline: none;
    }
    .searchButton{
      margin-left: 10px;
      text-decoration: none;
      border: none;
      background: var(--primary);
      border-radius: 7px;
      padding: 8px 8px 8px 8px;
      outline: none;
      cursor: pointer;
    }
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--color-text-green);
    font-size: 14px;
    //padding: 8px 8px 8px 20px;
    opacity: 1; /* Firefox */
  }

  .profile{
    cursor: pointer;
  }
  .profile:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}




</style>