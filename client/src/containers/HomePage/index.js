// 第一序列是基础组件
import React, { Component } from 'react';
// import {
//   Link
// } from 'react-router-dom';
import { connect } from 'react-redux';
// 第二序列是引入组件
import { Button } from 'antd';
import { loginUser } from '../../actions'
import { USERLOGIN } from '../../constants/api'
 import FetchUtils from '../../helpers/fetchUtils';
// import NotificationUtils from '../../helpers/notificationUtils';
//第三序列是样式,有时候需要覆盖某些组件的样式
import './index.css';
import './hover.css';
import './'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
  }

  fetchData = () => {
    console.log('fetch')
    //loginUser
    FetchUtils.enhanceFetch('/api/test')
    .then(jsonData => {
      console.log(jsonData)
    })

  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)

  }


  render() {
    return (
      <div>
        <Button onClick ={ () => { this.fetchData() } } >Fetch测试</Button>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

HomePage = connect(mapStateToProps)(HomePage);

export default HomePage;
