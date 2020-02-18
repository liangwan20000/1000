<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
        <el-button type="danger" class="right margin">存入草稿</el-button>
        <el-button type="primary" class="right">发布</el-button>
      </div>
      <el-form ref="addFormRef" :model="addForm" label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:"></el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="addForm.cover.type">
            <el-radio label="0">无图</el-radio>
            <el-radio label="1">单图</el-radio>
            <el-radio label="3">三图</el-radio>
            <el-radio label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="addForm.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'addArticle',
  created: function () {
    this.getchannelList();
  },
  methods: {
    // 获取频道列表
    getchannelList: async function () {
      var result = await this.$axios.get('/channels').catch((err) => { return new Error(err) });
      if (result.status !== 200) {
        return this.$message.error('获取频道列表失败');
      };
      this.channelList = result.data.data.channels;
    }
  },
  data: function () {
    return {
      channelList: [], // 频道列表
      channel_id: null, // 频道id
      addForm: {
        title: null,
        cover: {
          type: '0',
          images: []
        }
      }
    };
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
</style>
