/**
 * Created by yktx-ky on 17/10/12.
 */
! function() {
    window.RCal || (window.RCal = {}); {
        var t = RCal.baseRate,
            e = (RCal.jzlilv = t[t.length - 1].rate, RCal.baseRateGjj);
        RCal.gjjlilv = e[e.length - 1].rate, RCal.gjjlilvMin = RCal.baseRateGjj[0].rate
    }
    RCal.dkqxOption = [{
            value: 60,
            text: "5年(60期)"
        }, {
            value: 120,
            text: "10年(120期)"
        }, {
            value: 180,
            text: "15年(180期)"
        }, {
            value: 240,
            text: "20年(240期)"
        }, {
            value: 300,
            text: "25年(300期)"
        }, {
            value: 360,
            text: "30年(360期)"
        }], RCal.sdlilvOption = [{
            value: .7,
            text: "最新基准利率7折"
        }, {
            value: .8,
            text: "最新基准利率8折"
        }, {
            value: .83,
            text: "最新基准利率8.3折"
        }, {
            value: .85,
            text: "最新基准利率8.5折"
        }, {
            value: .88,
            text: "最新基准利率8.8折"
        }, {
            value: .9,
            text: "最新基准利率9折"
        }, {
            value: .95,
            text: "最新基准利率9.5折"
        }, {
            value: 1,
            text: "最新基准利率"
        }, {
            value: 1.05,
            text: "最新基准利率1.05倍"
        }, {
            value: 1.1,
            text: "最新基准利率1.1倍"
        }, {
            value: 1.2,
            text: "最新基准利率1.2倍"
        }, {
            value: 1.3,
            text: "最新基准利率1.3倍"
        }], RCal.gjjlilvOption = [{
            value: 1,
            text: "公积金基准利率"
        }, {
            value: 1.1,
            text: "公积金基准利率1.1倍"
        }, {
            value: 1.2,
            text: "公积金基准利率1.2倍"
        }],
        function() {
            for (var t = [{
                    value: .7,
                    text: "7折"
                }, {
                    value: .8,
                    text: "8折"
                }, {
                    value: .83,
                    text: "83折"
                }, {
                    value: .85,
                    text: "85折"
                }, {
                    value: .88,
                    text: "88折"
                }, {
                    value: .9,
                    text: "9折"
                }, {
                    value: .95,
                    text: "95折"
                }, {
                    value: 1,
                    text: "基准"
                }, {
                    value: 1.05,
                    text: "1.05倍"
                }, {
                    value: 1.1,
                    text: "1.1倍"
                }, {
                    value: 1.2,
                    text: "1.2倍"
                }, {
                    value: 1.3,
                    text: "1.3倍"
                }], e = RCal.sdlilvDetailOption = [], a = 0; a < t.length; a++) {
                var l = t[a];
                RCal.sdlilvDetailOption.push({
                    value: l.value,
                    text: "最新商贷利率" + l.text
                })
            }
            var v = [{
                value: 1,
                text: "基准"
            }, {
                value: 1.1,
                text: "1.1倍"
            }, {
                value: 1.2,
                text: "1.2倍"
            }];
            RCal.lilvOption = [].concat(e);
            for (var a = 0; a < v.length; a++) {
                var l = v[a];
                RCal.lilvOption.push({
                    value: "gjj-" + l.value,
                    text: "最新公积金利率" + l.text
                })
            }
        }(), RCal.sfblOption = [{
            value: 2,
            text: "2成"
        }, {
            value: 3,
            text: "3成"
        }, {
            value: 4,
            text: "4成"
        }, {
            value: 5,
            text: "5成"
        }, {
            value: 6,
            text: "6成"
        }, {
            value: 7,
            text: "7成"
        }, {
            value: 8,
            text: "8成"
        }, {
            value: 9,
            text: "9成"
        }], RCal.getSdLilv = function(t, e) {
            for (var a, l = 0, v = RCal.baseRate.length; v > l; l++) {
                var u = RCal.baseRate[l];
                if (t > u.term[0] && t <= u.term[1]) {
                    a = u.rate;
                    break
                }
            }
            return (a * e).toFixed(2)
        }, RCal.getGjjLilv = function(t, e) {
            for (var a, l = 0, v = RCal.baseRateGjj.length; v > l; l++) {
                var u = RCal.baseRateGjj[l];
                if (t > u.term[0] && t <= u.term[1]) {
                    a = u.rate;
                    break
                }
            }
            return (a * e).toFixed(2)
        }, RCal.getLilv = function(t, e) {
            return 0 == e.indexOf("gjj-1") ? (e = parseFloat(e.replace("gjj-", "")), RCal.getGjjLilv(t, e)) : RCal.getSdLilv(t, e)
        }, RCal.getCunkuanLilv = function(t) {
            for (var e = RCal.baseRateCunkuan, a = 0, l = e.length; l > a; a++) {
                var v = e[a];
                if (t == v.term) return v.rate
            }
            return e[e.length - 1].rate
        }
}();