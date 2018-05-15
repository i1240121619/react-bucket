/**
 * Created by yangpu on 2016/9/18.
 */
import React from 'react'

export default class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }

    choice(val){
        this.props.action(val)
    }

    render() {

        let {data,serialNumber,activated,isPreview}=this.props
        let mediaList=data.mediaList
        let showUrl=mediaList[0].showUrl
        let height=mediaList[0].height/24+'rem'

        console.log("+++++++++++++mediaList[0]+++++++++++++")
        console.log(mediaList[0])

        return (
            <div className="Video">
                <div  className={serialNumber==activated&&isPreview?"RedBorder":""} onClick={this.choice.bind(this,serialNumber)}>
                    <video className="h5Video" style={{height:height}} src={showUrl} controls="controls">您的浏览器不支持 video 标签。</video>
                </div>
            </div>
        )

    }

    componentDidUpdate() {

    }

}



