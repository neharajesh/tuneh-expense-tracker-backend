import express from "express";
const router = express.Router();

const { Expense } = require("../models/expenseModel");

router
  .route("/expenses")
  .get(async (req, res) => {
    try {
      const expenses = await Expense.find({ isDeleted: false });
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    const { householdId, userId, amount, category, date, description } =
      req.body;
    const expense = new Expense({
      householdId,
      userId,
      amount,
      category,
      date,
      description,
    });
    try {
      const savedExpense = await expense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .put(async (req, res) => {
    const { id, householdId, userId, amount, category, date, description } =
      req.body;
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        { householdId, userId, amount, category, date, description },
        { new: true }
      );
      res.status(200).json(updatedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.body;
    try {
      const deletedExpense = await Expense.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
      res.status(200).json(deletedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
