<!--主题日报的列表-->
<template>
  <!--图片-->
  <!--图片-->
  <div>
   <div class="detail-img-box margin-top" :style="{ backgroundImage: 'url(' + replace(background) + ')' }">
    <div class="detail-mask"></div>
    <h1 class="detail-title">{{description}}</h1>
    <p class="detail-image-source">{{image_source}}</p>
  </div>
  <!--主编-->
  <div  v-if="editors.length > 0" class="editors-box">
  <router-link :to="{path: '/editors' }">
  <p>主编</p>
    <div class="editors-item" v-for="item in editors" class="ava">
      <img :src="item.avatar | replaceUrl" alt="" >
    </div>
  </router-link>
    
  </div>

  <!--列表-->
  <div class="list-box">
    <ul>
      <list-comp v-for="item in allStories" :item="item"></list-comp>
    </ul>
  </div>
  
  </div>
 

</template>

<script>
import { Indicator } from 'mint-ui';
  import ajax from '../ajax'
  import listComp from './list-comp.vue'
  /*eslint-disable no-new*/
  export default{
    components: {
      listComp
    },
    data () {
      return {
        editors: [],
        allStories: [],
        loading: false,
        background: '',
        description: '',
        name: '',
        image_source: '',
        id: '',
        path:'',
        id1 :''
      }
    },
    mounted () {
      this.getTheme()
    },

   
  
    
watch: {
  '$route': function () {
    var self = this
      Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
    self.getTheme();  
     window.addEventListener('scroll', self.getScrollTheme, false);
  }
},
beforeDestroy(){
  var _this = this
        window.removeEventListener('scroll', _this.getScrollTheme, false)
        window.sessionStorage.scrollTop = window.document.body.scrollTop
        window.sessionStorage.editors = JSON.stringify(_this.editors)
     
},
    route: {
      data (transition) {
        console.log(transition);
        var _this = this
//        判断从哪里来,如果是详情页就不重新请求,并返回上次列表位置
        if (transition.from.name === 'detail') {
          _this.$nextTick(function () {
            window.document.body.scrollTop = window.sessionStorage.scrollTop
          })
        } else {
          _this.getTheme()
          window.document.body.scrollTop = 0
        }
        window.addEventListener('scroll', _this.getScrollTheme, false)
        transition.next()
      },
      deactivate (transition) {
        var _this = this
        window.removeEventListener('scroll', _this.getScrollTheme, false)
        window.sessionStorage.scrollTop = window.document.body.scrollTop
        window.sessionStorage.editors = JSON.stringify(_this.editors)
        transition.next()
      }
    },
    methods: {
      changeTheme(){
        console.log("key1");
          if ( this.$route.path.indexOf('theme')!=-1)
           {
              console.log(this.$route.path);
             this.path =this.$route.path;
             this.id1 = this.$route.params.id;
             console.log( this.id1);
             this.$router.push({ path: `/theme/${this.id1}` });
          }
      },
      getTheme () {
          const jsonBird = 'https://bird.ioliu.cn/v1/?url=';
          const zhihu = 'http://news-at.zhihu.com';
          var url = jsonBird+zhihu;
        let _this = this
        _this.loading = true
        ajax({
//        url: 'http://news-at.zhihu.com/api/4/news/latest',
          url:  `${url}/api/4/theme/` + _this.$route.params.id,
          method: 'GET',
          callback: function (res) {
            console.log(res);
            _this.allStories = res.stories;
            if( _this.allStories.length != 0){
                Indicator.close();
            }
            _this.background = res.background;
         
            _this.editors = res.editors;
            _this.description = res.description;
           
            _this.name =  res.name;
            _this.image_source = res.image_source;
            _this.id =  _this.allStories[_this.allStories.length - 1].id;
            _this.loading = false
          }
        })
      },
      getThemeBefore () {
          const jsonBird = 'https://bird.ioliu.cn/v1/?url=';
          const zhihu = 'http://news-at.zhihu.com';
          var url = jsonBird+zhihu;
        let _this = this
        _this.loading = true
        ajax({
//        url: 'http://news.at.zhihu.com/api/4/news/before/' + _this.date,
          url: `${url}/api/4/theme/` + _this.$route.params.id + '/before/' + _this.id,
          method: 'GET',
          callback: function (res) {
            _this.allStories = _this.allStories.concat(res.stories);
            _this.id = _this.allStories[_this.allStories.length - 1].id;
            Indicator.close();
            
            _this.loading = false
          }
        })
      },
      getScrollTheme () {
        var _this = this
        if ((window.document.body.offsetHeight + window.document.body.scrollTop) + 100 > window.document.body.scrollHeight && !_this.loading) {
    Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        });
          _this.getThemeBefore()
        }
      },
      replace (str) {
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.ava{
  float:left;
}
  .margin-top{
    margin-top: 50px;
  }
  .detail-img-box{
    position: relative;
    z-index: 0;
    height: 230px;
    width: 100%;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    .detail-mask{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
      background-image: linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
    }
    .detail-title{
      position: absolute;
      bottom: 23px;
      line-height: 1.2;
      left: 0;
      padding: 0 18px;
      font-weight: 300;
      font-size: 21px;
      color: #ffffff;
    }
    .detail-image-source{
      position: absolute;
      bottom: 8px;
      right: 0;
      padding: 0 18px;
      font-weight: 300;
      font-size: 12px;
      color: #d3d3d3;
    }
  }
  .list-box{
    padding: 1px 5px 0 5px;
    background: #f2f2f2;
  }
  .editors-box{
    background: #efefef;
    position: relative;
    display: flex;

    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 50px;
    p{
      position: absolute;
      top: 13px;
      left: 15px;
      font-size: 13px;
      font-weight: bold;
    }
    .editors-item{
      height: 30px;
      width: 30px;
      margin: 7px 7px 0 7px;
      float:left;
      >img{
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
    }
  }
</style>
