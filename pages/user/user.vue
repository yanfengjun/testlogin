<template>
    <view>
        <view v-if="tabs && tabs.length" class="app-tabs" :class="{'tabs-fixed': fixed}">
            <view class="tabs-item">
                <view class="tab-item" v-for="(tab, i) in tabs" :class="{'active': value===i}" :key="i" @click="tabClick(i)">
                    {{tab}}
                </view>
            </view>
            <view class="tabs-line" :style="{left:lineLift}"></view>
        </view>
        <view v-show="this.value === 0">
            <mescroll-body ref="mescrollRef" @init="mescrollInit" top="120" :down="downOption" @down="downCallback"
                 :up="upOption" @up="upCallback" @emptyclick="emptyClick">
                 <view class="notice">本Demo的下拉刷新: 添加新数据到列表顶部</view>
                 <view class="news-li" v-for="news in dataList" :key="news.id">
                     <view>{{news}}</view>
                     <view class="new-content">{{news}}</view>
                 </view>
             </mescroll-body> 
        </view>
        <view v-show="this.value === 1">
            <mescroll-body ref="mescrollRef" @init="mescrollInit" top="120" :down="downOption" @down="downCallback"
                 :up="upOption" @up="upCallback" @emptyclick="emptyClick">
                 <view class="notice">本Demo的下拉刷新: 添加新数据到列表顶部</view>
                 <view class="news-li" v-for="news in dataList" :key="news.id">
                     <view>{{news}}</view>
                     <view class="new-content">{{news}}</view>
                 </view>
             </mescroll-body>
        </view>
    </view>
</template>

<script>
    // 引入mescroll-mixins.js
    import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
    import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
    export default {
        mixins: [MescrollMixin, MescrollMoreItemMixin], // 使用mixin (在main.js注册全局组件)
        data() {
            return {
                downOption: {
                    auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
                },
                upOption: {
                    auto: false, // 不自动加载
                    // page: {
                    // 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                    // 	size: 10 // 每页数据的数量
                    // },
                    noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                    empty: {
                        tip: '~ 空空如也 ~', // 提示
                        btnText: '去看看'
                    }
                },
                dataList: [],
                tabs: ['待参加', '已参加'],
                value: 0,
                tabIndex: 0 ,// 当前tab下标
                fixed: true // 是否悬浮,默认false
            }
        },
        computed: {
            lineLift() {
                return 100 / this.tabs.length * (this.value + 1) - 100 / (this.tabs.length * 2) + '%'
            }
        },
        methods: {
            /*下拉刷新的回调 */
/*            downCallback() {
                //联网加载数据
                this.apiNewList().then(data => {
                    //联网成功的回调,隐藏下拉刷新的状态
                    this.mescroll.endSuccess();
                    //设置列表数据
                    this.dataList.unshift(data[0]);
                }).catch(() => {
                    //联网失败的回调,隐藏下拉刷新的状态
                    this.mescroll.endErr();
                })
            }, */
            /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
           /* upCallback(page) {
                //联网加载数据
                this.apiNewList(page.num, page.size).then(curPageData => {
                    //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                    //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

                    //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    //this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

                    //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                    //this.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

                    //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                    //this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

                    //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据.
                    this.mescroll.endSuccess(curPageData.length);

                    //设置列表数据
                    this.dataList = this.dataList.concat(curPageData);
                }).catch(() => {
                    //联网失败, 结束加载
                    this.mescroll.endErr();
                })
            }, */
            apiGoods(pageNum, pageSize, isGoodsEdit) {
            	return new Promise((resolute, reject)=>{
            		//延时一秒,模拟联网
            		setTimeout(()=> {
            			try{
            				let data = isGoodsEdit ? goodsEdit : goods;
            				//模拟分页数据
            				let list=[];
            				for (let i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
            					if(i==data.length) break;
            					list.push(data[i]);
            				}
            				//模拟接口请求成功
            				console.log("page.num=" + pageNum + ", page.size=" + pageSize + ", curPageData.length=" + list.length);
            				resolute(list);
            			} catch (e) {
            				//模拟接口请求失败
            				reject(e);
            			}
            		},1000)
            	})
            },
            tabClick(i) {
                console.log(i);
                this.value=i
            },
            /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
           upCallback(page) {
            	// this.i: 每个tab页的专属下标
            	// this.index: 当前tab的下标
            	let wordArr = ['','已参加']
            	let word = wordArr[this.i]
            	apiGoods(page.num, page.size, word).then(curPageData=>{
            		//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            		this.mescroll.endSuccess(curPageData.length);
            		//设置列表数据
            		if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
            		this.goods=this.goods.concat(curPageData); //追加新数据
            	}).catch(()=>{
            		//联网失败, 结束加载
            		this.mescroll.endErr();
            	})
            },
            //点击空布局按钮的回调
/*            emptyClick(){
            	uni.showToast({
            		title:'点击了按钮,具体逻辑自行实现'
            	})
            } */
        }
    }
</script>

<style>
    .app-tabs {
        position: relative;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        background-color: #fff;
        border-bottom: 1rpx solid #eee;
    }

    .app-tabs .tabs-item {
        display: flex;
        text-align: center;
    }

    .app-tabs .tabs-item .tab-item {
        flex: 1;
    }

    .app-tabs .tabs-item .active {
        color: red;
    }

    .app-tabs .tabs-line {
        position: absolute;
        bottom: 0;
        width: 40rpx;
        height: 4rpx;
        transform: translateX(-50%);
        border-radius: 4rpx;
        transition: left .3s;
        background: red;
    }

    /*悬浮*/
    .app-tabs.tabs-fixed {
        z-index: 9999;
        position: fixed;
        top: var(--window-top);
        left: 0;
        width: 100%;
    }
</style>
