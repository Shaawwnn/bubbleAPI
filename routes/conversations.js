import { Router } from "express";
import Conversation from "../models/Conversation.js";

const router = Router();
//new conv

router.post("/", async (req, res) => {
  const newConvo = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConvo = await newConvo.save();
    res.status(201).json(savedConvo);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get conv

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get existing conv

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const convo = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(convo);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
