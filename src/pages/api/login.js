import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../server/initAuth";
import { getAuth } from "firebase-admin/auth";

initAuth();

const isAdmin = (user) => {
  return user?.role === "admin";
};

const handler = async (req, res) => {
  try {
    // FIXME: this allows the first login to go unchecked
    // this happens as firebase-admin is not initialized until the first call to setAuthCookies
    // an issue has been opened: https://github.com/gladly-team/next-firebase-auth/issues/470
    try {
      getAuth();
    } catch (e) {
      console.error("Firebase auth not initialized");
      await setAuthCookies(req, res);
      return res.status(200).json({ success: true });
    }

    const token = req?.headers?.authorization;
    if (!token) return res.status(403).json({ error: "Unauthorized" });
    const user = await getAuth().verifyIdToken(token);

    if (!isAdmin(user)) return res.status(403).json({ error: "Unauthorized" });

    await setAuthCookies(req, res);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error.", e });
  }
};

export default handler;
