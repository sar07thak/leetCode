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

module.exports = createProblem ;