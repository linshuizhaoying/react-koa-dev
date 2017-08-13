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
  signUp = () =>{
    let obj = {
      username:'233',
      password:'666',
      email:'666@qq.com'
    }
    FetchUtils.enhanceFetch('/api/signup',FetchUtils.options('POST', obj))
    .then(jsonData => {
      console.log(jsonData)
    }).catch(err => {
      console.log(err)
    })
  }

  getUserList = () => {
    console.log('Users:')
    //loginUser
    FetchUtils.enhanceFetch('/api/account')
    .then(jsonData => {
      console.log(jsonData)
    })

  }
  
  editUser = () => {
    console.log('Edit...')
    let obj = {
      userId:'599039005b383af744f4caac',
      email:'666@qq.com'
    }
    FetchUtils.enhanceFetch('/api/editUser',FetchUtils.options('POST', obj))
    .then(jsonData => {
      console.log(jsonData)
    }).catch(err => {
      console.log(err)
    })
  }

  deleteUser = () => {
    console.log('DelteUser...')
    let obj = {
      userId:'599039005b383af744f4caac'
    }
    FetchUtils.enhanceFetch('/api/deleteUser',FetchUtils.options('POST', obj))
    .then(jsonData => {
      console.log(jsonData)
    }).catch(err => {
      console.log(err)
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

        <Button onClick ={ () => { this.signUp() } } >注册测试</Button>

        <Button onClick ={ () => { this.getUserList() } } >获取用户列表</Button>

        <Button onClick ={ () => { this.editUser() } } >更改用户信息</Button>

        <Button onClick ={ () => { this.deleteUser() } } >删除用户</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

HomePage = connect(mapStateToProps)(HomePage);

export default HomePage;
