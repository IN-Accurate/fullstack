import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from 'react-router-dom';


function Registration() {


  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(8).max(20).required()
  });


  const onSubmit = (data) =>{

    axios.post("http://localhost:3001/auth", data).then((response) => {
        navigate("/");
        console.log('Registered Successfully!');
    });

  };

  return (
    <div>
          <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">

          
          <label htmlFor="inputUser">Username </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Username Here"
          />

         <label htmlFor="password">Password </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="password"
            type="password" 
            placeholder="Password Here"
          />

          <button type="submit">Register</button>
          
        </Form>
      </Formik>
    </div>
  )
}

export default Registration