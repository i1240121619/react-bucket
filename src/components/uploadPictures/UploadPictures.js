/**
 * Created by yangpu on 2016/9/18.
 */
import React from 'react'

export default class UploadPictures extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            accessID:'',
            signature:'',
            key:'',
            expire:'',
            policy:'',
            filesArray:[],
        }
    }

    choicePic(val){
        this.props.action(val)
    }

    moveLeft(){
        this.props.moveLeft()
    }

    moveRight(){
        this.props.moveRight()
    }

    picCancel(){
        this.props.picCancel()
    }

    deletePic(val){
        this.props.deletePic(val)
    }

    jumpType(val,index){
        this.props.jumpType(val,index)
    }

    h4Tip(val){
        if(val==1){
            return "填写链接"
        }else if(val==2){
            return "填写商品编码"
        }else if(val==3){
            return "不需要填写"
        }

    }

    inputTip(val){
        if(val==1){
            return "https://"
        }else if(val==2){
            return "8888888"
        }else if(val==3){
            return "不需要填写"
        }
    }

    picNameTip(val){
        if(val==1){
            return "建议尺寸：宽度750，高度不限"
        }else if(val==2){
            return "建议尺寸：宽度375，高度不限"
        }else if(val==3){
            return "建议尺寸：宽度250，高度不限"
        }
    }

    jumpUrl(index,jumpType){
        let jumpUrl=tool.trimLeftRight(this.refs['jumpUrl'+index].value)
        this.props.jumpUrl(jumpUrl,index,jumpType)
    }

    picValidateInit(event){
        event.target.value=''
    }

    picValidate(styleType,mediaList,activatedPic,event) {
        event.preventDefault()
        let target = event.target
        let files = target.files
        let count = files.length
        let picCount=count+mediaList.length//选择的图片+已上传图片

        if(styleType==2&&picCount>2&&activatedPic==10000){
            tool.cues({type:"e",txt:'不能超过两张图片！'})
            return
        }else if(styleType==3&&picCount>3&&activatedPic==10000){
            tool.cues({type:"e",txt:'不能超过三张图片！'})
            return
        }

        for(var i = 0; i < count; i++) {
            files[i].thumb = URL.createObjectURL(files[i])
        }
        files = Array.prototype.slice.call(files,0)
        files = files.filter(function (file) {
            return /image/i.test(file.type)
        })

        var filesArray=[]
        for(var i=0;i<files.length;i++){
            if(files[i].size>500000){
                tool.cues({type:"e",txt:'单张图不能超过500kb！'})
                return
            }
            this.props.deleteHasOwnProperty('default')
            this.createReader(files[i],function (n,w,h){
                let picObj={}
                picObj.showName=n
                picObj.width=w
                picObj.height=h
                picObj.jumpUrl=''
                picObj.jumpType='3'
                picObj.showUrl='images/loading.gif'
                filesArray.push(picObj)
            })
        }//for files

        setTimeout(function(){
            this.setState({filesArray:filesArray})
            this.props.showPicLoding(filesArray)
        }.bind(this),500)

        var y=0
        var timer=setInterval(function(){
            if(y<files.length){
                var index=mediaList.length+y
                this.findFileKey(files[y].name,files[y],index)//上传函数
                y++
            }else{
                clearInterval(timer)
            }
        }.bind(this),2000)//每隔一段时间上传一张图片

    }//picValidate

    createReader(file, whenReady) {
        var showName=file.name;
        var reader = new FileReader();
        var that=this;
        reader.onload = function (evt){
            that.getWidthHeight(evt.target.result,showName,whenReady)
        };
        reader.readAsDataURL(file);
    }

    getWidthHeight(src,showName,whenReady){
        var image = new Image();
        image.onload = function () {
            var width = this.width;
            var height = this.height;
            if (whenReady) whenReady(showName,width,height);
        };
        image.src = src;
    }

    findFileKey(fileName,files,index){
        let data={fileName:fileName}
        tool.wxShopToOpenXAjax({
            url:backendHost+'/openx/colombo/ActivityService/uploadFile',
            type: "GET",
            data:data,
            success: function(data) {
                let url1=data.host
                let url=url1.replace("http:","https:")
                let picUrl=url+'/'+data.key
                let form = new FormData()
                let formdata={
                    OSSAccessKeyId:data.accessID,
                    signature:data.signature,
                    key:data.key,
                    expire:data.expire,
                    policy:data.policy,
                    file:files
                }
                $.each(formdata,function(a){
                    form.append(a,formdata[a])
                })
                $.ajax({
                    url:url,
                    type: "POST",
                    dataType: "json",
                    data:form,
                    processData:!1,
                    contentType:!1,
                    success: function() {
                        this.props.showPic(picUrl,index)
                        console.log("================host--data================")
                        console.log('上传成功！')
                    }.bind(this),
                    error: function (error) {
                        this.props.showPicFail(index)
                        console.log("================error.status================")
                        console.log("上传图片接口--host : "+error)
                    }.bind(this),
                    //timeout: 5000,//超时时间设置，单位毫秒
                });//ajax

            }.bind(this),
            error: function (error) {
                console.log("================error.status================")
                console.log("上传验证接口--ActivityService : "+error)
                alert("上传验证接口--ActivityService : "+error)

            },
            //timeout: 5000,//超时时间设置，单位毫秒
        });//ajax

    }

    getfilesArrayStr(){
        return
    }

    urlTo(a,b,c){
        if(c=='1'){
            return a
        }else if(c=='2'){
            return b
        }else {
            return ''
        }
    }


    render() {

        let {activatedComponent,activatedPic}=this.props
        let styleType=activatedComponent.styleType
        let mediaList=activatedComponent.mediaList

        let filesNameArray=[]
        for (var i=0;i<mediaList.length;i++){
            if(mediaList.length>0){
                filesNameArray.push(mediaList[i].showName)
            }//判断mediaList是不是为空
        }
        var filesArrayStr=filesNameArray.join(',')


        if(activatedPic!==10000){
            var filesStr=mediaList[activatedPic].showName
        }else{
            var filesStr=filesArrayStr
        }


        console.log("================mediaList================")
        console.log(mediaList)

        return (
            <div className="goodslist">
                <div className={activatedPic==10000?"upDown hide":"upDown"}><a href="javascript:void(0)" onClick={this.moveLeft.bind(this)}>左移</a><a href="javascript:void(0)" onClick={this.moveRight.bind(this)}>右移</a><a href="javascript:void(0)" onClick={this.picCancel.bind(this)}>取消选中</a></div>
                <div className="goods_item">
                    <h4 className="goods_item_title">图片名称<span className="text-size-12 pull-right text-light-gray">{this.picNameTip(styleType)}</span></h4>
                    <div>
                        <input type="text" className="pull-left width-250 form-control margin-right-little" value={filesStr||""} onChange={this.getfilesArrayStr}/>
                        <div className="pull-left">
                            <div className="picsc">
                                <input type="file" className="fileInput" accept=".jpg,.gif,.png" multiple={activatedPic==10000 ?true:false} onClick={this.picValidateInit.bind(this)} onChange={this.picValidate.bind(this,styleType,mediaList,activatedPic)}/>
                                <div className="btn btn-success margin-right-little">{activatedPic==10000 ?"上传":"重传"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="goods_item">
                    {mediaList ? mediaList.map((item, index)=> {
                        return (
                            <div className={activatedPic==index ?"img_item kuang img_item-33":"img_item img_item-33"} key={index}>
                                <div className="picqu" onClick={this.choicePic.bind(this,index)}>
                                    <img src={item.showUrl+"?"+new Date().getTime()} alt={item.showName} title={item.showName} width="100%" height="80"/>
                                    <p className="text-center text-size-12 picname">{item.showName}</p>
                                    <p className="text-center text-green text-size-12">{item.width}x{item.height}</p>
                                </div>
                                <button type="button" className="close_x_btn" onClick={this.deletePic.bind(this,index)}>x</button>
                            </div>
                        )
                    }):null}
                </div>

                <div className={styleType==1?"picurl hide":"picurl"}>

                    {mediaList ? mediaList.map((item, index)=> {
                        return (
                            <div className="picurldan" key={index}>
                                <div className="goods_item">
                                    <h4 className="goods_item_title">图片{index+1}</h4>
                                    <span className="input_box">
                                        <label><input type="radio" checked={item.jumpType=='1'?"checked":""} onChange={this.jumpType.bind(this,'1',index)} name={"url"+index}/><span className="title">自定义链接</span></label>
                                        <label><input type="radio" checked={item.jumpType=='2'?"checked":""} onChange={this.jumpType.bind(this,'2',index)} name={"url"+index}/><span className="title">商品</span></label>
                                        <label><input type="radio" checked={item.jumpType=='3'?"checked":""} onChange={this.jumpType.bind(this,'3',index)} name={"url"+index}/><span className="title">无连接跳转</span></label>
                                    </span>
                                </div>
                                <div className={item.jumpType=='3'?"promotionid hide":"promotionid"}>
                                    <div className="goods_item">
                                        <h4 className="goods_item_title">{this.h4Tip(item.jumpType)}</h4>
                                        <input type="text" placeholder={this.inputTip(item.jumpType)} className="full-width form-control" ref={"jumpUrl"+index} value={this.urlTo(item.jumpUrl,item.goodsCode,item.jumpType)||''} onChange={this.jumpUrl.bind(this,index,item.jumpType)}/>
                                    </div>
                                </div>
                            </div>
                        )
                    }):null}


                </div>
            </div>
        )


    }

    componentDidUpdate() {



    }

}



