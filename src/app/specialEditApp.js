/**
 * Created by yangpu on 2016/9/18.
 */
import '../css/special.css';
import '../css/specialEdit.css';
import '../css/assembly.css';
import '../css/jquery.minicolors.css';

import React from 'react';
import ReactDOM from 'react-dom';

import SpecialEdit from '../containers/SpecialEdit';

class App extends React.Component {
    constructor() {
        super()
        if(!tool.getSession('_openx_head')){
            tool.cues({type:"e",txt:'请先登录!'})
            return
        }

    }//es6 class 构造函数立即执行

    render() {
        return (
            <div>
                <SpecialEdit/>
            </div>
        )
    }

    componentDidMount() {
        console.log(tool.getUserAgent() + '===========')

        tool.saveLocal('user', {LoginStatus: true})
        console.log(tool.getLocal('user').LoginStatus + '-----------')
        //tool.delLocal('user');
        console.log(tool.getLocal('user') + '++++++++++++++')

        console.log('登录状态:' + tool.hasLogin())


    }

}
ReactDOM.render(<App/>, document.getElementById('app'));



