$(function() {
    var hide_speed = 00;
    var location = {
        citys: ["北京", "上海", "深圳", "天津", "重庆", "大连", "青岛", "宁波", "厦门"],
        province: ["河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "宁夏", "新疆"]
    }
    var citys = location.citys.join("</span> <span>");
    var provinces = location.province.join("</span> <span>");
    $("#citys").html("<span>" + citys + "</span>");
    $("#provinces").html("<span>" + provinces + "</span>");

    // 查看城市
    $("#citysel").click(function() {
        show_city_frame();
    })

    // 选择城市
    $(".frame-city").on("click", "span", function() {
        $("#_city").html($(this).html());
    })
    $(".frame-city").click(function() {
        hide_city_frame();
    })

    // 基准利率
    var base_rate = [4.35, 4.75]
    // 利率表
    var rates = [
        { key: "最新基准利率7", value: 0.7 },
        { key: "最新基准利率8", value: 0.8 },
        { key: "最新基准利率8.3", value: 0.83 },
        { key: "最新基准利率8.5", value: 0.85 },
        { key: "最新基准利率8.8", value: 0.88 },
        { key: "最新基准利率9", value: 0.9 },
        { key: "最新基准利率9.5", value: 0.95 },
        { key: "最新基准利率", value: 1 },
        { key: "最新基准利率1.05倍", value: 1.05 },
        { key: "最新基准利率1.1倍", value: 1.1 },
        { key: "最新基准利率1.2倍", value: 1.2 },
        { key: "最新基准利率1.3倍", value: 1.3 }
    ]

    // 设置利率列表
    var rl = rates.length;
    var rate_html = "";
    for (i = 0; i < rl; i++) {
        rate_html += '<div class="item" data-val=' + rates[i].value + '><label>' + rates[i].key + '<label></div>';
    }
    $("#rate-frame .rates").html(rate_html)

    // 设置贷款期限列表
    var endTime = [0.5, 1, 2, 3, 4, 5],
        etl = endTime.length;
    var lists = "";
    for (i = 0; i < etl; i++) {
        if (i == 0) {
            lists += '<div data-value="' + endTime[i] * 12 + '" class="list">' + endTime[i] * 12 + '个月</div>';
        } else {
            lists += '<div data-value="' + endTime[i] * 12 + '" class="list">' + endTime[i] + '年</div>';
        }
    }

    $("#end-times .lists").html(lists);

    $("#dkqx_sel").click(function() {
        var now = $("#_combox_inp_dkqx_sel").val();
        show_endTime(parseInt(now));
    })
    // 选择贷款期限
    $("#end-times").on("click", ".list", function() {
        $("#end-times .active").removeClass('active');
        $(this).addClass("active");
        $("#dklv").val(rate_count2($(this).attr("data-value")));
        $("#dklv_view").html(rate_count2($(this).attr("data-value")));
        $("#dklv_view").next("span").html("%");
        var t = parseFloat($(this).attr("data-value"));
        $("#_combox_inp_dkqx_sel").val(t);
        if (t >= 12) {
            $("#_combox_inp_dkqx_sel_view").html(t / 12);
            $("#unit").html("年")
        } else {
            $("#_combox_inp_dkqx_sel_view").html(t);
            $("#unit").html("个月")
        }
    })

    $("#end-times").click(function() {
        hide_endTime();
    })

    // 设置首付列表
    var payment_html = "";
    for (i = 2; i <= 9; i++) {
        payment_html += '<div data-value="' + i + '" class="list">' + i + '成</div>';
    }
    $("#payment .lists").html(payment_html);

    // 显示首付
    $("#sfbl_sel").click(function() {
        show_payment($("#_combox_inp_sfbl_sel").val());
    })

    // 隐藏首付
    $("#payment").click(function() {
        hide_payment();
    });

    // 选择首付
    $("#payment").on('click', '.list', function() {
        $("#_combox_inp_sfbl_sel").val($(this).attr("data-value"));
        $("#_combox_inp_sfbl_sel_view").html($(this).attr("data-value"));
    })

    // 选择年利率
    $("#show-rate").click(function() {
        show_rate($("#dklv").attr("data-rate"));
    })

    // 输入年利率
    // $("#rate-val").keydown(function(event) {
    //     if (event.keyCode == 13) {
    //         $("#dklv").val($(this).val());
    //         $("#dklv_view").html($(this).val());
    //         $("#dklv").attr("data-rate", $(this).val());
    //         hide_rate();
    //     }
    // });

    $("#rate-frame .rates").on("click", ".item", function() {
        var rete_b = $(this).attr("data-val");
        var rate_r = rate_count(rete_b);
        $("#dklv").val(rate_r);
        $("#dklv_view").html(rate_r);
        $("#dklv_view").next("span").html("%");
        $("#dklv").attr("data-rate", rete_b);
        hide_rate();
    })

    // 输入框浮层
    $(".forms").on("focus", "input[type='number']", function() {
        $(".frame-input").show();
    });

    // 隐藏浮层
    $(".frame-input").click(function() {
        $(this).hide();
    });

    // 清空年利率
    $("#dklv").blur(function(){
        $("#dklv_view").html($(this).val());
    })

    //计算年利率（rate）
    function rate_count(rate) {
        var year = parseInt($("#dkqx_sel input").val()) / 12;
        var res = year > 1 ? base_rate[1] * parseFloat(rate) : base_rate[0] * parseFloat(rate);
        var reg = /([0-9]+\.[0-9]{2})[0-9]*/;
        return res.toString().replace(reg, "$1");
    }

    //计算年利率（year）
    function rate_count2(year) {
        var year = year / 12;
        var rate = $("#dklv").attr("data-rate") || 1;
        var res = year > 1 ? base_rate[1] * parseFloat(rate) : base_rate[0] * parseFloat(rate);
        var reg = /([0-9]+\.[0-9]{2})[0-9]*/;
        return res.toString().replace(reg, "$1");
    }

    // 显示城市弹窗
    function show_city_frame() {
        $(".frame-city").show();
        $(".frame-city section").removeClass("slideOutUp");
        $(".frame-city section").addClass("slideInDown");
    }

    // 隐藏城市弹窗
    function hide_city_frame() {
        $(".frame-city section").removeClass("slideInDown");
        $(".frame-city section").addClass("slideOutUp");
        setTimeout(function() {
            $(".frame-city").hide();
        }, 300)
    }
});