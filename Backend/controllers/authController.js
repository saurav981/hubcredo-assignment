const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("./../models/userModel");

const generateTokenAndSetCookie = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    // Render.com deployment settings
    secure: true,
    sameSite: isProduction ? "None" : "Strict",
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000, // 10 days
  });

  user.password = undefined;

  res.status(statusCode).json({ success: true, user });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists, use different email",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    // trigger n8n webhook
    try {
      await fetch(process.env.N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          userId: newUser._id.toString(),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (webhookError) {
      console.error("n8n webhook failed:", webhookError);
    }

    // Generate token, set cookie, and send response
    generateTokenAndSetCookie(newUser, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, no token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "User belonging to token does not exist",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    error;
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

exports.checkAuth = (req, res) => {
  try {
    const { user } = req;

    res.status(200).json({
      success: true,
      message: "User is logged in",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both email & password",
      });
    }

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    generateTokenAndSetCookie(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");

  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};
