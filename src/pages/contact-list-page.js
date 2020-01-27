import React, { useContext, useEffect } from 'react';
import ContactList from '../components/contact-list';
import { ContactContext } from '../context/contact-context';

const data = [
  {
    _id: "1",
    name: {
      first: "John",
      last: "Doe"
    },
    phone: "555",
    email: "john@gmail.com"
  },
  {
    _id: "2",
    name: {
      first: "Bruce",
      last: "Wayne"
    },
    phone: "777",
    email: "bruce.wayne@gmail.com"
  }
];

export default function ContactListPage() {
  const [state, dispatch] = useContext(ContactContext);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CONTACTS',
      payload: data
    });
  }, [dispatch])

  return (
    <div>
      <h1>List of Contacts</h1>
      <ContactList contacts={state.contacts} />
    </div>
  )
}
