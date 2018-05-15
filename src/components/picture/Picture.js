/**
 * Created by yangpu on 2016/9/18.
 */
import React from 'react'

export default class Picture extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }

    choice(val){
        this.props.action(val)
    }

    check(isPreview,jumpUrl){
        common.check(isPreview,jumpUrl)
    }

    render() {

        let {data,serialNumber,activated,isPreview}=this.props
        let mediaList=data.mediaList

        return (
            <div className="picture">
                <div className={serialNumber==activated&&isPreview?"RedBorder":""} onClick={this.choice.bind(this,serialNumber)}>
                    <div className={'picture'+data.styleType}>
                        <ul>
                            {mediaList ? mediaList.map((item, index)=> {
                                return (
                                    <li key={index}><a href="javascript:void(0)" onClick={this.check.bind(this,isPreview,item.jumpUrl)}><img src={item.showUrl+"?"+new Date().getTime()}/></a></li>
                                )
                            }):null}

                        </ul>
                    </div>
                </div>
            </div>
        )

    }

    componentDidUpdate() {

    }

}



