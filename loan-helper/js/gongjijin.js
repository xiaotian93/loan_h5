$(function() {
	// 基准利率
	var base_rate1 = [2.75,3.25];
	var base_rate2 = [3.03,3.58];
	// 利率表
	var rates = [
		{key:"最新基准利率",value:1},
		{key:"最新基准利率1.1倍",value:1.1},
		{key:"最新基准利率1.2倍",value:1.2},
	]
	
	// 设置利率列表
	var rl = rates.length;
	var rate_html = "";
	for(i=0;i<rl;i++){
		rate_html += '<div class="item" data-val='+ rates[i].value +'><label>' + rates[i].key + '</label></div>';
	}
	$("#rate-frame .rates").html(rate_html)

	// 设置贷款期限列表
	var endTime = [5,10,15,20,25,30],etl = endTime.length;
	var lists = "";
	for(i=0;i<etl;i++){
		lists += '<div data-value="'+endTime[i]+'" class="list">'+ endTime[i] +'年</div>';
	}

	// 设置首付列表
	var payment_html = "";
	for(i=2;i<=9;i++){
		payment_html += '<div data-value="'+i+'" class="list">'+ i +'成</div>';
	}
	$("#payment .lists").html(payment_html);

	// 显示首付
	$("#sfbl_sel_2").click(function(){
		show_payment($("#_combox_inp_sfbl_sel_2").val());
	})
	// 隐藏首付
	$("#payment").click(function(){
		hide_payment();
	});
	//选择首付
	$("#payment").on('click','.list',function(){
		$("#_combox_inp_sfbl_sel_2").val($(this).attr("data-value"));
		$("#_combox_inp_sfbl_sel_2_view").html($(this).attr("data-value"));
	})

	$("#end-times .lists").html(lists);
	
	// 查看贷款期限
	$("#set-endTime").click(function(){
		var now = $("#gjj_qixian_wrap input").val();
		show_endTime(parseInt(now));
	})
	$("#end-times").on("click",".list",function(){
		$("#end-times .active").removeClass('active');
		$(this).addClass("active");
	})
	$("#end-times").click(function(){
		hide_endTime();
	})
	// 选择贷款期限
	$("#end-times .lists .list").click(function(){
		$("#dklv_2").val(rate_count2($(this).attr("data-value")));
		$("#dklv_2_view").html(rate_count2($(this).attr("data-value")));
		$("#gjj_qixian_wrap input").val($(this).attr("data-value"))
		$("#gjj_qixian_wrap .view").html($(this).attr("data-value"))
	})

	// 选择年利率
	$("#set-rate").click(function(){
		var rate = $("#dklv_2").attr("data-rate");
		show_rate(rate);
	})

	$("#rate-frame .rates").on("click",".item",function(){
		var rete_b = $(this).attr("data-val");
		$("#dklv_2").val(rate_count(rete_b));
		$("#dklv_2").attr("data-rate",rete_b);
		$("#dklv_2_view").html(rate_count(rete_b));
		hide_rate()
	})
	
	// 查看还款方式
	$(".pay-type").change(function(){
		$("#result .active").removeClass("active");
		var val = $(this).val();
		$("#res-"+val).addClass("active");
	})

	// 购房性质
	$("input[type='radio'][name='gfxz']").change(function(){
		var val = $(this).val();
		$("#_combox_inp_sfbl_sel_2").val(val==1?3:6);
		$("#_combox_inp_sfbl_sel_2_view").html(val==1?3:6);
		$("#dklv_2").val(rate_count2($("#gjj_qixian_wrap input").val()));
		$("#dklv_2_view").html(rate_count2($("#gjj_qixian_wrap input").val()));
	})

	// 清空年利率
	$("#dklv_2").blur(function(){
		$("#dklv_2_view").html($(this).val());
	})

	//计算年利率（rate）
	function rate_count(rate){
		var year = $("#gjj_qixian_wrap input").val();
		var res = 0;
		var gfxz = $("input[name='gfxz']:checked").val();
		if(gfxz==1){
			res = year>5?base_rate1[1]*parseFloat(rate):base_rate1[0]*parseFloat(rate)
		}else{
			res = year>5?base_rate2[1]*parseFloat(rate):base_rate2[0]*parseFloat(rate)
		}
		var reg = /([0-9]+\.[0-9]{2})[0-9]*/; 
		return res.toString().replace(reg,"$1");
	}
	//计算年利率（year）
	function rate_count2(year){
		var rate = $("#dklv_2").attr("data-rate")||1;
		var res = 0;
		var gfxz = $("input[name='gfxz']:checked").val();
		if(gfxz==1){
			res = year>5?base_rate1[1]*parseFloat(rate):base_rate1[0]*parseFloat(rate)
		}else{
			res = year>5?base_rate2[1]*parseFloat(rate):base_rate2[0]*parseFloat(rate)
		}
		var reg = /([0-9]+\.[0-9]{2})[0-9]*/; 
		return res.toString().replace(reg,"$1");
	}
});	