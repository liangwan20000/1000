<template>
  <div>
    <el-dialog
      title="素材图片"
      :visible.sync="dialogVisible"
      @close="clearImg"
      width="60%">
      <ul class="dialogUl">
        <li class="dialogLi" v-for="item in imgList" :key="item.id">
          <img class="dialogImg" :src="item.url" alt="" @click="clickImg">
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkdImg">确 定</el-button>
      </span>
    </el-dialog>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
        <el-button type="danger" class="right margin" @click="addArticle(true)">存入草稿</el-button>
        <el-button type="primary" class="right" @click="addArticle(false)">发布</el-button>
      </div>
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="120px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <quill-editor
            v-model="addForm.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="addForm.cover.type">
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <ul class="ul">
            <li class="li" v-for="item in covernum" :key="item" @click="showDialog(item)">
              <span>点击图标选择图片</span>
              <img style="width: 100px; height: 100px;" v-if="addForm.cover.images[item - 1]" :src="addForm.cover.images[item - 1]" alt="">
              <div v-else class="el-icon-picture-outline"></div>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="频道:" prop="channel_id">
          <el-select v-model="addForm.channel_id" placeholder="请选择" clearable>
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
  name: 'addArticle',
  components: {
    quillEditor
  },
  computed: {
    covernum: function () {
      if (this.addForm.cover.type >= 0) {
        return this.addForm.cover.type
      };
      return 0;
    }
  },
  created: function () {
    this.getchannelList();
  },
  methods: {
    clearImg: function () {
      var li = document.querySelectorAll('.dialogLi');
      li.forEach(item => {
        item.style.border = '2px solid #ccc';
      });
      this.imgUrl = null;
    },
    checkdImg: function () {
      this.addForm.cover.images[this.xu] = this.imgUrl;
      this.dialogVisible = false;
      this.clearImg();
    },
    // 点击图标
    clickImg: function (event) {
      this.clearImg();
      event.target.parentNode.style.border = '2px solid red';
      this.imgUrl = event.target.src;
    },
    // 获取素材
    getImgList: async function () {
      var result = await this.$axios.get('/user/images', { params: this.querycdt }).catch((err) => {
        return new Error(err);
      });
      if (result.status !== 200) { return this.$message.error('获取素材失败'); };
      this.imgList = result.data.data.results;
    },
    // 点击图标选择图片
    showDialog: function (number) {
      this.xu = number - 1;
      this.dialogVisible = true;
      this.getImgList();
    },
    // 发布按钮
    addArticle: function (flag) {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) { return };
        var result = await this.$axios.post('/articles', this.addForm, { params: { draft: flag } }).catch((err) => {
          return new Error(err);
        });
        if (result.status !== 201) {
          return this.$message.error('文章发布失败');
        };
        this.$message.success('文章发布成功');
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
  },
  data: function () {
    return {
      imgUrl: null,
      xu: null,
      imgList: [],
      querycdt: {
        collect: false, // false 代表获取全部图片，true 代表获取收藏图片
        page: 1, // 当前页码
        per_page: 30 // 每页多少张图片
      },
      dialogVisible: false, // 控制弹窗开关
      channelList: [], // 频道列表
      channel_id: null, // 频道id
      // 自定义校验规则
      addFormRules: {
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
      addForm: {
        content: null, // 幅文本编辑器内容
        title: null,
        cover: {
          type: 0,
          images: []
        }
      },
      // 幅文本编辑器
      editorOption: {}
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
  .quill-editor /deep/ .ql-editor {
    height: 200px;
  }
  .ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }
  .li {
    float: left;
    width: 150px;
    margin-right: 10px;
    text-align: center;
    border: 1px solid #ccc;
    img {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 100%;
    }
    div {
      width: 100px;
      height: 100px;
      font-size: 100px;
    }
  }
  .dialogUl {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    list-style: none;
    .dialogLi {
      float: left;
      width: 23%;
      height: 200px;
      margin: 0 5px;
      margin-bottom: 10px;
      position: relative;
      border: 2px solid #ccc;
      .dialogImg {
        width: 100%;
        height: 100%;
        display: block;
        background-color: lime;
      }
    }
  }
</style>
