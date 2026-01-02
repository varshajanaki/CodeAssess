import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleViewResults = () => {
    // Navigate to the ExamResults page with some example state data
    navigate('/StudentResult', {
      state: {
        roomId: 'exampleRoomId', // Replace with actual roomId if applicable
        rollnumber: 'exampleRollNumber' // Replace with actual rollnumber if applicable
      }
    });
  };

  const handleLeavePage = () => {
    // Implement your leave page logic here
    alert('You chose to leave the page');
    // Example of navigation to another route
    // navigate('/another-page');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Student Dashboard</h1>
        <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
          <p className="text-lg mb-4 text-white">Welcome to your dashboard!</p>
          <div className="flex justify-between">
            <Link
              to="/questionsolving"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Start exam
            </Link>
            <Link
              to="/displayresult"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              View Results
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default StudentDashboard;
