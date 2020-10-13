<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <h2 class="not-found-title">403</h2>
        <p class="not-found-desc">没有权限</p>
        <!-- <el-button @click="$router.go(-1)">返回上一页</el-button> -->
        <!-- <el-button type="primary" class="not-found-btn-gohome" @click="$router.push('/')">进入首页并刷新</el-button> -->
        <el-button type="primary" class="not-found-btn-gohome" @click="getToken()">进入首页并刷新</el-button>
        <!-- <el-button type="primary" class="not-found-btn-gohome" @click="getToken()">退出重新登录</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
  export default {
     methods: {
       getToken(){
        console.log('刷新token')
        this.$api.elite.getToken({
          refresh:Cookies.get('token')
         // refresh:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYwMTg2OTg1MCwiY3JlYXRlZCI6MTYwMTgyNjY1MDU1MywiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN5czp1c2VyOnZpZXcifSx7ImF1dGhvcml0eSI6InN5czptZW51OmRlbGV0ZSJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRlcHQ6ZWRpdCJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRpY3Q6ZWRpdCJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRpY3Q6ZGVsZXRlIn0seyJhdXRob3JpdHkiOiJzeXM6bWVudTphZGQifSx7ImF1dGhvcml0eSI6InN5czp1c2VyOmFkZCJ9LHsiYXV0aG9yaXR5Ijoic3lzOmxvZzp2aWV3In0seyJhdXRob3JpdHkiOiJzeXM6ZGVwdDpkZWxldGUifSx7ImF1dGhvcml0eSI6InN5czpyb2xlOmVkaXQifSx7ImF1dGhvcml0eSI6InN5czpyb2xlOnZpZXcifSx7ImF1dGhvcml0eSI6InN5czpkaWN0OnZpZXcifSx7ImF1dGhvcml0eSI6InN5czp1c2VyOmVkaXQifSx7ImF1dGhvcml0eSI6InN5czp1c2VyOmRlbGV0ZSJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRlcHQ6dmlldyJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRlcHQ6YWRkIn0seyJhdXRob3JpdHkiOiJzeXM6cm9sZTpkZWxldGUifSx7ImF1dGhvcml0eSI6InN5czptZW51OnZpZXcifSx7ImF1dGhvcml0eSI6InN5czptZW51OmVkaXQifSx7ImF1dGhvcml0eSI6InN5czpkaWN0OmFkZCJ9LHsiYXV0aG9yaXR5Ijoic3lzOnJvbGU6YWRkIn1dfQ.FlsdcPgRnTu8loyOB_8bnHNPVaTHCByX8Z-1NaATplEYXQYQh4uWwhAFreRdUSe5FeEc_ekDI7jG89B-wlbWgA'
        }).then(res=>{
          Cookies.set('token',res.data.token)
          this.$router.push('/')

        })
      }




     }
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--not-found {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    .site-content__wrapper {
      padding: 0;
      margin: 0;
      background-color: #fff;
    }
    .site-content {
      position: fixed;
      top: 15%;
      left: 50%;
      z-index: 2;
      padding: 30px;
      text-align: center;
      transform: translate(-50%, 0);
    }
    .not-found-title {
      margin: 20px 0 15px;
      font-size: 8em;
      font-weight: 500;
      color: rgb(55, 71, 79);
    }
    .not-found-desc {
      margin: 0 0 30px;
      font-size: 26px;
      text-transform: uppercase;
      color: rgb(118, 131, 143);
      > em {
        font-style: normal;
        color: #ee8145;
      }
    }
    .not-found-btn-gohome {
      margin-left: 30px;
    }
  }
</style>
