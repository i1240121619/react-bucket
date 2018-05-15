/**
 * Created by yangpu on 2016/9/18.
 */
import React from 'react'
import base64 from 'base-64';

export default class Baopin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            channel:this.props.channel,
            openid:this.props.openid,
            activityName:this.props.activityName,
            promotionList:this.props.data.promotionList,//套餐列表
            chooseArr:this.getChoose(this.props.data.promotionList),//被选套餐
            chooseArrMerge:this.chooseArrMerge(this.getChoose(this.props.data.promotionList)),//被选套餐重复商品合并数组
            addmax:20
        }
    }

    getChoose(a){
        let getChooseArr=[]
        for (var i = 0; i < a.length; i++) {
            if(a[i].promotionSelected){
                getChooseArr.push(a[i])
            }
        }//for
        return getChooseArr
    }//找到被选套餐

    getPromotionDetailListMerge(a){//promotionList
        let promotionDetailListAll = []
        for (var i = 0; i < a.length; i++){
            let promotionDetailListbig=[]
            for (var y = 0; y < a[i].promotionNum; y++) {
                promotionDetailListbig.push(a[i].promotionDetailList)
            }//for
            let promotionDetailListNew=[]
            for (var y = 0; y < promotionDetailListbig.length; y++) {
                for (var x = 0; x < promotionDetailListbig[y].length; x++) {
                    promotionDetailListNew.push(promotionDetailListbig[y][x])
                }//for
            }//for
            for (var ii = 0; ii < promotionDetailListNew.length; ii++) {
                promotionDetailListAll.push(promotionDetailListNew[ii])
            }//for
        }//for
        return promotionDetailListAll
    }//被选套餐商品数组合并

    chooseArrMerge(a){
        let promotionDetailListAll=this.getPromotionDetailListMerge(a)
        let chooseArrMerge=this.arrayMerge(promotionDetailListAll)//被选数组合并
        return chooseArrMerge
    }//被选套餐重复商品数组合并

    getQuantity(){
        let chooseArrMerge=this.state.chooseArrMerge
        let and=0
        for (var i = 0; i < chooseArrMerge.length; i++) {
            and=and+chooseArrMerge[i].quantity
        }//for
        return and
    }//被选套餐商品总数

    getOriginalPrice(){
        let chooseArrMerge=this.state.chooseArrMerge
        let and=0
        for (var i = 0; i < chooseArrMerge.length; i++) {
            and=and+chooseArrMerge[i].quantity*chooseArrMerge[i].goodsPrice
        }//for
        return and.toFixed(2)
    }//goodsPrice

    getTotal(){
        let chooseArr=this.state.chooseArr
        let and=0
        for (var i = 0; i < chooseArr.length; i++) {
            and=and+chooseArr[i].promotionPrice*chooseArr[i].promotionNum
        }//for
        return and.toFixed(2)
    }//优惠后总价

    getDiscount(){
        let and=this.getOriginalPrice()-this.getTotal()
        return and.toFixed(2)
    }

    choice(val){
        this.props.action(val)
    }

    getInput(){
        return
    }

    sectionToChinese(section){
        var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while(section > 0){
            var v = section % 10;
            if(v === 0){
                if(!zero){
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            }else{
                zero = false;
                strIns = chnNumChar[v];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }

    choosePackages(val){
        let promotionList=this.state.promotionList
        promotionList[val].promotionSelected=!promotionList[val].promotionSelected
        if(!promotionList[val].promotionSelected){
            promotionList[val].promotionNum=1
        }
        this.setState({promotionList:promotionList},function(){
            this.state.chooseArr=this.getChoose(this.state.promotionList)
            this.state.chooseArrMerge=this.chooseArrMerge(this.getChoose(this.state.promotionList))
            this.setState(this.state)
        })
    }

    minus(a){
        let promotionListActive=this.state.promotionList[a]
        let promotionSelected=promotionListActive.promotionSelected
        if(!promotionSelected){
            tool.cues({type:"e",txt:'您还没有选择此套餐'})
            return
        }
        if(promotionListActive.promotionNum>1){
            promotionListActive.promotionNum-=1
            this.setState(this.state,function(){
                this.state.chooseArr=this.getChoose(this.state.promotionList)
                this.state.chooseArrMerge=this.chooseArrMerge(this.getChoose(this.state.promotionList))
                this.setState(this.state)
            })
        }else{
            tool.cues({type:"e",txt:'您选择的此套餐不能少了'})
            return
        }

    }

    add(a){
        let promotionListActive=this.state.promotionList[a]
        let promotionSelected=promotionListActive.promotionSelected
        if(!promotionSelected){
            tool.cues({type:"e",txt:'您还没有选择此套餐'})
            return
        }
        if(promotionListActive.promotionNum<this.state.addmax){
            promotionListActive.promotionNum+=1
            this.setState(this.state,function(){
                this.state.chooseArr=this.getChoose(this.state.promotionList)
                this.state.chooseArrMerge=this.chooseArrMerge(this.getChoose(this.state.promotionList))
                this.setState(this.state)
            })
        }else{
            tool.cues({type:"e",txt:'此套餐最多买20件'})
            return
        }
    }

    qra(a){
        if(a){
            tool.cues({type:"e",txt:'编辑环境无法购买！'})
            return
        }
        if(!this.state.openid){
            alert('openid不能为空，可能微信没有登录授权!')
            return
        }
        let data={
            recommendInfo:{
                description:this.state.activityName,//推荐单描述*必传
                source:this.state.channel||alert('channel不能为空'),//来源*必传
                selfSubsidyAmount:0,//已省
                refereeInfo:{
                    code:'123456',//推荐人*必传
                    departmentCode:'123456',//医生科室代码*必传
                    departmentName:'默认',//医生科室名*必传
                },
                recommendedPerson:{
                    code:this.state.openid,//患者ID*必传  openid
                },
                recommendGoodsList:this.state.chooseArrMerge
            }
        }
        $.ajax({
            url:createRecommendInfoHost+'/recommend/recommendOpenService/createRecommendInfo',
            type: "POST",
            data:JSON.stringify(data),
            success: function(data) {
                let dataObj={
                    doctorId:'123456',
                    patientId:this.state.openid,
                    recommendId:data,
                }
                let dataStr=base64.encode(JSON.stringify(dataObj))
                console.log("================dataStr================")
                console.log(dataStr)
                tool.jump(ossHost+'/opensystem/cart.html?data='+dataStr+'&source='+this.state.channel+'&openid='+this.state.openid)

            }.bind(this),
            error: function (error) {
                console.log("================error.status================")
                console.log("创建推荐单接口--createRecommendInfo : "+error)
                alert("创建推荐单接口--createRecommendInfo : "+error)
            },
            //timeout: 5000,//超时时间设置，单位毫秒
        });//ajax
    }

    arrayMerge(arr){
        var map = {}
        var dest = []
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];
            if (!map[ai.goodsCode]) {
                dest.push({
                    goodsCode: ai.goodsCode,
                    data: [ai]
                });
                map[ai.goodsCode] = ai;

            } else {
                for (var j = 0; j < dest.length; j++) {
                    var dj = dest[j];
                    if (dj.goodsCode == ai.goodsCode) {
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        var good = []
        for (var i = 0; i < dest.length; i++) {
            var c = 0
            for (var ii = 0; ii < dest[i].data.length; ii++) {
                c = c + dest[i].data[ii].quantity
            }
            for (var ii = 0; ii < dest[i].data.length; ii++) {
                var d = dest[i].data[ii].goodsPrice
            }
            for (var ii = 0; ii < dest[i].data.length; ii++) {
                var b = dest[i].data[ii].isPrescription
            }
            for (var ii = 0; ii < dest[i].data.length; ii++) {
                var e = dest[i].data[ii].goodsChannelPrice
            }
            var djsb = {
                channelPrice:e,//渠道价*必传
                exercisePrice:e,//执行价*必传
                goodsPrice:d,//商品价格*必传
                goodsCode:dest[i].goodsCode,//商品ID*必传
                isPrescription:b,//是否处方药*必传
                quantity:c,//数量*必传
            }
            good.push(djsb)
        }
        return good
    }//arrayMerge转换

    render() {

        let {serialNumber,activated,isPreview,data}=this.props
        let promotionList=this.state.promotionList
        let buttonType=data.buttonType
        let buttonTitle=data.buttonTitle
        if(buttonType=='1'){
            var style={
                backgroundColor:data.backgroundColor,
                fontSize:data.titleSize/24+'rem',
                color:data.titleColor
            }
        }else{
            var style={
                backgroundImage:'url('+data.buttonPicUrl+')',
                backgroundRepeat:'no-repeat',
                backgroundSize:'100% 100%'
            }
        }

        return (
            <div className={isPreview?"Baopin":"Baopin BaopinisPreview"}>
                <div className={serialNumber==activated&&isPreview?"RedBorder":""} onClick={this.choice.bind(this,serialNumber)}>
                    <div className="Baopin1000">
                        <div className="Baopinnr">
                            <div className="Mask">
                                <div className="nr">
                                    <div className="nr1">
                                        <div className="bpbt">
                                            <span className="btlinewz">请选择套餐</span>
                                            <div className="btline"></div>
                                        </div>
                                        {promotionList ? promotionList.map((item, index)=> {
                                            return (
                                                <div className="tc" key={index}>
                                                    <div className="xuanze" onClick={this.choosePackages.bind(this,index)}>
                                                        <span className={promotionList[index].promotionSelected?"floatleft yf_check active":"floatleft yf_check"}></span>
                                                        <span className="floatleft tcsz">套餐{this.sectionToChinese(index+1)}</span>
                                                        <div className="floatleft sm">{item.promotionName}</div>
                                                    </div>
                                                    <div className="floatright cartNum"><button className="yf_cut" onClick={this.minus.bind(this,index)}></button><input type="text" value={item.promotionNum} onChange={this.getInput}/><button className="yf_add" onClick={this.add.bind(this,index)}></button></div>
                                                    <div className="c"></div>
                                                </div>
                                            )
                                        }):null}
                                        <div className="bpbt bpbt1">
                                            <span className="btlinewz">请选择数量</span>
                                            <div className="btline"></div>
                                        </div>
                                        <div className="tongjiall">
                                            <div className="tongji">
                                                <div className="floatleft lmbt">商品总数：</div>
                                                <div className="floatright lmbt">{this.getQuantity()}</div>
                                                <div className="c"></div>
                                            </div>
                                            <div className="tongji">
                                                <div className="floatleft lmbt">原价：</div>
                                                <div className="floatright lmbt">{this.getOriginalPrice()}</div>
                                                <div className="c"></div>
                                            </div>
                                            <div className="tongji">
                                                <div className="floatleft lmbt">已省：</div>
                                                <div className="floatright lmbt">{this.getDiscount()}</div>
                                                <div className="c"></div>
                                            </div>
                                            <div className="tongji">
                                                <div className="floatleft lmbt">总价：</div>
                                                <div className="floatright lmbt red">{this.getTotal()}</div>
                                                <div className="c"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="qr">
                                        <a href="javascript:void(0)" className="qux">取消</a>
                                        <a href="javascript:void(0)" className="qra" onClick={this.qra.bind(this,isPreview)}>确认</a>
                                    </div>
                                </div>
                            </div>
                            <div className={buttonType==1?"Snapup show":"Snapup hide"} style={style}>{buttonTitle}</div>
                            <div className={buttonType==2?"Snapup pic show":"Snapup hide"} style={style}></div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    componentDidUpdate() {

    }

}



