import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    rollnumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentUser =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default StudentUser;
