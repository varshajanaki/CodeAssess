import ExamResults from "../models/ExamResults.js";
import ExamRes from "../models/ExamResults.js";
export const Result = async (req, res) => {
    const { roomId, rollnumber } = req.params;

    try {
        const examResults = await ExamResults.findOne({ roomId });

        if (examResults) {
            // Find the result with the matching rollnumber
            const result = examResults.results.find(
                result => result.rollnumber === rollnumber
            );

            if (result) {
                res.status(200).json({ result });
            } else {
                res.status(404).json({ message: "Result not found for rollnumber" });
            }
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while finding results.' });
    }
};
