const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema({
  userId : {
    type: Schema.Types.ObjectId ,
    required: true,
    ref : 'user' 
  },
  problemId : { 
    type : Schema.Types.ObjectId ,
    ref : 'Problem' ,
    required : true ,
  },
  code : {
    type: String,
    required: true,
  },
  language : {
    type: String,
    required: true,
    enum : ['javascript' , 'java' , 'c++']
  },
   status : {
    type: String,
    enum : ['pending' , 'accepted' , 'wrong' , 'error'] ,
    default : 'pending',
  },
  runtime : {
    type : Number ,
    default : 0
  } ,
  memory : {
    type : Number , // in kb
    default : 0 
  } ,
  errorMessage : {
    type : String ,
    default : ''
  } ,
  testCaseTotal  : {
    type : Number , 
    default : 0 
  } ,
   testCasePassed : {
    type : Number , 
    default : 0 
  } 
}, { timestamps: true });

submissionSchema.index({ userId : 1 , problemId : 1 });

const Submission = mongoose.model("Submission", submissionSchema );

module.exports = Submission ;