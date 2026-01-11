import { generateShopCode } from "../utils/generateShopCode.js";
import Shop from "../models/Store.model.js";
import { genrateOtp } from "../utils/genrateOtp.js";
import { mailTransporter } from "../config/mail.js";
export const storeCreated = async (req, res) => {
  try {
    const { data } = req.body;
    const ownerId = req.userId;

    if (!data || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "Store data is missing",
      });
    }

    let shopCode;
    let exists = true;

    while (exists) {
      shopCode = generateShopCode();
      exists = await Shop.exists({ shopCode });
    }

    const {
      shopName,
      shopType,
      businessCategory,
      primaryPhone,
      primaryWhatsapp,
      businessEmail,
      hasWebsite,
      websiteUrl,
      addressLine,
      city,
      state,
      pincode,
    } = data;
    const location = {
      addressLine,
      city,
      state,
      pincode,
    };

    const store = await Shop.create({
      shopName,
      shopType,
      businessCategory,
      primaryPhone,
      primaryWhatsapp,
      businessEmail,
      location,
      hasWebsite,
      websiteUrl,
      shopCode,
      ownerId,
    });

    return res.status(201).json({
      success: true,
      message: "Store created successfully",
      store,
    });
  } catch (error) {
    console.error("Store creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyStore = async (req, res) => {
  console.log("api working");

  try {
    const ownerId = req.userId;

    const stores = await Shop.find({ ownerId });

    if (stores.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No store is registered",
      });
    }

    return res.status(200).json({
      success: true,
      stores,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getMyShopById = async (req, res) => {
  try {

    const { shopId } = req.query;
    console.log(shopId);

    if (!shopId) {
      return res.status(400).json({ message: "shopId is required" });
    }
    const store = await Shop.findById(shopId).select("-otp ");
    if (!store) {
      return res.status(404).json({ message: "shop not found " });
    }
    return res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

export const verifyStoreEmail = async (req, res) => {
  try {
    const { shopId } = req.query;

    if (!shopId) {
      return res.status(400).json({ message: "shopId not provided" });
    }

    // 1️⃣ Find store
    const store = await Shop.findById(shopId);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // 2️⃣ Generate OTP
    const otp = genrateOtp(); // make sure function exists

    // 3️⃣ Send email
    
    
    await mailTransporter.sendMail({
      from: process.env.BREVO_SMTP_USER,
      to: store.businessEmail,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is <b>${otp}</b></p>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    // 4️⃣ Save OTP in DB
    store.otp = {
      code: otp,
      purpose: "verify-email",
      attempts: (store.otp?.attempts || 0) + 1,
      lastSentAt: new Date(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
    };

    await store.save();

    // 5️⃣ Success response
    return res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("verifyStoreEmail error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const verifyStoreOtp = async (req, res) => {
  try {
    const { shopId, otp } = req.body;
    console.log("agyaaa ismeeeee bhi ");
    console.log(shopId,otp);
    
    
    // 1️⃣ Validate input
    if (!shopId || !otp) {
      return res.status(400).json({
        message: "shopId and otp are required",
      });
    }

    // 2️⃣ Find shop
    const store = await Shop.findById(shopId);

    if (!store || !store.otp) {
      return res.status(404).json({
        message: "OTP not found or already verified",
      });
    }

    // 3️⃣ Check OTP purpose
    if (store.otp.purpose !== "verify-email") {
      return res.status(400).json({
        message: "Invalid OTP purpose",
      });
    }

    // 4️⃣ Check expiry
    if (store.otp.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // 5️⃣ Match OTP
    if (store.otp.code !== otp) {
      store.otp.attempts += 1;
      await store.save();

      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // 6️⃣ Mark store as verified
    store.isVerified = true;

    // 7️⃣ Clear OTP
    store.otp = undefined;

    await store.save();

    // 8️⃣ Success
    return res.status(200).json({
      message: "Store email verified successfully",
    });

  } catch (error) {
    console.error("verifyStoreOtp error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const UpdateStore = async (req,res)=>{

      try {
          const {id}= req.params;

        const forbiddeFields =[
            "_id",
            "__v",
            "createdAt",
            "updatedAt",
            "ownerId",
            "stats.totalClicks",
            "stats.totalLinks",
            "isVerified",
            "shopCode",
            "status"
          ] 

          forbiddeFields.forEach(field => delete req.body[field]);
          const updateStore = await Shop.findByIdAndUpdate(id,{
            $set: req.body
          },{
            new:true,
            runValidators:true
          })
          console.log(updateStore);
          

          res.status(200).json({message:"shop updated sucessfull",updateStore});
      } catch (error) {
        res.status(500).json({message:"server error", error});
      }
} 