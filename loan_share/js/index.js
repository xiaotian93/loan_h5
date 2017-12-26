$(function(){
    //    客户端机型判断
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端;
    var qq =u.indexOf('MQQBrowser') > -1;
    var webApp = u.indexOf('Safari') == -1;
//    获取图片验证码
    base.data_conn("/v1/api/imageCode/get/login","",getImgMessage,"get");
    function getImgMessage(e){
       $(".get_img").attr("src","data:image/jpg;base64,"+e.data)
    }
    $(".get_img").click(function(){
        base.data_conn("/v1/api/imageCode/get/login","",getImgMessage,"get");
    });
    //立即拿钱按下
    $(".input_btn").on("touchstart",function(e){
        "use strict";
        e.stopPropagation();
        $(this).find("img").attr("src","./img/click_down.png")
    });
    //立即拿钱抬起
    $(".input_btn").on("touchend",function(e){
        "use strict";
        e.stopPropagation();
        $(this).find("img").attr("src","./img/click_normal.png")
    });
//    关闭立即下载
    $(".download_close").click(function(){
        $(".download").remove();
        $(".bg").css("margin-bottom",0);
    });
    $("input").focus(function(){
        "use strict";
        $(".download").hide();
    });
    $("input").blur(function(){
        "use strict";
        //setTimeout(function(){
            $(".download").show();
        //},500)

    });
//    获取短信验证码
    $(".get_message").click(function(){
        "use strict";
        var data={};
        data.phone=$(".tel").val();
        data.type="login";
        if(checkMobile($(".tel").val())){
            if($(this).attr("disabled")==undefined){
                settime(this);
                base.data_conn("/v1/api/phone/sendCode",data,getMessage,"get");
            }

        }
        function getMessage(e){
            if(e.code!=0){
                $(".prompt").html(e.message).show();
                setTimeout(function(){
                    $(".prompt").html("").hide();
                },800);
                return;
            }
        }
    });
//    短信验证码倒计时
    var countdown=60;
    function settime(obj) {
        if (countdown == 0) {
            obj.removeAttribute("disabled");
            $(obj).html("重新获取验证码");
            countdown = 60;
            return;
        } else {
            obj.setAttribute("disabled", true);
            $(obj).html("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {
                settime(obj) }
            ,1000)
    }
//    点击快去拿钱
    $(".input_btn").click(function(){
        "use strict";
        if($(".tel").val()==''){
            $(".prompt").html("请输入手机号").show();
            setTimeout(function(){
                $(".prompt").html("").hide();
            },500);
            return;
        }else if($(".img_message").val()==''){
            $(".prompt").html("请输入图片验证码").show();
            setTimeout(function(){
                $(".prompt").html("").hide();
            },500);
            return;
        }else if($(".message").val()==''){
            $(".prompt").html("请输入验证码").show();
            setTimeout(function(){
                $(".prompt").html("").hide();
            },500);
            return;
        }else if(!$("#chose").prop("checked")){
            $(".prompt").html("请同意《放心贷服务协议》").show();
            setTimeout(function(){
                $(".prompt").html("").hide();
            },500);
            return;
        }else{
            var getData={};
            getData.phone=$(".tel").val();
            getData.imageCode=$(".img_message").val();
            getData.code=$(".message").val();
            getData.channel="h5";
            if(isAndroid){
                getData.ptype=2;
                getData.cv=getUrlParam("cv");
            }else if(isiOS){
                getData.ptype=1;
                getData.cv=getUrlParam("cv");
            }
            //console.log(getData)
            base.data_conn("/v1/api/user/share/login/phoneCode",getData,login,"post")
        }

    });
    function login(e){
        "use strict";
        if(e.code==0){
            $(".main").hide();
            $(".skip_main").show()
        }else{
            $(".prompt").html(e.message).show();
            setTimeout(function(){
                $(".prompt").html("").hide();
            },800);
            return;
        }

    }
//    手机号验证
    function checkMobile(str) {
        if(str==""){
            $(".prompt").html("请输入手机号").show();
            setTimeout(function(){
                $(".prompt").html("").hide();
            },500);
            return;
        }
        else{
            var re = /^1\d{10}$/  ;                             // 以1开始后面加10位数字
            if (re.test(str)) {
                return true;
            } else {
                $(".prompt").html("手机号格式错误！").show();
                setTimeout(function(){
                    $(".prompt").html("").hide();
                },500);
                return false;
            }
        }
    }

//    微信浏览器判断
    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }
//    根据客户端机型下载app
    if(isWeiXin()){
        $(".download_b").click(function(){
            "use strict";
            $(".browser").show();
        });
        $(".skip_btn").click(function(){
            "use strict";
            $(".browser").show();
        });
        $(".browser").click(function(){
            $(this).hide();
        })
    }
    if(isAndroid){
        $(".download_b").attr("href","http://api.360fangxindai.com:9191//files/20171219182555242.apk");
        $(".skip_btn").attr("href","http://api.360fangxindai.com:9191//files/20171219182555242.apk");
    }
});