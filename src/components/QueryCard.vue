<template>
    <div class="card" >
      <div class="info">
        <span style="font-size: 14px; float: left"><span style="font-size: 18px; color: var(--color-text-green)">{{media.averageScore}}</span> /100</span>
        <i v-if="media.trending" style="float: right; font-size: 28px;" class="fa-solid fa-arrow-trend-up"></i>
      </div>
      <slot name="cardInfo">

      </slot>
      <span class="title">
                 {{ media.title.english ? media.title.english : media.title.romaji }}
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
</template>

<script>
export default {
  name: "QueryCard",
  props:{
    media: {
      required: true
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.fa-solid{
  color: var(--primary-soft);
}

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
    height: 385px;

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
      overflow: hidden;


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
</style>