<template>
  <div>
    <el-card>
      <div slot="header">
        <span>粉丝概况</span>
      </div>
      <div ref="fansRef" style="width: 750px;height: 400px;"></div>
      <div ref="oneRef" style="width: 750px;height: 400px;"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'fans',
  data: function () {
    return {
    };
  },
  mounted: function () {
    this.paintPic();
    this.one();
  },
  methods: {
    paintPic: function () {
      // 创建对象
      var myChart = echarts.init(this.$refs.fansRef);
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '内裤']
        },
        yAxis: { id: 1, name: '销量' },
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 46]
        }]
      });
    },
    one: function () {
      // 创建对象
      var myChart = echarts.init(this.$refs.oneRef);
      var option = {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            // type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option)
    }
  }
};
</script>
<style lang="less" scoped></style>
