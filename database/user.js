//BANCO DE DADOS - Matheus
const user = require('../database');

const UserSchema = new user.Schema({
  mensage: {
    type: String,
    require: true,
  },
});

UserSchema.pre('save', function(next) {
  next();
});

const User = client.model('User', UserSchema);

module.exports = User;