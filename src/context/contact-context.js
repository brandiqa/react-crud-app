import React, {
  useReducer,
  createContext
} from 'react';

export const ContactContext = createContext();

const initialState = {
  contacts: [],
  contact: {}, // selected or new
  message: {} // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_CONTACTS": {
      return {
        ...state,
        contacts: action.payload,
        contact: {}
      };
    }

    case "FLASH_MESSAGE": {
      return {
        ...state,
        message: action.payload
      };
    }

    case "CREATE_CONTACT": {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        message: {
          type: "success",
          title: "Success",
          content: "New Contact created!"
        }
      };
    }

    case "FETCH_CONTACT": {
      return {
        ...state,
        contact: action.payload,
        message: {}
      };
    }

    case "UPDATE_CONTACT": {
      const contact = action.payload;
      return {
        ...state,
        contacts: state.contacts.map(item =>
          item._id === contact._id ? contact : item
        ),
        message: {
          type: "success",
          title: "Update Successful",
          content: `Contact "${contact.email}" has been updated!`
        }
      };
    }

    case "DELETE_CONTACT": {
      const { _id, email } = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter(item => item._id !== _id),
        message: {
          type: "success",
          title: "Delete Successful",
          content: `Contact "${email}" has been deleted!`
        }
      };
    }

    default:
      throw new Error();
  }
}

export const ContactContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <ContactContext.Provider value={[state, dispatch]}>
      {props.children}
    </ContactContext.Provider>
  )
}
