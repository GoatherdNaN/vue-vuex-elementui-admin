<style lang='less' scoped>
  .form-item{
    width:84%;
  }
</style>
<template>
  <el-dialog @close="handleClose" :title="title" :lock-scroll="false" :visible.sync="modalVisible">
    <el-form :model="form" :rules="rules" ref="dialogForm" :label-width="formLabelWidth">
      <el-form-item label="入库时间" prop="instockTime">
        <el-date-picker
          class='form-item'
          v-model="form.instockTime"
          type="datetime"
          placeholder="选择入库时间"
          :picker-options="modalPickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          class='form-item'
          v-model="form.createTime"
          type="datetime"
          placeholder="选择创建时间"
          :picker-options="modalPickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态" class="form-item" clearable>
          <el-option
          v-for="item in statusOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" auto-complete="off" class='form-item'></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="modalVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import moment from 'moment'
  import {deepCopy} from '../../utils/common'
  import {modalPickerOptions,statusOption} from '../../constants/config'
  import {instockEdit,newInstockList} from '../../api/index'
  import { mapActions } from 'vuex'
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
      isShowModal:{
        type: Boolean,
        default: false
      },
      title:{
        type: String,
        default:'新建入库单'
      }
    },
    data() {
      return {
        modalPickerOptions,
        statusOption,
        formLabelWidth: '120px',
        modalVisible: false,
        rules: {
          username: [
            { required: true, message: '请输入入库用户名', trigger: 'blur' },
            { min: 2, message: '长度至少为2个字符', trigger: 'blur' }
          ],
          instockTime: [
            { type: 'date', required: true, message: '请选择入库时间', trigger: 'blur' }
          ],
          createTime: [
            { type: 'date', required: true, message: '请选择创建时间', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ]
        },
        form:{
          username: '',
          instockTime: '',
          createTime: '',
          status:"1"
        }
      };
    },
    methods: {
      ...mapActions({
        editInstockItem : 'editInstockItem',
        newInstockItem : 'newInstockItem'
      }),
      handleClose(){
        this.$emit("changeModelVisible",false);
      },
      submitForm(dialogForm) {
        this.$refs[dialogForm].validate((valid) => {
          if (!valid) {
            return false;
          }
        });

        let {username,status,createTime,instockTime} = this.form;
        let params = {
          username,
          status
        };
        params.instockTime = moment(instockTime).format('YYYY-MM-DD HH:mm:ss');
        params.createTime = moment(createTime).format('YYYY-MM-DD HH:mm:ss');
        if(this.editData.listNumber){
          params.listNumber = this.editData.listNumber;
          this.editInstockItem(params);
          instockEdit(params);
        } else {
          newInstockList(params).then(res=>{
            params.listNumber = res.listNumber;
            this.newInstockItem(params);
          });
        }
        this.modalVisible = false;
        this.$emit("changeModelVisible",false);
        this.form = {
          username: '',
          instockTime: '',
          createTime: '',
          status:"1"
        }
      }
    },
    watch:{
      editData:{
        handler(val,oldVal) {
          if(val.username){
            this.form = deepCopy(val);
            this.form.instockTime = new Date(val.instockTime.replace(/-/g,"/"));
            this.form.createTime = new Date(val.createTime.replace(/-/g,"/"));
          }
        },
        deep:true
      },
      isShowModal(val){
        if(val){
          this.modalVisible = true;
        }
      },
    }
  }
</script>
