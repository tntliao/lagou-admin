<template>
  <Header></Header>
  <Main></Main>
</template>
<script>
import { useRouter } from "vue-router";
import axios from "axios";
import Header from "./Header.vue";
import Main from "./Main.vue";
export default {
  name: "Home",
  components: { Header, Main },
  setup() {
    const router = useRouter();
    axios.get("http://localhost:3000/api/users/isauth").then((response) => {
      if (!response.data.code) router.replace("/login");
    });
  },
};
</script>
