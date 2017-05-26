<style lang='less' scoped>
  #main1{
    width:100%;
    height:400px;
  }
</style>
<template>
  <div id='main1'></div>
</template>
<script>
  import { mapState } from 'vuex'
  import echarts from 'echarts'
  export default {
    computed: {
      ...mapState({
        lineChartsDate:state => state.pageTwo.lineChartsDate,
      }),
    },
    methods:{
      showCharts(data){
        let yItems=[];
        let seriesData=[];
        let legendData=[];
        for(let p in data) {
            legendData.push(p);
            let itemDate={};
            itemDate.name=p;
            itemDate.type='line';
            itemDate.data=[];
            for(let t in data[p]) {
                yItems.push(t+'月');
                itemDate.data.push(data[p][t]);
            }
            seriesData.push(itemDate);
        }
        yItems.length=yItems.length/legendData.length;
        let myChart = echarts.init(document.getElementById('main1'));
        let option = {
            title: {
                text: '出/入库数量统计图',
                x:'left',
                y:'top',
                textAlign:'left'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:legendData,
                bottom:'bottom'
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '8%',
                borderWidth:1,
                containLabel: true
            },
            xAxis: {
                name:'时间',
                type: 'category',
                boundaryGap: false,
                splitLine:{
                    show:true
                },
                data: yItems
            },
            yAxis: {
              name:'数量'
            },
            series: seriesData
        };
        myChart.setOption(option);
      }
    },
    watch:{
      lineChartsDate:{
        handler(val,oldVal) {
          if(val){
            this.showCharts(val);
          }
        },
        deep:true
      },
    }
  }
</script>
