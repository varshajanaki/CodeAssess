import React, { useState } from 'react';
import axios from 'axios';

const DisplayResult = () => {
    const [roomID, setRoomID] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);

    const handleFetchLeaderboard = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/leaderboard/${roomID}`)
            .then(response => {
                setLeaderboard(response.data.results);
            })
            .catch(error => console.error('Error fetching leaderboard:', error));
    };

    return (
        <div className="min-h-screen flex flex-col bg-black p-8">
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)}
                    className="p-2 border  rounded bg-[#27272a] text-white"
                />
                <button
                    onClick={handleFetchLeaderboard}
                    className="ml-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Fetch Leaderboard
                </button>
            </div>

            {leaderboard.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#3e3c3c77] border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Roll Number</th>
                                <th className="py-2 px-4 border-b">Total Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((result, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">{result.rollnumber}</td>
                                    <td className="py-2 px-4 border-b">{result.totalmarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DisplayResult;
