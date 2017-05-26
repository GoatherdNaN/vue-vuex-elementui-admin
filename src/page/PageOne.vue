<style lang='less' scoped>
.operate-bar{
  margin-bottom:14px;
  height: 66px;
  line-height: 66px;
  border-radius: 10px;
  background-color: #fff;
  .status-select{
    margin-right: 12px;
  }
  .search-btn{
    margin-left: 8px;
  }
}
.pagination-box{
  margin-top:4px;
  text-align:right;
}
</style>
<template>
  <div>
    <modal :isShowModal="isShowModal" v-on:changeModelVisible="changeModelVisible"/>
    <el-row class='operate-bar'>
      <el-col :span="3" :offset="1">
        <el-select v-model="statusValue" placeholder="请选择状态" size='small' class="status-select" clearable>
          <el-option
          v-for="item in statusOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="dateValue"
          :editable="false"
          size='small'
          type="daterange"
          placeholder="选择日期范围"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="1">
        <el-button type="success" icon="search" size="small" class="search-btn" @click="searchList">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="11">
        <el-button type="primary" icon="plus" size="small" @click="isShowModal = true">新建入库单</el-button>
      </el-col>
    </el-row>
    <instock-list/>
    <div class='pagination-box'>
      <my-pagination v-on:searchList="searchList"/>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import {getDateBeforeWeek} from '../utils/common'
  import MyPagination from '../components/pageone/MyPagination.vue'
  import InstockList from '../components/pageone/InstockList.vue'
  import {pickerOptions,statusOption} from '../constants/config'
  import Modal from '../components/pageone/Modal.vue'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        pickerOptions,
        statusOption,
        dateValue: '',
        statusValue: '',
        isShowModal:false
      }
    },
    created(){
      this.searchList();
    },
    methods: {
      ...mapActions({
        getInstockData : 'getInstockData',
      }),
      searchList(page,pageSize=12){
        let params = {
          page:1,
          pageSize,
        }
        if(this.statusValue){
          params.status = this.statusValue;
        }
        if(this.dateValue){
          let [beginDate,endDate] = [this.dateValue[0],this.dateValue[1]];
          params.beginDate = moment(beginDate).format('YYYY-MM-DD');
          params.endDate = moment(endDate).format('YYYY-MM-DD');
        }
        if (page && !page.target) {
            params.page = page;
        }
        this.getInstockData(params);
      },
      newList(){
        this.modalVisible = true;
      },
      changeModelVisible(isShow){
        this.isShowModal = isShow;
      },
    },
    components:{
      MyPagination,
      InstockList,
      Modal
    }
  }
</script>
