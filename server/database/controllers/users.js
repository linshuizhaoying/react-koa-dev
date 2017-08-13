import 'babel-polyfill'
const User = require('../models/user.js');

module.exports = function (passport) {

  const signup = async(ctx) => {
    console.log('signup')
    const {username, password, email} = ctx.request.body;
    // console.log(username) console.log(password)
    try {
      if (username && password) {

        let user = new User({username, password, email});
        let hadUser = '';
        await User.findOne({"username": username},function(err,user){
          hadUser = user;
        });
        console.log(hadUser)
        if (hadUser && hadUser.username === username) {
          console.log('1')
          return ctx.body = {
            code: 4,
            msg: "注册用户名重复"
          }
        } else {
          console.log('2')
          await user.save();
          return ctx.body = {
            code: 1,
            msg: "注册成功"
          }
        }
      } else {
        return ctx.body = {
          code: 0,
          msg: "注册失败"
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const account = async(ctx) => {
    let users = {};
    
    await User
      .find({}, function (err, user) {
       return ctx.body = {
          'users': user
        };
      });
  };

  const editUser = async(ctx) =>{
    const {userId, email} = ctx.request.body;
    let user = await User.findByIdAndUpdate(userId, {email:email})
    console.log(user)
    if(user){
      return ctx.body = {
        code: 1,
        msg: "更新成功"
      }
    }else{
      return ctx.body = {
        code: 0,
        msg: "更新失败"
      }
    }
  }

  const deleteUser = async(ctx) =>{
    const {userId} = ctx.request.body;
    let user = await User.findByIdAndRemove(userId)
    console.log(user)
    if(user){
      return ctx.body = {
        code: 1,
        msg: "删除成功"
      }
    }else{
      return ctx.body = {
        code: 0,
        msg: "删除失败"
      }
    }
  }
  const login = function * () {
    var _this = this;

    console.log('inside passport 1');

    yield * passport.authenticate('local', function * (err, user, info) {
      if (err) {
        // _this.body = JSON.stringify(err);
        return _this.status = 404;
      }

      console.log('inside passport 2');
      console.log(user);

      if (user === false) {
        return _this.status = 401;
      }

      console.log('inside passport 3');

      yield _this.login(user);
      _this.body = {
        user: user
      };
    }).call(this);
  };

  const logout = function * () {
    console.log(this);

    this.logOut();
    // this.clearCookie('notepadonline.sid', {path: '/'}); this.session.destroy();
    this.redirect('/');
  };


  return {signup, login, logout, account, editUser, deleteUser};
};