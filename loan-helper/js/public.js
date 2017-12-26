	var late_time = 300;
	// 显示年利率弹窗
	function show_rate(val) {
	    $("#rate-frame").show(); 
	    setTimeout(function(){
	        $("#rate-frame .rates").height($("#rate-frame .item").length * 81)
	        $("#rate-frame .item[data-val='" + val + "']").addClass("active");
	    },5)
	}

	//隐藏年利率弹窗
	function hide_rate() {
	    $("#rate-frame .rates").height(0)
	    setTimeout(function() {
	        $("#rate-frame").hide();
	        $("#rate-frame .item.active").removeClass("active");
	    }, late_time);
	}

	// 显示首付弹窗
	function show_payment(val) {
	    $("#payment").show()
	    setTimeout(function(){
		    $("#payment .lists").height($("#payment .list").length*91);
		    $(".list[data-value=" + val + "]").addClass('active');
	    },5);
	}

	// 隐藏首付弹窗
	function hide_payment() {
	    $("#payment .lists").height(0);
	    setTimeout(function() {
		    $("#payment").hide();
		    $("#payment .list.active").removeClass('active');
	    }, late_time);
	}

	// 显示贷款期限弹窗
	function show_endTime(val) {
	    $("#end-times").show();
	    setTimeout(function(){
		    $("#end-times .lists").height($("#end-times .list").length*91);
		    $("#end-times .list[data-value=" + val + "]").addClass('active');
	    },5)
	}
	// 隐藏贷款期限弹窗
	function hide_endTime() {
	    $("#end-times .lists").height(0);
	    setTimeout(function() {
	        $("#end-times").hide();
		    $(".list.active").removeClass('active');
	    }, late_time)
	}