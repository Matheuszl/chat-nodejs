const mongoose = require('mongoose');
global.db = require('./db');

function findAll() {
  let response = global.conn.collection("users").find().toArray();
    console.log(response);
    return response;
}
 

module.exports = { findAll }



// mongoose.Promise = global.Promise;

// const uri = "mongodb+srv://dbMatheus:dbMatheus@cluster0.k2pm3.mongodb.net/appChat?retryWrites=true&w=majority";

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });

// module.exports = mongoose;