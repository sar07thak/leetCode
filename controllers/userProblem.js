const { getLanguageById , submitBatch } = require("../utils/ProblemUtility");

const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      startCode,
      problemCreator,
      referenceSolution,
    } = req.body;

    for (const { language, completeCode } of referenceSolution) {
      // source code , language id , input , expectedOutput
      const languageId = getLanguageById(language);

      //* creating a batch in which we collect all test case and send to judge0
      const submissions = visibleTestCases.map((input, output) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submitResult = await submitBatch(submissions);
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};
