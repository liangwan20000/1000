<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form ref="editFormRef" :model="editForm">
            <el-form-item label="用户名">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="editForm.mobile" disabled></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="editForm.infro" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editAccount">更新账户</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            action='http://ttapi.research.itcast.cn/mp/v1_0/user/photo'
            :show-file-list="false"
            :http-request="httpRequest"
            :on-success="handleAvatarSuccess">
            <img v-if="editForm.photo" :src="editForm.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'acount',
  data: function () {
    return {
      editForm: {
        name: null,
        mobile: null,
        infro: null,
        email: null
      }
    };
  },
  created: function () {
    this.getAccountInfo();
  },
  methods: {
    // 覆盖默认的上传行为
    httpRequest: async function (value) {
      var formData = new FormData();
      formData.append('photo', value.file);
      var result = await this.$axios.patch('/user/photo', formData).catch((err) => {
        return new Error(err);
      });
      if (result.status !== 201) { return this.$message.error('上传头像失败'); };
      this.$message.success('上传头像成功');
      this.editForm.photo = result.data.data.photo;
      this.$store.commit('upPhoto', result.data.data.photo);
    },
    // 图像上传成功的回调函数
    handleAvatarSuccess: function () {},
    // 更新账户信息
    editAccount: async function () {
      var result = await this.$axios.patch('/user/profile', this.editForm).catch((err) => {
        return new Error(err);
      });
      if (result.status !== 201) { return this.$message.error('更新账户信息失败'); }
      this.$message.success('更新账户信息成功');
      this.$store.commit('upName', result.data.data.name);
    },
    // 获取账户信息
    getAccountInfo: async function () {
      var result = await this.$axios.get('/user/profile').catch((err) => {
        return new Error(err);
      });
      if (result.status !== 200) { return this.$message.error('获取账户信息失败'); };
      this.editForm = result.data.data;
      this.$store.commit('upName', this.editForm.name);
      this.$store.commit('upPhoto', this.editForm.photo);
    }
  }
};
</script>
<style lang="less" scoped>
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
