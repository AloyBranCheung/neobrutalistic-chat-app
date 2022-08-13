import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  __createdtime__: {
    type: String,
    required: true,
  },

  room: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Message", MessageSchema);
