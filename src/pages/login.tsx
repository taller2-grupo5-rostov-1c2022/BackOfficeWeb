import type { NextPage } from "next";
import FormField from "../components/util/FormField/FormField";
import { Formik, Form } from "formik";
import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
  const initialValues = {
    user_name: "",
    user_password: "",
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.user_name) errors.user_name = "Required";
    if (!values.user_password) errors.user_password = "Required";
    return errors;
  };

  const onSubmit = (values: any) => {
    console.log(values);
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
            <button type="button" className={styles.google}>
              Google
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
