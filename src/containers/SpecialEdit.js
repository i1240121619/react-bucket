import React from 'react';

export default class SpecialEdit extends React.Component {
    constructor(props) {
        super(props);
        //tool.delSession('store');
        console.log("================tool.getSession('store')================");
        console.log(tool.getSession('store'));

        if(tool.getSession('store')){
            this.state=tool.getSession('store')
        }else{
            this.state= {
                LoadingState:1,//数据是否加载完毕
            }//state
            this.uploadAjax(this.state.id)
        }//if判断数据来源
    }//constructor

    uploadAjax(a){
    }//uploadAjax

    render() {
        return (
            <div className="mainInAll">
                <div className={this.state.LoadingState ? "main mainIn" : "main"}>
                    1111
                </div>
            </div>
        )
    }//render
}