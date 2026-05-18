import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Employee from './models/Employee.js';
import User from './models/User.js';

dotenv.config();

connectDB();

const employees = [
  {
    name: 'Alice Smith',
    email: 'alice@example.com',
    department: 'Engineering',
    skills: ['React', 'Node.js', 'MongoDB'],
    performanceScore: 92,
    experience: 5
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    department: 'Marketing',
    skills: ['SEO', 'Content Strategy', 'Analytics'],
    performanceScore: 78,
    experience: 3
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    department: 'Engineering',
    skills: ['Python', 'Django', 'PostgreSQL'],
    performanceScore: 85,
    experience: 4
  },
  {
    name: 'Diana Prince',
    email: 'diana@example.com',
    department: 'HR',
    skills: ['Recruitment', 'Conflict Resolution', 'Onboarding'],
    performanceScore: 95,
    experience: 8
  },
  {
    name: 'Evan Wright',
    email: 'evan@example.com',
    department: 'Sales',
    skills: ['B2B Sales', 'Negotiation', 'CRM'],
    performanceScore: 65,
    experience: 2
  }
];

const importData = async () => {
  try {
    await Employee.deleteMany();
    // Keep users intact or clear them as well if needed
    // await User.deleteMany();

    await Employee.insertMany(employees);

    console.log('Dummy Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Employee.deleteMany();
    // await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
