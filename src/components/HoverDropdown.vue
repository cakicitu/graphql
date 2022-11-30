<template>
  <div class="container"
       v-on:mouseover="mouseover"
       v-on:mouseleave="mouseleave">
    <div style="height: 100%; width: 100%; display: flex; justify-content: space-around; align-items: center;">
      <span>{{options.title}}</span><i  class="fa fa-angle-down"></i></div>
    <div class="dropdown" :class="{ isOpen }">
      <div class="option" v-for="option in options.tabs" @click="option.function">
        <span >{{ option.tab }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HoverDropdown",
  props:{
    options: {
      required: true
    }
  },
  data() {
    return{
      isOpen: false,
    }
  },
  methods: {
    mouseover: function () {
      this.isOpen = true;
    },
    mouseleave: function () {
      this.isOpen = false;
    }
  }
}
</script>

<style scoped lang="scss">

.container{
    width: 100%;
    padding: 0;
    cursor: pointer;
    transition: 0.4s;;
    text-align: center;
    color: var(--primary-soft);

}
.dropdown {
  position: absolute;
  top: 69px;
  display: none;

  &.isOpen {
    transition: 0.4s;
    display: block;
  }

  .option{
    padding: 5px 10px 5px 10px;
    width: 100%;
    //background-color: hsla(160, 100%, 37%, 0.2);
    background-color: var(--color-background-mute);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid var(--color-border);
  }

  .option:first-of-type {
    border: 0;
  }
  .option:hover {
    background-color: var(--primary-soft);
    color: black;
  }
}

.container:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
  border-bottom: 1px solid var(--color-border);
  color: var(--primary-soft);
}
</style>