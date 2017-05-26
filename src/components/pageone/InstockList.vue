<template>
<div>
  <modal :isShowModal="isShowModal" @sort-change="changeSort" v-on:changeModelVisible="changeModelVisible" :editData="editData"/>
  <el-table
    stripe
    :data="instockList"
    style="width: 100%"
    @sort-change="changeSort"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="listNumber"
        label="入库编号">
      </el-table-column>
      <el-table-column
        prop="username"
        label="入库用户">
      </el-table-column>
      <el-table-column
        prop="instockTime"
        label="入库日期"
        sortable='custom'>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="status"
        :formatter="statusFilter"
        label="状态">
      </el-table-column>
      <el-table-column
      label="操作">
      <template scope="scope">
        <el-button
          @click.native.prevent="editRow(scope.$index, instockList)"
          type="text"
          size="small">
          编辑
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, instockList)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
  import Modal from './Modal.vue'
  import moment from 'moment'
  import {deepCopy,compare} from '../../utils/common'
  import {deleleItem} from '../../api/index'
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        isShowModal:false,
        editData:{
          username: '',
          instockTime: '',
          createTime: '',
          status:"1"
        },
      };
    },
    computed: {
      ...mapState({
        instockList:state => state.pageOne.instockList,
      }),
    },
    methods: {
      ...mapActions({
        setInstockList : 'setInstockList',
        delete : 'delete',
      }),
      deleteRow(index, rows) {
        deleleItem({listNumber:rows[index].listNumber}).then(res=>{
          let payload={index};
          payload.insertItem=res;
          this.delete(payload);
        })
      },
      editRow(index, rows) {
        this.isShowModal = true;
        rows[index].status = rows[index].status+'';
        this.editData = rows[index];
      },
      statusFilter(row){
        if(1 == row.status){
            return '新建'
        } else {
          return '已入库'
        }
      },
      changeModelVisible(isShow){
        this.isShowModal = isShow;
      },
      changeSort(column){
        let {prop,order} = column;
        let tableData = deepCopy(this.instockList);
        tableData = tableData.map(item=>{
          item[prop]=(+moment(item[prop]).valueOf());
          return item
        })
        if('ascending' === order) {
          tableData.sort(compare(prop));
        } else if ('descending' === order) {
          tableData.sort(compare(prop));
          tableData.reverse();
        } else {
          return
        }
        tableData = tableData.map(item=>{
          item[prop] = moment(item[prop]).format('YYYY-MM-DD HH:mm:ss');
          return item
        })
        this.setInstockList(tableData);
      },
    },
    components:{
      Modal
    },
  }
</script>
