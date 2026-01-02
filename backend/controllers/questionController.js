import Question from "../models/QuestionSchema.js";
// import ExamResult from "../models/ExamResults.js";
import ExamRes from "../models/ExamResults.js";
export const createQuestions = async (req, res) => {
  const { roomId, numQuestions, studentQuestions, questions } = req.body;

  // Validation of request body
  if (
    !roomId ||
    typeof numQuestions !== "number" ||
    typeof studentQuestions !== "number" ||
    !Array.isArray(questions)
  ) {
    return res.status(400).send({ message: "Invalid input data" });
  }

  if (questions.length !== numQuestions) {
    return res.status(400).send({
      message: "Number of questions does not match the numQuestions field",
    });
  }

  // Validate each question
  for (const q of questions) {
    if (
      !q.questionText ||
      !Array.isArray(q.testCases) ||
      q.testCases.length !== 5
    ) {
      console.log(q);
      return res.status(400).send({
        message: "Each question must have questionText and 5 testCases",
      });
    }
    for (const tc of q.testCases) {
      if (!tc.input || !tc.expectedOutput) {
        return res.status(400).send({
          message: "Each test case must have input and expectedOutput",
        });
      }
    }
  }

  try {
    // Create a new exam instance
    const newExam = new Question({
      roomId,
      numQuestions,
      studentQuestions,
      questions: questions.map((q) => ({
        questionText: q.questionText,
        testCases: q.testCases.map((tc) => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
        })),
      })),
    });

    // Save the exam to the database
    await newExam.save();

    // Send a success response
    res
      .status(201)
      .send({ message: "Exam created successfully", exam: newExam });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getQuestionsByRoomId = async (req, res) => {
  try {
    const { roomID } = req.params;
    const exam = await Question.findOne({ roomId: roomID });
    if (!exam) {
      return res
        .status(404)
        .json({ message: "No exam found with the provided room ID" });
    }

    // Shuffle and select a subset of questions based on studentQuestions
    const allQuestions = exam.questions;
    const studentQuestions = exam.studentQuestions;
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, studentQuestions);

    res.status(200).json({ questions: selectedQuestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveResults = async (req, res) => {
  const { roomId, rollnumber, totalmarks } = req.body;

  try {
    // Find the existing record for the room
    let examResults = await ExamRes.findOne({ roomId });

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
      examResults = new ExamRes({
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


