$(function() {
	// 基准利率
	var base_rate = [4.75,4.90]
	// 公积金利率
	var rates_gjj = [2.75,3.25]
	// 利率表
	var rates = [
		{key:"最新基准利率7",value:0.7},
		{key:"最新基准利率8",value:0.8},
		{key:"最新基准利率8.3",value:0.83},
		{key:"最新基准利率8.5",value:0.85},
		{key:"最新基准利率8.8",value:0.88},
		{key:"最新基准利率9",value:0.9},
		{key:"最新基准利率9.5",value:0.95},
		{key:"最新基准利率",value:1},
		{key:"最新基准利率1.05倍",value:1.05},
		{key:"最新基准利率1.1倍",value:1.1},
		{key:"最新基准利率1.2倍",value:1.2},
		{key:"最新基准利率1.3倍",value:1.3}
	]
	
	// 设置利率列表
	var rl = rates.length;
	var rate_html = "";
	for(i=0;i<rl;i++){
		rate_html += '<div class="item" data-val='+ rates[i].value +'><label>' + rates[i].key + '<label></div>';
	}
	$("#rate-frame .rates").html(rate_html)

	// 设置贷款期限列表
	var endTime = [5,10,15,20,25,30],etl = endTime.length;
	var lists = "";
	for(i=0;i<etl;i++){
		lists += '<div data-value="'+endTime[i]+'" class="list">'+ endTime[i] +'年</div>';
	}

	// 公积金贷款利率
	$("#end-times .lists").html(lists);
	
	$("#set-endTime").click(function(){
		var now = $("#zh_qixian_wrap input").val();
		show_endTime(parseInt(now));
	})
	// 选择贷款期限
	$("#end-times").on("click",".list",function(){
		$("#end-times .active").removeClass('active');
		$(this).addClass("active");
		$("#dklv_3_2").val(rate_count2($(this).attr("data-value")));
		$("#dklv_3_2_view").html(rate_count2($(this).attr("data-value")));
		$("#dklv_3_1").val(rate_gjj($(this).attr("data-value")));
		$("#zh_qixian_wrap input").val($(this).attr("data-value"));
		$("#zh_qixian_wrap .view").html($(this).attr("data-value"));
	})

	$("#end-times").click(function(){
		hide_endTime();
	})

	// 商业利率
	$("#sy-rate").click(function(){
		var rate = $("#dklv_3_2").attr("data-rate");
		show_rate(rate);
	})
	
	// // 输入年利率
	// $("#rate-val").keydown(function(event){
	// 	if(event.keyCode==13){
	// 		$("#dklv_3_2").val($(this).val());
	// 		$("#dklv_3_2_view").html($(this).val());
	// 		$("#dklv_3_2").attr("data-rate",$(this).val());
	// 		hide_rate();
	// 	}
	// });

	$("#rate-frame .rates").on("click",".item",function(){
		var rete_b = $(this).attr("data-val");
		$("#dklv_3_2").val(rate_count(rete_b));
		$("#dklv_3_2_view").html(rate_count(rete_b));
		$("#dklv_3_2").attr("data-rate",rete_b);
		hide_rate()
	})
	
	// 查看还款方式
	$(".pay-type").change(function(){
		$("#result .active").removeClass("active");
		var val = $(this).val();
		$("#res-"+val).addClass("active");
	})

	// 清空年利率
	$("#dklv_3_2").blur(function(){
		$("#dklv_3_2_view").html($(this).val());
	})

	//计算年利率（rate）
	function rate_count(rate){
		var year = $("#zh_qixian_wrap input").val();
		var res = year>5?base_rate[1]*parseFloat(rate):base_rate[0]*parseFloat(rate)
		var reg = /([0-9]+\.[0-9]{2})[0-9]*/; 
		return res.toString().replace(reg,"$1");
	}
	//计算年利率（year）
	function rate_count2(year){
		var rate = $("#dklv_3_2").attr("data-rate")||1;
		var res = year>5?base_rate[1]*parseFloat(rate):base_rate[0]*parseFloat(rate);
		var reg = /([0-9]+\.[0-9]{2})[0-9]*/; 
		return res.toString().replace(reg,"$1");
	}
	
	// 公积金贷款率
	function rate_gjj(year){
		var res = year>5?rates_gjj[1]:rates_gjj[0];
		return res.toFixed(2);
	}

});	