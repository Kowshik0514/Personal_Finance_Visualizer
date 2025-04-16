import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
  },
  color: {
    type: String,
    required: [true, 'Category color is required'],
  },
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema); 