<template>
    <ApolloQuery  :query="TopAiringAnime" :variables="{ page: 1, perPage: 5 }" >
      <template  v-slot="{ result: { data }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-if="data" style="display: flex; flex-direction: column">
          <span style="font-size: 16px; margin: 10px">Top airing Anime | <a href="">show all</a></span>
          <div class="verticalAlign">
            <query-card v-for="media in data.Page.media" :media="media">
                <template v-slot:cardInfo>Ep. {{checkNextEpisodeDate(media.airingSchedule.nodes).episode}} airs in {{checkNextEpisodeDate(media.airingSchedule.nodes).timeUntilAiring}}</template>
            </query-card>
          </div>
        </div>
      </template>
    </ApolloQuery>
    <ApolloQuery  :query="TopReleasingManga" :variables="{ page: 1, perPage: 5 }" >
    <template  v-slot="{ result: { data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-if="data" style="display: flex; flex-direction: column">
        <span style="font-size: 16px; margin: 10px">Top releasing Manga | <a href="">show all</a></span>
        <div class="verticalAlign">
          <query-card v-for="media in data.Page.media" :media="media">
            <template v-slot:cardInfo><span><i class="fa-solid fa-star"></i> {{media.favourites}}</span>
            </template>
          </query-card>
        </div>
      </div>
    </template>
  </ApolloQuery>
    <ApolloQuery  :query="TopPopularAnime" :variables="{ page: 1, perPage: 5 }">
    <template  v-slot="{ result: { data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-if="data" style="display: flex; flex-direction: column">
        <span style="font-size: 16px; margin: 10px">Most popular Anime | <a href="">show all</a></span>
        <div class="verticalAlign">
          <query-card v-for="media in data.Page.media" :media="media">
            <template v-slot:cardInfo>
              <span>
                {{media.status}}
                 <br>
              <span v-if="media.status === 'FINISHED'">
                Episodes: {{media.episodes}}
              </span>
              </span>

            </template>
          </query-card>
        </div>
      </div>
    </template>
  </ApolloQuery>
    <ApolloQuery  :query="TopPopularManga" :variables="{ page: 1, perPage: 5 }">
    <template  v-slot="{ result: { data }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-if="data" style="display: flex; flex-direction: column">
        <span style="font-size: 16px; margin: 10px">Most popular Anime | <a href="">show all</a></span>
        <div class="verticalAlign">
          <query-card v-for="media in data.Page.media" :media="media">
            <template v-slot:cardInfo>
              <span>
                  {{media.status}}
            <br>
              <span v-if="media.status === 'FINISHED'">
                Chapters: {{media.chapters}}
              </span>
              </span>
            </template>
          </query-card>
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import TopAiringAnime from "../graphql/queries/TopAiringAnime";
import TopReleasingManga from "../graphql/queries/TopReleasingManga";
import TopPopularAnime from "../graphql/queries/TopPopularAnime";
import TopPopularManga from "../graphql/queries/TopPopularManga";
import QueryCard from "../components/QueryCard.vue";
export default {
  name: "Landing",
  components: {QueryCard},
  apollo:{
    $client: 'ani'
  },
  data(){
    return{
      TopAiringAnime,
      TopReleasingManga,
      TopPopularAnime,
      TopPopularManga,
      tags: null
    }
  },
  methods: {
    checkNextEpisodeDate(nodes){


      let nextEpisode = null

      nodes.forEach(node => {
        if (!nextEpisode){
          if (Math.sign(node.timeUntilAiring) == 1){
            nextEpisode = {
              timeUntilAiring: this.secondsToDhms(node.timeUntilAiring) ,
              episode: node.episode
            }
          }
        }
      })


      if (!nextEpisode){
        nextEpisode = {
          timeUntilAiring: this.secondsToDhms(Math.abs(nodes[24].timeUntilAiring)) ,
          episode: nodes[0].episode
        }
      }

      return nextEpisode
    },
    secondsToDhms(seconds) {
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600*24));
      var h = Math.floor(seconds % (3600*24) / 3600);
      var m = Math.floor(seconds % 3600 / 60);

      var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " min ") : "";
      return dDisplay + hDisplay + mDisplay;
    }
  }
}
</script>

<style scoped lang="scss">

.fa-solid{
  color: var(--primary-soft);
}
.verticalAlign{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid var(--color-border);
}
</style>