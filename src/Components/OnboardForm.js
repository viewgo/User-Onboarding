import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Users from "./Users";

function OnboardForm({ values, errors, touched, status }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    status && setUser(user => [...user, status]);
  }, [status]);

  return (
    <>
      <h2>Register</h2>
      <Form>
        <div className="form-inputs">
          {touched.name && errors.name && <span>{errors.name}</span>}
          <Field type="text" name="name" placeholder="Name" />
          {touched.email && errors.email && <span>{errors.email}</span>}
          <Field type="text" name="email" placeholder="Email Address" />
          {touched.password && errors.password && <span>{errors.password}</span>}
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <label>
          {touched.tos && errors.tos && <span>{errors.tos}</span>}
          <Field type="checkbox" name="tos" checked={values.tos} />
          Accept TOS
        </label>
        <button type="submit">Submit!</button>
      </Form>

{/* CHECK TO SEE IF USERS EXIST BEFORE PUTTING AN H2 */}
        {user && user.length ? <h2>Users</h2> : <></>}
      <div className="users-list">
        
        {user.map((element, index) => (
          <Users key={index} user={element} />
        ))}
      </div>
    </>
  );
}

const FormikOnboardForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || true
    };
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be 2 characters or longer")
      .required("Name is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required"),
    tos: Yup.bool().oneOf([true], "Field must be checked")
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, { setStatus }) {
    console.log("Submit button hit. Submitting values: ", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        console.log("Response data after post", response.data);
        setStatus(response.data);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }
})(OnboardForm);

export default FormikOnboardForm;
