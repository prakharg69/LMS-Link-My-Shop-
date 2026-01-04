import { generateShopCode } from "../utils/generateShopCode.js";
import Shop from "../models/Store.model.js"
export const storeCreated = async (req, res) => {
  try {
    const { data } = req.body;
    const ownerId = req.userId;

    if (!data || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "Store data is missing"
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
      location,
      hasWebsite,
      websiteUrl
    } = data;

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
      ownerId
    });

    return res.status(201).json({
      success: true,
      message: "Store created successfully",
      store
    });

  } catch (error) {
    console.error("Store creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
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
        message: "No store is registered"
      });
    }

    return res.status(200).json({
      success: true,
      stores
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
