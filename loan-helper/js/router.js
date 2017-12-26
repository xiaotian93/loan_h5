$(function() {
	// 输入框浮层
	$("#content").on("focus","input[type='number']",function(){
		$(".frame-input").show();
	});
	// 隐藏浮层
	$(".frame-input").click(function(){
		$(this).hide();
	});
	// 隐藏年利率弹窗
	$("#content").on("click","#rate-frame",function(){
		hide_rate()
	})
	// 加载页面
	$(".bar").on("click","span",function(e){
		var src = $(this).attr("data-code");
		get_code(src);
	});
	var defalut_src = localStorage.getItem("page")||"fangdai";
	get_code(defalut_src);
	// 获取页面
	function get_code(src){
		localStorage.setItem("page",src);
		$.get(src+".ajax",function(data){
			$("#content").html(data);
			$(".bar span.active").removeClass("active");
			$("[data-code="+src+"]").addClass("active");
		})
	}
});