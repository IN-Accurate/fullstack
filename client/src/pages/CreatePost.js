import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {useNavigate} from 'react-router-dom';


function CreatePost() {
  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
    navigate("/");
  });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">

          <label htmlFor="inputTitle">Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputTitle"
            name="title"
            placeholder="Title Here"
          />
          <label htmlFor ="inputPostText">Post</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="inputPostText"
            name="postText"
            placeholder="Post Text Here"
          />
          <label htmlFor="inputUser">Username </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputUser"
            name="username"
            placeholder="Username Here"
          />

          <button type="submit"> Create Post</button>
          
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;