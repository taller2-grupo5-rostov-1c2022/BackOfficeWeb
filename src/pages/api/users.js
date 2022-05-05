import { getAuth } from "firebase-admin/auth";

const handler = async (req, res) => {
  try {
    const users = await getAuth().listUsers();
    return res.status(200).json({ users });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Fetching Error" });
  }
};

export default handler;
