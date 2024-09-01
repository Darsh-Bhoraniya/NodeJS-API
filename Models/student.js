const mongoose = require("mongoose");

// Define the schema for the student model
const studentSchema = new mongoose.Schema({
  Studentid: {
    type: Number,
    required: true,
    unique: true,
  },
  StudentName: {
    type: String,
    required: true,
  },
  StudentAge: {
    type: Number,
    required: true,
    min: 0,  // Example validation: age cannot be negative
  },
  Email: {
    type: String,
    required: true,
  },
  MobileNumber: {
    type: String,
    required: true,
  },
});

// Export the model
module.exports = mongoose.model("student", studentSchema,"Student");
