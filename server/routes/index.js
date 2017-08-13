const router = require('koa-router')()
const send = require('koa-send');
const path = require('path');

const usersControllerInit = require('../database/controllers/users');

module.exports = function(app, passport) {

  const usersController = usersControllerInit(passport);
  // test
  router.get('/api/test', async (ctx, next) => {
    let jsonData = {
      id:'noasd123asd',
      username: '2333',
      password: 'youguess',
      email: '666@qq.com'
    }
     ctx.body = jsonData;
  })
  // User
  router.post('/api/signup', usersController.signup);
  router.post('/api/login', usersController.login);
  router.get('/api/logout',  usersController.logout);
  router.get('/api/account',  usersController.account);

  router.all('/*',  async (ctx, next) => {
     ctx.body = '200';
  })

  app.use(router.routes());
};