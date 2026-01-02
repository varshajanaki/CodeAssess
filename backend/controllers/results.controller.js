// controllers/resultsController.js
// import ExamResults from '../models/ExamResults.js';
// import ExamResults from "../models/ResultsSchema";
import ExamResults from "../models/ExamResults.js";
import ExamRes from "../models/ExamResults.js";
export const saveResults = async (req, res) => {
    const { roomId, rollnumber, totalmarks } = req.body;

    try {
        // Find the existing record for the room
        let examResults = await ExamResults.findOne({ roomId });

        if (examResults) {
            // Check if the rollnumber already exists
            const existingResult = examResults.results.find(
                result => result.rollnumber === rollnumber
            );

            if (existingResult) {
                // Update the existing result
                existingResult.totalmarks = totalmarks;
            } else {
                // Add a new result
                examResults.results.push({ rollnumber, totalmarks });
            }
        } else {
            // Create a new record for the room
            examResults = new ExamResults({
                roomId,
                results: [{ rollnumber, totalmarks }],
            });
        }

        await examResults.save();

        res.status(200).json({ message: 'Results saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving results.' });
    }
};

export const getLeaderboard = async (req, res) => {
    const { roomId } = req.params;

    try {
        const examResults = await ExamRes.findOne({ roomId });

        if (examResults) {
            // Sort the results by total marks (descending) and timestamp (ascending)
            const sortedResults = examResults.results.sort((a, b) => {
                if (b.totalmarks !== a.totalmarks) {
                    return b.totalmarks - a.totalmarks;
                }
                return new Date(a.timestamp) - new Date(b.timestamp);
            });

            res.status(200).json({ results: sortedResults });
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the leaderboard." });
    }
};
