import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      res
        .status(200)
        .json({ message: "Tên đăng nhập đã tồn tại", status: 404 });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      const arrayImg = [
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(1).jpg?alt=media&token=abc4f33f-14b0-4e3b-937b-5042828ec840",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(2).jpg?alt=media&token=09520736-2518-42c3-a174-7f3043fd7317",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(3).jpg?alt=media&token=d4223a62-732f-47e9-a805-dcb34f10cb7d",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(4).jpg?alt=media&token=6f840f71-b478-4acd-bada-e1025d789f3d",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(5).jpg?alt=media&token=1a202d38-e158-4573-8ff1-0bea731b9cb7",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(6).jpg?alt=media&token=098625b1-8ce7-4ce6-a50c-4dea8f14ca31",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(7).jpg?alt=media&token=192395e5-84bd-410e-9ee6-71fc64480e7b",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(8).jpg?alt=media&token=4bdd4f3a-15e3-45af-8eae-2bc5bf09eb78",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images.jpg?alt=media&token=4ed87797-3006-47e7-821e-71d26a9233da",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng%20(1).jpg?alt=media&token=b736cd23-0984-4167-88c3-f50b0862be44",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng%20(2).jpg?alt=media&token=42ac4a94-0802-4c7c-9c49-1592c4792be1",
        "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng.jpg?alt=media&token=600dafef-eb6d-41f8-b297-aef3cfe4ac8f",
      ];
      if (!req.body.img) {
        newUser.img = arrayImg[Math.round(Math.random() * arrayImg.length)];
      }
      await newUser.save();
      res
        .status(200)
        .json({ message: "Tạo tài khoản thành công", status: 200 });
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.json({ status: 201, message: "Tên đăng nhập không tồn tại" });
    } else {
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) {
        res.json({ status: 202, message: "Mật khẩu không đúng" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ ...others, status: 200 });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
