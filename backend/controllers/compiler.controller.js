import axios from "axios";
import qs from "qs";

// Function to fetch sample question
export const sample_question = async (req, res) => {
  const questionData = {
    question:
      "Write a function that takes an array of integers and returns the sum of all even numbers in the array.",
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expectedOutput: "6" },
      { input: "[2, 4, 6, 8, 10]", expectedOutput: "30" },
      { input: "[1, 3, 5, 7]", expectedOutput: "0" },
    ],
  };
  res.json(questionData);
};

// Function to handle code compilation and execution
export const compilethecode = async (req, res) => {
  const { code, lang, input, testCases, action } = req.body;

  //kokooko
  // Language mapping as per the CodeX API
  const languageMap = {
    Java: "java",
    Python: "py",
  };

  const languagePayload = languageMap[lang] || "py"; // Default to Python if language not found

  const requestData = qs.stringify({
    code: code,
    language: languagePayload,
    input: input || "",
  });

  const config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: requestData,
  };

  try {
    if (action === "run") {
      const response = await axios(config);
      res.json({
        output: response.data.output || `Error: ${response.data.error}`,
      });
    } else if (action === "submit") {
      // Submit code and check against all test cases
      const results = await Promise.all(
        testCases.map(async (testCase) => {
          const testCaseData = qs.stringify({
            code: code,
            language: languagePayload,
            input: testCase.input,
          });

          const testCaseConfig = {
            method: "post",
            url: "https://api.codex.jaagrav.in",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: testCaseData,
          };

          try {
            const tcResponse = await axios(testCaseConfig);
            const actualOutput = tcResponse.data.output.trim();
            return {
              input: testCase.input,
              expectedOutput: testCase.expectedOutput,
              actualOutput,
              passed: actualOutput === testCase.expectedOutput.trim(),
            };
          } catch (error) {
            return {
              input: testCase.input,
              expectedOutput: testCase.expectedOutput,
              actualOutput: `Error: ${error.message}`,
              passed: false,
            };
          }
        })
      );

      res.json({ results });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get full statistics (if applicable)
export const fullstat_controller = (req, res) => {
  res
    .status(501)
    .send("Full statistics functionality not available with CodeX API.");
};
