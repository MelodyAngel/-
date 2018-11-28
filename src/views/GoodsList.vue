
<template>
  <div>
    <!--w3c规范 标签小写 导航-->
    <nav-header></nav-header>

    <!--面包屑-->
    <nav-bread>
      <!--插槽-->
      <span slot="Goods">Goods</span>
     <!-- <span slot="b">测试一下</span>-->
    </nav-bread>

    <div class="accessory-result-page accessory-page">

      <!--价格升降序 箭头符号-->
      <symbol id="icon-arrow-short" >
        <title>cart</title>
        <path d="M479.744 307.2l168.96 165.888a32.768 32.768 0 0 1 0 46.592 30.72 30.72 0 0 1-45.568 0L486.4 409.6v464.896a32.768 32.768 0 1 1-65.024 0V409.6l-117.248 118.784a39.424 39.424 0 0 1-45.568-6.656 32.768 32.768 0 0 1 0-46.592L421.376 307.2a35.328 35.328 0 0 1 58.368 0z" fill="red"></path>
      </symbol>

      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price"
             @click="sortGoods"
          >Price
            <svg class="icon icon-arrow-short"
                 viewBox="0 0 800 800"
                 :class="{'sort-up':!sortFlag}"
            >
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <!--响应式按钮 显示价格-->
          <a href="javascript:void(0)"
             class="filterby stopPop"
             @click="showFilterPop"
          >
            <!--响应式 按钮 显示价格块-->
            Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <!--响应式价格块 css样式 默认为false
          -->
          <div class="filter stopPop" id="filter"
               :class="{'filterby-show':filterBy}"
          >
            <dl class="filter-price">

              <dt>Price:</dt>
              <dd>
                <a href="javascript:;"
                   :class="{'cur':priceChecked=='all'}"
                   @click="priceChecked='all'"
                >
                  <!--默认为 all 点击 priceChecked='all'-->
                  All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:;"
                   :class="{'cur':priceChecked==index}"
                   @click="setPriceFilter(index)"
                >
                  <!--下标对应 对应给cur 点击 priceChecked='index'-->
                  {{price.startPrice}} - {{price.endPrice}}
                </a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'/static/'+item.productImage" alt="">
                      <!--
                      <img :src="'/static/'+item.productImg" alt="">
                      因为需要使用到图片 懒加载 所以不会使用到 :src
                      -->

                      <!--
                      注意 src 不写死 是需要动态的 需要用v-bind 来绑定  dom渲染快 如果使用src写上 会造成报错 使用指令 如果需要是显示字符串 需要单引号包起来
                      -->
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;"
                         class="btn btn--m"
                         @click="addCart(item.productId)"

                      >
                        加入购物车</a>
                    </div>
                  </div>
                </li>

               <!-- <li>
                  <div class="pic">
                    <a href="#"><img src="/static/4.jpg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">2499</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn&#45;&#45;m">加入购物车</a>
                    </div>
                  </div>
                </li>-->

              </ul>
              <!--滚动加载-->
              <div v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="30"
                   class="load-more"
                  >
                <!--可以使用logo来加载更美观-->
                <img src="./../assets/loading-spinning-bubbles.svg"
                     alt=""
                     v-show="loading"

                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--响应式 遮罩-->
    <div class="md-overlay"
         v-show="overLayFlag"
         @click="closePop"
    ></div>

    <!--模态框 自定义事件 子组件传递给父组件需要 -->
    <!--尚未登录-->
    <model :mdShow="mdShow" @close="closeModal">
      <p slot="message">
        请先登录,否则无法加入到购物车
      </p>
      <div slot="btnGroup">
        <a href="javascript:;"
           class="btn btn--m"
            @click="mdShow=false"
        >关闭</a>
      </div>
    </model>
    <!--已登录成功-->
    <model :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink"
               xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功</span>
      </p>
      <div slot="btnGroup">
        <a href="javascript:;"
           class="btn btn--m"
           @click="mdShowCart=false">继续购物</a>
        <router-link href="javascript:;"
                     class="btn btn--m"
                     to="/cart"> 查看购物车</router-link>
      </div>
    </model>



    <!--底部-->
    <nav-footer></nav-footer>

  </div>
</template>
<style>
  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>

