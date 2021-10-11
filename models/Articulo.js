import mongoose from "mongoose";
import { ER_TEXTO, ER_TITLE } from "../constants";

const ArticuloSchema = new mongoose.Schema({
  title: { type: String, required: [true, ER_TITLE] },
  texto: { type: String, required: [true, ER_TEXTO] },
  date: { type: Date, default: Date.now },
  author: { type: String, required: false },
});

export default mongoose.models.Articulo || mongoose.model("Articulo", ArticuloSchema);
