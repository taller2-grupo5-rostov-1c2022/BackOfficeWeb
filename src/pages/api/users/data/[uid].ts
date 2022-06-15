import { getAuth } from "firebase-admin/auth";
import isAdmin from "../../../../server/isAdmin";

const handler = async (req: any, res: any) => {
  const { uid } = req.query;

  if (!(await isAdmin(req, res)))
    return res.status(403).json({ error: "Unauthorized" });

  try {
    const user = await getAuth().getUser(uid);
    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Fetching Error" });
  }
};

export default handler;
