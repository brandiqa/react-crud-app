import React, { useContext, useState } from "react";
import { Form, Grid, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import axios from "axios";
import { Redirect } from "react-router";
import { ContactContext } from "../context/contact-context";
import FlashMessage from "./flash-message";

export default function ContactForm() {
  const [state, dispatch] = useContext(ContactContext);
  const { register, errors, handleSubmit } = useForm();
  const [redirect, setRedirect] = useState(false)

  const flashErrorMessage = error => {
    const err = error.response ? error.response.data : error;
    dispatch({
      type: "FLASH_MESSAGE",
      payload: {
        type: "fail",
        title: err.name,
        content: err.message
      }
    });
  }

  const createContact = async contact => {
    try {
      const response = await axios.post("http://localhost:3030/contacts", contact);
      dispatch({
        type: "CREATE_CONTACT",
        payload: response.data
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(error)
    }
  };

  const onSubmit = async contact => {
    await createContact(contact);
  };

  if (redirect) {
    return <Redirect to='/' />;
  }

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <h1 style={{ marginTop: "1em" }}>Add New Contact</h1>
        {state.message.content && <FlashMessage message={state.message} />}
        <Form onSubmit={handleSubmit(onSubmit)} loading={state.loading}>
          <Form.Group widths="equal">
            <Form.Field className={classnames({ error: errors.name })}>
              <label>First Name</label>
              <input
                name="name.first"
                type="text"
                placeholder="First Name"
                ref={register({ required: true, minLength: 2 })}
              />
              <span className="error">
                {errors.name &&
                  errors.name.first.type === "required" &&
                  "You need to provide First Name"}
              </span>
              <span className="error">
                {errors.name &&
                  errors.name.first.type === "minLength" &&
                  "Must be 2 or more characters"}
              </span>
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                name="name.last"
                type="text"
                placeholder="Last Name"
                ref={register}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field className={classnames({ error: errors.phone })}>
            <label>Phone</label>
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              ref={register({
                required: true,
                pattern: /^\+(?:[0-9] ?){6,14}[0-9]$/
              })}
            />
            <span className="error">
              {errors.phone &&
                errors.phone.type === "required" &&
                "You need to provide a Phone number"}
            </span>
            <span className="error">
              {errors.phone &&
                errors.phone.type === "pattern" &&
                "Phone number must be in International format"}
            </span>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.email })}>
            <label>Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              ref={register({
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
              })}
            />
            <span className="error">
              {errors.email &&
                errors.email.type === "required" &&
                "You need to provide an Email address"}
            </span>
            <span className="error">
              {errors.email &&
                errors.email.type === "pattern" &&
                "Invalid email address"}
            </span>
          </Form.Field>
          <Button primary type="submit">
            Save
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
