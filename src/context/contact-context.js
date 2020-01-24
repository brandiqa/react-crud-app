import React, {
  useState,
  createContext
} from 'react';

export const ContactContext = createContext()

export const ContactContextProvider = (props) => {
  const [contacts, setContacts] = useState([]);

  return(
    <ContactContext.Provider value={[contacts, setContacts]}>
      {props.children}
    </ContactContext.Provider>
  )
}
