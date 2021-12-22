<template>
  <div class="header">
    <h1>后台管理</h1>
    <h4 @click="exitLogin">退出</h4>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const exitLogin = () => {
      const token = localStorage.getItem("token");
      localStorage.removeItem("token");
      axios({
        headers: { token },
        method: "get",
        url: "http://localhost:3000/api/users/exitlogin",
      }).then((response) => {
        if (response.data.code) {
          router.back();
          ElMessage({
            message: response.data.message,
            type: "success",
            center: true,
          });
        } else {
          ElMessage({
            message: "退出失败，请检查当前网络...",
            type: "warning",
            center: true,
          });
        }
      });
    };
    return {
      exitLogin,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 5rem;
  min-width: 1000px;
  background: rgb(255, 255, 255);
  border: 1px solid #dcdfe6;
  line-height: 5rem;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h1 {
    font-size: 1.5rem;
    color: #303133;
  }
  h4 {
    cursor: pointer;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }
}
</style>