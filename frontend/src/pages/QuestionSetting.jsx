import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const QuestionSetting = () => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [studentQuestions, setStudentQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [roomId, setRoomId] = useState('');

  const generateQuestionForms = () => {
    const newQuestions = [];
    for (let i = 1; i <= numQuestions; i++) {
      newQuestions.push({
        questionText: '',
        testCases: [
          { input: '', expectedOutput: '' },
          { input: '', expectedOutput: '' },
          { input: '', expectedOutput: '' },
          { input: '', expectedOutput: '' },
          { input: '', expectedOutput: '' }
        ]
      });
    }
    setQuestions(newQuestions);
  };

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleTestCaseChange = (questionIndex, testCaseIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].testCases[testCaseIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/questions`, {
        roomId,
        numQuestions,
        studentQuestions,
        questions
      });
      console.log(response.data);
      alert('Exam created successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the exam');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#010101] p-6 text-[#E2E8F0]">
      <Card className="bg-[#1b1c1c] text-[#E2E8F0] max-w-4xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-6 text-center">Create Questions for Room</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="roomId" className="text-sm font-bold mb-2">Room ID</Label>
            <Input
              id="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID..."
              className="bg-[#222428] text-[#E2E8F0] focus:ring-2 focus:ring-[#63B3ED] w-full"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="numQuestions" className="text-sm font-bold mb-2">Number of Questions</Label>
            <Input
              type="number"
              id="numQuestions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              placeholder="Enter number of questions..."
              className="bg-[#222428] text-[#E2E8F0]  focus:ring-2 focus:ring-[#63B3ED] w-full"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="studentQuestions" className="text-sm font-bold mb-2">Number of Questions per Student</Label>
            <Input
              type="number"
              id="studentQuestions"
              value={studentQuestions}
              onChange={(e) => setStudentQuestions(Number(e.target.value))}
              placeholder="Enter number of questions per student..."
              className="bg-[#222428] text-[#E2E8F0]  focus:ring-2 focus:ring-[#63B3ED] w-full"
            />
          </div>
          <div className="mb-6">
            <Button onClick={generateQuestionForms} className="bg-[#4A5568] text-[#E2E8F0] w-full hover:bg-[#63B3ED] hover:text-[#2D3748]">
              Generate Questions
            </Button>
          </div>
          <form onSubmit={handleSubmit}>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-8">
                <h2 className="text-xl font-bold mb-4">Question {questionIndex + 1}</h2>
                <div className="mb-4">
                  <Label htmlFor={`question${questionIndex}`} className="text-sm font-bold mb-2">Question</Label>
                  <Textarea
                    id={`question${questionIndex}`}
                    value={question.questionText}
                    onChange={(e) => handleInputChange(questionIndex, 'questionText', e.target.value)}
                    placeholder={`Enter question ${questionIndex + 1}...`}
                    className="bg-[#222428]s text-black  focus:ring-2 focus:ring-[#63B3ED] w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label className="text-sm font-bold mb-2">Test Cases (5)</Label>
                  {question.testCases.map((testCase, testCaseIndex) => (
                    <div key={testCaseIndex} className="mb-2">
                      <Label className="text-sm font-bold mb-1">Test Case {testCaseIndex + 1}</Label>
                      <Input
                        type="text"
                        value={testCase.input}
                        onChange={(e) => handleTestCaseChange(questionIndex, testCaseIndex, 'input', e.target.value)}
                        placeholder={`Input for test case ${testCaseIndex + 1}`}
                        className="bg-[#2D3748] text-[#E2E8F0]  focus:ring-2 focus:ring-[#63B3ED] w-full mb-1"
                      />
                      <Input
                        type="text"
                        value={testCase.expectedOutput}
                        onChange={(e) => handleTestCaseChange(questionIndex, testCaseIndex, 'expectedOutput', e.target.value)}
                        placeholder={`Expected output for test case ${testCaseIndex + 1}`}
                        className="bg-[#2D3748] text-[#E2E8F0]  focus:ring-2 focus:ring-[#63B3ED] w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <Button type="submit" className="bg-[#4A5568] text-[#E2E8F0] w-full hover:bg-[#63B3ED] hover:text-[#2D3748]">
                Set Exam
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionSetting;
