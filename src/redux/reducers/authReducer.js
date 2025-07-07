// src/redux/reducers/authReducer.js

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  // State from the old application
  auth: "",
  userData: "",
  language: "swedish", // Default language
  clientLink: "",
  isTokenValid: true,
  termsSigned: true,
  customerId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Cases from the old reducer
    case actionTypes.SET_AUTH:
      return { ...state, auth: action.payload };
    case actionTypes.USER_DATA:
      return { ...state, userData: action.payload };
    case actionTypes.SELECT_LANGUAGE:
      return { ...state, language: action.payload };
    case actionTypes.SET_CLIENT_LINK:
      return { ...state, clientLink: action.payload };

    // Existing cases
    case actionTypes.IS_TOKEN_VALID:
      return { ...state, isTokenValid: action.payload };
    case actionTypes.TERMS_CONDITIONS_SIGNED:
      return { ...state, termsSigned: action.payload };
    case actionTypes.SET_CUSTOMER_ID:
      return { ...state, customerId: action.payload };

    default:
      return state;
  }
};

export default authReducer;
