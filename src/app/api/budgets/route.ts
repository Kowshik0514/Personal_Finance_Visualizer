import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/models/Budget';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');

    if (!month) {
      return NextResponse.json(
        { error: 'Month parameter is required' },
        { status: 400 }
      );
    }

    const budgets = await Budget.find({ month }).populate('category');
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { category, amount, month } = body;

    if (!category || !amount || !month) {
      return NextResponse.json(
        { error: 'Category, amount, and month are required' },
        { status: 400 }
      );
    }

    const existingBudget = await Budget.findOne({ category, month });
    if (existingBudget) {
      existingBudget.amount = amount;
      await existingBudget.save();
      return NextResponse.json(existingBudget);
    }

    const budget = await Budget.create({ category, amount, month });
    return NextResponse.json(budget);
  } catch (error) {
    console.error('Failed to create/update budget:', error);
    return NextResponse.json(
      { error: 'Failed to create/update budget' },
      { status: 500 }
    );
  }
} 