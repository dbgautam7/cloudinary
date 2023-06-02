import React, { useRef } from "react";
import emailjs from "emailjs-com";

const Email = () => {
  const emailRef = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    const { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID } =
      process.env;

    emailjs
      .sendForm(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        emailRef.current,
        REACT_APP_USER_ID
      )
      .then(
        (result) => console.log(result.text),
        (error) => console.log(error.text)
      );
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "100px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form ref={emailRef} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="text" name="user_email" />
        <textarea name="message" />
        <input type="submit" name="Send" />
      </form>
    </div>
  );
};

export default Email;
