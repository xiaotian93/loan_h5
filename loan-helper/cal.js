/**
 * Created by yktx-ky on 17/10/12.
 */
function remove_err() {
    $(".err").each(function() {
        $(this).remove()
    }), $(".inpt").each(function() {
        $(this).css("border", "1px solid #D6D6D6")
    })
}

function clear_result() {
    $("#_debx_dkje").html(0), $("#_debx_dkqx").html(0), $("#_debx_myhk").html(0), $("#_debx_zflx").html(0), $("#_debx_hkze").html(0), $("#_debj_dkje").html(0), $("#_debj_dkqx").html(0), $("#_debj_syhk").html(0), $("#_debj_mydj").html(0), $("#_debj_zflx").html(0), $("#_debj_hkze").html(0)
}

function zhlv() {
    var e = parseFloat($("#dklv_1").val());
    if (!e) return !1;
    if (1 == $("input[name=dklv_type]").val()) {
        var l = 12 * e;
        $("#dklv_1").val(parseFloat(l).toFixed(2) + "%")
    } else {
        var l = e / 12;
        $("#dklv_1").val(parseFloat(l).toFixed(4) + "%")
    }
}

function cal_sf() {
    // $("input[name=sy_type]").length > 0 ? obj_sfbl_sel_1.setValue(1 == $("input[name=sy_gfxz]:checked").val() ? parseFloat($("#mj_1").val()) <= 90 ? 2 : 3 : 6) : obj_sfbl_sel_2.setValue(1 == $("input[name=gfxz]:checked").val() ? parseFloat($("#mj").val()) <= 90 ? 2 : 3 : 6)
}

function cal_gjj_lv(e, l) {
    l = l ? l : 1;
    var t = RCal.getGjjLilv(e, l);
    return 2 == $("input[name=gjj_type]:checked").val() && 2 == $("input[name=gfxz]:checked").val() && (t = 1.1 * parseFloat(t)), t
}

function cal_lv(e) {
    var l = parseInt($("input[name=dkqx_" + e + "]").val());
    l = 12 * l;
    var t = 0;
    if (1 == e) t = RCal.getSdLilv(l, parseFloat($("input[name=lvbs_" + e + "]").val()))
    // if (1 == e) t = RCal.getSdLilv(l, parseFloat($("input[name=lvbs_" + e + "]").val())), 2 == $("input[name=dklv_type]").val() ? (t /= 12, $("#dklv_" + e).val(parseFloat(t).toFixed(4) + "%")) : $("#dklv_" + e).val(parseFloat(t).toFixed(2) + "%");
    else if (2 == e) t = cal_gjj_lv(l, parseFloat($("input[name=lvbs_2]").val())), $("#dklv_" + e).val(parseFloat(t).toFixed(2) + "%");
    else if (3 == e) {
        var a = cal_gjj_lv(l),
            _ = RCal.getSdLilv(l, parseFloat($("input[name=lvbs_" + e + "]").val()));
        $("#dklv_" + e + "_1").val(parseFloat(a).toFixed(2) + "%"), $("#dklv_" + e + "_2").val(parseFloat(_).toFixed(2) + "%")
    }
}

