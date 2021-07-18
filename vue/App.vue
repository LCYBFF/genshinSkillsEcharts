<template>
  <!-- <el-row justify="center">
    <p>注：输入框自上而下是紫书、蓝书、绿书数量</p>
  </el-row> -->
  <div class="row">
    <template v-for="item in list">
      <div class="col-6 col-sm">
        <div class="box">
          <p>{{ item.name }}</p>
          <div class="item">
            <input v-model="item.a" type="number" min="0" @input="change()" class="a" placeholder="请输入紫书数量">
          </div>
          <div class="item">
            <input v-model="item.b" type="number" min="0" @input="change()" class="b" placeholder="请输入蓝书数量">
          </div>
          <div class="item">
            <input v-model="item.c" type="number" min="0" @input="change()" class="c" placeholder="请输入绿书数量">
          </div>
        </div>
      </div>
    </template>
  </div>
  <div class="row">
    <div class="col mb-3 center">
      <el-button type="primary" plain @click="init()">初始化配置</el-button>
    </div>
  </div>
</template>

<script lang="ts">

import { initEcharts } from '../compnents/skillEcharts';
import Cookies from 'js-cookie';

export default ({
  data() {
    return {
      list: [{
        'name': '自由',
        'a': 0,
        'b': 0,
        'c': 0,
      },{
        'name': '抗争',
        'a': 0,
        'b': 0,
        'c': 0,
      },{
        'name': '诗文',
        'a': 0,
        'b': 0,
        'c': 0,
      },{
        'name': '繁荣',
        'a': 0,
        'b': 0,
        'c': 0,
      },{
        'name': '勤劳',
        'a': 0,
        'b': 0,
        'c': 0,
      },{
        'name': '黄金',
        'a': 0,
        'b': 0,
        'c': 0,
      }],
      legend: [{
        name: '紫书',
        // icon: 'image://https://patchwiki.biligame.com/images/ys/9/9c/sklp02ffk3aqszzvh8k1c3139s0awpd.png'
      },{
        name: '蓝书',
        // icon: 'image://https://patchwiki.biligame.com/images/ys/e/ec/l3mnhy56pyailhn3v7r873htf2nofau.png'
      },{
        name: '绿书',
        // icon: 'image://https://patchwiki.biligame.com/images/ys/b/bc/sd2ige6d7lvj7ugfumue3yjg8gyi0d1.png'
      }],
      color: ['blueviolet', 'dodgerblue', 'darkseagreen']
    }
  },
  methods: {
    // 获取y轴数据
    getyAxisData() {
      var yAxisData = [];
      this.list.forEach(item => {
        yAxisData.push(item.name)
      });
      return yAxisData;
    },
    // 处理数据
    handleSeriesData(d) {
      let seriesData = [[],[],[]];
      d.forEach(item => {
        seriesData[0].push(parseInt(item.a))
        seriesData[1].push(parseInt(item.b))
        seriesData[2].push(parseInt(item.c))
      });
      return seriesData;
    },
    // 数值改变
    change() {
      let seriesData = this.handleSeriesData(this.list);
      // 记录cookie
      Cookies.set('genshinSkillData', JSON.stringify( this.list ));
      // console.log(seriesData);
      initEcharts(this.getyAxisData(), this.legend, this.color, seriesData);
    },
    creat() {
      if (Cookies.get('genshinSkillData')) {
        // 获取cookie(或默认配置)
        this.list = JSON.parse( Cookies.get('genshinSkillData') )
      }
    },
    init() {
      Cookies.remove('genshinSkillData')
      location.reload();
    }
  },
  created() {
    this.creat();
    initEcharts(this.getyAxisData(), this.legend, this.color, this.handleSeriesData(this.list));
  },
})

</script>

<style scoped>
  .box {
    text-align: center;
  }
  .box .item {
    margin: 1rem 0;
  }
  .item input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .item input:hover {
    border-color: #C0C4CC;
  }
  .item input.a:focus {
    border-color: blueviolet;
  }
  .item input.b:focus {
    border-color: dodgerblue;
  }
  .item input.c:focus {
    border-color: darkseagreen;
  }
  .center {
    text-align: center;
  }
</style>