import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";
import { XCircle, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

// UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoginImage from "../../public/Login image.gif";

// API calls and Redux actions
import * as api from "../api/requests";
import {
  setAuth,
  setUserData,
  selectLanguage,
  setClientLink,
} from "../redux/actions/authActions";

// Spinner component using lucide-react
const Spinner = () => <Loader2 className="h-4 w-4 animate-spin" />;

/**
 * Integrated Login component with multi-factor authentication (Password, BankID).
 */
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderID } = useParams(); // For same-device BankID redirect

  // --- State Management ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Controls for the multi-step login flow
  const [passwordShow, setPasswordShow] = useState(false);
  const [chooseLoginType, setChooseLoginType] = useState(false);

  // State for BankID QR Code Modal
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState({
    code: "",
    orderRef: null,
    qrStartToken: null,
    qrStartSecret: null,
    status: "Not Started", // 'pending' | 'failed'
  });

  // --- Redux State ---
  const auth = useSelector((state) => state.auth.auth);
  const clientLink = useSelector((state) => state.auth.clientLink);

  // --- Utility Function for Alerts ---
  const showAlert = (message, type = "error") => {
    if (type === "success") {
      setSuccess(message);
      setError("");
    } else {
      setError(message);
      setSuccess("");
    }
    // Clear the message after 5 seconds
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 5000);
  };

  // --- Core Login Handlers ---

  // 1. Initial "Continue" button click
  const handleContinue = async () => {
    if (!email) {
      showAlert("Please enter your email.");
      return;
    }
    setLoader(true);
    try {
      const res = await api.checkLoginType(email);
      if (res.data?.data?.isLogInType === "password") {
        setPasswordShow(true);
      } else {
        setPasswordShow(false);
        setChooseLoginType(true);
      }
    } catch (error) {
      showAlert(
        error.response?.data?.error?.message || "An error occurred."
      );
    } finally {
      setLoader(false);
    }
  };

  // 2. Final Password Login
  const handlePasswordLogin = async () => {
    if (!email || !password) {
      showAlert("Email and password are required.");
      return;
    }
    setLoader(true);
    try {
      const response = await api.loginWithPassword(email, password);
      if (response.data.data.user.isBlock) {
        showAlert("Your account has been blocked by the administrator.");
      } else {
        dispatch(setAuth(response.data.data));
        dispatch(setUserData(response.data.data.user));
        showAlert("Login successful!", "success");
      }
    } catch (error) {
      const message = error.response?.data?.error?.message;
      if (message === "Your Account is not approved by admin.") {
        showAlert(
          "This program generator is for OptimumTrainers, login will be possible as soon as admin has approved the account"
        );
      } else {
        showAlert(message || "Invalid credentials.");
      }
    } finally {
      setLoader(false);
    }
  };

  // 3. BankID Login
  const handleBankID = async (type) => {
    setLoader(true);
    try {
      const res = await api.loginWithBankID(email, type);
      if (type === "sameDevice") {
        window.location.href = res.data?.data?.redirectUrl;
      } else {
        setQrData({
          code: res.data?.data?.qrData,
          orderRef: res.data.data?.orderRef,
          qrStartToken: res.data.data?.qrStartToken,
          qrStartSecret: res.data.data?.qrStartSecret,
          status: "pending",
        });
        setShowQRModal(true);
      }
    } catch (error) {
      showAlert(
        error.response?.data?.error?.message || "BankID login failed."
      );
    } finally {
      setLoader(false);
    }
  };

  // --- useEffect for Polling BankID Status ---
  useEffect(() => {
    if (qrData.status !== "pending" || !qrData.orderRef) return;

    const interval = setInterval(async () => {
      try {
        const { data } = await api.getBankIDOrderStatus(
          qrData.orderRef,
          qrData.qrStartToken,
          qrData.qrStartSecret
        );

        if (data?.code === 200) {
          clearInterval(interval);
          setShowQRModal(false);
          if (data.data.user.isBlock) {
            showAlert("Your account has been blocked.");
          } else {
            dispatch(setAuth(data.data));
            dispatch(setUserData(data.data.user));
            showAlert("Login successful!", "success");
          }
        } else if (data.data.status === "failed") {
          clearInterval(interval);
          setQrData((prev) => ({ ...prev, status: "failed" }));
        }
      } catch (error) {
        clearInterval(interval);
        setQrData((prev) => ({ ...prev, status: "failed" }));
        showAlert(
          error.response?.data?.error?.message || "Polling failed."
        );
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [qrData.orderRef, qrData.status, dispatch]);

  // Effect for handling the redirect from BankID on the same device
  useEffect(() => {
    const checkLogin = async (id) => {
      try {
        const { data } = await api.checkSameDeviceOrderStatus(id);
        if (data?.code === 200) {
          if (!data.data.user.isBlock) {
            dispatch(setAuth(data.data));
            dispatch(setUserData(data.data.user));
            showAlert("Login successful!", "success");
          } else {
            showAlert("Your account has been blocked.");
          }
        }
      } catch (error) {
        showAlert("BankID authentication failed.");
      }
    };
    if (orderID) {
      checkLogin(orderID);
    }
  }, [orderID, dispatch]);

  // --- Redirect Logic ---
  if (auth) {
    if (auth.user && auth.user.languageSetByAdmin?.length > 0) {
      dispatch(selectLanguage(auth.user.languageSetByAdmin[0]));
    }
    return <Navigate to={clientLink || "/clients"} />;
  }

  // --- Render Method ---
  return (
    <div className="w-full h-screen overflow-hidden lg:grid lg:grid-cols-5">
      {/* Left Panel: Form */}
      <div className="flex flex-col items-center justify-center h-full col-span-2 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-wider">OPTIMUM</h1>
          </div>

          <div className="w-full max-w-sm mx-auto grid gap-6">
            <div className="grid gap-2 text-left">
              <h2 className="text-3xl font-bold">Welcome back</h2>
              <p className="text-balance text-muted-foreground">
                Enter your details to access your account.
              </p>
            </div>

            {/* --- ALERTS DISPLAYED HERE --- */}
            {error && (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="my-4">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4">
              {/* Email Input */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={chooseLoginType || passwordShow}
                />
              </div>

              {/* Password Input (Conditional) */}
              {passwordShow && (
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}

              {/* Main Action Button */}
              {!chooseLoginType && (
                <Button
                  type="button"
                  className="w-full"
                  onClick={passwordShow ? handlePasswordLogin : handleContinue}
                  disabled={loader}
                >
                  {loader ? <Spinner /> : passwordShow ? "Login" : "Continue"}
                </Button>
              )}

              {/* BankID Login Buttons (Conditional) */}
              {chooseLoginType && (
                <div className="grid gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleBankID("sameDevice")}
                    disabled={loader}
                  >
                    {loader ? <Spinner /> : "BankID (Same Device)"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleBankID("otherDevice")}
                    disabled={loader}
                  >
                    {loader ? <Spinner /> : "BankID (Other Device)"}
                  </Button>
                </div>
              )}

              {/* Go Back / Sign Up */}
              <div className="text-sm text-center">
                {(passwordShow || chooseLoginType) && (
                  <Button
                    variant="link"
                    onClick={() => {
                      setPasswordShow(false);
                      setChooseLoginType(false);
                    }}
                  >
                    Use a different email
                  </Button>
                )}
                <p className="mt-2">
                  Don't have an account?{" "}
                  <a href="/register" className="underline">
                    Sign up for free
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Image */}
      <div className="hidden h-full bg-muted lg:block lg:col-span-3">
        <img
          src={LoginImage}
          alt="Animated illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-full max-w-sm p-8 text-center bg-white rounded-lg shadow-2xl">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute text-gray-500 top-2 right-2 hover:text-red-600"
            >
              <XCircle size={28} />
            </button>

            <h3 className="mb-4 text-2xl font-bold">BankID Authentication</h3>

            {qrData.status === "pending" && (
              <>
                <div className="inline-block p-4 bg-gray-100 rounded-md">
                  <QRCode value={qrData.code} size={200} />
                </div>
                <p className="mt-4 text-muted-foreground">
                  Open your BankID app and scan the QR code to log in.
                </p>
              </>
            )}

            {qrData.status === "failed" && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-xl font-semibold text-red-600">
                  Authentication Failed
                </p>
                <p className="text-muted-foreground">
                  The login attempt failed or was canceled. Please try again.
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    setShowQRModal(false);
                    handleBankID("otherDevice"); // Retry
                  }}
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;