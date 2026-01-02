import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminSchema.js";
import StudentUser from "../models/StudentSchema.js";

export const adminsignup = async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Validate password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  try {
    // Check if a user with the provided email already exists
    const existingUser = await AdminUser.findOne({ email });

    // If user exists, respond with an error
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password using bcryptjs
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new AdminUser instance with the hashed password
    const newUser = new AdminUser({ email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json("User created successfully!");
  } catch (error) {
    // Log any errors and respond with a server error
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const adminsignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await AdminUser.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const stundetsignup = async (req, res) => {
  const { rollnumber, password } = req.body;

  try {
    // Validate roll number length

    // Check if a student with the provided roll number already exists
    const existingStudent = await StudentUser.findOne({ rollnumber });

    // If student exists, respond with an error
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists" });
    }

    // Hash the password using bcryptjs
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new StudentUser instance with the hashed password
    const newStudent = new StudentUser({
      rollnumber,
      password: hashedPassword,
    });

    // Save the new student to the database
    await newStudent.save();

    // Respond with a success message
    res.status(201).json({ message: "Student created successfully!" });
  } catch (error) {
    // Log any errors and respond with a server error
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const studentsignin = async (req, res, next) => {
  const { rollnumber, password } = req.body;
  try {
    const validUser = await StudentUser.findOne({ rollnumber });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...rest, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getquestionset = async (req, res) => {
  const { roomId } = req.query;

  if (!roomId) {
    return res.status(400).send({ message: "Room ID is required" });
  }

  try {
    const exam = await Question.findOne({ roomId });

    if (!exam) {
      return res.status(404).send({ message: "Exam not found" });
    }

    res.status(200).send({ message: "Exam retrieved successfully", exam });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
