/**
 * Created by yangpu on 2016/9/18.
 */
import React from 'react'

export default class Package extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }

    promotionName(a,e){
        let promotionName = e.target.value
        this.props.promotionName(a,promotionName)
    }

    promotionPrice(a,e){
        let promotionPrice = e.target.value
        this.props.promotionPrice(a,promotionPrice)
    }

    commodityCode(a,b,e){
        let commodityCode = e.target.value
        this.props.commodityCode(a,b,commodityCode)
    }

    quantity(a,b,e){
        let quantity = e.target.value
        this.props.quantity(a,b,quantity)
    }

    deletePackage(a,b){
        this.props.deletePackage(a)
    }

    addCommodity(a){
        this.props.addCommodity(a)
    }

    deleteCommodity(a,b){
        this.props.deleteCommodity(a,b)
    }



    render() {

        let {data,serialNumber}=this.props
        let promotionListItem=data
        let promotionDetailList=promotionListItem.promotionDetailList

        return (
            <div className="goodslist">
                <div className="goods_item">
                    <h4 className="goods_item_title">套餐名称</h4>
                    <input type="text" className="form-control width-packagename" maxLength="15" value={promotionListItem.promotionName} onChange={this.promotionName.bind(this,serialNumber)}/>
                    <button type="button" className="btn btn-success sctc" onClick={this.deletePackage.bind(this,serialNumber)}>删除套餐</button>
                </div>
                <div className="goods_item">
                    <h4 className="goods_item_title">套餐价格</h4>
                    <input type="number" className="width-80 form-control" value={promotionListItem.promotionPrice} onChange={this.promotionPrice.bind(this,serialNumber)}/>
                </div>
                <div className="goods_item">
                    <h4 className="goods_item_title">套餐包含的商品<button type="button" className="btn btn-success pull-right" onClick={this.addCommodity.bind(this,serialNumber)}>添加商品</button></h4>
                </div>
                <div className="hotSet">
                    {promotionDetailList ? promotionDetailList.map((item, index)=> {
                        return (
                            <div className="hot_item" key={index}>
                                <div className="width-150 pull-left margin-right-little">
                                    <h4 className="goods_item_title">商品编码</h4>
                                    <input type="number" className="full-width form-control" value={item.goodsCode} onChange={this.commodityCode.bind(this,serialNumber,index)}/>
                                </div>
                                <div className="width-80 pull-left margin-right-little">
                                    <h4 className="goods_item_title">数量</h4>
                                    <input type="number" className="full-width form-control" value={item.quantity} onChange={this.quantity.bind(this,serialNumber,index)}/>
                                </div>
                                <div className="pull-left">
                                    <button type="button" className="delete_good" onClick={this.deleteCommodity.bind(this,serialNumber,index)}>x</button>
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



