<template>
  <router-view />
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  name: "App",
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