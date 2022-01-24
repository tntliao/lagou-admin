<template>
  <Header />
  <Main />
</template>

<script>
import Header from "./Header.vue";
import Main from "./Main.vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  name: "Home",
  components: { Header, Main },
  setup() {
    const router = useRouter();
    const token = localStorage.getItem("token") || "";
    axios({
      headers: { token },
      method: "get",
      url: "http://tntliao.cn/api/users/isauth",
    }).then((response) => {
      if (!response.data.code) router.replace("/login");
    });
  },
};
</script>

<style>
</style>