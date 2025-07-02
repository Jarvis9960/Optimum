import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import UI components from your library
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Import your specified libraries ---
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // CSS for the phone input
import OtpInput from 'react-otp-input'; // The OTP Input library

// Import icons and image
import { User, Building, Hospital, KeyRound, CheckCircle } from 'lucide-react';
import RegisterImage from "../../public/Login image.gif";

// --- Stepper Component (No changes needed) ---
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
                currentStep >= step.number ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.icon}
            </div>
            <p className={`mt-2 text-xs font-medium ${currentStep >= step.number ? "text-primary" : "text-gray-500"}`}>
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${currentStep > step.number ? "bg-primary" : "bg-gray-200"}`}></div>
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
  const [otp, setOtp] = useState(''); // State for the OTP input
  const navigate = useNavigate();

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
    clinicPicture: null,
    clinicLogo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, mobileNumber: value }));
  };

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);
  
  const handleRegister = () => {
    console.log("Registering with data:", formData);
    console.log(`Sending OTP to ${formData.email}`);
    setShowOtpInput(true);
  };
  
  const handleVerifyOtp = () => {
    console.log(`Verifying OTP: ${otp}. Navigating to the next step.`);
    handleNextStep();
  };

  const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "India"];
  const subscriptionPlans = [
    { name: "Basic", price: "$10/mo", features: ["Feature A", "Feature B"] },
    { name: "Pro", price: "$25/mo", features: ["Feature A", "Feature B", "Feature C"] },
    { name: "Business", price: "$50/mo", features: ["All Features", "Priority Support"] },
    { name: "Enterprise", price: "Custom", features: ["All Features", "Dedicated Support"] },
  ];

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-5">
      {/* Left Panel: Registration Form (40%) */}
      <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 lg:col-span-2">
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-8 text-left">
            <h1 className="text-2xl font-bold tracking-wider">OPTIMUM</h1>
            <p className="text-muted-foreground">Create your account</p>
          </div>
          
          <Stepper currentStep={step} />

          <div className="mt-8">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <Card>
                <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>First Name</Label><Input name="firstName" onChange={handleChange} value={formData.firstName} /></div>
                    <div className="space-y-2"><Label>Last Name</Label><Input name="lastName" onChange={handleChange} value={formData.lastName} /></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile Number</Label>
                    {/* MODIFIED: Using react-phone-input-2 */}
                    <PhoneInput
                      country={'us'}
                      value={formData.mobileNumber}
                      onChange={handlePhoneChange}
                      inputClass="react-tel-input-custom"
                    />
                  </div>
                  <div className="space-y-2"><Label>Email</Label><Input type="email" name="email" onChange={handleChange} value={formData.email} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Password</Label><Input type="password" name="password" onChange={handleChange} value={formData.password} /></div>
                    <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword}/></div>
                  </div>
                   <Button onClick={handleNextStep} className="w-full">Next Step</Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Company Information (No changes) */}
            {step === 2 && (
              <Card>
                 <CardHeader><CardTitle>Company Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2"><Label>Company Name</Label><Input name="companyName" onChange={handleChange} value={formData.companyName} /></div>
                   <div className="space-y-2"><Label>Street Name</Label><Input name="streetName" onChange={handleChange} value={formData.streetName}/></div>
                   <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2"><Label>ZIP Code</Label><Input name="zipCode" onChange={handleChange} value={formData.zipCode}/></div>
                       <div className="space-y-2"><Label>City</Label><Input name="city" onChange={handleChange} value={formData.city}/></div>
                   </div>
                    <div className="space-y-2"><Label>Country</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({...prev, country: value}))}>
                            <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
                            <SelectContent>{countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                   <div className="space-y-2"><Label>VAT Registration Number</Label><Input name="vatNumber" onChange={handleChange} value={formData.vatNumber}/></div>
                   <div className="flex justify-between"> <Button variant="outline" onClick={handlePrevStep}>Previous</Button> <Button onClick={handleNextStep}>Next Step</Button> </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Clinic Information (No changes) */}
            {step === 3 && (
                <Card>
                    <CardHeader><CardTitle>Clinic Information & Branding</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                       <div className="space-y-2">
                            <Label>Clinic Banner/Picture</Label>
                            <Input type="file" name="clinicPicture" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"/>
                            {formData.clinicPicture && <p className="text-sm text-muted-foreground mt-1">File: {formData.clinicPicture.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Clinic Logo</Label>
                            <Input type="file" name="clinicLogo" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"/>
                            {formData.clinicLogo && <p className="text-sm text-muted-foreground mt-1">File: {formData.clinicLogo.name}</p>}
                        </div>
                       <div className="flex justify-between pt-4"> <Button variant="outline" onClick={handlePrevStep}>Previous</Button> <Button onClick={handleNextStep}>Next Step</Button> </div>
                    </CardContent>
                </Card>
            )}
            
            {/* Step 4: Review and Verify */}
            {step === 4 && (
              <Card>
                <CardHeader>
                    <CardTitle>{showOtpInput ? "Verify Your Account" : "Review Your Information"}</CardTitle>
                    <CardDescription>
                        {showOtpInput 
                            ? `An OTP has been sent to ${formData.email}. Please enter it below.`
                            : "Please review your information and click Register to create your account."
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!showOtpInput ? (
                        <>
                            <div className="space-y-2 text-sm">
                               <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                               <p><strong>Email:</strong> {formData.email}</p>
                               <p><strong>Company:</strong> {formData.companyName}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <Button variant="outline" onClick={handlePrevStep}>Previous</Button>
                                <Button onClick={handleRegister}>Register</Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-6">
                            {/* MODIFIED: Using react-otp-input */}
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                containerStyle="justify-center"
                                renderInput={(props) => <input {...props} />}
                                inputStyle="!w-12 h-12 text-lg border border-gray-300 rounded-md text-center focus:border-primary focus:ring-2 focus:ring-primary"
                                separator={<span>-</span>}
                            />
                            <Button onClick={handleVerifyOtp} className="w-full">Verify & Proceed</Button>
                        </div>
                    )}
                </CardContent>
              </Card>
            )}

            {/* Step 5: Subscription (No changes) */}
            {step === 5 && (
                <Card>
                    <CardHeader><CardTitle>Choose Your Subscription Plan</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subscriptionPlans.map(plan => (
                          <Card key={plan.name} className="flex flex-col">
                              <CardHeader>
                                  <CardTitle>{plan.name}</CardTitle>
                                  <CardDescription>{plan.price}</CardDescription>
                              </CardHeader>
                              <CardContent className="flex-grow space-y-2">
                                  {plan.features.map(f => <p key={f} className="text-sm">&#x2713; {f}</p>)}
                              </CardContent>
                              <div className="p-4 pt-0">
                                 <Button className="w-full" onClick={() => navigate('/dashboard')}>Choose Plan</Button>
                              </div>
                          </Card>
                      ))}
                    </CardContent>
                </Card>
            )}
            
          </div>
        </div>
      </div>

      {/* Right Panel: Image */}
      <div className="hidden bg-muted lg:block h-full lg:col-span-3">
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