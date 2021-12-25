<template>
  <div class="header">
    <div class="header_left">
      <h1>后台管理</h1>
    </div>
    <div class="header_right">
      <el-icon>
        <Bell />
        <span v-if="emailNum">{{ emailNum }}</span>
      </el-icon>
      <h4 @click="exitLogin">退出</h4>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Bell } from "@element-plus/icons";
import io from "socket.io-client";
import axios from "axios";
import { ref } from "vue";
export default {
  name: "Header",
  components: {
    Bell,
  },
  setup() {
    const emailNum = ref(0);
    const socket = io.connect("http://localhost:3000");
    socket.on("message", (msg) => {
      emailNum.value += 1;
    });
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
          router.push("/login");
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
      emailNum,
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
  .header_right {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    .el-icon {
      position: relative;
      cursor: pointer;
      .el-icon svg {
        height: 1.2em;
        width: 1.2em;
      }
      span {
        position: absolute;
        font-size: 10px;
        color: red;
      }
    }

    h4 {
      margin-left: 1.5rem;
      cursor: pointer;
      -moz-user-select: none; /*火狐*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      -khtml-user-select: none; /*早期浏览器*/
      user-select: none;
    }
  }
}
</style>