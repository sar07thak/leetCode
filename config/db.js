const mongoose = require("mongoose");
require('dotenv').config();

async function main(){
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Db connected sucessfully !");
}


module.exports = main ;