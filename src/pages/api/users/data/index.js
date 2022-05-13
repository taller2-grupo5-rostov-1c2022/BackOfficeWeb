const handler = async (req, res) => {
  return res.status(200).json({ user: {}, message: "This route is not" });
};

export default handler;
