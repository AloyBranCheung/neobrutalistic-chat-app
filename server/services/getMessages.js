import Message from "../model/Message.js";

const getMessages = async (room) => {
  try {
    const messages = await Message.find({ room: room })
      .sort({ __createdtime__: "asc" })
      .limit(100);
    return messages;
  } catch (error) {
    console.log(error);
  }
};

export default getMessages;
