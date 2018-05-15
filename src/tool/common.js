export function check(isPreview,jumpUrl,callback){
    if(isPreview) return
    var platformType=tool.getUserAgent()
    var id=tool.getQueryString('id')
    let data={activityCode:id}
    $.ajax({
        url:backendHost+'/colombo/ActivityService/findActivityStatus',
        type: "POST",
        data:JSON.stringify(data),
        success: function(data) {
            if(data=='0'){
                tool.cues({type:"e",txt:'抱歉，页面已经过期了！'})
                return
            }
            if(data=='2'){
                tool.cues({type:"e",txt:'页面还未生效哦！'})
                return
            }

            if(!jumpUrl){
                callback(data);
                return
            }

            if(platformType=='Weixin'){
                tool.jump(jumpUrl)
                return
            }

            if(platformType=='PcOrUC'){
                tool.jump(jumpUrl)
                return
            }

            if(platformType=='Android'){
                var action = {type: 'goodsDetail', payload: {goodsCode: jumpUrl}}
                window.postMessage(JSON.stringify(action))
                return
            }

            if(platformType=='IOS'){
                var action = {type: 'goodsDetail', payload: {goodsCode: jumpUrl}}
                window.postMessage(JSON.stringify(action))
                return
            }

        },
        error: function (error) {
            console.log("================error.status================")
            console.log("校验失效接口--findActivityStatus  : "+error)
            alert("校验失效接口--findActivityStatus  : "+error)
        },
        //timeout: 5000,//超时时间设置，单位毫秒
    });//ajax

}//跳转之前要做的事情