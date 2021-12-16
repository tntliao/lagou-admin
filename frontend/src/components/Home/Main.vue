<template>
  <div class="main">
    <div class="left">
      <el-menu :default-openeds="['1']">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><message /></el-icon>Navigator One
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="1-1">Option 1</el-menu-item>
            <el-menu-item index="1-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="1-3">Option 3</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>Navigator Two
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="2-1">Option 1</el-menu-item>
            <el-menu-item index="2-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="2-3">Option 3</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><setting /></el-icon>Navigator Three
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="3-1">Option 1</el-menu-item>
            <el-menu-item index="3-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="3-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="3-4">
            <template #title>Option 4</template>
            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="right">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>用户列表 <span>创建时间</span></span>
            <el-button class="button" type="text" @click="isShow = true"
              ><span class="isBold">添加用户</span></el-button
            >
          </div>
        </template>
        <div class="block">
          <div class="container">
            <div
              class="item"
              v-for="(item, index) in userList.list"
              :key="index"
            >
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
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Message, Menu, Setting } from "@element-plus/icons";
import axios from "axios";
import moment from "moment";

export default {
  name: "Main",
  components: {
    Message,
    Setting,
    "icon-menu": Menu,
  },
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
        axios
          .post("http://localhost:3000/api/users/adduser", {
            ...fromData,
          })
          .then((response) => {
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
      axios.get("http://localhost:3000/api/users/getlist").then((response) => {
        userCountList.list = response.data.list || [];
        userList.list = userCountList.list.slice(0, 8);
      });
    };
    // 格式化时间戳
    const formatTime = (timeStamp) => {
      return moment(timeStamp * 1).format("L LT");
    };

    // 页数发生变化 更改数据
    const pageChange = (number) => {
      userList.list = userCountList.list.slice((number - 1) * 8, number * 8);
    };

    //删除用户
    const removeUser = (id, username) => {
      axios
        .delete("http://localhost:3000/api/users/delete", {
          id,
        })
        .then((response) => {
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
.main {
  height: 41rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 1000px;
  .left {
    height: 100%;
    border: 1px solid #dcdfe6;
    border-top: none;
    overflow-y: auto;
    min-width: 205px;
    .el-menu {
      border: none;
    }
  }
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
        span {
          span {
            margin-left: 1.5rem;
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
            margin-right: 3rem;
            min-width: 50px;
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
}
</style>