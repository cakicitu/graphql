<template>
  <div class="layout">
    <navigation v-if="nav"></navigation>
    <div class="content">
      <slot>
      </slot>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import Footer from "./Footer.vue";

export default {
  name: "Layout",
  components: {Navigation, Footer},
  props: {
    nav:{
      default: true
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
}
</style>