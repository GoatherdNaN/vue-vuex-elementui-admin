<style lang='less' scoped>
.statistics{
  background-color:#fff;
}
.operate-bar{
  margin-bottom:14px;
  height: 66px;
  line-height: 66px;
  border-radius: 10px;
  .date-way-select{
    margin-right: 12px;
  }
  .search-btn{
    margin-left: 8px;
  }
}
.chart-one{
  margin-bottom:14px;
  height: 400px;
}
.chart-two-three{
  margin-top:12px;
  display:-webkit-flex;
  display: flex;
  width: 100%;
  .chart-item{
    flex:1;
    height:400px;
    &:first-child{
      margin-right: 12px;
    }
  }
}
</style>
<template>
  <div>
    <el-row class='operate-bar statistics'>
      <el-col :span="3" :offset="1">
        <el-select v-model="dateWay" placeholder="请选择时间处理方式" size='small' class="date-way-select" clearable>
          <el-option
          v-for="item in dateWayOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="dateValue"
          size='small'
          type="date"
          :editable="false"
          placeholder="请选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="1">
        <el-button type="success" icon="search" size="small" class="search-btn" @click="searchCharts">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="chart-one statistics">
      <el-col :span="24">
        <line-chart/>
      </el-col>
    </el-row>
    <section class="chart-two-three">
      <div class="chart-item statistics">
        <pie-chart id="main2"/>
      </div>
      <div class="chart-item statistics">
        <pie-chart id="main3"/>
      </div>
    </section>
  </div>
</template>
<script>
  import moment from 'moment'
  import {getDateBeforeWeek,getCurrentMonth,getCurrentWeek} from '../utils/common'
  import {dateWayOption} from '../constants/config'
  import LineChart from '../components/pagetwo/LineChart.vue'
  import PieChart from '../components/pagetwo/PieChart.vue'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        dateWayOption,
        dateWay:'1',
        dateValue: new Date(),
      }
    },
    created(){
      this.openMessage();
      this.searchCharts();
    },
    methods: {
      ...mapActions({
        getStatisticsData:"getStatisticsData"
      }),
      searchCharts(){
        let params = {
          dateWay:'1',
          beginDate:moment(new Date()).format('YYYY')+'-01-01',
          endDate:moment(new Date()).format('YYYY')+'-12-31',
        }
        if(this.dateWay){
          params.dateWay = this.dateWay;
        }
        if(this.dateValue){
          let dateString = moment(this.dateValue).format('YYYY-MM-DD');
          // "1"年份 "2"月份 "3"自然周 "4"日 "5"最近一周
          switch(params.dateWay){
              case '1':
                  break;
              case '2':
                  params.beginDate=getCurrentMonth(dateString).monthFirstDay;
                  params.endDate=getCurrentMonth(dateString).monthLastDay;
                  break;
              case '3':
                  params.beginDate=getCurrentWeek(dateString).weekFirstDay;
                  params.endDate=getCurrentWeek(dateString).weekLastDay;
                  break;
              case '4':
                  params.beginDate=dateString;
                  params.endDate=dateString;
                  break;
              case '5':
                  params.beginDate=getDateBeforeWeek(dateString);
                  params.endDate=dateString;
                  break;
              default:
                  params.beginDate=dateString.split("-")[0]+'-01-01';
                  params.endDate=dateString.split("-")[0]+'-12-31';
          }
        }

        this.getStatisticsData(params);
      },
      openMessage() {
        const h = this.$createElement;
        this.$notify({
          title: '搜索功能提示',
          message: h('i', { style: 'color: teal'}, '左侧是时间处理的方式选择，右侧选择某天，选择的时间将按照你选择的方式处理。如选择按年处理，将显示右侧时间所在年的数据！'),
          offset: 24
        });
      },
    },
    components:{
      LineChart,
      PieChart
    }
  }
</script>
