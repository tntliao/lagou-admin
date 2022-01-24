<template>
  <div class="right">
    <el-upload class="upload-demo" action="" :beforeUpload="updateImage">
      <el-button size="small" type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/jpeg/png/gif</div>
      </template>
    </el-upload>
    <el-button size="mini" @click="upload">Mini</el-button>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue-demi";
export default {
  name: "Upload",
  setup() {
    const imagesData = reactive([]);
    const updateImage = (file) => {
      const images = new FormData();
      images.set("companyLogo", file);
      imagesData.push({ name: "01", images });
      return false;
    };
    const upload = () => {
      const formdata = imagesData[0].images;
      formdata.set("city", "厦门");
      formdata.set("salary", "20k");
      formdata.set("companyName", "华为");
      formdata.set("positionName", "前端开发");

      axios({
        method: "post",
        url: "http://tntliao.cn/api/positions/add",
        data: formdata,
      });

      // axios.post("http://tntliao.cn/api/positions/upload", images);
    };
    return {
      updateImage,
      upload,
    };
  },
};
</script>

<style lang="less" scoped>
.right {
  width: 83rem;
  min-width: 800px;
  height: 100%;
  padding: 1rem;
  border: 1px solid #dcdfe6;
  border-top: none;
  border-left: none;
  overflow: hidden;
}
</style>