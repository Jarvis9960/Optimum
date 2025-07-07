// src/redux/actions/authActions.js

import * as actionTypes from "./actionTypes";

// Actions ported from the old application
export const setAuth = (authData) => ({
  type: actionTypes.SET_AUTH,
  payload: authData,
});

export const setUserData = (userData) => ({
  type: actionTypes.USER_DATA,
  payload: userData,
});

export const selectLanguage = (language) => ({
  type: actionTypes.SELECT_LANGUAGE,
  payload: language,
});

export const setClientLink = (link) => ({
  type: actionTypes.SET_CLIENT_LINK,
  payload: link,
});

// Existing actions
export const setIsTokenValid = (isValid) => ({
  type: actionTypes.IS_TOKEN_VALID,
  payload: isValid,
});

export const setTermsSigned = (isSigned) => ({
  type: actionTypes.TERMS_CONDITIONS_SIGNED,
  payload: isSigned,
});

export const setCustomerId = (id) => ({
  type: actionTypes.SET_CUSTOMER_ID,
  payload: id,
});
