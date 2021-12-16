<template>
  <div class="container">
    <div class="box">
      <div class="Loginbox">
        <h1>Login</h1>
      </div>
      <div class="textbox">
        <input
          type="text"
          placeholder="UserName"
          id="text"
          v-model="signinInfo.username"
          autocomplete="off"
        />
        <input
          type="PassWord"
          placeholder="PassWord"
          id="password"
          v-model="signinInfo.password"
          autocomplete="off"
        />
        <input type="button" value="Login" @click="login" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "Signin",
  setup() {
    const router = useRouter();

    const signinInfo = reactive({
      username: "admin",
      password: "admin",
    });

    const login = () => {
      axios
        .post("http://localhost:3000/api/users/login", { ...signinInfo })
        .then((response) => {
          if (response.data.code) {
            router.push("/home");
            ElMessage({
              message: response.data.message,
              type: "success",
              center: true,
            });
          } else {
            ElMessage({
              message: response.data.message,
              type: "warning",
              center: true,
            });
          }
        });
    };
    return {
      signinInfo,
      login,
    };
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  background-color: #409eff;
  .box {
    width: 300px;
    height: 250px;
    background-color: transparent;
    border: 3px solid white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* h1标签 */
    .Loginbox {
      margin-top: 20px;
      text-align: center;
      h1 {
        font-size: 35px;
        color: white;
        font-weight: bold;
      }
    }
    .textbox {
      input {
        outline: none;
        display: block;
        border: 2px solid #ffffff;
        background: transparent;
        color: wheat;
        font-weight: bold;
        &::placeholder {
          color: white;
        }
      }
      input[type="text"],
      input[type="PassWord"] {
        margin: 15px auto;
        width: 180px;
        height: 35px;
        text-align: center;
        border-radius: 24px;
        transition: 0.25s;
      }

      input[type="button"] {
        width: 90px;
        height: 35px;
        margin: 10px auto;
        border-radius: 18px;
        cursor: pointer;
        color: white;
        transition: 0.5s;
        &:hover {
          color: wheat;
          border: 2px solid wheat;
        }
      }

      input[type="text"]:focus,
      input[type="PassWord"]:focus {
        width: 240px;
        border: 2px solid wheat;
      }
    }
  }
}
</style>