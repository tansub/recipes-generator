import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }], 
    instructions: [{ type: String, required: true }], 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
