import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../server/initAuth";
import { getAuth } from "firebase-admin/auth";

initAuth();

const isAdmin = (user) => {
  return user?.role === "admin";
};

const handler = async (req, res) => {
  try {
    const token = req?.headers?.authorization;
    if (!token) return res.status(403).json({ error: "Unauthorized" });
    const user = await getAuth().verifyIdToken(token);

    if (!isAdmin(user)) return res.status(403).json({ error: "Unauthorized" });

    await setAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error.", e });
  }
  return res.status(200).json({ success: true });
};

export default handler;
