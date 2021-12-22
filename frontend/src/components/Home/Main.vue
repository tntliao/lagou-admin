<template>
  <div class="main">
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
export default {
  name: "Main",
  components: {
    Menu,
  },
};
</script>
<style lang="less">
.main {
  height: 41rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 1000px;
}
</style>