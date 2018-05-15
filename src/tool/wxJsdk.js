export function wxConfig(){
    let url=window.location.href
    let jsApiList=['chooseWXPay','getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']
    $.ajax({
        url:frontendHost + '/html5/JssdkService/sign?code=json&{url:\''+url+'\'}',
        type: 'get',
        contentType: "application/json",
        success: function(data) {
            console.log("================sign--data================")
            console.log(data.appId+':'+data.timestamp+':'+data.nonceStr+':'+data.signature)
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: jsApiList
            });

        },
        error: function (error) {
            console.log("================error.status================")
            console.log("微信签名接口--sign : "+error.status+'错误')
            alert("微信签名接口--sign : "+error.status+'错误')

        },
        //timeout: 5000,//超时时间设置，单位毫秒
    });//微信签名ajax
}


export function wxPay(data,successcallback,cancelcallback){
    if(tool.getUserAgent()=='Weixin'){
        tool.cues({type:"e",txt:"请用微信打开"})
    }else{
        wx.ready(function () {
            wx.chooseWXPay({
                appId: data.appId,
                timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.paySign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    if (res.errMsg == "chooseWXPay:ok") {
                        //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
                        successcallback();
                    }
                },
                cancel:function () {
                    cancelcallback();
                }
            });
        });
    }//if判断是否微信打开
}

export function wxShare(SHARE_INFO){
    if(tool.getUserAgent()=='Weixin'){
        wx.ready(function (){
            wx.onMenuShareAppMessage({
                title: SHARE_INFO.title,
                desc: SHARE_INFO.description,
                link: SHARE_INFO.link,
                imgUrl: SHARE_INFO.imgUrl,
                success: function () {
                    //alert('已分享');
                },
                cancel:function () {
                    //alert('已取消');
                },
                fail:function (res) {
                    alert(JSON.stringify(res));
                }
            })//分享给朋友

            wx.onMenuShareTimeline({
                title: SHARE_INFO.title,
                desc: SHARE_INFO.description,
                link: SHARE_INFO.link,
                imgUrl: SHARE_INFO.imgUrl,
                success: function () {
                    //alert('已分享');
                },
                cancel:function () {
                    //alert('已取消');
                },
                fail:function (res) {
                    alert(JSON.stringify(res));
                }
            })//分享到朋友圈

            wx.onMenuShareQQ({
                title: SHARE_INFO.title,
                desc: SHARE_INFO.description,
                link: SHARE_INFO.link,
                imgUrl: SHARE_INFO.imgUrl,
                success: function () {
                    //alert('已分享');
                },
                cancel:function () {
                    //alert('已取消');
                },
                fail:function (res) {
                    alert(JSON.stringify(res));
                }
            })//分享到QQ
        })
    }else{
        return
    }
}

