import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js"; 

export const registerUser = async (req, res) => {
  const { name, password, role } = req.body;

  try {
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      password,
      role: role || "user",
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: "Username not Found" });
    }

    if (user && (await user.matchPassword(password))) {
     res.json({
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });
    } else {
      res.status(401).json({ message: "Password is incorrect" });
    }
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
