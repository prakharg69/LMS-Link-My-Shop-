import User from "../models/User.model.js";

export const getUser = async (req, res) => {
  try {
    console.log("entered into api ");
    
    const userId = req.userId; 

    const user = await User.findById(userId).select(
      "username email profileImage role isOnboarded isActive lastLoginAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
