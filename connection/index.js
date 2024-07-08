const mongoose = require("mongoose");
const { MONGO_URI } = require('../config');

const connect = ()=>{
    mongoose.connect(MONGO_URI);
var db = mongoose.connection;
db.on("error", function () { console.log('Mongo error', Error); });
db.on('connected', function () { console.log('MongoDB Connected'); });
db.on('disconnected', function () { console.log('MongoDB Disconnected'); });
}
const disconnect =()=>{
        mongoose.connection.close();
}

module.exports ={
    connect,
    disconnect
}