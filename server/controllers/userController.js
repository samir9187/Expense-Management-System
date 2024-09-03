const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
// Login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid Credentials");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// Register callback
const registerController = async (req, res) => {
  try {
    const { password, ...otherDetails } = req.body;

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      ...otherDetails,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