<script>
  /*取名字注意 不要跟原有的h5标签冲突 虽然不会报错 但是会发出警告*/
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/Footer.vue'
  import NavBread from '@/components/Navbread.vue'
  /*模态框 登录框和遮罩层*/
  import Model from  '@/components/Model.vue'
  import axios from "axios"


  export default{
    data(){
      return {
        goodsList:[],
        priceFilter:[
          {startPrice:"0", endPrice:"100"},
          {startPrice:"100", endPrice:"500"},
          {startPrice:"500", endPrice:"1000"},
          {startPrice:"1000", endPrice:"2000"},
          {startPrice:"2000", endPrice:"3000"},
          {startPrice:"3000", endPrice:"6000"},
        ],
        priceChecked:"all", /*默认为 all   pc端的价格默认*/

        /*响应式 价格块显示 class*/
        filterBy:false,
        /*遮罩层*/
        overLayFlag:false,
        /*价格排序 1表示升序*/
        sortFlag:true,
        /*当前页*/
        page:1,
        /*数据显示条数*/
        pageSize:8,

        /*滚动加载属性*/
        busy:true,

        /*loading 加载更多 本地加载速度过快 可以全部设置为true 来看样式*/
        loading:false,

        /* 保存 userName*/
        nickName:'',

        /*模态框判断 未登录提示*/
        mdShow:false,

        /*模态框判断 以登录提示*/
        mdShowCart:false

      }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
      Model
    },

    mounted:function(){
      /*启用函数getGoodslist 因为一开始默认没有滚动加载 所以不需要加参数*/
      this.getGoodslist()
    },

    methods:{
      getGoodslist (flag) {
        /*升降序排列*/
        var param={
          page:this.page,
          pageSize:this.pageSize,
          sort:this.sortFlag?1:-1,
          /*左侧价格按钮刷选*/
          priceLevel:this.priceChecked
        };
        /*接口请求 加载loading*/
          this.loading=true;
        axios.get("/goods/list",{
          /*注意axios get 的 参数 和post 不同*/
          params:param
        }).then( (res)=>{
          let result=res.data;
          /*接口请求完毕 关闭loading*/
          this.loading=false;
          if(result.status=="0"){
            if(flag){
              /*如果flag=true 表示分页 累加数据*/
              /*商品累加 应该滚动会加载 getGoodslist  concat 拼接*/
              this.goodsList=this.goodsList.concat(result.result.list);
              /*如果mklo=0 则不再自动滚动*/
              this.mklo=result.result.cout;
              /*判断条数 如果条数为零条*/
              if(result.result.count==0){
                this.busy=true
              }else {
                this.busy=false
              }

            }else {
              this.goodsList=result.result.list;
              /*启用this.busy=false*/
              this.busy=false
            }
          }else {
            this.goodsList=[]

          }

        })
      },
      /*点击排序*/
      sortGoods () {
        this.sortFlag= !this.sortFlag;
        this.page=1;
        /*重新调用 getGoodslist */
        this.getGoodslist()

      },

      /*滚动加载事件 在标签内*/
      loadMore () {
        /*滚动加载模块的参数 true 表示禁用滚动*/
        this.busy=true;
        var v=setTimeout( () =>{
          /*加载到第2页*/
          this.page++;

          /*分页也需要调用 getGoodslist 所以需要个参数 数据累加*/
          this.getGoodslist(true)
        },500)

        if(this.mklo==0){
          clearInterval(v);
        }
      },


      /*点击 加入购物车*/
      addCart (productId) {
        axios.post('/goods/addCart',{
          productId:productId
        }).then( (res)=>{
          /*注意这一步 直接不写 使用参数 res.status 会导致数据无法获取*/
          var res = res.data;
          if(res.status==0){
            //alert('添加成功')
            this.mdShowCart=true;
            this.$store.commit('updateCartCount',1)

          }else {
           //alert('请先登录')
            this.mdShow=true

          }

        })

      },

      /*响应式价格按钮事件 弹出价格块 */
      showFilterPop () {
          this.filterBy=true,
          this.overLayFlag=true
      },
      closePop () {
        this.filterBy=false,
        this.overLayFlag=false
      },

      /*价格按钮 隐藏价格块  以及class对应ingdex*/
      setPriceFilter (index) {
        this.priceChecked=index;
        this.page=1;
        this.getGoodslist()
        this.closePop()
      },
      /* 自定义事件 取消模态框 取消x图标*/
      closeModal () {
        this.mdShow=false;
        this.mdShowCart=false;

      }
    },



  }


</script>

