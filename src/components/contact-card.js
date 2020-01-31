import React, { useContext } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import axios from "axios";
import { ContactContext } from "../context/contact-context";
import { flashErrorMessage } from "./flash-message";

export default function ContactCard({contact}) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(ContactContext);

  const deleteContact = async id => {
    try {
      const response = await axios.delete(`http://localhost:3030/contacts/${id}`);
      dispatch({
        type: "DELETE_CONTACT",
        payload: response.data
      });
    } catch (error) {
      flashErrorMessage(dispatch, error)
    }
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name='user outline'/> {contact.name.first} {contact.name.last}
        </Card.Header>
        <Card.Description>
          <p><Icon name='phone'/> {contact.phone}</p>
          <p><Icon name='mail outline'/> {contact.email}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" as={Link} to={`/contacts/edit/${contact._id}`}>
            Edit
          </Button>
          <Button basic color="red" onClick={() => deleteContact(contact._id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}
