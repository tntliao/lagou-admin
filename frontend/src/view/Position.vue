<template>
  <div class="right">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="left_title">
            <span>logo</span>
            <span>公司</span>
            <span>职位</span>
            <span>薪水</span>
            <span>城市</span>
            <span>创建时间</span>
          </div>
          <el-button class="button" type="text" @click="isShow = true"
            ><span class="isBold">添加用户</span></el-button
          >
        </div>
      </template>
      <div class="block">
        <div class="container">
          <div class="item" v-for="item in positionList.list" :key="item._id">
            <p class="companyLogo">
              <img :src="getCompanyLogo(item.companyLogo)" alt="" />
            </p>
            <p class="companyName">{{ item.companyName }}</p>
            <p class="city">{{ item.city }}</p>
            <p class="positionName">{{ item.positionName }}</p>
            <p class="salary">{{ item.salary }}</p>
            <p class="createTime">{{ item.createTime }}</p>

            <div class="item_right">
              <el-popconfirm
                title="确定要删除吗？"
                @confirm="removePosition(item._id, item.companyName)"
              >
                <template #reference>
                  <p class="delete">删除</p>
                </template>
              </el-popconfirm>
              <p class="edit">编辑</p>
            </div>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="positionCountList.list.length"
          :default-page-size="6"
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
      <el-form :model="fromData" :rules="rules" expanded="multipart/form-data">
        <el-form-item prop="companyName">
          <el-input v-model="fromData.companyName" placeholder="请输入公司" />
        </el-form-item>
        <el-form-item prop="positionName">
          <el-input v-model="fromData.positionName" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item prop="salary">
          <el-input v-model="fromData.salary" placeholder="请输入工资" />
        </el-form-item>
        <el-form-item prop="city">
          <el-input v-model="fromData.city" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            action=""
            :limit="1"
            :file-list="fileList"
            :before-upload="uploadFile"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <template #tip>
              <div class="el-upload__tip">jpg/jpeg/png/gif 200kb</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="colseBox">取消</el-button>
        <el-button type="primary" @click="addPosition">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";

axios.defaults.baseURL = "http://tntliao.cn";
export default {
  name: "Position",
  setup() {
    /* --------------------- const -------------------------------- */
    // 控制对话框
    const isShow = ref(false);
    // 对话框数据
    const fromData = reactive({
      city: "",
      salary: "",
      companyName: "",
      positionName: "",
    });
    //用户所有列表数据
    const positionCountList = reactive({ list: "" });
    //用户列表渲染数据
    const positionList = reactive({ list: "" });
    //上传的图片
    let fileList = reactive([]);
    /* ------------------------------------------------------------ */
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
    // 输入框规则
    const rules = {
      companyName: [
        {
          required: true,
          message: "公司不能为空",
        },
      ],
      username: [
        {
          required: true,
          message: "名字不能为空",
        },
      ],
      positionName: [
        {
          required: true,
          message: "职位不能为空",
        },
      ],
      salary: [
        {
          required: true,
          message: "薪水不能为空",
        },
      ],
      city: [
        {
          required: true,
          message: "城市不能为空",
        },
      ],
    };

    /* --------------------------------- function -------------------------------------------- */
    //关闭对话框
    const colseBox = () => {
      isShow.value = false;
    };

    // 添加职位
    const addPosition = () => {
      // 这个是有images数据的formdata
      if (fileList.length > 0) {
        const formdata = fileList[0].formdata;
        if (
          fromData.city &&
          fromData.salary &&
          fromData.companyName &&
          fromData.positionName
        ) {
          Object.keys(fromData).forEach((item) => {
            formdata.set(item, fromData[item]);
          });
          axios({
            method: "post",
            url: "/api/positions/add",
            data: formdata,
          }).then((response) => {
            if (response.data.code) {
              getPositions();
              success(response.data.message);
              isShow.value = false;
              Object.keys(fromData).forEach((item) => {
                fromData[item] = "";
              });
            } else {
              fail(response.data.message);
            }
          });
        } else {
          fail("输入框内容不能为空");
        }
      } else {
        fail("请检查，某些内容为空");
      }
    };
    //删除职位
    const removePosition = (id, useranme) => {
      axios({
        method: "delete",
        data: { id },
        url: "/api/positions/remove",
      }).then((response) => {
        if (response.data.code) {
          success(`删除${useranme}成功`);
          getPositions();
        } else {
          fail(response.data.message);
        }
      });
    };
    // 获取职位数据
    const getPositions = () => {
      axios({
        method: "get",
        url: "/api/positions/getlist",
      }).then((response) => {
        positionCountList.list = response.data || [];
        positionList.list = positionCountList.list.slice(0, 6);
      });
    };
    //页数发送改变
    const pageChange = (number) => {
      positionList.list = positionCountList.list.slice(
        (number - 1) * 6,
        number * 6
      );
    };
    // 上传把信息储存好
    const uploadFile = (file) => {
      //上传之前清除上次的
      fileList.splice(0, fileList.length);
      const name = file.name;
      const formdata = new FormData();
      formdata.set("companyLogo", file);
      fileList.push({ name, formdata });
      return false;
    };
    //拼接图片路径
    const getCompanyLogo = (imgName) => {
      return "http://tntliao.cn/uploads/" + imgName;
    };
    /* ----------------------------------- hooks -------------------------------------- */
    onMounted(() => {
      getPositions();
    });
    /* ------------------------------- return -------------------------------------- */
    return {
      isShow,
      rules,
      colseBox,
      addPosition,
      fromData,
      positionCountList,
      positionList,
      removePosition,
      pageChange,
      uploadFile,
      fileList,
      getCompanyLogo,
    };
  },
};
</script>

<style lang="less" scoped>
.right {
  width: 83rem;
  min-width: 895px;
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
      // min-width: 1200px;
      height: 31rem;
      margin-bottom: 1rem;
      .item {
        padding: 1rem 0;
        display: flex;
        flex-direction: row;
        align-content: center;
        border-bottom: 1px solid #dcdfe6;
        position: relative;
        p {
          min-width: 7rem;
          img {
            width: 4rem;
          }
        }
        .item_right {
          position: absolute;
          right: 0;
          display: flex;
          flex-direction: row-reverse;

          .edit {
            min-width: auto;
            margin-right: 1rem;
            cursor: pointer;
          }
          .delete {
            min-width: auto;
            color: red;
            cursor: pointer;
          }
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