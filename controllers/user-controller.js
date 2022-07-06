const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    // getting the value of name, username and password
    const { name, username, password } = req.body;

    // checking username is present on the database or not
    let user = await User.findOne({ username });

    // checking if username is present on database
    if (user) {
      return res.status(400).json({
        success: false,
        messge: "username already exists",
      });
    }

    //  creating the user
    user = await User.create({ name, username, password });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Getting the value of username and password
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // Checking password is correct or not
    const isMatch = await user.matchPassword(password);

    // if password is not correct
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username and password",
      });
    }

    res.status(200).json({
      success: [true, "Login successful"],
      user,
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      message: error.message,
    });
  }
};
