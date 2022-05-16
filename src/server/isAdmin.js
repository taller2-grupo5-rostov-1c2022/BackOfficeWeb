import { getAuth } from "firebase-admin/auth";

const isAdmin = async (req, res) => {
  const authorization = req?.headers?.authorization ?? "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.split(" ")[1]
    : authorization;

  if (!token) return false;
  const user = await getAuth().verifyIdToken(token);
  return user?.role === "admin";
};

export default isAdmin;
