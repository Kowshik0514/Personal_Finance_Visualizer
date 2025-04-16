import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Budget || mongoose.model('Budget', budgetSchema); 