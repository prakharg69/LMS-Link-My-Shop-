import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    // ==================================================
    // 1️⃣ OWNERSHIP & ACCESS
    // ==================================================
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ==================================================
    // 2️⃣ t (SYSTEM LEVEL)
    // ==================================================

    shopCode: {
      type: String,
      unique: true,
      index: true,
      // e.g. SHOP-1023
    },

    shopName: {
      type: String,
    },

    shopType: {
      type: String, // kirana, medical, hardware, mobile, stationery
    },

    businessCategory: {
      type: String, // retail, wholesale, both
    },

    // ==================================================
    // 3️⃣ CONTACT (SYSTEM USE)
    // ==================================================
    primaryPhone: {
      type: String,
    },

    primaryWhatsapp: {
      type: String,
    },

    businessEmail: {
      type: String,
    },

    // ==================================================
    // 4️⃣ LOCATION (ANALYTICS + DISPLAY)
    // ==================================================
    location: {
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },

    // ==================================================
    // 5️⃣ ONLINE PRESENCE CONFIG
    // ==================================================
    hasWebsite: {
      type: Boolean,
      default: false,
    },

    websiteUrl: {
      type: String,
    },

    digitalPageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DigitalShopPage",
    },

    // ==================================================
    // 6️⃣ BUSINESS STATUS & ONBOARDING
    // ==================================================
    status: {
      type: String,
      enum: ["draft", "active", "suspended"],
      default: "draft",
    },

    // ✅ Controls setup completion
    isOnboarded: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // ==================================================
    // 7️⃣ ANALYTICS REFERENCES (LIGHTWEIGHT)
    // ==================================================
    stats: {
      totalLinks: {
        type: Number,
        default: 0,
      },
      totalClicks: {
        type: Number,
        default: 0,
      },
      lastActivityAt: Date,
    },
    otp: {
      code: {
        type: String,
      },
      expiresAt: {
        type: Date,
      },
      purpose: {
        type: String,
        enum: ["verify-phone", "verify-email", "verify-shop"],
      },
      attempts: {
        type: Number,
        default: 0,
      },
      lastSentAt: {
        type: Date,
      },
    },
  },

  { timestamps: true }
);

export default mongoose.model("Shop", shopSchema);
