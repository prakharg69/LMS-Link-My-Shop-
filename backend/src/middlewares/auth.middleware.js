import jwt from "jsonwebtoken";

export const Protected = (req, res, next) => {
  try {
  
    const token = req.cookies?.token;
    console.log(token);
    

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first"
      });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
  

    
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
