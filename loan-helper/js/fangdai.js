$(function() {
	// 基准利率
	var base_rate = [4.75,4.9]
	// 利率表
	var rates = [
		{key:"最新基准利率7折",value:0.7},
		{key:"最新基准利率8折",value:0.8},
		{key:"最新基准利率8.3折",value:0.83},
		{key:"最新基准利率8.5折",value:0.85},
		{key:"最新基准利率8.8折",value:0.88},
		{key:"最新基准利率9折",value:0.9},
		{key:"最新基准利率9.5折",value:0.95},
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
	$("#set-payment").click(function(){
		show_payment($("#_combox_inp_sfbl_sel_1").val());
	})

	// 隐藏首付
	$("#payment").click(function(){
		hide_payment();
	});
	//选择首付
	$("#payment").on('click','.list',function(){
		$("#_combox_inp_sfbl_sel_1").val($(this).attr("data-value"));
		$("#_combox_inp_sfbl_sel_1_view").html($(this).attr("data-value"));
	})

	$("#end-times .lists").html(lists);
	
	$("#set-endTime").click(function(event){
		event.stopPropagation();
		var now = $("#sy_qixian_wrap input").val();
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
		var y = $(this).attr("data-value");
		$("#dklv_1").val(rate_count2(y));
		$("#dklv_1_view").html(rate_count2(y));
		$("#sy_qixian_wrap input").val(y);
		$("#sy_qixian_wrap .view").html(y);
	})

	// 选择年利率
	$("#set-rate").click(function(){
		var rate = $("#dklv_1").attr("data-rate");
		show_rate(rate);
	})
	
	// 输入年利率
	// $("#rate-val").keydown(function(event){
	// 	if(event.keyCode==13){
	// 		$("#dklv_1").val($(this).val());
	// 		$("#dklv_1").attr("data-rate",$(this).val());
	// 		$("#dklv_1_view").html($(this).val());
	// 		hide_rate();
	// 	}
	// });

	$("#rate-frame .rates").on("click",".item",function(){
		var rete_b = $(this).attr("data-val");
		$("#dklv_1").val(rate_count(rete_b));
		$("#dklv_1").attr("data-rate",rete_b);
		$("#dklv_1_view").html(rate_count(rete_b));
		hide_rate()
	})
	
	// 查看还款方式
	$(".pay-type").change(function(){
		$("#result .active").removeClass("active");
		var val = $(this).val();
		$("#res-"+val).addClass("active");
	})

	// 购房性质
	$("input[type='radio'][name='sy_gfxz']").change(function(){
		var val = $(this).val();
		$("#_combox_inp_sfbl_sel_1").val(val==1?3:6);
		$("#_combox_inp_sfbl_sel_1_view").html(val==1?3:6);
	})

	// 清空年利率
	$("#dklv_1").blur(function(){
		$("#dklv_1_view").html($(this).val());
	})

	//计算年利率
	function rate_count(rate){
		var year = $("#sy_qixian_wrap input").val();
		var res = year>5?base_rate[1]*parseFloat(rate):base_rate[0]*parseFloat(rate)
		var reg = /([0-9]+\.[0-9]{2})[0-9]*/; 
		return res.toString().replace(reg,"$1");
	}
	//计算年利率（year）
	function rate_count2(year){
		var rate = $("#dklv_1").attr("data-rate")||1;
		var res = year>5?base_rate[1]*parseFloat(rate):base_rate[0]*parseFloat(rate);
		var reg = /([0-9]+\.[0-9]{2})[0-9]*/; 
		return res.toString().replace(reg,"$1");
	}	
});