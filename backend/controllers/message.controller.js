import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; //input
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    //if convo does not exist create new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await conversation.save();
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Send message controller:", error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatWithId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatWithId] },
    }).populate("messages");

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Get messages controller:", error.message);
    res.status(500).json("Internal Server Error");
  }
};
