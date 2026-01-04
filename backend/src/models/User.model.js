import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // =========================
    // AUTHENTICATION
    // =========================
    googleId: {
      type: String,
      default: null
    },

    password: {
      type: String,
      default: null 
    },

   authProvider: {
      type: String,
      enum: ["google", "local"],
      default: "google"
    },

    passwordSet: {
      type: Boolean,
      default: false
    },

    // =========================
    // IDENTITY
    // =========================
    username: {
        type:String,
        
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    profileImage: String,

    emailVerified: {
      type: Boolean,
      default: true
    },

    // =========================
    // ROLE & STATUS
    // =========================
    role: {
      type: String,
      enum: ["owner"],
      default: "owner"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    // =========================
    // ONBOARDING & META
    // =========================
    isOnboarded: {
      type: Boolean,
      default: false
    },

    lastLoginAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
