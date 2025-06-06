const axios = require('axios');

const getLanguageById = (lang) => {
  const language = {
    "c++": 54,
    java: 62,
    javascript: 63,
  };
  return language[lang.toLowerCase()];
};

const submitBatch = async (submissions) => {
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      base64_encoded: 'false'
    },
    headers: {
      'x-rapidapi-key': 'd7c6dd1f8bmsh981f913cc7e15dfp1e9670jsne8c0b344231c',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: { submissions }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log("✅ Judge0 Batch API response:", response.data);
      return response.data ; // ✅ FIXED HERE
    } catch (error) {
      console.error("❌ Error in submitBatch:", error.message);
      return []; // return an empty array to avoid undefined errors
    }
  }

  return await fetchData();  //* provide a set of array of token 
};

const waiting = async (timer) => {
  setTimeout(()=>{
    return 1 ;
  },timer);
}

const submitToken = async (resultToken) => {

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(",") ,
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': 'd7c6dd1f8bmsh981f913cc7e15dfp1e9670jsne8c0b344231c',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data ;
	} catch (error) {
		console.error(error);
	}

  await waiting(1000);

}

while(true){
  const result = await fetchData();
  const isResultObtained = result.submissions.every((r) => r.status_id > 2 );
  
  if( isResultObtained ){
    return result.submissions ;
  }
  
  await waiting(1000);
}

}

module.exports = { getLanguageById, submitBatch , submitToken };