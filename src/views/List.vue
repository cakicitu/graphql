<template>
<layout>
  <slot>
<!--    <div class="content">-->
<!--      <query-card v-for="media in mediaResult" :media="media">-->
<!--        <template v-slot:cardInfo>{{media.type}}</template>-->
<!--      </query-card>-->
<!--      <pagination style="grid-column: span 5;" :page-info="pageInfo" @selectPage="startSearch"></pagination>-->
<!--    </div>-->

    <template v-if="query">
      <ApolloQuery  :query="query" :variables="{ page: 1, perPage: 15 }" >
        <template  v-slot="{ result: { data }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-if="data" style="display: flex; flex-direction: column">
            <span style="font-size: 16px; margin: 10px">{{title}}</span>
            <div class="verticalAlign">
              <query-card v-for="media in data.Page.media" :media="media">
                              <template v-slot:cardInfo>Infotest</template>
                <!--&lt;!&ndash;              <template v-slot:cardInfo>Ep. {{checkNextEpisodeDate(media.airingSchedule.nodes).episode}} airs in {{checkNextEpisodeDate(media.airingSchedule.nodes).timeUntilAiring}}</template>&ndash;&gt;-->
              </query-card>
              <pagination style="grid-column: span 5;" :page-info="data.Page.pageInfo"></pagination>
            </div>
          </div>
        </template>
      </ApolloQuery>
    </template>

  </slot>
</layout>
</template>

<script>
import Layout from "../components/Layout.vue";
import QueryCard from "../components/QueryCard.vue";
import Pagination from "../components/Pagination.vue";

import TopAiringAnime from "../graphql/queries/TopAiringAnime";
import TopReleasingManga from "../graphql/queries/TopReleasingManga";
import TopPopularAnime from "../graphql/queries/TopPopularAnime";
import TopPopularManga from "../graphql/queries/TopPopularManga";
import TopAnime from "../graphql/queries/TopAnime";
import TopManga from "../graphql/queries/TopManga";

export default {
  name: "List",
  components: {Pagination, QueryCard, Layout},
  data(){
    return{
      TopAiringAnime,
      TopReleasingManga,
      TopPopularAnime,
      TopPopularManga,
      TopAnime,
      TopManga,
      title: ''
    }
  },
  computed: {
    query() {
      let query = null

      if (this.$route.params.query == 'TopAnime') {
        query = this.TopAnime
        this.title = 'Top Anime'
      }
      else if (this.$route.params.query == "PopularAnime"){
        query = this.TopPopularAnime
        this.title = 'Most Popular Anime'
      }
      else if (this.$route.params.query == 'AiringAnime'){
        query = this.TopAiringAnime
        this.title = 'Top airing Anime'

      }
      else if (this.$route.params.query == 'TopManga'){
        query = this.TopManga
        this.title = 'Top Manga'

      }
      else if (this.$route.params.query == 'PopularManga'){
        query = this.TopPopularManga
        this.title = 'Most popular Manga'

      }
      else if (this.$route.params.query == 'ReleasingManga'){
        query = this.TopReleasingManga
        this.title = 'Top releasing Manga'

      }else {
        this.$route.push('/')
      }

      return query
    }
  },
  beforeMount() {
    console.log("params: ", this.$route.params)
  }
}
</script>

<style scoped>
.verticalAlign{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
}
</style>