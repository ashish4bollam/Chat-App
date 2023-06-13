const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Can't be blank"]
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Can't be blank"],
    index: true,
    validate: [isEmail, "invalid email"]
  },
  password: {
    type: String,
    required: [true, "Can't be blank"]
  },
  picture: {
    type: String,
  },
  newMessages: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    default: 'online'
  }
}, {minimize: false});

UserSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);

      user.password = hash
      next();
    })

  })

})


UserSchema.methods.toJSON = function(){
  const currUser = this;
  const currUserObject = currUser.toObject();
  delete currUserObject.password;
  return currUserObject;
}
UserSchema.statics.findByCredentials = async function(email, password) {
  const currUser = await User.findOne({email});
  if(!currUser) throw new Error('Please enter valid email and password');

  const currPassword = await bcrypt.compare(password, currUser.password);
  if(!currPassword) throw new Error('Please enter valid email and password')
  return currUser
}


const User = mongoose.model('User', UserSchema);

module.exports = User