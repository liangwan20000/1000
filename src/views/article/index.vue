<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form ref='searchFormRef' :model='searchForm'>
        <el-form-item label='文章状态'>
          <el-radio-group v-model="searchForm.status" @change="getArticleList">
            <el-radio label=''>全部</el-radio>
            <el-radio label='0'>草稿</el-radio>
            <el-radio label='1'>待审核</el-radio>
            <el-radio label='2'>审核通过</el-radio>
            <el-radio label='3'>审核失败</el-radio>
            <el-radio label='4'>已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='频道列表'>
          <el-select v-model="searchForm.channel_id" clearable @change="getArticleList" placeholder="请选择">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='时间选择'>
          <el-date-picker
            v-model="timetotime"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click="getArticleList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card2">
      <div slot="header" class="clearfix">
        <span>共找到{{ tot }}条内容</span>
      </div>
      <el-table
        :data="articleList"
        style="width: 100%">
        <el-table-column label="图标" align="center">
          <img slot-scope="stData" :src="stData.row.cover.images[0]" alt="" width="150" height="100">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="290" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="150" align="center">
          <template slot-scope="stData">
            <el-tag v-if="stData.row.status === 0">草稿</el-tag>
            <el-tag type="success" v-else-if="stData.row.status === 1">待审核</el-tag>
            <el-tag type="info" v-else-if="stData.row.status === 2">审核通过</el-tag>
            <el-tag type="warning" v-else-if="stData.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-else>已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="stData">
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="danger" size="mini" @click="del(stData.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="searchForm.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tot">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'articleCom',
  watch: {
    timetotime: function (newvalue, odevalue) {
      this.searchForm.begin_pubdate = newvalue[0];
      this.searchForm.end_pubdate = newvalue[1];
      // 时间变化后重新获取数据
      this.getArticleList();
    }
  },
  created: function () {
    this.getchannelList();
    this.getArticleList();
  },
  methods: {
    // 删除文章
    del: async function (id) {
      var data = await this.$confirm('确定要删除该文章吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => { return this.$message.info('已取消删除') });
      if (data === 'confirm') {
        var result = await this.$axios.delete(`/articles/${id}`).catch((error) => { return new Error(error) });
        if (result.status !== 200) { return this.$message.error('删除失败'); };
        this.$message.success('删除成功');
        this.getArticleList();
      };
    },
    // 变化后的每页显示条数
    handleSizeChange: function (value) {
      this.searchForm.per_page = value;
      this.getArticleList();
    },
    // 页码切换
    handleCurrentChange: function (value) {
      this.searchForm.page = value;
      this.getArticleList();
    },
    // 获取频道列表
    getchannelList: async function () {
      var result = await this.$axios.get('/channels').catch((err) => { return new Error(err) });
      if (result.status !== 200) {
        return this.$message.error('获取频道列表失败');
      };
      this.channelList = result.data.data.channels;
    },
    // 获取文章列表
    getArticleList: async function () {
      var cdtDate = {};
      for (var key in this.searchForm) {
        if (this.searchForm[key]) {
          cdtDate[key] = this.searchForm[key];
        };
      };
      var result = await this.$axios.get('/articles', { params: cdtDate }).catch((err) => { return new Error(err) });
      if (result.status !== 200) {
        return this.$message.error('获取文章列表失败');
      };
      this.articleList = result.data.data.results;
      this.tot = result.data.data.total_count;
    }
  },
  data: function () {
    return {
      tot: null, // 文章总条数
      articleList: [], // 文章列表
      channelList: [], // 频道列表
      timetotime: null, // 时间
      searchForm: {
        status: '', // 文章状态
        channel_id: null, // 频道
        begin_pubdate: null, // 开始日期
        end_pubdate: null, // 结束日期
        page: 1, // 当前页码
        per_page: 10 // 每页显示条数
      }
    }
  }
};
</script>
<style lang='less' scoped>
  .box-card2 {
    margin-top: 20px;
  }
</style>
