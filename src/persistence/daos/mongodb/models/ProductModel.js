import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, require: false },
  code: { type: String, required: true},
  stock: { type: Number, required: true },
  status: { type: Boolean, required: true },
  category: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true, default: "admin" }
});

productsSchema.plugin (mongoosePaginate);

export const ProductsModel = mongoose.model("products", productsSchema);
