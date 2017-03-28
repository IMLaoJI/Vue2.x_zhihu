<!--专栏消息列表页面-->
<template>
  <div>
    <!--头部-->
    <common-header :title="name"></common-header>

    <ul class="list">
      <list-comp v-for="item in stories" :item="item">
     
       </list-comp>
    </ul>
  </div>
</template>

<script>
  import ajax from '../ajax'
  import listComp from '../components/list-comp.vue'
  import commonHeader from '../components/common-header.vue'
  /*eslint-disable no-new*/
  export default{
    components: {
      listComp,
      commonHeader
    },
    data () {
      return {
        stories: [],
        timestamp: '',
        name: '',
        sectionId: ''
      }
    },
//    ready () {
//      this.getLatest()
//    },
beforeRouteEnter (to, from, next) {

  next(vm => {
    console.log(window.sessionStorage.sectionId);
  vm.sectionId = window.sessionStorage.sectionId
        if (window.sessionStorage.ifSectionReq === 'true') {
          vm.getLatest()
        }
        vm.$nextTick(function () {
          window.document.body.scrollTop = window.sessionStorage.sectionScrollTop
        })
        window.addEventListener('scroll', vm.getScrollData, false)
        
  })
},
beforeDestroy(){
    var _this = this
        window.removeEventListener('scroll', _this.getScrollData, false)
        window.sessionStorage.sectionScrollTop = window.document.body.scrollTop
},
    route: {
      data (transition) {
        var _this = this
        _this.sectionId = window.sessionStorage.sectionId
        if (window.sessionStorage.ifSectionReq === 'true') {
          _this.getLatest()
        }
        _this.$nextTick(function () {
          window.document.body.scrollTop = window.sessionStorage.sectionScrollTop
        })
        window.addEventListener('scroll', _this.getScrollData, false)
        transition.next()
      },
      deactivate (transition) {
        var _this = this
        window.removeEventListener('scroll', _this.getScrollData, false)
        window.sessionStorage.sectionScrollTop = window.document.body.scrollTop
        transition.next()
      }
    },
    methods: {
      getLatest () {
        let _this = this
        const jsonBird = 'https://bird.ioliu.cn/v1/?url=';
          const zhihu = 'http://news-at.zhihu.com';
          var url = jsonBird+zhihu;
        _this.loading = true
        ajax({
          
          url: `${url}/api/3/section/` + _this.sectionId,
          method: 'GET',
          callback: function (res) {
            console.log(res);
            _this.stories = res.stories;
            console.log(_this.stories);
           _this.timestamp =res.timestamp
           _this.name = res.name;
        
            _this.loading = false
          }
        })
      },
      getScrollData () {
        var _this = this
        if ((window.document.body.offsetHeight + window.document.body.scrollTop) + 100 > window.document.body.scrollHeight && !_this.loading) {
          _this.getSection()
        }
      },
      getSection () {
          const jsonBird = 'https://bird.ioliu.cn/v1/?url=';
          const zhihu = 'http://news-at.zhihu.com';
          var url = jsonBird+zhihu;
        let _this = this
        _this.loading = true
        ajax({
          url: `${url}/api/4/section/` + _this.sectionId + '/before/' + _this.timestamp,
          method: 'GET',
          callback: function (res) {
            _this.stories = _this.stories.concat(res.stories)
            _this.timestamp =  res.timestamp;
            
            _this.loading = false
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .list{
    margin-top: 50px;
    padding: 1px 5px 0 5px;
    background: #f2f2f2;
  }
</style>
