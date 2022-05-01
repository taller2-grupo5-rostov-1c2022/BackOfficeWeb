import type { NextPage } from "next";
import FormField from "../components/util/FormField/FormField";
import { Formik, Form } from "formik";
import styles from "../styles/Login.module.css";
import { signInWithEmail, signInWithGoogle } from "../config/auth";
import { useRouter } from "next/router";

type loginData = {
  user_name: string;
  user_password: string;
};

const Login: NextPage = () => {
  const router = useRouter();

  const initialValues: loginData = {
    user_name: "",
    user_password: "",
  };

  const validate = (values: loginData) => {
    const errors: any = {};
    if (!values.user_name) errors.user_name = "Required";
    if (!values.user_password) errors.user_password = "Required";
    return errors;
  };

  const onSubmit = (values: loginData) => {
    signInWithEmail(values.user_name, values.user_password)
      .then((user) => {
        console.log("user", user);
        router.push("/");
      })
      .catch((error) => {
        console.error("error singing with email", error);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((user) => {
        console.log("user", user);
        router.push("/");
      })
      .catch((error) => {
        console.error("error singing with google", error);
      });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form>
          <FormField label="User Name" name="user_name" />
          <FormField label="Password" type="password" name="user_password" />
          <div className={styles.FormActions}>
            <button type="submit">Login</button>
            <button
              type="button"
              className={styles.google}
              onClick={handleGoogleLogin}
            >
              Google
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
