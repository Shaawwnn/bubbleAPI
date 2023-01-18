import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = Router();

//register user
router.post("/register", async (req, res) => {
  try {
    //generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      displayPhoto: req.body.displayPhoto,
      coverPhoto: req.body.coverPhoto,
      followers: req.body.followers,
      following: req.body.following,
      isAdmin: req.body.isAdmin,
    });

    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.log("Caught an error:", error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !isPasswordValid && res.status(400).json("Wrong password");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

export default router;
