<template>
  <div class="layout">
    <navigation v-if="nav" @setSearch="setSearch" @reset="resetState()"></navigation>
    <div class="content">
      <slot v-if="!mediaResult.length">
      </slot>
      <div class="search" v-else>
            <query-card v-for="media in mediaResult" :media="media">
                <template v-slot:cardInfo>{{media.type}}</template>
            </query-card>
            <pagination style="grid-column: span 5;" :page-info="pageInfo" @selectPage="startSearch"></pagination>
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import Footer from "./Footer.vue";
import QueryCard from "./QueryCard.vue";
import Landing from "../views/Landing.vue";
import Search from "../graphql/queries/Search";
import Pagination from "./Pagination.vue";

export default {
  name: "Layout",
  components: {Pagination, Landing, QueryCard, Navigation, Footer},
  props: {
    nav:{
      default: true
    }
  },
  data(){
    return{
      search: '',
      media: [],
      pageInfo: null
    }
  },
  computed:{
    mediaResult(){
      return this.media
    }
  },
  methods:{
    resetState(){
      this.media = []
      this.search = ''
    },
    setSearch(search){
      this.search = search
      this.startSearch()
    },
    startSearch(page = '1'){
      this.$apollo.query({
        query: Search,
        variables: {search: this.search, page:  parseInt(page)},
        client: 'ani'
      }).then(res => {
        this.media = res.data.Page.media
        this.pageInfo = res.data.Page.pageInfo
      })
    }
  }
}
</script>

<style scoped lang="scss">
.layout{
  height: 100%;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .search{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
    "header header header header header";
  }

}
</style>