# Personal Finance Visualizer

A web application for tracking personal finances built with Next.js, React, and MongoDB.

## Features

- Add, view, and delete transactions
- Monthly expenses visualization
- Responsive design
- Real-time updates

## Prerequisites

- Node.js 18+ and npm
- MongoDB installed and running locally

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/expense_tracker
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Add a new transaction by filling out the form with:
   - Amount
   - Description
   - Date
2. View your transactions in the table below
3. Delete transactions by clicking the delete button
4. View monthly expenses in the bar chart

## Tech Stack

- Next.js 14
- React
- MongoDB
- Recharts
- Tailwind CSS
