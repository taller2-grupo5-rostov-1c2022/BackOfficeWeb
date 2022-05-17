export const firebaseErrors: { [name: string]: string } = {
  "auth/user-not-found": "Invalid email or password",
  "auth/email-already-in-use": "The email is already in use",
  "auth/wrong-password": "Invalid email or password",
  "auth/user-disabled": "The user account has been disabled",
  "auth/weak-password": "The password is too weak",
  "auth/invalid-email": "The email is invalid",
  "auth/popup-closed-by-user": "",
  "auth/requires-recent-login":
    "Session expired. Please log in again\nto change your email or password",
};
