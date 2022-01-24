<template>
  <div class="right">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="left_title">
            <span>用户列表</span>
            <span>创建时间</span>
          </div>
          <el-button class="button" type="text" @click="isShow = true"
            ><span class="isBold">添加用户</span></el-button
          >
        </div>
      </template>
      <div class="block">
        <div class="container">
          <div class="item" v-for="item in userList.list" :key="item.useranme">
            <p class="name">{{ item.username }}</p>
            <p class="time">{{ formatTime(item.createTime) }}</p>
            <el-popconfirm
              title="确定要删除吗？"
              @confirm="removeUser(item.id, item.username)"
            >
              <template #reference>
                <p class="delete">删除</p>
              </template>
            </el-popconfirm>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="userCountList.list.length"
          :default-page-size="8"
          background
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
  <el-dialog
    v-model="isShow"
    title="Warning"
    width="300px"
    center
    :show-close="false"
  >
    <el-form
      ref="ruleForm"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form :model="fromData" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="fromData.username"
            placeholder="Please enter username"
            @keyup="inspectName"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="fromData.password"
            placeholder="Please enter password"
            @keyup="inspectName"
          />
        </el-form-item>
      </el-form>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="colseBox">取消</el-button>
        <el-button type="primary" @click="addUser">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import moment from "moment";

axios.defaults.baseURL = "http://tntliao.cn";
export default {
  name: "User",
  setup() {
    /* --------------------- const -------------------------------- */
    // 控制对话框
    const isShow = ref(false);
    // 账号密码
    const fromData = reactive({
      username: "",
      password: "",
    });
    //用户所有列表数据
    const userCountList = reactive({ list: "" });
    //用户列表渲染数据
    const userList = reactive({ list: "" });

    // 输入框规则
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名且不能为中文",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码且不能为中文",
        },
      ],
    };

    const token = localStorage.getItem("token") || "";
    /* -------------------------------- other ---------------------------------------- */
    // 正则匹配不能输入中文
    const inspectName = () => {
      const newUsername = fromData.username.replace(/[\u4e00-\u9fa5]/gi, "");
      const newPassword = fromData.password.replace(/[\u4e00-\u9fa5]/gi, "");
      fromData.username = newUsername;
      fromData.password = newPassword;
    };
    // 成功的信息提示
    const success = (message) => {
      ElMessage({
        message,
        type: "success",
        center: true,
      });
    };
    // 失败的信息提示
    const fail = (message) => {
      ElMessage({
        message,
        type: "warning",
        center: true,
      });
    };

    /* --------------------------------- function -------------------------------------------- */
    //关闭对话框
    const colseBox = () => {
      isShow.value = false;
      fromData.username = "";
      fromData.password = "";
    };
    // 添加用户
    const addUser = () => {
      if (fromData.username && fromData.password) {
        axios({
          headers: { token },
          method: "post",
          url: "/api/users/adduser",
          data: { ...fromData },
        }).then((response) => {
          const message = response.data.message;
          if (response.data.code) {
            // 成功添加用户
            success(message);
            isShow.value = false;
            fromData.username = "";
            fromData.password = "";
            getUserList();
          } else {
            // 用户已存在
            fail(message);
          }
        });
      } else {
        fail("账号或密码不能为空");
      }
    };

    // 获取用户数据列表
    const getUserList = () => {
      axios({
        headers: { token },
        method: "get",
        url: "/api/users/getlist",
        data: { ...fromData },
      }).then((response) => {
        userCountList.list = response.data.list || [];
        userList.list = userCountList.list.slice(0, 8);
      });
    };
    // 格式化时间戳
    const formatTime = (timeStamp) => {
      return moment(timeStamp * 1).format("YYYY年M月D日H时m分");
    };

    // 页数发生变化 更改数据
    const pageChange = (number) => {
      userList.list = userCountList.list.slice((number - 1) * 8, number * 8);
    };

    //删除用户
    const removeUser = (id, username) => {
      axios({
        headers: { token },
        method: "delete",
        url: "/api/users/delete",
        data: { id },
      }).then((response) => {
        if (response.data.code) {
          success(`删除${username}成功`);
          getUserList();
        } else {
          fail(`删除${username}失败`);
        }
      });
    };
    /* -------------------------------- hook -------------------------------------- */
    //挂载完毕钩子
    onMounted(() => {
      getUserList();
    });
    /* ------------------------------- return -------------------------------------- */
    return {
      isShow,
      fromData,
      rules,
      inspectName,
      addUser,
      colseBox,
      userList,
      formatTime,
      userCountList,
      pageChange,
      removeUser,
    };
  },
};
</script>

<style lang="less" scoped>
.right {
  width: 83rem;
  min-width: 800px;
  height: 100%;
  border: 1px solid #dcdfe6;
  border-top: none;
  border-left: none;
  overflow: hidden;
  .box-card {
    border: none;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left_title {
        span {
          min-width: 7rem;
          display: inline-block;
        }
      }
      .button {
        .isBold {
          font-weight: bold;
        }
      }
    }
    .container {
      width: 100%;
      height: 31rem;
      margin-bottom: 1rem;
      .item {
        padding: 1rem 0;
        display: flex;
        flex-direction: row;
        align-content: center;
        border-bottom: 1px solid #dcdfe6;
        position: relative;
        .name {
          min-width: 7rem;
        }
        .delete {
          position: absolute;
          right: 0;
          color: red;
          cursor: pointer;
        }
      }
    }
    .el-pagination {
      float: right;
      margin-bottom: 1rem;
    }
  }
}
</style>