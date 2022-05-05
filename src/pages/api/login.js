import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../server/initAuth";
import { getAuth } from "firebase-admin/auth";

initAuth();

const adminMails = ["user@gmaisl.com", "fdeluca@fi.uba.ar"];

const isAdmin = (email) => {
  return adminMails.includes(email);
};

const handler = async (req, res) => {
  try {
    const token = req?.headers?.authorization;
    if (!token) return res.status(403).json({ error: "Unauthorized" });
    const user = await getAuth().verifyIdToken(token);

    if (!isAdmin(user.email))
      return res.status(403).json({ error: "Unauthorized" });

    await setAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ success: true });
};

export default handler;
