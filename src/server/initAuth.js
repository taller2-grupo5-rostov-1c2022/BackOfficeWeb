import { init } from "next-firebase-auth";
import { logOut } from "../client/auth";
import { toast } from "react-toastify";

const initAuth = () => {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  init({
    authPageURL: "/auth",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    onLoginRequestError: (err) => {
      logOut();
      toast.error("User is not an admin", {
        toastId: "User is not an admin",
      });
    },
    onLogoutRequestError: (err) => {
      console.error(err);
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: "rostov-spotifiuby",
        clientEmail:
          "firebase-adminsdk-1ec7p@rostov-spotifiuby.iam.gserviceaccount.com",
        // The private key must not be accessible on the client side.
        privateKey,
      },
    },
    firebaseClientInitConfig: {
      apiKey: "AIzaSyDUcNPOx5UlHclHE27kfnu58EBFYw8HPj0", // required
      authDomain: "rostov-spotifiuby.firebaseapp.com",
      projectId: "rostov-spotifiuby",
    },
    cookies: {
      name: "ExampleApp", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  });
};

export default initAuth;
