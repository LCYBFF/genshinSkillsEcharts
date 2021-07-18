import * as echarts from 'echarts';

export function initEcharts (yAxisData, legendData, colorData, seriesData) {
  // 初始化echarts实例
  var EChart = echarts.init(document.getElementById('main'));

  // 处理x轴数据
  let series = []
  seriesData.forEach((item, index) => {
    let config = {
      name: legendData[index].name,
      type: "bar",
      barGap: 0,
      emphasis: {
        focus: "series"
      },
      data: item
    }
    series.push(config)
  });
  
  // 绘制图表
  EChart.setOption({
    title: {
      text: '原神技能本统计',
      link: 'https://github.com/LCYBFF/genshinSkillsEcharts',
      subtext: 'Bilibili - 凡云',
      sublink: 'https://space.bilibili.com/3491267'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: legendData,
      top: '5%',
      right: '5%'
    },
    color: colorData,
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      minInterval: 1,
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: yAxisData
    },
    series: series
  });
}