import { getAuth } from "firebase-admin/auth";

const handler = async (req, res) => {
  const { uid } = req.query;

  try {
    const user = await getAuth().getUser(uid);
    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Fetching Error" });
  }
};

export default handler;
