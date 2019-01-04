// userComment.js

layui.use(['flow', 'element', 'rate'], function () {
    var flow = layui.flow;
    var element = layui.element
        , rate = layui.rate
// 商品列表流加载
    flow.load({
        elem: '#goodsList-container' //流加载容器
        , done: function (page, next) { //执行下一页的回调

            //模拟数据插入
            setTimeout(function () {
                var lis = [];
                for (var i = 0; i < 5; i++) {
                    // lis.push('<li>' + ((page - 1) * 8 + i + 1) + '</li>')
                    lis.push($('.goodsList-list').html())
                }

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < 3); //假设总页数为 3
            }, 500);
        }
    })
// 用户点评流加载
    flow.load({
        elem: '.userComment-container' //流加载容器
        , done: function (page, next) { //执行下一页的回调

            //后端ajax请求加载，示例：https://www.layui.com/doc/modules/flow.html
            //模拟数据插入
            setTimeout(function () {
                var lis = [];
                for (var i = 0; i < 5; i++) {
                    // lis.push('<li>' + ((page - 1) * 8 + i + 1) + '</li>')
                    lis.push($('#userComment-list').html())
                }

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < 3); //假设总页数为 3
            }, 500);
        }
    })
//走进丽江导航流加载
//	flow.load({
//      elem: '.intoLiJiang-item' //流加载容器
//      , done: function (page, next) { //执行下一页的回调
//
//          //后端ajax请求加载，示例：https://www.layui.com/doc/modules/flow.html
//          //模拟数据插入
//          setTimeout(function () {
//              var lis = [];
//              for (var i = 0; i < 5; i++) {
//                  // lis.push('<li>' + ((page - 1) * 8 + i + 1) + '</li>')
//                  lis.push($('.intoLiJiang-item li').html())
//              }
//
//              //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
//              //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
//              next(lis.join(''), page < 3); //假设总页数为 3
//          }, 500);
//      }
//  })	

//发布游记流加载
//	flow.load({
//      elem: '.travels-content' //流加载容器
//      , done: function (page, next) { //执行下一页的回调
//
//          //后端ajax请求加载，示例：https://www.layui.com/doc/modules/flow.html
//          //模拟数据插入
//          setTimeout(function () {
//              var lis = [];
//              for (var i = 0; i < 5; i++) {
//                  // lis.push('<li>' + ((page - 1) * 8 + i + 1) + '</li>')
//                  lis.push($('.travels-content div').html())
//              }
//
//              //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
//              //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
//              next(lis.join(''), page < 3); //假设总页数为 3
//          }, 500);
//      }
//  })	


    // 星级评分
    var ins1 = rate.render({
        elem: '.userComment-rate', //绑定元素
        value: '4',
        readonly: true,
        theme:'#ff7e36'
    });
    
    var ins1 = rate.render({
        elem: '#restaurantsList-rate', //绑定元素
        value: '4',
        readonly: true,
        theme:'#ff7e36'
    });
})

// goodsList.js
//收起智能排序下拉框公共方法
function AIFilterPickUp() {
    $('.AISortable-dropDown').slideUp(500, function () {
        $('.AISortable-dropDown').css('display', 'none');
    })
    $('.goodsList-container-Aisortable-cover').fadeOut(500, function () {
        $('.goodsList-container-Aisortable-cover').css('display', 'none')
    })
    $('body').css('overflow-y', 'scroll');
}

// 收起筛选框公共方法
function sortPickUp() {
    $('.goodsList-sortable-content').slideUp(500, function () {
        $('.goodsList-sortable-content').css('display', 'none')
    })
    $('.goodsList-container-cover').fadeOut(500, function () {
        $('.goodsList-container-cover').css('display', 'none')
    })
    $('body').css('overflow-y', 'scroll')
}

// 列表页面排序激活状态(智能排序、好评、人气、筛选)
$('.goodsList-sortable span').each(function (i) {
    $('.goodsList-sortable span').eq(i).click(function () {
        $('.goodsList-sortable span').eq(i).addClass('sortable-active').siblings().removeClass('sortable-active');
        // 如果筛选图标含有类filterIcon，就将其替换为灰色图标，表示未点击,并收起下拉选框
        if ($('#sortFilter label').hasClass('filterIcon')) {
            $('#sortFilter label').css('backgroundImage', 'url(../../../images/filterIcon.png)');
            sortPickUp();
        }
        //如果智能排序没有包含sortable-active类，则收起智能排序下拉框
        if (!$('#AISortable').hasClass('sortable-active')) {
            AIFilterPickUp();//收起智能排序下拉框
            //智能排序箭头,由展开变为收起
            $('#AISortable i').removeClass('layui-icon-up');
            $('#AISortable i').addClass('layui-icon-down');
        }

    })
});
// 点击筛选，下拉选框展开
$('#sortFilter').click(function () {
// 如果下拉选框的样式为block,当点击筛选时，选框收起
    //当点击筛选时，筛选图标变为蓝色的，并为其添加filterIcon类，表示点击了该选项
    $('#sortFilter label').css('backgroundImage', 'url(../../../images/filterIcon-active.png)').addClass('filterIcon');
    if ($('.goodsList-sortable-content').css('display') == 'block') {
        sortPickUp();
    } else {
        //反之，下拉选框展开，并为其底部添加遮罩层，同时禁止底部可以滚动
        $('.goodsList-sortable-content').slideDown(500, function () {
            $('.goodsList-sortable-content').css('display', 'block')
        })
        $('.goodsList-container-cover').fadeIn(500, function () {
            $('.goodsList-container-cover').css('display', 'block')
        })
        $('body').css('overflow', 'hidden')
    }
})