function cal_zh() {
    var e = parseInt($("input[name=dkqx_3]").val());
    e = 12 * e;
    var l = parseFloat($("#dkje_3_1").val()),
        t = parseFloat($("#dklv_3_1").val()),
        a = parseFloat($("#dkje_3_2").val()),
        _ = parseFloat($("#dklv_3_2").val());
    if (!l || isNaN(l) || l > 1e7) return show_err("dkje_3_1", "请输入正确的公积金贷款金额", 13), $("#dkje_3_1").css("border", "1px solid #FF6633").focus(), !1;
    if ($("#dkje_3_1").css("border", "1px solid #D6D6D6"), $("#dkje_3_1_err").remove(), !t || isNaN(t) || t > 100) return show_err("dklv_3_1", "请输入正确的公积金贷款利率"), $("#dklv_3_1").css("border", "1px solid #FF6633").focus(), !1;
    if ($("#dklv_3_1").css("border", "1px solid #D6D6D6"), $("#dklv_3_1_err").remove(), !a || isNaN(a) || a > 1e7) return show_err("dkje_3_2", "请输入正确的商业贷款金额", 13), $("#dkje_3_2").css("border", "1px solid #FF6633").focus(), !1;
    if ($("#dkje_3_2").css("border", "1px solid #D6D6D6"), $("#dkje_3_2_err").remove(), !_ || isNaN(_) || _ > 100) return show_err("dklv_3_2", "请输入正确的商业贷款利率"), $("#dklv_3_2").css("border", "1px solid #FF6633").focus(), !1;
    $("#dklv_3_2").css("border", "1px solid #D6D6D6"), $("#dklv_3_2_err").remove();
    var s = 1,
        n = 1,
        o = debx(1e4 * l, t, e, s, n),
        r = debx(1e4 * a, _, e, s, n);
    $("#_debx_dkje").html(fmoney(1e4 * (l + a), 2)), $("#_debx_dkqx").html(e), $("#_debx_myhk").html(fmoney(o.yhk + r.yhk, 2)), $("#_debx_zflx").html(fmoney(o.zlx + r.zlx, 2)), $("#_debx_hkze").html(fmoney(o.hkze + r.hkze, 2));
    var d = debj(1e4 * l, t, e, s, n),
        i = debj(1e4 * a, _, e, s, n);
    return $("#_debj_dkje").html(fmoney(1e4 * (l + a), 2)), $("#_debj_dkqx").html(e), $("#_debj_syhk").html(fmoney(d.syhk + i.syhk, 2)), $("#_debj_mydj").html(fmoney(d.mydj + i.mydj, 2)), $("#_debj_zflx").html(fmoney(d.zlx + i.zlx, 2)), $("#_debj_hkze").html(fmoney(d.hkze + i.hkze, 2)), window.CalculatorResult = {
        type: 3,
        je: fmoney(1e4 * (l + a), 2),
        gjj_je: l,
        sy_je: a,
        qx: e,
        gjj_lv: t,
        sy_lv: _,
        debx_myhk: fmoney(o.yhk + r.yhk, 2),
        debx_zflx: fmoney(o.zlx + r.zlx, 2),
        debx_hkze: fmoney(o.hkze + r.hkze, 2),
        debj_syhk: fmoney(d.syhk + i.syhk, 2),
        debj_mydj: fmoney(d.mydj + i.mydj, 2),
        debj_zflx: fmoney(d.zlx + i.zlx, 2),
        debj_hkze: fmoney(d.hkze + i.hkze, 2)
    }, !0
}

