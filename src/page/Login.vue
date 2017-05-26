<style lang="less" scoped>
	@import '../assets/css/style.less';
	.red{
		color:#f00;
	}
	.wrapper{
		height:100vh;
		display: flex;
	  align-items: center;
	  justify-content: center;
	  background: url(https://y.gtimg.cn/mediastyle/yqq/img/bg_index_new.jpg) no-repeat left top;
	  background-size: cover;
		.body{
			width: 360px;
		  margin-top: -150px;
		  box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, .3);
		  background-color: #fff;
			.form-header{
				color: #fff;
			  font-size: 24px;
			  padding: 24px 20px;
			  background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495790562882&di=4993db4714a2c64914f11fdbdf15e004&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1205%2F04%2Fc3%2F11483061_11483061_1336099242656.jpg) no-repeat 0 24%;
			  background-size: cover;
			}
			.form-container{
				height:250px;
				.form-item{
					width:290px;
					margin-left:35px;
					margin-right:35px;
				}
				.user-name{
					margin:30px 35px 18px;
				}
				.remember-pwd{
					margin-top:18px;
					margin-left:35px;
				}
				.login-btn{
					margin-top:18px;
				}
			}
		}
	}
</style>
<template>
	<div class="wrapper">
		<div class="body">
			<div class="form-header">
				登陆
			</div>
			<section class="form-container">
				<el-input placeholder="请输入用户名" class="form-item user-name" v-model="form.username" autofocus>
			    <template slot="prepend"><span :class="{'red':usernameError}" class='icon-user'></span></template>
			  </el-input>
				<el-input placeholder="请输入密码" type="password" class="form-item" v-model="form.password">
			    <template slot="prepend"><span :class="{'red':passwordError}" class="icon-lock"></span></template>
			  </el-input>
				<el-checkbox v-model="form.checked" class="remember-pwd">记住密码</el-checkbox>
				<el-button type="primary" class="form-item login-btn" @click="loginSubmit">登陆</el-button>
			</section>
		</div>
	</div>
</template>
<script>
	import {login} from '../api/index'
	import { mapActions } from 'vuex'
	export default {
	  data() {
			let name,pwd;
			if(localStorage.v_username){
				name=localStorage.v_username;
				pwd=localStorage.v_password;
			}else{
				name='';
				pwd='';
			}
			return {
				form:{
					username:name,
					password:pwd,
					checked:true
				},
				usernameError:false,
				passwordError:false
			}
		},
		mounted(){
			document.addEventListener('keyup',this.handleKeyUp)
		},
		beforeDestroy(){
			document.removeEventListener('keyup',this.handleKeyUp)
		},
		methods: {
			...mapActions({
		    loginFlow : 'loginFlow',
		  }),
			openMessage(str) {
        this.$message.error(str);
      },
			handleKeyUp(e){
				if(13 === e.keyCode){
            this.loginSubmit();
        }
			},
			loginSubmit(){
				if(!this.form.username){
					this.usernameError = true;
					this.openMessage('用户名不能为空！');
					return
				} else if(this.form.username.length<2||this.form.username.length>14){
					this.usernameError = true;
					this.openMessage('用户名长度在2~14个字符之间！');
					return
				}  else {
					this.usernameError = false;
				}
				if(!this.form.password){
					this.passwordError = true;
					this.openMessage('密码不能为空！');
					return
				}	else if(this.form.password.length<6){
					this.passwordError = true;
					this.openMessage('密码长度不能小于6位！');
					return
				} else {
					this.passwordError = false;
				}
				this.loginFlow(this.form);
				let {username,password} = this.form;
				login({username,password}).then(res=>{
					if('admin'===username&&'123456'===password){
						this.$router.replace({ path: '/pageone'})
					} else {
						this.openMessage('用户名或密码错误，请重新输入！');
					}
				});
			}
		}
	}
</script>
