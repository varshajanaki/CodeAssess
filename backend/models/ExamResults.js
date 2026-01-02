import mongoose from "mongoose";

// Schema for individual results
const ResultSchema = new mongoose.Schema({
    rollnumber: {
        type: String,
        required: true,
    },
    totalmarks: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
});


// Schema for the exam results in a specific room
const ExamResultsSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
    },
    results: [ResultSchema],
});

const ExamRes = mongoose.model("ExamResults", ExamResultsSchema);

export default ExamRes;
