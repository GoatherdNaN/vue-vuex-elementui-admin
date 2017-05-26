<template>
<div class='pagination-box'>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[12,16,20]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      editData: {
        type: Object,
        default: ()=>{
          return{
            username: '',
            instockTime: '',
            createTime: '',
            status:"1"
          }
        }
      },
    },
    data() {
      return {
        currentPage: 1,
        pageSize:12
      };
    },
    computed: {
      ...mapState({
        total:state => state.pageOne.total,
      }),
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this.$emit("searchList",this.currentPage,val)
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.$emit("searchList",val,this.pageSize)
      }
    },
  }
</script>
