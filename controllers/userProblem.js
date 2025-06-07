const { getLanguageById , submitBatch , submitToken } = require("../utils/ProblemUtility");
const Problem = require("../models/problem");

const createProblem = async (req, res) => {
  try {
    console.log("REQ.BODY: ", req.body);
    const {
      title,
      description,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      startCode,
      referenceSolution,
    } = req.body;

    for (const { language, completeCode } of referenceSolution) {
      // source code , language id , input , expectedOutput
      const languageId = getLanguageById(language);

      //* creating a batch in which we collect all test case and send to judge0
      const submissions = visibleTestCases.map((testCase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testCase.input,
        expected_output: testCase.output,
      }));
      //* after passing submission into the submitBatch we get a array of tokens 
      const submitResult = await submitBatch(submissions); 
      console.log("tokens => submitResult from submitBatch: ", submitResult);


      const resultToken = submitResult.map((value) => {
        return value.token ;
      });
      //* we can get token in this form 'dce7bbc5-a8c9-4159-a28f-ac264e48c371,1ed737ca-ee34-454d-a06f-bbc73836473e,9670af73-519f-4136-869c-340086d406db'

      const testResult = await submitToken(resultToken);
      // console.log("testResult : ",testResult);
      
      for(const test of testResult ){
        if(test.status_id != 3 ){
          return res.status(400).send("Error Occured !");
        } 
      }
    }
    //* now we can store in our database 
    const userProblem =  await Problem.create({
        title ,
        description ,
        difficulty,
        tags,
        visibleTestCases,
        hiddenTestCases,
        startCode,
        referenceSolution,
        problemCreator: req.result._id
      });

    res.status(201).send("Problem Created Succesfully ✅ !")
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

const updateProblem = async(req, res)=>{
  try{
    //* getting id using req.params
    const {id} = req.params ;

    //* checking id is present or not
    if( !id ){
      res.status(400).send("midding id");
    }
     
    //* find problem using id 
    const DsaProblem = await Problem.findById(id);

    //* checking problem exist or not
    if(!DsaProblem){
      return res.status(400).send("ID is not present in server")
    }

    const {
      title,
      description,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      startCode,
      referenceSolution,
    } = req.body;

    //* first we checking the code running well or not if yes then we update 
    for (const { language, completeCode } of referenceSolution) {
      // source code , language id , input , expectedOutput
      const languageId = getLanguageById(language);

      //* creating a batch in which we collect all test case and send to judge0
      const submissions = visibleTestCases.map((testCase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testCase.input,
        expected_output: testCase.output,
      }));
      //* after passing submission into the submitBatch we get a array of tokens 
      const submitResult = await submitBatch(submissions); 
      console.log("tokens => submitResult from submitBatch: ", submitResult);


      const resultToken = submitResult.map((value) => {
        return value.token ;
      });
      //* we can get token in this form 'dce7bbc5-a8c9-4159-a28f-ac264e48c371,1ed737ca-ee34-454d-a06f-bbc73836473e,9670af73-519f-4136-869c-340086d406db'

      const testResult = await submitToken(resultToken);
      // console.log("testResult : ",testResult);
      
      for(const test of testResult ){
        if(test.status_id != 3 ){
          return res.status(400).send("Error Occured !");
        } 
      }
    }

    const newProblem = await Problem.findByIdAndUpdate(id , {...req.body} , { runValidators : true , new : true } );

    res.status(201).send(newProblem);

  }catch(err){
    res.status(400).send("Error : " + err.message);
  }
}

const deleteProblem = async ( req , res)=>{
  try{
    const { id } = req.params ;


    if( !id ){
      return res.status.send("id is missing");
    }

    const deleteProblem = await Problem.findByIdAndDelete(id) ;

    if( !deleteProblem ){
      return res.status(400).send("Problem does not exist ! ");
    }

    res.status(200).send("Problem deleted Sucessfully ✅");
  }catch(err){
    res.status(500).send("Error : " + err.message);
  }
}


const getProblemByID = async ( req , res )=>{
  try{
    const {id} = req.params ;

    
    if( !id ){
      return res.status.send("id is missing");
    }

    const getProblem = await Problem.findById(id);

    if( !getProblem ) {
      return res.status(400).send("Problem does not exist ! ");
    }
    
    res.status(200).send(getProblem);

  }catch(err){
    res.status(400).send("Error : " + err.message);
  }
}

const getAllProblem = async (req, res)=>{
   try{
    const getProblem = await Problem.find({});

    if( getProblem.length == 0 ) {
      return res.status(400).send("Problems does not exist ! ");
    }
    
    res.status(200).send(getProblem);

  }catch(err){
    res.status(400).send("Error : " + err.message);
  }
}

const solvedProblemByUser = ()=>{
  
}

module.exports = {
  createProblem ,
  deleteProblem ,
  updateProblem ,
  getAllProblem ,
  getProblemByID,
  solvedProblemByUser
} ;