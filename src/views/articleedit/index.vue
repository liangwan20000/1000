<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改文章</span>
        <el-button type="danger" class="right margin" @click="editArticle(true)">存入草稿</el-button>
        <el-button type="primary" class="right" @click="editArticle(false)">修改</el-button>
      </div>
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="120px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <quill-editor
            v-model="editForm.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="editForm.cover.type">
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:" prop="channel_id">
          <el-select v-model="editForm.channel_id" placeholder="请选择" clearable>
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'editArticle',
  components: {
    quillEditor
  },
  data: function () {
    return {
      channelList: [], // 频道列表
      channel_id: null, // 频道id
      // 自定义校验规则
      editFormRules: {
        content: [
          { required: true, message: '内容必填', trigger: 'blur' },
          { main: 5, max: 30, message: '内容介于5到30个字符之间', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题必填', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '频道必填', trigger: 'change' }
        ]
      },
      editForm: {
        content: null, // 幅文本编辑器内容
        title: null,
        cover: {
          type: 0,
          // images: ['http://toutiao.meiduo.site/FkqeP4LH55CrprQkANlZYAz7l1Zc']
          images: []
        }
      },
      // 坚挺标致
      editFormDirty: false,
      // 幅文本编辑器
      editorOption: {}
    };
  },
  beforeRouteLeave: async function (to, form, next) {
    if (this.editFormDirty) {
      var result = await this.$confirm('当前表单已经被修改了，确认离开吗？', '离开', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
      if (result === 'confirm') {
        next();
      } else {
        next(false);
      }
    } else {
      next()
    };
  },
  created: function () {
    this.getchannelList();
    this.getArticle();
  },
  methods: {
    // 监听器
    editWatch: function () {
      this.$watch('editForm', function () {
        this.editFormDirty = true;
      }, { deep: true });
    },
    // 获取被修改的文章信息
    getArticle: async function () {
      var result = await this.$axios.get(`/articles/${this.$route.params.aid}`).catch((err) => {
        return new Error(err);
      });
      if (result.status !== 200) { return this.$message.error('获取文章失败'); };
      this.editForm = result.data.data;
      this.$nextTick(function () {
        this.editWatch();
      })
    },
    // 修改按钮
    editArticle: function (flag) {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) { return };
        var result = await this.$axios.put(`/articles/${this.editForm.id}`, this.editForm, { params: { draft: flag } }).catch((err) => {
          return new Error(err);
        });
        if (result.status !== 201) {
          return this.$message.error('文章修改失败');
        };
        this.$message.success('文章修改成功');
        this.$router.push({ path: '/article' });
      });
    },
    // 幅文本编辑器
    onEditorBlur: function () {},
    // 幅文本编辑器
    onEditorFocus: function () {},
    // 幅文本编辑器
    onEditorReady: function () {},
    // 获取频道列表
    getchannelList: async function () {
      var result = await this.$axios.get('/channels').catch((err) => {
        return new Error(err)
      });
      if (result.status !== 200) {
        return this.$message.error('获取频道列表失败');
      };
      this.channelList = result.data.data.channels;
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
  .quill-editor /deep/ .ql-editor {
    height: 200px;
  }
</style>
