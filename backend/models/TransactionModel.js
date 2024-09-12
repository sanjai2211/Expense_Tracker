const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    details: { type: String, required: true },
    transType: { type: String, enum: ['income', 'expense'], required: true },
    date: { type: Date, default: Date.now },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = TransactionModel;