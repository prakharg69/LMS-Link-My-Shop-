// pages/StoreEdit.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Store,
  Phone,
  Mail,
  MapPin,
  Globe,
  Save,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Edit3,
  Shield,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

function StoreEdit() {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [shopData, setShopData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchShopData();
  }, [shopId]);
  

  const fetchShopData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5002/api/getMyShopById?shopId=${shopId}`,
        { withCredentials: true }
      );

      setShopData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shop data:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const locationFields = ['addressLine', 'city', 'state', 'pincode'];

    if(locationFields.includes(name)){
            setShopData((prev)=> ({
                ...prev,location:{
                    ...prev.location,
                    [name]: value,
                }
            }));
    }else{
        setShopData((prev)=>({
            ...prev,[name]: type=="checkbox" ?checked : value
        }))
    }
 

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!shopData.shopName?.trim()) {
      newErrors.shopName = "Shop name is required";
    }

    if (!shopData.primaryPhone?.trim()) {
      newErrors.primaryPhone = "Primary phone is required";
    } else if (!/^\d{10}$/.test(shopData.primaryPhone)) {
      newErrors.primaryPhone = "Enter valid 10-digit phone";
    }

    if (
      shopData.primaryWhatsapp &&
      !/^\d{10}$/.test(shopData.primaryWhatsapp)
    ) {
      newErrors.primaryWhatsapp = "Enter valid 10-digit WhatsApp";
    }

    if (
      shopData.businessEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shopData.businessEmail)
    ) {
      newErrors.businessEmail = "Enter valid email address";
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      console.log("Saving shop data:", shopData);
      const res = await axios.put(`http://localhost:5002/api/update-store/${shopId}`,shopData,{withCredentials:true});
      console.log("check data",res.data);
    } catch (error) {
      console.error("Error saving shop:", error);
      alert("Failed to save store. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!shopData.businessEmail) {
      alert("Please enter a business email first");
      return;
    }

    setVerifyingEmail(true);
    try {
      await axios.post(
        `http://localhost:5002/api/verifyStoreEmail?shopId=${shopId}`,
        {},
        { withCredentials: true }
      );

      console.log("Sending verification email to:", shopData.businessEmail);

      // Clear any existing OTP when resending
      setOtp("");
      setShowOtpModal(true);
      alert("Verification email sent! Check your inbox for OTP.");
    } catch (error) {
      console.error("Error sending verification:", error);
      alert("Failed to send verification email. Please try again.");
    } finally {
      setVerifyingEmail(false);
    }
  };

  const handleOtpInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter 6-digit OTP");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5002/api/verify-store-otp",
        {
          shopId,
          otp: otp, 
        },
        {
          withCredentials: true,
        }
      );

      console.log("Verifying OTP:", otp);

      // Update local state
      setShopData((prev) => ({ ...prev, isVerified: true }));
      setShowOtpModal(false);
      setOtp("");
      alert("Email verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  const getStatusBadge = () => {
    if (shopData.isVerified && shopData.isOnboarded) {
      return {
        text: "Active",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
      };
    } else if (shopData.isVerified) {
      return {
        text: "Verified",
        color: "bg-blue-100 text-blue-800",
        icon: CheckCircle,
      };
    } else if (shopData.status === "draft") {
      return {
        text: "Draft",
        color: "bg-amber-100 text-amber-800",
        icon: Clock,
      };
    } else {
      return {
        text: "Pending",
        color: "bg-gray-100 text-gray-800",
        icon: AlertCircle,
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading store details...</p>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge();
  const StatusIcon = statusBadge.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Verify Email
                </h3>
                <button
                  onClick={() => {
                    setShowOtpModal(false);
                    setOtp("");
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <p className="text-gray-600 mb-2">
                Enter the 6-digit OTP sent to:
              </p>
              <p className="text-gray-900 font-semibold mb-6">
                {shopData.businessEmail}
              </p>

              <div className="space-y-4">
                {/* Simple OTP input field */}
                <div className="flex justify-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={otp}
                    onChange={handleOtpInputChange}
                    maxLength="6"
                    className="w-full max-w-xs px-4 py-3 text-2xl font-semibold text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Enter 6-digit OTP"
                    autoFocus
                  />
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-4">
                    Entered: {otp.length}/6 digits
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowOtpModal(false);
                      setOtp("");
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerifyOtp}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    Verify OTP
                  </button>
                </div>

                <div className="text-center pt-4 border-t">
                  <button
                    onClick={handleVerifyEmail}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1.5 mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Resend OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stores
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Store className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Edit Store
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${statusBadge.color}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {statusBadge.text}
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-700 font-medium">
                    {shopData.shopCode}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Store Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Store Information Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  Store Information
                </h2>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shop Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      value={shopData.shopName || ""}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                        errors.shopName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter shop name"
                    />
                    {errors.shopName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.shopName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shop Type
                    </label>
                    <input
                      type="text"
                      name="shopType"
                      value={shopData.shopType || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Kirana / Grocery"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Category
                  </label>
                  <select
                    name="businessCategory"
                    value={shopData.businessCategory || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="both">Both Retail & Wholesale</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <Phone className="w-5 h-5 text-blue-600" />
                Contact Information
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        +91
                      </div>
                      <input
                        type="tel"
                        name="primaryPhone"
                        value={shopData.primaryPhone || ""}
                        onChange={handleInputChange}
                        maxLength="10"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                          errors.primaryPhone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.primaryPhone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.primaryPhone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        +91
                      </div>
                      <input
                        type="tel"
                        name="primaryWhatsapp"
                        value={shopData.primaryWhatsapp || ""}
                        onChange={handleInputChange}
                        maxLength="10"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                          errors.primaryWhatsapp
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Optional"
                      />
                    </div>
                    {errors.primaryWhatsapp && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.primaryWhatsapp}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Business Email
                    </label>
                    {shopData.businessEmail && (
                      <span
                        className={`text-sm font-medium flex items-center gap-1.5 ${
                          shopData.isVerified 
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {shopData.isVerified  ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            Not Verified
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        name="businessEmail"
                        value={shopData.businessEmail || ""}
                        readOnly={shopData.isVerified }
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                          errors.businessEmail
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="business@example.com"
                      />
                      {errors.businessEmail && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.businessEmail}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleVerifyEmail}
                      disabled={shopData.isVerified}
                      className="px-4 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
                    >
                      {verifyingEmail ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : shopData.isEmailVerified ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          Verify Email
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-blue-600" />
                Location Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    value={shopData.location.addressLine || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shopData.location.city || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shopData.location.state || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={shopData.location.pincode || ""}
                      onChange={handleInputChange}
                      maxLength="6"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                        errors.pincode ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="6 digits"
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Status & Website */}
          <div className="space-y-6">
            {/* Website Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-blue-600" />
                Website
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="hasWebsite"
                    name="hasWebsite"
                    checked={shopData.hasWebsite || false}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="hasWebsite"
                    className="text-gray-700 font-medium cursor-pointer"
                  >
                    I have a business website
                  </label>
                </div>

                {shopData.hasWebsite && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={shopData.websiteUrl || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="https://example.com"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Store Status Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Store Status
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Created On</span>
                  <span className="font-medium text-gray-900">
                    {new Date(shopData.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium text-gray-900">
                    {new Date(shopData.updatedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Onboarding</span>
                  <span
                    className={`font-medium ${
                      shopData.isOnboarded ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    {shopData.isOnboarded ? "Completed" : "Pending"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Verification</span>
                  <span
                    className={`font-medium ${
                      shopData.isVerified ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    {shopData.isVerified ? "Verified" : "Pending"}
                  </span>
                </div>

                
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this store? This action cannot be undone."
                      )
                    ) {
                      console.log("Delete store:", shopId);
                      // Add delete API call here
                    }
                  }}
                  className="w-full px-4 py-2.5 text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-50 transition-colors"
                >
                  Delete Store
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreEdit;