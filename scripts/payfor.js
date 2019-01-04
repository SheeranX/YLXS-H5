$(function() {
	//游客信息展开与折叠	
	$(".payfor-onlinee p i").click(function() {
		if($(this).hasClass('layui-icon-up')) {
			$(this).removeClass('layui-icon-up');
			$(this).addClass('layui-icon-down');
			$(".payfor-detail").slideUp(500,function(){
				$(".payfor-detail").css('display', 'none')
			})
		} else {
			$(this).addClass('layui-icon-up');
			$(this).removeClass('layui-icon-down');
			$(".payfor-detail").slideDown(500, function(){
				$(".payfor-detail").css('display', 'block')
			})
		}
	})
	
	//支付方式选中状态
	$(".payfor-ways-item").each(function(i){
		$(".payfor-ways-item").eq(i).click(function(){
			console.log(i)
			$("input[type='radio']").eq(i).prop('checked',true).siblings().removeAttr('checked');
			
		})
	})
	
})
/*后退*/
function back(){
    history.back()
}