import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "../contexts/AuthContext";
import LoginImage from "../../public/Login image.gif";

/**
 * Login component that renders a responsive login page with two authentication methods:
 * 1. Email and Password (Default)
 * 2. Email and OTP
 * The user can toggle between these methods.
 * The layout is a 40/60 split between the form and a feature image on larger screens.
 */
const Login = () => {
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">(
    "password"
  );
  const [otpStep, setOtpStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handler for the default email/password login
  const handlePasswordLogin = () => {
    // In a real app, you would validate credentials against a backend.
    console.log(`Logging in with email: ${email} and password.`);
    const dummyUser = { id: "1", name: "Test User", email };
    login(dummyUser);
    navigate("/dashboard");
  };

  // Handler to initiate the OTP flow
  const handleSendOtp = () => {
    // In a real app, you would trigger an API call to send an OTP.
    console.log(`Sending OTP to ${email}`);
    setOtpStep("otp");
  };

  // Handler to verify the OTP and log in
  const handleVerifyOtp = () => {
    // In a real app, you would verify the OTP via a backend service.
    console.log("Verifying OTP and logging in...");
    const dummyUser = { id: "1", name: "Test User", email };
    login(dummyUser);
    navigate("/dashboard");
  };

  return (
    <div className="w-full h-screen overflow-hidden lg:grid lg:grid-cols-5">
      {/* Left Panel: Login Form (40% width) */}
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-full lg:col-span-2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-wider">OPTIMUM</h1>
          </div>
          <div className="mx-auto grid w-full max-w-sm gap-6">
            {/* === Email & Password Login (Default) === */}
            {loginMethod === "password" && (
              <>
                <div className="grid gap-2 text-left">
                  <h2 className="text-3xl font-bold">Welcome back</h2>
                  <p className="text-balance text-muted-foreground">
                    Enter your email and password to access your account.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
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
                  <Button
                    type="button"
                    className="w-full"
                    onClick={handlePasswordLogin}
                  >
                    Login
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => setLoginMethod("otp")}
                  >
                    Login with OTP instead
                  </Button>
                </div>
              </>
            )}

            {/* === Email & OTP Login === */}
            {loginMethod === "otp" && (
              <>
                {/* Step 1: Email Input for OTP */}
                {otpStep === "email" && (
                  <>
                    <div className="grid gap-2 text-left">
                      <h2 className="text-3xl font-bold">Login with OTP</h2>
                      <p className="text-balance text-muted-foreground">
                        Enter your email to receive a one-time password.
                      </p>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        className="w-full"
                        onClick={handleSendOtp}
                      >
                        Send OTP
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => setLoginMethod("password")}
                      >
                        Login with password instead
                      </Button>
                    </div>
                  </>
                )}

                {/* Step 2: OTP Input */}
                {otpStep === "otp" && (
                  <>
                    <div className="grid gap-2 text-left">
                      <h2 className="text-3xl font-bold">Check your email</h2>
                      <p className="text-balance text-muted-foreground">
                        We've sent a 4-digit code to{" "}
                        <span className="font-semibold text-primary">{email}</span>.
                      </p>
                    </div>
                    <div className="grid gap-4">
                      <InputOTP maxLength={4}>
                        <InputOTPGroup className="mx-auto gap-2">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                      <Button
                        type="button"
                        className="w-full"
                        onClick={handleVerifyOtp}
                      >
                        Verify OTP
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => setOtpStep("email")}
                      >
                        Use a different email
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Common Sign-up Link */}
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <a href="/register" className="underline">
                Sign up for free
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Image (60% width) */}
      <div className="hidden bg-muted lg:block h-full lg:col-span-3">
        <img
          src={LoginImage}
          alt="Animated illustration of a person working on a laptop"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;