function gocal(e) {
    if (3 == e) return cal_zh();
    var l;
    if (2 == e && 2 == $("input[name=gjj_type]:checked").val()) {
        var t = parseFloat($("#pmdj").val()),
            a = parseFloat($("#mj").val());
        if (!t || isNaN(t) || t > 2e5) return show_err("pmdj", "请输入房屋平米单价", 40), $("#pmdj").css("border", "1px solid #FF6633").focus(), !1;
        if ($("#pmdj").css("border", "1px solid #D6D6D6"), $("#pmdj_err").remove(), !a || isNaN(a) || a > 500) return show_err("mj", "请输入正确的房屋面积", 25), $("#mj").css("border", "1px solid #FF6633").focus(), !1;
        $("#mj").css("border", "1px solid #D6D6D6"), $("#mj_err").remove();
        var _ = t * a,
            s = _ * (1 - .1 * parseInt($("input[name=sfbl_2]").val()));
        l = s.toFixed(2) + "元"
    } else if (1 == e && $("input[name=sy_type]").length > 0 && 2 == $("input[name=sy_type]:checked").val()) {
        var t = parseFloat($("#pmdj_1").val()),
            a = parseFloat($("#mj_1").val());
        if (!t || isNaN(t) || t > 2e5) return show_err("pmdj_1", "请输入房屋平米单价", 40), $("#pmdj_1").css("border", "1px solid #FF6633").focus(), !1;
        if ($("#pmdj_1").css("border", "1px solid #D6D6D6"), $("#pmdj_1_err").remove(), !a || isNaN(a) || a > 500) return show_err("mj_1", "请输入正确的房屋面积", 25), $("#mj_1").css("border", "1px solid #FF6633").focus(), !1;
        $("#mj_1").css("border", "1px solid #D6D6D6"), $("#mj_1_err").remove();
        var _ = t * a,
            s = _ * (1 - .1 * parseInt($("input[name=sfbl_1]").val()));
        l = s.toFixed(2) + "元"
    } else {
        var s = 1e4 * parseFloat($("#dkje_" + e).val());
        l = $("#dkje_" + e).val() + "万元"
    }
    var n = parseFloat($("#dklv_" + e).val()),
        o = 12 * $("input[name=dkqx_" + e + "]").val();
    if (!s || isNaN(s) || s > 1e8) return show_err("dkje_" + e, "请输入正确的贷款金额", 13), $("#dkje_" + e).css("border", "1px solid #FF6633").focus(), !1;
    if ($("#dkje_" + e).css("border", "1px solid #D6D6D6"), $("#dkje_" + e + "_err").remove(), !n || isNaN(n) || n > 100) return show_err("dklv_" + e, "请输入正确的贷款利率"), $("#dklv_" + e).css("border", "1px solid #FF6633").focus(), !1;
    $("#dklv_" + e).css("border", "1px solid #D6D6D6"), $("#dklv_" + e + "_err").remove();
    var r = 1;
    1 == e && 2 == $("input[name=dklv_type]").val() && (r = 2);
    var d = 0,
        i = debx(s, n, o, r, d);
    $("#_debx_dkje").html(fmoney(s, 2)), $("#_debx_dkqx").html(o), $("#_debx_myhk").html(fmoney(i.yhk, 2)), $("#_debx_zflx").html(fmoney(i.zlx, 2)), $("#_debx_hkze").html(fmoney(i.hkze, 2));
    var v = debj(s, n, o, r, d);
    return $("#_debj_dkje").html(fmoney(s, 2)), $("#_debj_dkqx").html(o), $("#_debj_syhk").html(fmoney(v.syhk, 2)), $("#_debj_mydj").html(fmoney(v.mydj, 2)), $("#_debj_zflx").html(fmoney(v.zlx, 2)), $("#_debj_hkze").html(fmoney(v.hkze, 2)), window.CalculatorResult = {
        type: e,
        je_input: l,
        je: fmoney(s, 2),
        qx: o,
        lv: n,
        debx_myhk: fmoney(i.yhk, 2),
        debx_zflx: fmoney(i.zlx, 2),
        debx_hkze: fmoney(i.hkze, 2),
        debj_syhk: fmoney(v.syhk, 2),
        debj_mydj: fmoney(v.mydj, 2),
        debj_zflx: fmoney(v.hkze, 2),
        debj_hkze: fmoney(v.hkze, 2)
    }, !0
}

function fmoney(e, l) {
    l = l > 0 && 20 >= l ? l : 2, e = parseFloat((e + "").replace(/[^\d\.-]/g, "")).toFixed(l) + "";
    var a = e.split(".")[0].split("").reverse(),
        _ = e.split(".")[1];
    for (t = "", i = 0; i < a.length; i++) t += a[i] + ((i + 1) % 3 == 0 && i + 1 != a.length ? "," : "");
    return t.split("").reverse().join("") + "." + _
}

