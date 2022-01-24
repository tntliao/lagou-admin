<template>
  <div class="left">
    <el-menu :default-active="activeNum">
      <el-menu-item index="1" @click="go('/index/user')"
        ><el-icon><user /></el-icon>用户管理
      </el-menu-item>
      <el-menu-item index="2" @click="go('/index/position')">
        <el-icon><set-up /></el-icon>职位管理
      </el-menu-item>
      <el-menu-item index="3" @click="go('/index/upload')">
        <el-icon><circle-plus /></el-icon>添加职位
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { User, SetUp, CirclePlus } from "@element-plus/icons";
import { ref } from "vue-demi";
export default {
  name: "Left",
  components: {
    User,
    SetUp,
    CirclePlus,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeNum = ref();
    const path = route.path;
    switch (path) {
      case "/index/user":
        activeNum.value = "1";
        break;
      case "/index/position":
        activeNum.value = "2";
        break;
      case "/index/upload":
        activeNum.value = "3";
        break;
    }
    /* ----------------------------------------------------- */
    const go = (path) => {
      router.push(path);
    };
    /* ----------------------------------------------------- */
    return {
      go,
      activeNum,
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