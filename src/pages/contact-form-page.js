import React, { useContext, useEffect, useState } from 'react';
import ContactForm from '../components/contact-form';
import { flashErrorMessage } from "../components/flash-message";
import { ContactContext } from "../context/contact-context";
import axios from "axios";

export default function ContactFormPage({match}) {
  const [state, dispatch] = useContext(ContactContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { _id } = match.params;
    if (_id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3030/contacts/${_id}`
          );
          dispatch({
            type: "FETCH_CONTACT",
            payload: response.data
          });
          setLoading(false);
        } catch (error) {
          flashErrorMessage(dispatch, error);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [match.params, dispatch]);

  if(loading){
    return <p>Please wait...</p>
  }

  return (
    <div>
      <ContactForm  contact={state.contact}/>
    </div>
  );
}
