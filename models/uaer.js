const { Schema, default: mongoose } = require("mongoose");


const userSchema = new Schema({
    firstName : {
        type : String ,
        require : true ,
        minLength : 3 ,
        maxLength : 8 ,
    } ,
    lasttName : {
        type : String ,
        minLength : 3 ,
        maxLength : 8 ,
    } ,
    emailId : {
        type : String ,
        require : true ,
        unique : true ,
        trim : true ,
        lowercase :true ,
        imutable : true 
    } ,
    age : {
        type : Number ,
        minLength : 5 ,
        maxLength : 80 ,
    },
    role : {
        type : String ,
        enum : [ "user" , "admin" ],
        default : "user"
    } ,
    problemSolved : [String] ,
} , { timestamps : true });

const User = mongoose.model("User" , userSchema );

module.exports = User ;