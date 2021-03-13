const passport = require('passport');
let  LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser( function (id, done) {
  User.findOne({UserId:id}).exec(async function (err,user) {
    if(user) {
      let existingUser = {};
      existingUser.id = user.UserId;
      
      done(err, existingUser);
    }else{
      done(null, null);
    }
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    if ((email ==='') ||(password ==='')) {
      return done(null, false, { message: "Missing Credentials" });
    }
    User.findOne({Email: email}).exec(function (err, user){
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Invalid Email Or Password"});
      }
     
      bcrypt.compare(password, user.Password, function (err, res) {
        if (err)
          return done(null, false, {
            message: 'Invailid password!'
          });
        let existingUser = {};
       
        existingUser.id = user.UserId;
        
        return done(null, existingUser, {
          message: 'Logged In Successfully'
        });
      });
    });
  }
));

