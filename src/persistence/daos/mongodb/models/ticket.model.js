import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
  code: { type: String, require: true, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, require: true },
  purchaser: { type: String, require: true },
});

export const ticketModel = mongoose.model("tickets", ticketsSchema);
