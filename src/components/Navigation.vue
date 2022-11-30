<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
<!--    <RouterLink to="/anime">Anime</RouterLink>-->
<!--    <RouterLink to="/manga">Manga</RouterLink>-->
    <HoverDropdown :options="animeOptions"></HoverDropdown>
    <HoverDropdown :options="mangaOptions"></HoverDropdown>
    <RouterLink to="/forum">Forum</RouterLink>
    <input class="search" type="text" placeholder="search">
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
export default {
  name: "Navigation",
  components: {HoverDropdown, TButton},
  data(){
    return{
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
            link: 'test'
          },
          {
            tab: 'Trending',
            link: 'test'
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
            link: 'test'
          },
          {
            tab: 'Trending',
            link: 'test'
          },
        ]
      }
    }
  },
  computed:{
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
  apollo: {
      $client: 'backend',
  },
  methods: {
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
  grid-template-columns: 80px 80px 80px 80px 300px 1fr 130px 130px;
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

  .search{
    text-decoration: none;
    border: none;
    background: var(--primary);
    border-radius: 7px;
    padding: 8px 8px 8px 20px;
    outline: none;
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