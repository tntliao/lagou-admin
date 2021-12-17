<template>
  <div class="left">
    <el-menu default-active="1">
      <el-menu-item index="1" @click="go('/home/user')"
        ><el-icon><user /></el-icon>用户管理
      </el-menu-item>
      <el-menu-item index="2" @click="go('/home/position')">
        <el-icon><set-up /></el-icon>职位管理
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { User, SetUp } from "@element-plus/icons";
export default {
  name: "Left",
  components: {
    User,
    SetUp,
  },
  setup() {
    const router = useRouter();
    const go = (path) => {
      router.push(path);
    };
    return {
      go,
    };
  },
};
</script>

<style lang="less">
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
</style>