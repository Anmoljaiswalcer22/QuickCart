// This file defines the User model for MongoDB using Mongoose.
// It includes fields for user ID, name, email, password, image URL, and cart items.
// The schema is designed to prevent duplicate emails and allows for an empty cart.
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // good practice to prevent duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // should be a String to store image URLs, not Boolean
    default: "",
  },
  cartItems: {
    type: Object,
    default: {},
    }
},{minimize: false} // to prevent mongoose from removing empty objects
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;