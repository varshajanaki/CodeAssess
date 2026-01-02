import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ExamResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalMarks, maxMarks, percentage } = location.state || {};

  if (!totalMarks && totalMarks !== 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-8 text-[#FAFAFA]">
      <h1 className="text-4xl font-bold mb-8">Exam Results</h1>
      <div className="bg-[#29292A] p-8 rounded shadow-lg w-full max-w-md">
        <p className="text-2xl mb-4">Your exam is <span className='text-green-500'>successfully submitted!</span></p>
        <p className="text-xl mb-2">Total Marks: {totalMarks}</p>
        <p className="text-xl mb-2">Max Marks:  {maxMarks}</p>
        <p className="text-xl mb-2">Percentage:  {percentage.toFixed(2)}%</p>
      </div>
      <button
        className="mt-8 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-[#292929] hover:text-blue-700 transition duration-300"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ExamResults;