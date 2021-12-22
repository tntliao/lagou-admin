<template>
  <div class="left">
    <el-menu :default-active="activeNum">
      <el-menu-item index="1" @click="go('/index/user')"
        ><el-icon><user /></el-icon>用户管理
      </el-menu-item>
      <el-menu-item index="2" @click="go('/index/position')">
        <el-icon><set-up /></el-icon>职位管理
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { User, SetUp } from "@element-plus/icons";
import { ref } from "vue-demi";
export default {
  name: "Left",
  components: {
    User,
    SetUp,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeNum = ref();
    const flag = /user$/.test(route.path);
    if (flag) {
      activeNum.value = "1";
    } else {
      activeNum.value = "2";
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