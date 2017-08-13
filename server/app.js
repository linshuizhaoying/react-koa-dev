const koa = require('koa');

const app = module.exports = new koa();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const views = require('koa-views')
const path = require('path');

const config = require('./config/config');

// sessions
const session = require('koa-generic-session');

// 如果是开发者模式
if (process.env.NODE_ENV !== 'production') {
  // CORS for dev 开启跨域
  const cors = require('koa-cors');
  console.log('cors');
  app.use(cors());

  // logger for dev 日志记录
  const logger = require('koa-logger');
  app.use(logger());
}


app.keys = config.app.keys;
app.use(session({
  key: 'CvteSession',
}));

app.use(bodyParser());

// db connect 连接数据库
const mongoose = require('mongoose');

const dburl = config.mongo.url;
mongoose.connect(dburl);

// auth 身份验证
const passport = require('koa-passport');

app.use(passport.initialize());
app.use(passport.session());

// 身份验证配置
require('./config/passport')(passport, config);

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views'))

// routes
require('./routes/index')(app, passport);

const port = config.app.port;
app.listen(port);

console.log('正在监听端口 ' + port + ' (API)');
