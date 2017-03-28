<!--推荐者页面-->
<template>
  <div>
    <!--头部-->
    <common-header :title="'推荐者'"></common-header>
    <ul>
      <p v-if="recommenders" class="title">本文推荐者</p>
      <li v-for="item in recommenders">
        <a :href="'http://www.zhihu.com/people/' + item.zhihu_url_token">
          <div class="img-box">
            <img :src="item.avatar | replaceUrl" alt="">
          </div>
          <div class="info">
            <p class="name">{{item.name}}</p>
            <p class="bio">{{item.bio}}</p>
          </div>
        </a>
      </li>
      <li v-if="editors" v-for="item in editors">
        <a :href="'http://www.zhihu.com/people/' + item.zhihu_url_token">
          <div class="img-box">
            <img :src="item.avatar | replaceUrl" alt="">
          </div>
          <div class="info">
            <p class="name">{{item.name}} <span class="zhubian">主编</span> </p>
            <p class="bio">{{item.bio}}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
  import ajax from '../ajax'
  import commonHeader from '../components/common-header.vue'
  /*eslint-disable no-new*/
  export default{
    components: {
      commonHeader
    },
    data () {
      return {
        detailId: '',
        recommenders: [],
        editors: []
      }
    },
    mounted () {
      console.log(window.sessionStorage.detailId);
      this.detailId = window.sessionStorage.detailId;
      Indicator.open({
  text: 'Loading...',
  spinnerType: 'fading-circle'
});
        this.getRecommender()
    },
    beforeDestroy(){
    this.recommenders = []
        this.editors = []
        this.detailId = ''
       
    },
    route: {
      activate (transition) {
        
        var _this = this
        _this.detailId = window.sessionStorage.detailId
        _this.getRecommender()
        _this.$nextTick(function () {
          window.document.body.scrollTop = 0
        })
        transition.next()
      },
      deactivate (transition) {
        this.recommenders = []
        this.editors = []
        this.detailId = ''
        transition.next()
      }
    },
    methods: {
      goBack () {
        window.history.back()
      },
      getRecommender () {
        let _this = this
        console.log("dsdsaa");
        console.log(this.detailId);
          const jsonBird = 'https://bird.ioliu.cn/v1/?url=';
          const zhihu = 'http://news-at.zhihu.com';
          var url = jsonBird+zhihu;
        
        _this.loading = true
        ajax({
//          url: 'http://news-at.zhihu.com/api/4/story/' + _this.detailId + '/recommenders',
          url: `${url}/api/4/story/` + _this.detailId + '/recommenders',
          method: 'GET',
          callback: function (res) {
              
            if (res.items) {
              _this.recommenders = res.items[0].recommenders;
             Indicator.close();
            }
            if (res.editors) {
              _this.editors = res.editors;
             
//              console.log(_this.editors)
            }
            _this.loading = false
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  ul{
    padding: 15px;
    margin-top: 50px;
    .title{
      color: #8c8c8c;
      margin-bottom: 15px;
      font-size: 13px;
    }
    li{
      padding: 10px 0;
      border-top: 1px solid #d1d1d1;
      a{
        display: flex;
        flex-direction: row;
        overflow: hidden;
        .img-box{
          height: 40px;
          width: 40px;
          img{
            height: 40px;
            width: 40px;
            border-radius: 50%;
          }
        }
        .info{
          margin-left: 10px;
          .name{
            font-size: 15px;
            font-weight: bold;
            color: #000;
            .zhubian{
              display: inline-block;
              width: 40px;
              height: 20px;
              background: #4ed1ad;
              border-radius: 5px;
              color: #ffffff;
              font-size: 13px;
              line-height: 20px;
              text-align: center;
              margin-left: 10px;
            }
          }
          .bio{
            color: #8c8c8c;
            font-size: 12px;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
