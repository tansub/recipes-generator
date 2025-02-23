import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.status(402).json({
        message: "Username already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    await newUser.save();

    res.json({
      newUser,
      message: "Registration was succesful",
    });
  } catch (error) {
    res.json({
      message: "Error while creating user",
    });
  }
};
// login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "This username does not exist",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
        token, user, message: 'Logged in succesfully'
    })
  } catch (error) {
    res.json({ message: "Error during authentication" });
  }
};
// get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
        return res.json({
          message: "This username does not exist",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.json({user, token})
  } catch (error) {
    res.json({
        message: "Access restricted"
    })
  }
};
