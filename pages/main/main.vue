<template>
	<view class="content">
        <scroll-view  :scroll-top="scrollTop" scroll-y="true" class="scy" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
		<view v-if="hasLogin" class="hello">
			<view class="title">
				您好 {{userName}}，您已成功登录。
			</view>
			<view class="ul">
				<view>这是 uni-app 带登录模板的示例App首页。</view>
				<view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
			</view>
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="title">
				您好 游客。
			</view>
			<view class="ul">
				<view>这是 uni-app 带登录模板的示例App首页。</view>
				<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
			</view>
		</view>
        <view class="uni-flex uni-row" style="justify-content: center;">
        	<view class="text uni-bg-red">横向布局-自动宽度</view>
        	<view class="text uni-bg-green">横向布局-自动宽度</view>
        </view>
        <view class="uni-flex uni-row" style="justify-content: flex-end;">
        	<view class="text uni-bg-red">横向布局-自动宽度</view>
        	<view class="text uni-bg-green">横向布局-自动宽度</view>
        </view>
        <view class="uni-flex uni-row" style="justify-content: space-around;">
        	<view class="text uni-bg-red">横向布局-自动宽度</view>
        	<view class="text uni-bg-green">横向布局-自动宽度</view>
        </view>
        <view class="uni-flex uni-row">
            <view style="width: 200rpx;">1</view>
            <view style="flex: 1;">1</view>
        </view>
        <view class="uni-flex uni-row" style="flex-wrap: wrap;">
            <view class="text uni-bg-red">横向布局</view>
        </view>
        <text @tap="setBage">设置角标</text>
        <view class="gotop" @tap="goTop">^</view>
        </scroll-view>
        <swiper class="swiper" next-margin="20px" display-multiple-items="2">
        	<swiper-item>
        		<view class="swiper-item uni-bg-red">A</view>
        	</swiper-item>
        	<swiper-item>
        		<view class="swiper-item uni-bg-green">B</view>
        	</swiper-item>
        	<swiper-item>
        		<view class="swiper-item uni-bg-blue">C</view>
        	</swiper-item>
        </swiper>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
        data(){
            return{
                hasLoged: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
            }
        },
        onPullDownRefresh(){
            setTimeout(() => {
                uni.stopPullDownRefresh()
            },2000)
            
        },
        methods:{
			upper: function(e) {
				//console.log(e)
			},
			lower: function(e) {
				//console.log(e)               
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			},
            setBage: function(){
                uni.setTabBarBadge({
                    index: 0,
                    text:'2'
                })
            }
        },
		onLoad() {
/*            if(!this.hasLoged){
               uni.showModal({
                   title:"未登录",
                   content:"您这边没有登录哦",
                   success: (res) => {
                      uni.navigateTo({
                          url:'../login/login'
                      })
                   }
               }) 
            } */
/* 			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					//如果需要强制登录，不显示取消按钮
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							//如果需要强制登录，使用reLaunch方式
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				}); 
              
                uni.reLaunch({
                	url: '../login/login'
                }); 
			} */
		}
	}
</script>

<style>
    .scy{
        height: 500rpx;
    }
    .gotop {
        position: fixed;
        bottom: calc(var(--window-bottom) + 10px);
        width: 50px;
        height: 50px;
        line-height: 56px;
        text-align: center;
        font-size: 30px;
        box-shadow: 0 0 10px rgba(0,0,0,.1);
        background-color: #0A98D5;
        color: #FFFFFF;
        border-radius: 50%;
        right: 10px;
        z-index: 10;
    }
    uni-view {
        font-size: 28rpx;
    }
    .content {
       
    }
    .uni-bg-red {
        width: 100%;
    }
    
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}
</style>
