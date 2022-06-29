import { getAuth } from "firebase-admin/auth";
import isAdmin from "../../../server/isAdmin";

const handler = async (req: any, res: any) => {
  if (!(await isAdmin(req, res)))
    return res.status(403).json({ error: "Unauthorized" });

  try {
    const users = await getAuth().listUsers();
    return res.status(200).json({ users: users.users });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Fetching Error" });
  }
};

export default handler;
