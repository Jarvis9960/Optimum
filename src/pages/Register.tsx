import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUser,
  getFreePlan,
  uploadImage,
  getTermsAndConditions,
  verifyOtp,
  createCheckoutSession,
  verifyStripeSession,
} from "../api/requests";
import { setCustomerId } from "../redux/actions/authActions";

// Import UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Import libraries and assets
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import {
  User,
  Building,
  Hospital,
  KeyRound,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import RegisterImage from "../../public/Login image.gif";

// --- Stepper Component ---
const Stepper = ({ currentStep }) => {
  const steps = [
    { number: 1, title: "Personal Info", icon: <User /> },
    { number: 2, title: "Company Info", icon: <Building /> },
    { number: 3, title: "Clinic Info", icon: <Hospital /> },
    { number: 4, title: "Review & Verify", icon: <KeyRound /> },
    { number: 5, title: "Subscribe", icon: <CheckCircle /> },
  ];
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                currentStep >= step.number
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.icon}
            </div>
            <p
              className={`mt-2 text-xs font-medium ${
                currentStep >= step.number ? "text-primary" : "text-gray-500"
              }`}
            >
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 transition-colors duration-300 ${
                currentStep > step.number ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- Main Register Component ---
const Register = () => {
  const [step, setStep] = useState(1);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({
    clinicPicture: false,
    clinicLogo: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.auth.customerId);

  const [isAgreementActive, setIsAgreementActive] = useState(false);
  const [termsAndConditionsLink, setTermsAndConditionsLink] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    streetName: "",
    zipCode: "",
    city: "",
    country: "",
    vatNumber: "",
    clinicPicture: "",
    clinicLogo: "",
  });

  useEffect(() => {
    // Stripe: Handle redirect back from checkout page
    const verifySession = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const sessionId = queryParams.get("session_id");
      const cancelled = queryParams.get("cancel");

      if (cancelled) {
        setError(
          "Your payment was cancelled. Please select a plan to try again."
        );
        setStep(5);
        navigate("/register", { replace: true });
        return;
      }

      if (sessionId) {
        setLoading(true);
        try {
          await verifyStripeSession(sessionId);
          setSuccess(
            "Your subscription is confirmed! Redirecting to dashboard..."
          );
          setTimeout(() => navigate("/dashboard"), 3000);
        } catch (err) {
          setError(
            "Could not verify your payment session. Please contact support."
          );
        } finally {
          setLoading(false);
          navigate("/register", { replace: true });
        }
      }
    };

    verifySession();
  }, [navigate]);

  useEffect(() => {
    // Fetch initial data on component mount
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const response = await getFreePlan();
        const plans = response.data.data || [];
        setProducts(plans);
        if (plans.length > 0) {
          setSelectedProduct(plans[0]);
        }
      } catch (err) {
        setError("Could not fetch subscription plans.");
      } finally {
        setLoading(false);
      }
      try {
        const termsResponse = await getTermsAndConditions();
        if (termsResponse.data?.result?.[0]?.termsConditionPdf) {
          setTermsAndConditionsLink(
            termsResponse.data.result[0].termsConditionPdf
          );
        }
      } catch (err) {
        console.error("Could not fetch terms and conditions.", err);
      }
    };
    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [name]: true }));
    setError("");

    try {
      const response = await uploadImage(file);
      if (response.status === "success" && response.data.file) {
        setFormData((prev) => ({ ...prev, [name]: response.data.file }));
      } else {
        setError("Image upload failed. Please try again.");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "An error occurred during image upload.";
      setError(message);
    } finally {
      setUploading((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, mobileNumber: value });
  };

  const handleNextStep = () => {
    setError("");
    setSuccess("");
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setError("");
    setSuccess("");
    setStep((prev) => prev - 1);
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    const registrationData = {
      isAgreementActive: isAgreementActive,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.mobileNumber,
      companyName: formData.companyName,
      country: (formData.country || "").toLowerCase(),
      city: formData.city,
      streetAddress: formData.streetName,
      zipCode: formData.zipCode,
      vatNumber: formData.vatNumber,
      firstPageLogo:
        formData.clinicLogo ||
        "https://optimum-storage.s3.eu-north-1.amazonaws.com/Framsida+(1).png",
      firstPageImage:
        formData.clinicPicture ||
        "https://optimum-storage.s3.eu-north-1.amazonaws.com/Framsida+(1).png",
      emailAddress: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      websiteaddress: "www.dk.com",
      planId: selectedProduct ? selectedProduct._id : null,
      level: 100,
      language: "english",
    };

    try {
      const { data } = await registerUser(registrationData);

      const custId =
        data?.data?.customerId ||
        data?.data?.customerid ||
        data?.customerId ||
        data?.customerid;

      if (custId) {
        dispatch(setCustomerId(custId));
        setSuccess("Registration successful! Please verify your OTP.");
        setShowOtpInput(true);
      } else {
        console.error(
          "CRITICAL: Customer ID not found in the registration response.",
          data
        );
        setError(
          "Registration failed to return a required Customer ID. Please contact support."
        );
      }
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        "An unknown error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await verifyOtp({
        email: formData.email,
        otp: otp,
      });
      setSuccess("Account verified successfully!");
      setTimeout(() => {
        handleNextStep();
      }, 1500);
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        "OTP verification failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToCheckout = async () => {
    if (!customerId) {
      setError(
        "Customer ID is missing. Please try the registration process again."
      );
      return;
    }
    if (!selectedProduct) {
      setError("No subscription plan is selected. Please choose a plan.");
      return;
    }

    setLoading(true);
    setError("");

    const checkoutData = {
      priceId: selectedProduct.stripePriceId,
      customerId: customerId,

      successURL: "http://localhost:8080/#/",
      isFirstTimePurchase: true,
    };

    try {
      const response = await createCheckoutSession(checkoutData);

      if (response.data.data?.url) {
        window.location.href = response.data.data.url;
      } else {
        setError("Could not retrieve checkout session URL from API response.");
        setLoading(false);
      }
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        "Could not create checkout session.";
      setError(message);
      setLoading(false);
    }
  };

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
    "Sweden",
    "Finland",
    "Norway",
    "Denmark",
    "Switzerland",
    "Spain",
    "England",
  ];

  return (
    <div className="w-full h-screen bg-white">
      <div className="w-full lg:w-2/5 h-full overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-lg mx-auto px-6 sm:px-8 py-12">
          <div className="mb-8 text-left">
            <h1 className="text-2xl font-bold tracking-wider">OPTIMUM</h1>
            <p className="text-muted-foreground">Create your account</p>
          </div>

          <Stepper currentStep={step} />

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="my-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="mt-8">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile Number</Label>
                    <PhoneInput
                      country={"us"}
                      value={formData.mobileNumber}
                      onChange={handlePhoneChange}
                      inputClass="react-tel-input-custom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm Password</Label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="terms"
                      checked={isAgreementActive}
                      onCheckedChange={setIsAgreementActive}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I accept the{" "}
                        {termsAndConditionsLink ? (
                          <a
                            href={termsAndConditionsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline hover:no-underline"
                          >
                            terms and conditions
                          </a>
                        ) : (
                          "terms and conditions"
                        )}
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button
                    onClick={handleNextStep}
                    className="w-full"
                    disabled={loading || !isAgreementActive}
                  >
                    Next Step
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input
                      name="companyName"
                      onChange={handleChange}
                      value={formData.companyName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Street Name</Label>
                    <Input
                      name="streetName"
                      onChange={handleChange}
                      value={formData.streetName}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ZIP Code</Label>
                      <Input
                        name="zipCode"
                        onChange={handleChange}
                        value={formData.zipCode}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        name="city"
                        onChange={handleChange}
                        value={formData.city}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, country: value }))
                      }
                      value={formData.country}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>VAT Registration Number</Label>
                    <Input
                      name="vatNumber"
                      onChange={handleChange}
                      value={formData.vatNumber}
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={loading}
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNextStep} disabled={loading}>
                    Next Step
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Clinic Information & Branding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Clinic Banner/Picture</Label>
                    <Input
                      type="file"
                      name="clinicPicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading.clinicPicture}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50"
                    />
                    {uploading.clinicPicture && (
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </div>
                    )}
                    {formData.clinicPicture && !uploading.clinicPicture && (
                      <div className="text-sm text-green-600 mt-2">
                        ✓ Upload successful.{" "}
                        <a
                          href={formData.clinicPicture}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline"
                        >
                          View
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Clinic Logo</Label>
                    <Input
                      type="file"
                      name="clinicLogo"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading.clinicLogo}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50"
                    />
                    {uploading.clinicLogo && (
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </div>
                    )}
                    {formData.clinicLogo && !uploading.clinicLogo && (
                      <div className="text-sm text-green-600 mt-2">
                        ✓ Upload successful.{" "}
                        <a
                          href={formData.clinicLogo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline"
                        >
                          View
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={
                      loading || uploading.clinicPicture || uploading.clinicLogo
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={
                      loading || uploading.clinicPicture || uploading.clinicLogo
                    }
                  >
                    Next Step
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {showOtpInput
                      ? "Verify Your Account"
                      : "Review Your Information"}
                  </CardTitle>
                  <CardDescription>
                    {showOtpInput
                      ? `An OTP has been sent to ${formData.email}. Please enter it below.`
                      : "Review your info and click Register to create your account."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showOtpInput ? (
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Name:</strong> {formData.firstName}{" "}
                        {formData.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p>
                        <strong>Company:</strong> {formData.companyName}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-6 pt-4">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        containerStyle="justify-center"
                        renderInput={(props) => <input {...props} />}
                        inputStyle="!w-10 h-10 sm:!w-12 sm:h-12 text-lg border border-gray-300 rounded-md text-center focus:border-primary focus:ring-2 focus:ring-primary"
                        separator={<span>-</span>}
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-6">
                  {!showOtpInput ? (
                    <div className="w-full flex justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePrevStep}
                        disabled={loading}
                      >
                        Previous
                      </Button>
                      <Button onClick={handleRegister} disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleVerifyOtp}
                      className="w-full"
                      disabled={loading || otp.length < 6}
                    >
                      {loading ? "Verifying..." : "Verify & Proceed"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )}

            {step === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Subscription Plan</CardTitle>
                  <CardDescription>
                    {selectedProduct
                      ? `You have selected: ${selectedProduct.planName}`
                      : "Select a plan to continue."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading && <p>Loading Plans...</p>}
                  {!loading && products.length === 0 && (
                    <p>No free trial plans available at the moment.</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((plan) => (
                      <Card
                        key={plan._id}
                        className={`cursor-pointer flex flex-col justify-between ${
                          selectedProduct?._id === plan._id
                            ? "border-primary ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => setSelectedProduct(plan)}
                      >
                        <CardHeader>
                          <CardTitle>{plan.planName}</CardTitle>
                          <CardDescription>{plan.duration}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm font-medium capitalize text-muted-foreground">
                            {plan.planType}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {selectedProduct && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Complete Payment
                      </h3>
                      <Button
                        className="w-full"
                        onClick={handleProceedToCheckout}
                        disabled={loading || !selectedProduct}
                      >
                        {loading ? "Processing..." : `Proceed to Checkout`}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block fixed top-0 right-0 h-full w-3/5">
        <img
          src={RegisterImage}
          alt="Illustration for registration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
