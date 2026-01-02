import React, { useState } from 'react';
import axios from 'axios';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { useNavigate } from 'react-router-dom';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';

const QuestionSolving = () => {
  const [roomID, setRoomID] = useState('');
  const [rollnumber, setRollNumber] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userTestCases, setUserTestCases] = useState({});
  const [code, setCode] = useState({});
  const [output, setOutput] = useState({});
  const [lang, setLang] = useState('Python');
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const navigate = useNavigate();

  const handleFetchQuestions = () => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/questions/${roomID}`)
      .then(response => {
        setQuestions(response.data.questions);
        setQuestionsFetched(true);
      })
      .catch(error => console.error('Error fetching questions:', error));
  };

  const handleRunCode = (questionId) => {
    const requestData = {
      code: code[questionId] || '',
      lang: lang.toLowerCase(),
      input: userTestCases[questionId] || questions.find(q => q._id === questionId).testCases[0]?.input || '',
      action: 'run',
    };

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/compilecode`, requestData)
      .then(response => {
        setOutput(prevOutput => ({
          ...prevOutput,
          [questionId]: response.data.output || `Error: ${response.data.error}`
        }));
      })
      .catch(error => setOutput(prevOutput => ({
        ...prevOutput,
        [questionId]: `Error: ${error.message}`
      })));
  };

  const handleSubmitCode = (questionId) => {
    const requestData = {
      code: code[questionId] || '',
      lang: lang.toLowerCase(),
      testCases: questions.find(q => q._id === questionId).testCases,
      action: 'submit',
    };

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/compilecode`, requestData)
      .then(response => {
        const results = response.data.results;
        const formattedOutput = results.map((result, index) =>
          `Test Case ${index + 1}: ${result.passed ? 'Passed' : 'Failed'}\n`
        ).join('');
        setOutput(prevOutput => ({
          ...prevOutput,
          [questionId]: formattedOutput
        }));
      })
      .catch(error => setOutput(prevOutput => ({
        ...prevOutput,
        [questionId]: `Error: ${error.message}`
      })));
  };

  const handleSubmitExam = () => {
    let totalMarks = 0;
    const results = questions.map(question => {
      const requestData = {
        code: code[question._id] || '',
        lang: lang.toLowerCase(),
        testCases: question.testCases,
        action: 'submit',
      };

      return axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/compilecode`, requestData)
        .then(response => {
          const passedTestCases = response.data.results.filter(result => result.passed).length;
          const questionMarks = passedTestCases; // Each question is worth 5 marks
          totalMarks += questionMarks;
          return { questionId: question._id, passedTestCases, totalMarks: questionMarks };
        })
        .catch(error => ({ questionId: question._id, error: error.message }));
    });

    Promise.all(results)
      .then(allResults => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/saveresults`, {
          roomId: roomID,
          rollnumber: rollnumber,
          totalmarks: totalMarks,
          timestamp: new Date().toISOString(),
        })
          .then(() => {
            navigate('/exam-results', {
              state: {
                totalMarks,
                maxMarks: questions.length * 5,
                percentage: (totalMarks / (questions.length * 5)) * 100,
              }
            });
          })
          .catch(error => console.error('Error saving results:', error));
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black p-8 text-[#FAFAFA]">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          className="p-2 border border-[#686868] rounded bg-[#292929] text-[#FAFAFA]"
        />
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollnumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="p-2 border border-[#686868] rounded bg-[#292929] text-[#FAFAFA] ml-4"
        />
        {!questionsFetched && (
          <button
            onClick={handleFetchQuestions}
            className="ml-4 py-2 px-4 bg-white text-[#1E1E1E] rounded-lg hover:bg-black hover:text-white border border-grey-300"
          >
            Fetch Questions
          </button>
        )}
      </div>

      {questions.map((question) => (
        <div key={question._id} className="mb-8 p-4 bg-[#292929] shadow-lg rounded">
          <h2 className="text-xl font-bold text-white">{question.questionText}</h2>
          <p className="text-[#FAFAFA] mb-4">{question.description}</p>
          <h3 className="text-lg font-bold text-white">Test Cases:</h3>
          {question.testCases.length > 0 && (
            <div>
              <p className="text-[#bcbcbf]">Input: {question.testCases[0].input}</p>
              <p className="text-[#bcbcbf]">Expected Output: {question.testCases[0].expectedOutput}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-xl font-bold text-white">Language:</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="block w-full p-2 border border-[#686868] rounded bg-[#292929] text-[#FAFAFA]">
              <option value="Python">Python</option>
            </select>
          </div>

          <div className="code-mirror-wrapper mb-4" style={{ height: '300px' }}>
            <ControlledEditor
              onBeforeChange={(editor, data, value) => {
                setCode(prevCode => ({
                  ...prevCode,
                  [question._id]: value
                }));
              }}
              value={code[question._id] || ''}
              options={{
                lineNumbers: true,
                mode: lang.toLowerCase(),
                theme: 'material',
              }}
              className="code-mirror"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-white">Test Cases Input:</label>
            <textarea
              value={userTestCases[question._id] || question.testCases[0]?.input || ''}
              onChange={(e) => setUserTestCases(prevTestCases => ({
                ...prevTestCases,
                [question._id]: e.target.value
              }))}
              className="block w-full p-2 border border-[#686868] rounded bg-[#292929] text-[#FAFAFA]"
              rows="4"
            />
          </div>

          <div className="flex justify-between mb-4">
            <button
              className="py-2 px-4 bg-[#2bb863] text-[#1E1E1E] rounded-lg hover:bg-[#292929] hover:text-[#10B981]"
              onClick={() => handleRunCode(question._id)}
            >
              Run Code
            </button>
            <button
              className="py-2 px-4 bg-white text-[#1E1E1E] rounded-lg hover:bg-black hover:text-white border border-grey-300"
              onClick={() => handleSubmitCode(question._id)}
            >
              Submit Code
            </button>
          </div>

          <div className="bg-[#292929] p-4 border border-[#2727A] rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-white mb-2">Output:</h3>
            <pre className="whitespace-pre-wrap text-[#FAFAFA] code-output">{output[question._id]}</pre>
          </div>

        </div>
      ))}

      {questionsFetched && (
        <div className="flex justify-center mt-4">
          <button
            className="py-2 px-4 bg-white item-center text-[#1E1E1E] rounded-lg hover:bg-black hover:text-white self-center mb-8 border border-grey-300"
            onClick={handleSubmitExam}
          >
            Submit Exam
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionSolving;
