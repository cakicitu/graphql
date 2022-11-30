<template>
    <ApolloQuery  :query="TopAiringAnime" >
      <template  v-slot="{ result: { data }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-if="data" style="display: flex; flex-direction: column">
          <span style="font-size: 16px; margin: 10px">Top airing Anime | <a href="">show all</a></span>
          <div class="verticalAlign">
          <div class="card" v-for="media of data.Page.media" :key="media.id">
            <div class="info">
              <span style="font-size: 14px; float: left"><span style="font-size: 18px; color: var(--color-text-green)">{{media.averageScore}}</span> /100</span>
              <i v-if="media.trending" style="float: right; font-size: 28px;" class="fa-solid fa-arrow-trend-up"></i>
            </div>
            <span>Ep. {{checkNextEpisodeDate(media.airingSchedule.nodes).episode}} airs in {{checkNextEpisodeDate(media.airingSchedule.nodes).timeUntilAiring}}</span>
            <span class="title">
                 {{ media.title.english }}
            </span>
            <div class="image">
              <img :src="media.coverImage.medium" alt="">
            </div>
              <div class="genres">
                <template v-for="(genre, index) in media.genres">
                  <div class="genreCard" v-if="index <= 3">
                    <span class="genre" >{{genre}}</span>
                  </div>
                </template>
              </div>
          </div>

          </div>

        </div>
      </template>
    </ApolloQuery>

</template>

<script>
import TopAiringAnime from "../graphql/queries/TopAiringAnime";
export default {
  name: "Landing",
  apollo:{
    $client: 'ani'
  },
  data(){
    return{
      TopAiringAnime,
      tags: null
    }
  },
  methods: {
    checkNextEpisodeDate(nodes){


      console.log("nodes. ", nodes)
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

      console.log("next episode: ", nextEpisode)

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

  .card{

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 50px 50px 170px 1fr;
    //grid-template-rows: auto;
    grid-template-areas:
    "rating trending"
    "airing"
    "title"
    "img"
    "genre";
    transition: 0.4s;


    text-align: center;

    width: 200px;
    height: 375px;

    padding: 20px;
    border: 2px solid var(--primary);
    border-radius: 7px;
    margin: 10px;

    .image{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        transition: 0.4s;
      }
    }


    .title{
      text-align: center;
      max-width: 200px;
      word-wrap:break-word;

      background: linear-gradient(#252525, #252525 50%, var(--primary)  50%, var(--primary) );
      background-size: 100% 200%;
      /*trasition effect for background*/
      transition: background 0.4s;

      border-radius: 7px;

      height: 48px;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      font-weight: bold;
    }

    .genres{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: row;
      max-width: 200px;
      flex-wrap: wrap;


      .genreCard{
        padding: 5px;
        border: 2px solid var(--primary-soft);
        border-radius: 7px;
        min-width: fit-content;
        height: fit-content;
        margin: 3px;
        transition: 0.4s;
      }
      .genreCard:hover{
        background-color: var(--primary);
      }
    }
  }
  .card:hover{
    transform: scale(1.05);
    cursor: pointer;
    box-shadow: var(--primary) 0px 5px 15px;

      .title{
        transform: scale(1.1);
        transition: background 0.4s;

        //background: linear-gradient(to top, var(--primary) 50%, var(--color-background) 50%) bottom;
        //background-size: 200% 100%;
        background-position: 100% 100%;
      }
      .image{
        img{
          transform: scale(1.1);

        }
      }
  }

}
</style>