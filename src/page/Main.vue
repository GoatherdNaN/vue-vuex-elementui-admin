<style lang='less' scoped>
.flex-box {
    display: flex;
}
.top-bar {
    width: 100%;
    height: 40px;
    background-color: #484F55;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    justify-content: space-between;
    & > div {
        width: 220px;
        height: 100%;
        text-align: center;
        line-height: 40px;
    }
    .app-logo {
        font-size: 20px;
        color: #fff;
    }
    .logout-btn {
        width: 80px;
        color: #FF6D6D;
        background-color:#484F55;
    }
}
.main-content {
    width: 100%;
    background-color: #ccc;
    .aside-nav {
        height: 100%;
        width: 220px;
        background-color: #324157;
        overflow: hidden;
        position: fixed;
        top: 40px;
        left: 0;
    }
    .layout-content {
        padding: 5px 10px;
        padding-bottom: 0;
        position: absolute;
        top:40px;
        left: 220px;
        right: 0;
        background-color: #EBEFF2;
        .bread-crumb{
          margin-bottom: 8px;
        }
    }
}
.slide-fade-enter-active{
  transition:all .4s ease;
}
.slide-fade-leave-active{
  transition:all .4s ease;
}
.slide-fade-enter{
  opacity:0;
}
.slide-fade-leave-active{
  opacity:0;
}
</style>
<template>
<div>
    <section class='top-bar flex-box'>
        <div class="app-logo">
            Vue-Admin
        </div>
        <div>
            <el-button type='danger' size='small' class='logout-btn' @click="logOut">退出</el-button>
        </div>
    </section>
    <section class="main-content">
        <div class='aside-nav'>
          <el-menu :default-openeds="openeds" default-active='pageone' router unique-opened class='nav-bar' theme="dark">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>入库管理</template>
              <el-menu-item index="pageone" @click="changeRoute(1)">PageOne</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>数据统计</template>
              <el-menu-item index="pagetwo" @click="changeRoute(0)">PageTwo</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      <div class="layout-content">
        <el-breadcrumb separator="/" class="bread-crumb">
          <el-breadcrumb-item v-for="(item,index) in breadCrumbData" key='index'>{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <loading/>
        <transition name="slide-fade">
          <!--keep-alive可以缓存数据，这样不至于重新渲染路由组件的时候，之前那个路由组件的数据被清除了。-->
          <keep-alive>
              <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Loading from '../components/common/Loading.vue'
export default {
  data(){
    return {
      openeds:['1'],
      breadCrumbData:['入库管理','PageOne']
    }
  },
  methods: {
    ...mapActions({
      loginOut : 'loginOut'
    }),
    changeRoute(isPageOne){
      if (isPageOne) {
        this.breadCrumbData = ['入库管理','PageOne'];
      } else {
        this.breadCrumbData = ['数据统计','PageTwo'];
      }
    },
    logOut(){
      this.loginOut();
      this.$router.replace({ path: '/login'})
    }
  },
  components:{
    Loading,
  }
}
</script>
