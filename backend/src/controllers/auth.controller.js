import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signUpByGoogle = async (req, res) => {
  console.log("Entered Google signup API");

  try {
    const { idToken, role } = req.body;

    // ✅ SAFETY CHECK
    if (!idToken) {
      return res.status(400).json({
        message: "ID token is required"
      });
    }

    // ✅ VERIFY GOOGLE ID TOKEN
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const {
      sub: googleId,
      email,
      name,
      picture,
      email_verified
    } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId,
        email,
        username: name,
        profileImage: picture,
        emailVerified: email_verified,
        role,
        authProvider: "google",
        lastLoginAt: new Date()
      });
    } else {
      user.lastLoginAt = new Date();
      await user.save();
    }

   
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        isOnboarded: user.isOnboarded
      }
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({
      message: "Google authentication failed"
    });
  }
};

