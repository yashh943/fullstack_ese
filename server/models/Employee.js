import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    department: {
      type: String,
      required: [true, 'Please add a department'],
    },
    skills: {
      type: [String],
      required: [true, 'Please add at least one skill'],
    },
    performanceScore: {
      type: Number,
      required: [true, 'Please add a performance score'],
      min: 0,
      max: 100,
    },
    experience: {
      type: Number,
      required: [true, 'Please add years of experience'],
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