// 点击筛选“遮罩层”，筛选下拉框自动收起
$('.goodsList-container-cover').click(function () {
    if ($('.goodsList-sortable-content').css('display') == 'block') {
        sortPickUp();
    }
})

// 筛选框选项选中激活状态
$('.goodsList-sortable-item').each(function (i) {
    var $span = $('.goodsList-sortable-item').eq(i).find('span');
    $span.each(function (j) {
        $span.eq(j).click(function () {
        	if($(this).hasClass('sortable-item-active')){
        		$(this).removeClass('sortable-item-active')
        	}else{
        		$(this).addClass('sortable-item-active');
        	}
        })
    })
})
//点击 "完成"  收起筛选框
$('.sortable-completeBtn').click(function () {
    sortPickUp();
    //ajax请求在这里写。。。。


})
//筛选"重置按钮",清空选中的选项；注：这里只清空了样式，如需向后端请求，需在下面继续写
$('.sortable-resetBtn').click(function () {
	$("#sortFilter").removeClass("sortable-active");
	$('#sortFilter label').css('backgroundImage', 'url(../../../images/filterIcon.png)');
    if ($('.goodsList-sortable-item span').hasClass('sortable-item-active')) {
        $('.goodsList-sortable-item span').removeClass('sortable-item-active');
    }
})


// goodsDetail.js

// 详情页面tabs激活状态
$('.goodDetail-body-tabs li').each(function (i) {
    // console.log(i)
    $('.goodDetail-body-tabs li').eq(i).click(function () {
        $('.goodDetail-body-tabs li').eq(i).addClass('goodDetail-body-tabs-active').siblings().removeClass('goodDetail-body-tabs-active');
        $('.goodDetail-tabs-content li').eq(i).addClass('goodDetail-tabs-content-active').siblings().removeClass('goodDetail-tabs-content-active');
    });
})

// 列表项展开收起
$('.tabs-content-item > img').each(function (i) {
    console.log(i)
    $('.tabs-content-item > img').eq(i).click(function () {
        if ($('.tabs-content-item > img').eq(i).hasClass('showFlg')) {
            $('.tabs-content-item > img').eq(i).removeClass('showFlg');
            $('.tabs-content-item > img').eq(i).attr('src', '../../../images/arrow-up.png')
            $('.content-item-container').eq(i).slideDown(500, function () {
                $('.content-item-container').eq(i).css('display', 'block')
            })
        } else {
            $('.tabs-content-item > img').eq(i).addClass('showFlg');
            $('.tabs-content-item > img').eq(i).attr('src', '../../../images/arrow-down.png')
            $('.content-item-container').eq(i).slideUp(500, function () {
                $('.content-item-container').eq(i).css('display', 'none')
            })
        }

    })
})

//列表页展开预定按钮事件处理,如果a标签含有bookBtn-disabled这个类，则删除href属性，禁止跳转，按钮、价格颜色置为灰色
$('.content-item-desc-right a').each(function (i) {
    console.log(i);
    if ($('.content-item-desc-right a').eq(i).hasClass('bookBtn-disabled')) {
        $('.content-item-desc-right a').eq(i).removeAttr('href');
        $('.content-item-desc-right .price').eq(i).css('color', '#bbb');
        $('.content-item-desc-right a').eq(i).text('定完');
    }
})

//为商品详情页的产品列表、预订须知tabs栏设置滚动固定至顶部效果
//var tabsHeight = $('.goodDetail-body-tabs').offset().top-100;
$(document).scroll(function () {
    var $scrollTop = $(document).scrollTop();
    if (337 < $scrollTop) {
        $('.goodDetail-body-tabs').addClass('wrap-stick-tabs');
    } else {
        $('.goodDetail-body-tabs').removeClass('wrap-stick-tabs');
    }
})


//点击门票介绍，从下向上弹出门票详情半屏弹窗
$('.tickets-notice').click(function () {
    toast.modal({
    	content: $('.detailModal').html()
    });
})
//点击酒店介绍，从下向上弹出酒店介绍半屏弹窗
$('.hotel-notice').click(function () {
    toast.modal({
    	content: $('.detailModal').html()
    });
})
//点击酒店详情，从下向上弹出酒店详情半屏弹窗
$('.content-item-detail').click(function () {
    toast.modal({
    	content: $('.detailModal2').html()
    });
})
//点击美食介绍，从下向上弹出美食介绍半屏弹窗
$('.delicious-notice').click(function () {
    toast.modal({
    	content: $('.detailModal').html()
    });
})
//点击美食详情，从下向上弹出美食详情半屏弹窗
$('.content-item-detail').click(function () {
    toast.modal({
    	content: $('.detailModal2').html()
    });
})

//预订须知
	$(".notice-tab div").each(function(i){
		$(".notice-tab div").eq(i).click(function(){
			$(".notice-tab div").eq(i).addClass("notice-tab-active").siblings().removeClass("notice-tab-active");
			$(".notice-content li").eq(i).addClass("notice-content-item-active").siblings().removeClass("notice-content-item-active");
		})
	})
//点赞
$(".fixed-left-parise").each(function(i){
	$(".fixed-left-parise").eq(i).click(function(){
		$(".fixed-left-parise img").eq(i).css("backgroundColor","red");
	})
})
