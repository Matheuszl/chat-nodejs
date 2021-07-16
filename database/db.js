const mongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://dbMatheus:dbMatheus@cluster0.k2pm3.mongodb.net/appChat?retryWrites=true&w=majority";

mongoClient.connect(url)
            .then(conn => global.conn = conn.db("myFirstDatabase"))
            .catch(err => console.log(err))

module.exports = { }