const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = "mongodb+srv://dbMatheus:dbMatheus@cluster0.k2pm3.mongodb.net/appChat?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;