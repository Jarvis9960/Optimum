import axiosInstance from "./axiosConfig";

const authRequests = {
  fetchLogin: "user/login",
  checkLoginType: "/bankId/checkLoginType",
  banKidLogin: "/bankId/banKidLogin",
  orderStatus: "/bankid/orderStatus",
  sameDeviceCheckOrderStatus: "/bankid/sameDeviceCheckOrderStatus",
  // ... other auth requests from your old file
};

/**
 * Registers a new user by sending data as JSON.
 * @param {Object} userData - A plain JavaScript object with user details.
 * @returns {Promise<Object>} The response data from the server.
 */
export const registerUser = (userData) => {
  return axiosInstance.post("/user/create-user", userData);
};

/**
 * Verifies the user's OTP after registration.
 * @param {Object} payload - The payload containing the email and OTP.
 * @returns {Promise<Object>} The response from the server.
 */
export const verifyOtp = (payload) => {
  return axiosInstance.post("/auth/verifyotp", payload);
};

// ## ADDED ##
/**
 * Creates a Stripe Checkout session for the subscription.
 * @param {Object} payload - Contains planId and customerId.
 * @returns {Promise<Object>} The response containing the session URL.
 */
export const createCheckoutSession = (payload) => {
  return axiosInstance.post("/user/checkout-session", payload);
};

// ## ADDED ##
/**
 * Verifies the Stripe session after the user returns from checkout.
 * @param {string} sessionId - The session ID from the URL.
 * @returns {Promise<Object>} The response from the server.
 */
export const verifyStripeSession = (sessionId) => {
  return axiosInstance.get(`/user/retrive-session?sessionId=${sessionId}`);
};


/**
 * Fetches the free subscription plan.
 * @returns {Promise<Object>} The response data containing the plan.
 */
export const getFreePlan = () => {
  return axiosInstance.get("/user/getFreePlan");
};

/**
 * Fetches the terms and conditions document link.
 * @returns {Promise<Object>} The response data.
 */
export const getTermsAndConditions = async () => {
  const response = await axiosInstance.get(
    "/user/trainerPrivacyPolicyPdfDetail"
  );
  return response.data;
};

/**
 * Uploads an image file.
 * @param {File} file - The image file to upload.
 * @returns {Promise<Object>} The response data containing the file URL.
 */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axiosInstance.post("/image/imageUpload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

/**
 * Handles the standard email and password login.
 * @param {string} email
 * @param {string} password
 */
export const loginWithPassword = (email, password) => {
  const requestBody = {
    email,
    password,
    host: window.location.host,
  };
  return axiosInstance.post(authRequests.fetchLogin, requestBody);
};

/**
 * Checks if the user's login type is password or BankID.
 * @param {string} email
 */
export const checkLoginType = (email) => {
  const requestBody = {
    email,
    loginType: "password", // This can be adapted if needed
  };
  return axiosInstance.post(authRequests.checkLoginType, requestBody);
};

/**
 * Initiates a BankID login flow.
 * @param {string} email
 * @param {'sameDevice' | 'otherDevice'} type
 */
export const loginWithBankID = (email, type) => {
  const requestBody = {
    email,
    loginType: type,
  };
  return axiosInstance.post(authRequests.banKidLogin, requestBody);
};

/**
 * Polls the status of a BankID order (for QR code).
 * @param {string} orderRef
 * @param {string} qrStartToken
 * @param {string} qrStartSecret
 */
export const getBankIDOrderStatus = (orderRef, qrStartToken, qrStartSecret) => {
  const url = `${authRequests.orderStatus}?&orderRef=${orderRef}&qrStartToken=${qrStartToken}&qrStartSecret=${qrStartSecret}`;
  return axiosInstance.get(url);
};

/**
 * Checks the status of a same-device BankID login.
 * @param {string} orderID
 */
export const checkSameDeviceOrderStatus = (orderID) => {
  const url = `${authRequests.sameDeviceCheckOrderStatus}?&orderRef=${orderID}`;
  return axiosInstance.get(url);
};