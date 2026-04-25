const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },

    discount: {
      type: Number,
      required: [true, "Discount is required"],
      min: [0, "Minimum 0"],
      max: [100, "Maximum 100%"]
    },
    // TODO (Task 2): Add the Discount Percentage field here
    // discountPercentage: { ... }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
