import * as dotenv from 'dotenv';
dotenv.config();

import connectDB from '../lib/mongodb';
import Category from '../models/Category';

const categories = [
  { name: 'Food & Dining', color: '#FF6384' },
  { name: 'Transportation', color: '#36A2EB' },
  { name: 'Shopping', color: '#FFCE56' },
  { name: 'Entertainment', color: '#4BC0C0' },
  { name: 'Bills & Utilities', color: '#9966FF' },
  { name: 'Healthcare', color: '#FF9F40' },
  { name: 'Education', color: '#FF6384' },
  { name: 'Travel', color: '#36A2EB' },
  { name: 'Personal Care', color: '#FFCE56' },
  { name: 'Other', color: '#4BC0C0' },
];

async function seedCategories() {
  try {
    await connectDB();
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('Categories seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories(); 