function getRequestParam(e) {
    var l = location.href,
        t = l.substring(l.indexOf("?") + 1, l.length).split("&"),
        a = {};
    for (i = 0; j = t[i]; i++) a[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    var _ = a[e.toLowerCase()];
    return "undefined" == typeof _ ? "" : _
}

function debx(e, l, t, a, _) {
    t = parseInt(t), e = parseFloat(e), l = parseFloat(l), a = parseInt(a), _ = parseInt(_), ylv = 2 == a ? .01 * l : l / 12 * .01;
    var s = Math.pow(1 + ylv, t),
        n = e * ylv * (s / (s - 1)),
        o = n * t,
        r = o - e,
        d = new Object;
    if (d.zlx = r, d.hkze = o, d.yhk = n, 1 == _) {
        var v = e,
            c = [];
        for (i = 1; t >= i; i++) {
            var m = v * ylv,
                h = n - m;
            v -= h;
            var $ = new Object;
            $.bh = i, $.ylx = m, $.ybj = h, $.ye = v, c[i - 1] = $
        }
        d.xx = c
    }
    return d
}

function debj(e, l, t, a, _) {
    t = parseInt(t), e = parseFloat(e), l = parseFloat(l), a = parseInt(a), _ = parseInt(_), ylv = 2 == a ? .01 * l : l / 12 * .01;
    var s = 0,
        n = e / t,
        o = new Object;
    o.ybj = n;
    var r = e,
        d = [];
    for (i = 1; t >= i; i++) {
        yhk = e / t + (e - e * (i - 1) / t) * ylv, 1 == i && (o.syhk = yhk), 2 == i && (o.mydj = o.syhk - yhk), s += yhk, ylx = yhk - n, r -= n;
        var v = new Object;
        v.bh = i, v.ylx = ylx, v.yhk = yhk, v.ye = r, d[i - 1] = v
    }
    return 1 == _ && (o.xx = d), o.zlx = s - e, o.hkze = s, o
}

function esfsf(e, l, t, a) {
    e = parseInt(e), l = parseInt(l), t = parseFloat(t), a = parseFloat(a);
    var _ = 0;
    _ = 2 == e ? 3 : t > 90 ? 1.5 : 1;
    var s = a * _ / 100,
        n = 0;
    0 == l && (n = 5.55);
    var o = a * n / 100,
        r = .07 * o,
        d = .03 * o,
        i = .01 * a,
        v = 0,
        c = new Object;
    return c.qs = s, c.yys = o, c.cjs = r, c.jyfjf = d, c.grsds = i, c.yhs = v, c.total = s + o + r + d + i + v, c
}

function show_err(e, l, t) {
    console.log(e,l,t)
    // if (0 == $("#" + e + "_err").length) {
    //     var a = $("#" + e).offset().top,
    //         _ = $("#" + e).offset().left,
    //         s = ($("#" + e).height(), $("#" + e).width()),
    //         n = 0;
    //     n = t && parseInt(t) > 0 ? t : 0;
    //     var o = '<div id="' + e + '_err" class="err" style="left:' + (_ + s + 20 + n) + "px;top:" + a + 'px;"><div class="con">' + l + '</div><div class="arr"></div><div style="clear:both"></div></div>';
    //     $(o).appendTo(document.body)
    // }
}
$(document).ready(function() {
    Validator.initForm($("#input-form"), !0);
    var e = [{
        value: 1,
        text: "年利率"
    }, {
        value: 2,
        text: "月利率"
    }];
    obj_dklv_type = new Combox("dklv_type", "dklv_type", e, 1, 168, 29, {
        listDivId: "dklv_type_list",
        onchange: function() {
            // zhlv()
        }
    });
    var l = (RCal.dkqxOption, RCal.sdlilvOption),
        t = RCal.gjjlilvOption;
    obj_dklv_sel_1 = new Combox("dklv_sel_1", "lvbs_1", l, 1, 168, 29, {
        listDivId: "dklv_list_1",
        onchange: function() {
            cal_lv(1)
        }
    }), obj_dklv_sel_2 = new Combox("dklv_sel_2", "lvbs_2", t, 1, 168, 29, {
        listDivId: "dklv_list_2",
        onchange: function() {
            cal_lv(2)
        }
    }), obj_dklv_sel_3 = new Combox("dklv_sel_3", "lvbs_3", l, 1, 168, 29, {
        listDivId: "dklv_list_3",
        onchange: function() {
            cal_lv(3)
        }
    });
    var a = RCal.sfblOption;
      $(".cal-btn").each(function() {
        $(this).click(function() {
            if (Validator.validForm($("#input-form"), !0)) {
                var e = $(this).attr("did");
                if (gocal(e)) {
                    var l = $(window.opera ? "CSS1Compat" == document.compatMode ? "html" : "body" : "html,body");
                    $.browser.webkit && (l = $("body")), $(".save-result-btn").show();
                    // var t = $(".save-result-btn").offset().top;
                    // l.animate({
                    //     scrollTop: t
                    // }, 350)
                }
            }
            return !1
        })
    }), $(".reset-btn").each(function() {
        $(this).click(function() {
            var e = $(this).attr("did");
            return 1 == e ? $("input[name=sy_type]").length > 0 ? 1 == $("input[name=sy_type]:checked").val() ? ($("#dkje_1").val(""), obj_dkqx_sel_1.setValue(240), cal_lv(1)) : ($("#pmdj_1").val(""), $("#mj_1").val(""), $($("input[name=sy_gfxz]")[0]).attr("checked", !0), obj_dkqx_sel_1.setValue(240), cal_sf(), cal_lv(1)) : ($("#dkje_1").val(""), obj_dkqx_sel_1.setValue(240), obj_dklv_sel_1.setValue(1), obj_dklv_type.setValue(1), cal_lv(1)) : 2 == e ? 1 == $("input[name=gjj_type]:checked").val() ? ($("#dkje_2").val(""), obj_dkqx_sel_2.setValue(240), cal_lv(2)) : ($("#pmdj").val(""), $("#mj").val(""), $($("input[name=gfxz]")[0]).attr("checked", !0), obj_dkqx_sel_2.setValue(240), cal_sf(), cal_lv(2)) : 3 == e && ($("#dkje_3_1").val(""), $("#dkje_3_2").val(""), obj_dkqx_sel_3.setValue(240), obj_dklv_sel_3.setValue(1), cal_lv(3)), clear_result(), remove_err(), !1
        })
    }), $(".recalculate").each(function() {
        $(this).click(function() {
            var e = $(window.opera ? "CSS1Compat" == document.compatMode ? "html" : "body" : "html,body");
            $.browser.webkit && (e = $("body"));
            var l = $("#content-main").offset().top;
            e.animate({
                scrollTop: l
            }, 350)
        })
    }), $("input[name=gjj_type]").change(function() {
        var e = $(this).val();
        $(".div2_" + 2 / parseInt(e)).each(function() {
            $(this).hide()
        }), $(".div2_" + e).each(function() {
            $(this).show()
        }), remove_err(), clear_result()
    }), $("input[name=sy_type]").length > 0 && ($("input[name=sy_type]").change(function() {
        var e = $(this).val();
        $(".div1_" + 2 / parseInt(e)).each(function() {
            $(this).hide()
        }), $(".div1_" + e).each(function() {
            $(this).show()
        }), remove_err(), clear_result()
    }), $("input[name=sy_gfxz]").change(function() {
        cal_sf(), cal_lv(1)
    })), $("input[name=gfxz]").change(function() {
        cal_sf(), cal_lv(2)
    }), $("#mj").change(function() {
        cal_sf(), cal_lv(2)
    }), $(".help").each(function() {
        $(this).click(function(e) {
            e.stopPropagation(), $("#" + $(this).attr("id") + "_help").toggle()
        })
    }), $(".close").each(function() {
        $(this).click(function() {
            $(this).parent().hide()
        })
    }), $("input[name=dkqx_2]").keyup(function() {
        cal_lv(2)
    }), $("input[name=dkqx_1]").keyup(function() {
        cal_lv(1)
    }), $("input[name=dkqx_3]").keyup(function() {
        cal_lv(3)
    }), $("#input-form .autocomplete-list, #input-form .dropdown-menu").click(function() {
        cal_lv($("#calc-lid").val())
    }), $("#input-form .yt-list").click(function() {
        cal_lv($("#calc-lid").val())
    }), $("input[name=dkqx_1], input[name=dkqx_2], input[name=dkqx_3]").blur(function() {
        var e = $(this).val();
        e && e.length || ($(this).val(5), cal_lv($("#calc-lid").val()))
    }), $(document).click(function() {
        $(".tsk").each(function() {
            $(this).hide()
        }), $(".yt-list").each(function() {
            $(this).hide()
        })
    }), cal_lv($("#calc-lid").val()), remove_err(), clear_result();
    var _ = getRequestParam("je"),
        s = getRequestParam("lv"),
        n = getRequestParam("qx");
    s && obj_dklv_sel_1.setValue(s), n && $("input[name=dkqx_1]").val(n), _ && ($("#dkje_1").val(_), gocal(1))


    // 设置radio
    $('input[type="radio"]').change(function(){
        var name = $(this).attr("name");
        $('input[type="radio"][name='+name+']').attr("data-value",false);
        $(this).attr("data-value","checked");
    })
    // 文本框获取焦点
    $("input[type=number]").focus(function(){
        var height = $(this).offset().top-50;
        $(window).scrollTop(height)
    })
});