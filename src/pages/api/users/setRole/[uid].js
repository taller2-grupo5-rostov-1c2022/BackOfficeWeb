import { getAuth } from "firebase-admin/auth";
import isAdmin from "../../../../server/isAdmin";

const handler = async (req, res) => {
  const { uid } = req.query;
  const { role } = req.body;

  if (!(await isAdmin(req, res)))
    return res.status(403).json({ error: "Unauthorized" });

  try {
    await getAuth().setCustomUserClaims(uid, { role });
    return res.status(200).json({ message: "Success", uid, role });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Fetching Error" });
  }
};

export default handler;
