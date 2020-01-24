import React, { useContext, useEffect } from 'react';
import ContactList from '../components/contact-list';
import { ContactContext } from '../context/contact-context';
import data from '../context/contact-data';

export default function ContactListPage() {
  const [contacts, setContacts] = useContext(ContactContext);

  useEffect(() => {
    setContacts(data);
  }, [setContacts])

  return (
    <div>
      <h1>List of Contacts</h1>
      <ContactList contacts={contacts} />
    </div>
  )
}
