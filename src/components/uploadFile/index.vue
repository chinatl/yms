<template>
<div class="upload-container">
    <div class="upload-file" :style='{"background-image":"url(" + require("@/assets/img/"+ bgc +".png") + ")"}' v-loading='loading'>
        <el-upload
          v-show="isRemove"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="upload_img"
          :show-file-list="false"
          :auto-upload="false">
          <img :src="require('@/assets/img/相机icon.png')" alt="" class="photo">
        </el-upload>
        <p v-show="isRemove">{{info}}</p>
        <div class="infotroduce">{{title}}</div>
        <div class="uploading-img" v-if="data.src">
          <img :src="data.src" alt="">
          <i class="el-icon-close" @click="remove_img" v-show="isRemove"></i>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    info: {
      type: String
    },
    title: {
      type: String
    },
    bgc: {
      type: String
    },
    data: {
      type: Object
    },
    // 传递的是  是否可以删除和上传的,默认是是可以上传和删除，
    isRemove: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    upload_img(e) {
      if (!/\.(png|jpg|jpeg|PNG|JPEG|JPG)(\?.*)?$/.test(e.name)) {
        this.$message({
          message: "请上传jpg,png,jpeg等图片格式文件",
          type: "warning"
        });
        return;
      }
      if (e.size / 1024 / 1024 > 20) {
        this.$message({
          message: "最大可上传20M图片",
          type: "error"
        });
        return;
      }
      var formData = new FormData();
      formData.append("selectFile", e.raw);
      formData.append("ownerSystem", "gwt-platform");
      formData.append("ownerModule", "Anno");
      formData.append("ownerAperation", "ownerAperation");
      formData.append("userId", "1");
      formData.append("uploadOpt", "add");
      formData.append("editFileId", "");
      this.loading = true;
      this.$post("uploadFile/upload", formData, "form")
        .then(res => {
          this.$message({
            message: "上传成功",
            type: "success"
          });
          this.loading = false;
          res.data[0].src = e.src;
          this.$emit("upload", res.data[0]);
        })
        .catch(res => {
          this.loading = false;
        });
    },
    remove_img() {
      this.loading = true;
      this.$post(
        "courseFile/del",
        {
          id: this.data.id
        },
        "json"
      )
        .then(res => {
          this.loading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.$emit("remove");
        })
        .catch(res => {
          this.loading = false;
          console.log(res);
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  width: 316px;
  height: 205px;
  margin-bottom: 70px;
  margin-right: 70px;
  display: inline-block;
  .upload-file {
    width: 316px;
    height: 205px;
    background-color: rgb(233, 245, 253);
    border-radius: 6px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    float: left;
    background-repeat: no-repeat;
    background-position: center;
    .uploading-img {
      position: absolute;
      top: 1px;
      right: 1px;
      bottom: 1px;
      left: 1px;
      background-color: rgb(255, 255, 255);
      border: 1px solid #efefef;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-height: 100%;
        max-width: 100%;
      }
      .el-icon-close {
        font-size: 24px;
        position: absolute;
        right: 4px;
        top: 4px;
        cursor: pointer;
        color: #aaaaaa;
        &:hover {
          color: #2ba4f1;
        }
      }
    }
    .photo {
      cursor: pointer;
    }
    p {
      margin-top: 12px;
      font-size: 13px;
    }
    .infotroduce {
      position: absolute;
      bottom: -40px;
      left: 0;
      right: 0;
      font-size: 16px;
    }
  }
}
</style>

