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
    axios.get("http://localhost:3000/api/users/isauth").then((response) => {
      if (!response.data.code) router.replace("/login");
    });
  },
};
</script>

<style>
</style>