import mongoose from "mongoose";

const digitalShopPageSchema = new mongoose.Schema(
  {
    // =====================================
    // 1️⃣ LINK TO SHOP (1:1)
    // =====================================
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      unique: true,
    },

    // =====================================
    // 2️⃣ BASIC DISPLAY INFO
    // =====================================
    title: {
      type: String, // Shop Name
      required: true,
    },

    tagline: {
      type: String, // short line under title
    },

    description: {
      type: String, // about shop
    },

    logo: String,
    bannerImage: String,

    // =====================================
    // 3️⃣ CONTACT DETAILS
    // =====================================
    contact: {
      phone: String,
      whatsapp: String,
      email: String,
    },

    address: {
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
      googleMapLink: String,
    },

    // =====================================
    // 4️⃣ SHOP TIMINGS (IMPORTANT)
    // =====================================
    timings: {
      isOpen24x7: {
        type: Boolean,
        default: false,
      },

      weekly: [
        {
          day: {
            type: String,
            enum: [
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ],
          },
          openTime: String,   // "09:00"
          closeTime: String,  // "21:00"
          isClosed: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },

    // =====================================
    // 5️⃣ BUSINESS DETAILS
    // =====================================
    services: [
      {
        type: String, // e.g. Mobile Repair, Home Delivery
      },
    ],

    facilities: [
      {
        type: String, // Parking, AC, Wheelchair Access
      },
    ],

    paymentMethods: [
      {
        type: String, // Cash, UPI, Card
      },
    ],

    deliveryAvailable: {
      type: Boolean,
      default: false,
    },

    homeServiceAvailable: {
      type: Boolean,
      default: false,
    },

    // =====================================
    // 6️⃣ SOCIAL & ONLINE LINKS
    // =====================================
    socialLinks: {
      instagram: String,
      facebook: String,
      website: String,
    },

    // =====================================
    // 7️⃣ DIGITAL PREFERENCES (LOOK & FEEL)
    // =====================================
    theme: {
      type: String,
      default: "default",
      enum:["modern","clasic","minimal"]
    },

    primaryColor: {
      type: String,
      default: "#000000",
    },

    fontFamily: {
      type: String,
      default: "Inter",
    },

    layout: {
      type: String,
      enum: ["simple", "image-first", "text-first"],
      default: "simple",
    },

    // =====================================
    // 8️⃣ PAGE STATUS & VISIBILITY
    // =====================================
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    // =====================================
    // 9️⃣ BASIC ANALYTICS
    // =====================================
    
  },
  { timestamps: true }
);

export default mongoose.model("DigitalShopPage", digitalShopPageSchema);
