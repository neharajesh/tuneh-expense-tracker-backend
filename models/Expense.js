import mongoose from "mongoose";
const { Schema } = mongoose;

const expenseSchema = new Schema({
  householdId: { type: String, required: true },
  userId: { type: String, required: true },
  amount: {
    type: Number,
    set: (value) => Math.round(value * 100) / 100,
    required: true,
  },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
