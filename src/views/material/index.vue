<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <el-upload
          class="right"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :on-success="handOnSuccess"
          :headers="upHeaders"
          name="image"
          :show-file-list="false">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </div>
      <ul class="ul">
        <li class="li" v-for="item in imgList" :key="item.id">
          <img class="img" :src="item.url" alt="">
          <div class="div">
            <el-button type="success">收藏</el-button>
            <el-button type="danger">删除</el-button>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'material',
  data: function () {
    return {
      upHeaders: { Authorization: 'Bearer ' + window.sessionStorage.getItem('token') },
      imgList: [],
      querycdt: {
        collect: false, // false 代表获取全部图片，true 代表获取收藏图片
        page: 1, // 当前页码
        per_page: 20 // 每页多少张图片
      }
    };
  },
  created: function () {
    this.getImgList();
  },
  methods: {
    // 图片上传成功的回调
    handOnSuccess: function (file) {
      this.$message.success('图片上传成功');
      this.getImgList();
    },
    // 获取素材
    getImgList: async function () {
      var result = await this.$axios.get('/user/images', { params: this.querycdt }).catch((err) => {
        return new Error(err);
      });
      if (result.status !== 200) { return this.$message.error('获取素材失败'); };
      this.imgList = result.data.data.results;
    }
  }
};
</script>
<style lang="less" scoped>
  .right {
    float: right;
  }
  .margin {
    margin-left: 20px;
  }
  .clearfix {
    overflow: hidden;
    position: relative;
    span {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  .ul {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    list-style: none;
    .li {
      float: left;
      width: 23%;
      height: 200px;
      margin: 0 9px;
      margin-top: 10px;
      position: relative;
      border: 1px solid #ccc;
      img {
        width: 100%;
        height: 80%;
        display: block;
      }
      .div {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-around;
      }
    }
  }
</style>
