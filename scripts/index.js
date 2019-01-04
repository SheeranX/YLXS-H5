$(function(){
			//点击div
			$(".footer-menu div").click(function(){
				//获取label的类
				var className = $(this).find("label").attr("data-icon");
				//遍历div,清空样式
				$(".footer-menu div").each(function(i){
					//再次获取label的类名
					var className = $(".footer-menu div").eq(i).find("label").attr("data-icon");
					//文字变为灰色
					$(".footer-menu div").eq(i).removeClass("footer-menu-active");
					//图标变为灰色
					$(".footer-menu div").eq(i).find("label").attr('class',className);
				})
				//文字图片分别添加样式
				$(this).addClass("footer-menu-active");
				$(this).find("label").removeClass(className).addClass(className + "-active");
			})
		})
		layui.use(['carousel', 'form','flow','element','rate'],function () {
        	var carousel = layui.carousel;
		    var flow = layui.flow
		    ,form = layui.form
		    var element=layui.element
		    ,rate=layui.rate;
			var ins = null;
			layui.use(['carousel'],function(){
				var carousel  = layui.carousel;
				ins = carousel.render({
					elem: '#index-carousel'
					,arrow: 'none'
					, height: '1.85rem'
					, width: 'auto'
					,indicator:'none'
				});
			});
			
//			slider.init('index-carousel',function(){
//				ins.slide('add');	
//			},function(){
//				ins.slide('sub');
//			});
			
		  	//tab选项卡
			var $ = layui.jquery,
			element = layui.element;
			
			//星级评分
			  rate.render({
			    elem: '#test9'
			    ,value: 4
			    ,readonly: true
			  });
					
			//图片加载
			flow.load({
				elem: '#project-container' //流加载容器
				,done: function(page, next) { //执行下一页的回调
					//模拟数据插入
					setTimeout(function() {
						var lis = [];
						for(var i = 0; i < 5; i++) {
							lis.push($(".layui-tab-item").html())
						}
						//执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
						//pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
						next(lis.join(''), page < 3); //假设总页数为 3
					}, 500);
				}
			})
		})
	
		//游玩项目tab栏
		$('.index-project-tabs li').each(function (i) {
		    $('.index-project-tabs li').eq(i).click(function () {
		        $('.index-project-tabs li').eq(i).addClass('index-project-tabs-active').siblings().removeClass('index-project-tabs-active');
		        $('.index-project-content li').eq(i).addClass('index-project-content-active').siblings().removeClass('index-project-content-active');
		    });
	    })
		
	    //导航条悬浮效果
	    //获取元素距离文档顶端的距离
//		var iHeight = $(".layui-tab-ul").offset().top; 
//		console.log(iHeight)
		$(document).on("scroll", function() {
			var scTop = $(document).scrollTop();
			//console.log(scTop);//滚动条滚动的距离
			
			if(scTop > 642) {
				$(".layui-tab-ul").addClass('fixedNav')
			} else {
				$(".layui-tab-ul").removeClass('fixedNav')
			}
		
		})
		
		//返回顶部按钮
//  	var tabsHeight = $(".index-project").offset().top;
//  	console.log(tabsHeight)
		$(document).on("scroll", function () {
		    var $scrollTop = $(document).scrollTop();
		    //滚动距离超过tab元素到文档顶部的距离时显示返回顶部按钮
		    
            if($scrollTop> 598){
            	$(".fixed-right-backTop>img").show();
            }else{
            	$(".fixed-right-backTop>img").hide();
            }
		})
    	
		//返回顶部
		$('.fixed-right-backTop').click(function () {
		    $('body,html').animate({
		        scrollTop: '0px'
		    }, 500);
		});
		
	
    
	
