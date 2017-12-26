$(function(){
    $("#tel").blur(function(){
        if(checkMobile($(this).val())){
            $(this).val($(this).val().substring(0,3)+"****"+$(this).val().substring(8,11));
        }else{
            $(this).val("");
        }
    });
    $("#idCard").blur(function(){
        if(IdentityCodeValid($(this).val())){

        }else{
            $(this).val("");
        }
    });
    //下拉列表展示
    var selectData='';
    $(".cancel").click(function(){
        $(".zhezhao").hide();
        $(".select").hide();
        $(".select").css("height","")
    })
    $(".educational").click(function(){
        $(".zhezhao").show();
       selectData+='<li class="educationalBtn"><span>中专/高中及以下</span></li><li class="educationalBtn"><span>大专</span></li> <li class="educationalBtn"><span>本科</span></li> <li class="educationalBtn"><span>硕士及以上</span></li>';
        $(".selectBox").html(selectData);
        $(".educationalBtn").each(function(i,obj){
            if($(".educational").find("p").html()==$(obj).find("span").html()){
                $(obj).append('<img src="img/loan_selection@2x.png" alt=""/>');
            }
        });
        var hei=$(".select").outerHeight();
        $(".select").css("height","0").animate({height:hei},"3000","linear").show();
        selectData='';
    });
    $(".social").click(function(){
        $(".zhezhao").show();
        selectData+='<li class="socialBtn"><span>缴纳本地社保</span></li><li class="socialBtn"><span>未缴纳社保</span></li>';
        $(".selectBox").html(selectData);
        $(".socialBtn").each(function(i,obj){
            if($(".social").find("p").html()==$(obj).find("span").html()){
                $(obj).append('<img src="img/loan_selection@2x.png" alt=""/>');
            }
        });
        var hei=$(".select").outerHeight();
        $(".select").css("height","0").animate({height:hei},"3000","linear").show();
        selectData='';
    });
    $(".car").click(function(){
        $(".zhezhao").show();
        selectData+='<li class="carBtn"><span>无车</span></li><li class="carBtn"><span>本人名下有车，无贷款</span></li><li class="carBtn"><span>本人名下有车，但已被抵押</span></li>';
        $(".selectBox").html(selectData);
        $(".carBtn").each(function(i,obj){
            if($(".car").find("p").html()==$(obj).find("span").html()){
                $(obj).append('<img src="img/loan_selection@2x.png" alt=""/>');
            }
        });
        var hei=$(".select").outerHeight();
        $(".select").css("height","0").animate({height:hei},"3000","linear").show();
        selectData='';
    });
    $(".vocation").click(function(){
        $(".zhezhao").show();
        selectData+='<li class="vocationBtn"><span>政企单位</span></li><li class="vocationBtn"><span>企业主</span></li><li class="vocationBtn"><span>个体工商户</span></li><li class="vocationBtn"><span>上班人群</span></li><li class="vocationBtn"><span>学生</span></li><li class="vocationBtn"><span>无固定职业</span></li>';
        $(".selectBox").html(selectData);
        $(".vocationBtn").each(function(i,obj){
            if($(".vocation").find("p").html()==$(obj).find("span").html()){
                $(obj).append('<img src="img/loan_selection@2x.png" alt=""/>');
            }
        });
        var hei=$(".select").outerHeight();
        $(".select").css("height","0").animate({height:hei},"3000","linear").show();
        selectData='';
    });
    //下拉列表选择
    function change(inp,val){
        $(".selectBox").on("click",val,function(){
            $(val).find("img").remove();
            //$(val).each(function(i,obj){
            //    if($(obj).find("span").html()==$(inp).find("p").html()){
            //        $(obj).append('<img src="img/loan_selection@2x.png" alt=""/>');
            //    }
            //})
            $(this).append('<img src="img/loan_selection@2x.png" alt=""/>');
            $(inp).find("p").html($(this).find("span").html()).css("color","#333");
        })
    }
    change(".educational",".educationalBtn");
    change(".social",".socialBtn");
    change(".car",".carBtn");
    change(".vocation",".vocationBtn");
    $(".zhezhao").css("height",$(document).height());
    function checkMobile(str) {
        if(str==""){
            alert("手机号不能为空！");
        }
        else{
            var re = /^1\d{10}$/  ;                             // 以1开始后面加10位数字
            if (re.test(str)) {
                return true;
            } else {
                alert("手机号格式错误！");
                return false;
            }
        }
    }
    function IdentityCodeValid(code) {
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;

        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }

        else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    tip = "校验位错误";
                    pass =false;
                }
            }
        }
        if(!pass) alert(tip);
        return pass;
    }
    
});