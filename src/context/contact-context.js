import React, {
  useReducer,
  createContext
} from 'react';

export const ContactContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_CONTACTS': {
      return {
        ...state,
        contacts: action.payload
      }
    }
    default:
      throw new Error()
  }
}

const initialState = {
  contacts: [],
  contact: null, // selected or new
  loading: false,
  errors: {}
}

export const ContactContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <ContactContext.Provider value={[state, dispatch]}>
      {props.children}
    </ContactContext.Provider>
  )
}
