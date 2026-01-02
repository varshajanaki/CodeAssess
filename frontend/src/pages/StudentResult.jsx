import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported

const ExamResults = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false); // Define loading state
  const [resultData, setResultData] = useState(null); // Define resultData state

  const handleFetchResults = () => {
    if (roomId.trim() === '' || rollNumber.trim() === '') {
      alert('Please enter both Room ID and Roll Number');
      return;
    }

    setLoading(true); // Set loading to true when the fetch starts

    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/leaderboard/${roomId}/${rollNumber}`)
      .then(response => {
        setResultData(response.data.results);
        setLoading(false); // Set loading to false when the fetch is complete
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#424242] p-8 text-[#FAFAFA]">
      <h1 className="text-4xl font-bold mb-8">Exam Results</h1>
      <div className="bg-[#292929] p-8 rounded shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-white text-xl mb-2">Room ID</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Room ID"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-xl mb-2">Roll Number</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Roll Number"
          />
        </div>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleFetchResults}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Results'}
        </button>
      </div>

      {resultData && (
        <div className="bg-[#292929] p-8 rounded shadow-lg w-full max-w-md mt-8">
          <p className="text-2xl mb-4">Your exam result:</p>
          <p className="text-xl mb-2">Roll Number: {resultData.rollnumber}</p>
          <p className="text-xl mb-2">Total Marks: {resultData.totalmarks}</p>
          {/* Display more result details as needed */}
        </div>
      )}

      <button
        className="mt-8 py-2 px-4 bg-[#FFA116] text-[#1E1E1E] rounded-lg hover:bg-[#292929] hover:text-[#FFA116]"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ExamResults;
