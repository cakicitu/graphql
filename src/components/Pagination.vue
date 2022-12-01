<template>
  <div class="pagination">
    <i @click="selectPage(pageInfo.currentPage - 1)" class="fa-solid fa-caret-left"></i>
    <template  v-for="page in pageInfo.lastPage">
      <div @click="selectPage(page)" class="page" :class="{currentPage: page === pageInfo.currentPage}" v-if="  page >= pageInfo.currentPage - 5   &&   page <= pageInfo.currentPage + 5  ">
        {{ page }}
      </div>
    </template>
    <div class="dots">
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
    </div>
    <div class="page" @click="selectPage(pageInfo.lastPage)" >
      {{ pageInfo.lastPage }}
    </div>
    <i @click="selectPage(pageInfo.currentPage + 1)" class="fa-solid fa-caret-right"></i>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageInfo:{
      required: true
    }
  },
  methods: {
    selectPage(page){
      this.$emit("selectPage", page)
    }
  }
}
</script>

<style scoped lang="scss">
.pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;

  padding: 50px;
  transition: 0.4s;

.page{
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  border-radius: 100px;
  cursor: pointer;
  margin: 3px;
  transition: 0.4s;
  font-size: 14px;

&.currentPage{
   background-color: var(--primary-soft);
   color: #181818;
 }
}

.page:hover {
  transform: scale(1.1);
  transition: 0.4s;
  font-size: 16px;
  font-weight: bold;
}

.dots{
  height: 40px;
  font-size: 30px;
.dot{
  margin: 3px;
  color: var(--primary-soft);
}
}

.fa-solid{
  color: var(--primary);
  font-size: 40px;
  cursor:pointer;
  transition: 0.4s;
}
.fa-solid:hover {
  transform: scale(1.2);
  color: var(--primary-soft);

  transition:  500ms linear;

}
}
</style>