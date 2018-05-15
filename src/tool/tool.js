export function getUserAgent() {
    var UserAgentName = ''
    var userAgent = navigator.userAgent
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        UserAgentName = "Weixin"
    } else {

        if (userAgent.indexOf("Android") != -1 || userAgent.indexOf("SAMSUNG") != -1) {
            UserAgentName = "Android"
        } else if (userAgent.indexOf("iPhone") != -1 || userAgent.indexOf("iPad") != -1 || userAgent.indexOf("IOS") != -1) {
            UserAgentName = "IOS"
        } else {
            UserAgentName = "PcOrUC"
        }

    }
    return UserAgentName
}//getUserAgent:判断客服端浏览器内核

export function trim(str){
    return str.replace(/\s/g, "");
}//去掉所有空格

export function trimLeftRight(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}//删除左右两端的空格

export function saveLocal(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
}//保存数据到本地

export function getLocal(key) {
    let getKey = localStorage.getItem(key)
    return JSON.parse(getKey)
}//获取本地数据

export function delLocal(key) {
    localStorage.removeItem(key)
}//删除本地数据

export function saveSession(key, obj) {
    sessionStorage.setItem(key, JSON.stringify(obj))
}//保存数据到本地

export function getSession(key) {
    let getKey = sessionStorage.getItem(key)
    return JSON.parse(getKey)
}//获取本地数据

export function delSession(key) {
    sessionStorage.removeItem(key)
}//删除本地数据

export function requireAuthonEnter(nextState, replace) {
    if (!tool.hasLogin()) {
        replace({pathname: '/login'})
    }
}//requireAuth:利用onEnter判断是否登陆状态，否则跳转到登录页面

export function hasLogin() {
    let whetherLogin = getLocal('user')
    if (whetherLogin) return true
    else return false;
}//hasLogin判断登录状态

export function cues(obj) {

    if (document.querySelector('.cues')) return
    var newDiv = document.createElement("div")
    newDiv.className = "cues"
    document.body.appendChild(newDiv)
    newDiv.innerHTML = '<div class="cues-box cues_animation_in"><div class="cues-box-icon"><i class="cues-toast-icon ' + obj.type + '-icon"></i></div><div class="cues-box-content">' + obj.txt + '</div></div>'
    setTimeout(function () {
        var cuesbox = document.querySelector('.cues-box')
        cuesbox.className = 'cues-box cues_animation_out'
        cuesbox.addEventListener("webkitAnimationEnd", function () {
            document.querySelector('.cues').remove(true)
        })

    }, 1000)

}//cues:提示层

export function loadingIn(){
    if (document.querySelector('.yp_loading_toast')) return
    var newDiv = document.createElement("div")
    newDiv.className = "yp_loading_toast"
    document.body.appendChild(newDiv)
    newDiv.innerHTML = '<div class="yp_mask_transparent"></div><div class="yp_toast"><div class="yp_loading"><div class="yp_loading_leaf yp_loading_leaf_0"></div><div class="yp_loading_leaf yp_loading_leaf_1"></div><div class="yp_loading_leaf yp_loading_leaf_2"></div><div class="yp_loading_leaf yp_loading_leaf_3"></div><div class="yp_loading_leaf yp_loading_leaf_4"></div><div class="yp_loading_leaf yp_loading_leaf_5"></div><div class="yp_loading_leaf yp_loading_leaf_6"></div><div class="yp_loading_leaf yp_loading_leaf_7"></div><div class="yp_loading_leaf yp_loading_leaf_8"></div><div class="yp_loading_leaf yp_loading_leaf_9"></div><div class="yp_loading_leaf yp_loading_leaf_10"></div><div class="yp_loading_leaf yp_loading_leaf_11"></div></div><p class="yp_toast_content">Loading</p></div>'

}//loading提示层出现

export function loadingOut(){
    if (!document.querySelector('.yp_loading_toast')) return
    document.querySelector('.yp_loading_toast').remove(true)
}//loading提示层消失

export function dialog(obj,callback1,callback2){
    if (document.querySelector('.js_dialog')) return
    var newDiv = document.createElement("div")
    newDiv.className = "js_dialog yp-popIn"
    document.body.appendChild(newDiv)
    newDiv.innerHTML = '<div class="js_dialog yp-popIn"><div class="yp-mask"></div><div class="yp-dialog"><div class="yp-dialog__hd"><strong class="yp-dialog__title">' + obj.title + '</strong></div><div class="yp-dialog__bd">' + obj.content + '</div><div class="yp-dialog__ft"><a href="javascript:;" class="yp-dialog__btn yp-dialog__btn_default">取消</a><a href="javascript:;" class="yp-dialog__btn yp-dialog__btn_primary">确定</a></div></div></div>'
    var a1=document.querySelector('.yp-dialog__btn_default')
    var a2=document.querySelector('.yp-dialog__btn_primary')
    a1.addEventListener('click', function(){
        callback1()
        newDiv.className = "js_dialog yp-popOut"
        newDiv.addEventListener("webkitAnimationEnd", function () {
            this.remove(true)
        })
    }, false);
    a2.addEventListener('click', function(){
        callback2()
        newDiv.className = "js_dialog yp-popOut"
        newDiv.addEventListener("webkitAnimationEnd", function () {
            this.remove(true)
        })
    }, false);

}//dialog对话框

export function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i")
    var string = window.location.href
    var r=string.split("?")[1].match(reg)
    if (r != null) return decodeURI(r[2])
    return null
}//getQueryString:获取url参数

export function jump(key) {
    window.location.href = key
}//jump:跳转网址

export function jumpNotReturn(key) {
    window.location.replace(key)
    event.returnValue=false
}//jumpNotReturn:跳转网址不能返回

export function href(str){
    let urlArr=window.location.href.split(str)
    return urlArr[0]
}//getUrl:获取根目录域名