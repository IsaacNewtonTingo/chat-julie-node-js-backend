exports.createChat = async (req, res) => {
  try {
    const { chatName, chatID } = req.body;
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while",
    });
  }
};
