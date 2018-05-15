/**
 * Created by yangpu on 2016/9/18.
 */
import '../css/special.css';
import '../css/assembly.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Special from '../containers/Special';

class App extends React.Component {
    constructor() {
        super()

    }//es6 class 构造函数立即执行

    render() {
        return (
            <div>
                <Special/>
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



