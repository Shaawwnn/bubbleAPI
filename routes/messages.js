import { Router } from "express";
import Message from "../models/Message.js";

const router = Router();

//add

router.post("/", async (req, res) => {
  const newMsg = new Message(req.body);

  try {
    const savedMsg = await newMsg.save();
    res.status(201).json(savedMsg);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const allMsgs = await Message.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(allMsgs);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
