import { getFirestore } from "firebase-admin/firestore";
import isAdmin from "../../../server/isAdmin";

const handler = async (req: any, res: any) => {
  if (!(await isAdmin(req, res)))
    return res.status(403).json({ error: "Unauthorized" });

  try {
    const firestore = getFirestore();
    const userMetrics = await firestore
      .collection("metrics")
      .doc("users")
      .get();
    const userMetricsData = userMetrics.data() ?? {};

    return res.status(200).json(userMetricsData);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Fetching Error" });
  }
};

export default handler;
