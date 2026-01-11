import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Store,
  Phone,
  MapPin,
  Globe,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useGetShop } from "../Hooks/getShop";
import { useDispatch } from "react-redux";
import { setShopPush } from "../Redux/Slices/shopSlice";

const SHOP_TYPES = [
  "Kirana / Grocery",
  "Medical Store",
  "Hardware Store",
  "Mobile Store",
  "Stationery Shop",
  "Electronics Store",
  "Clothing Store",
  "Bakery",
  "Dairy",
  "Other",
];

function CreateStoreForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [showShopTypeDropdown, setShowShopTypeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    shopName: "",
    shopType: "",
    businessCategory: "",
    primaryPhone: "",
    primaryWhatsapp: "",
    businessEmail: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    hasWebsite: false,
    websiteUrl: "",
  });
  const dispatch = useDispatch();

  // Close dropdowns when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!event.target.closest('.dropdown-container')) {
  //       setShowShopTypeDropdown(false);
  //       setShowCategoryDropdown(false);
  //     }
  //   };

  //   document.addEventListener('click', handleClickOutside);
  //   return () => document.removeEventListener('click', handleClickOutside);
  // }, []);

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.shopName.trim()) {
        newErrors.shopName = "Shop name is required";
      }
      if (!formData.shopType) {
        newErrors.shopType = "Please select a shop type";
      }
      if (!formData.businessCategory) {
        newErrors.businessCategory = "Please select a business category";
      }
    }

    if (step === 2) {
      if (!formData.primaryPhone.trim()) {
        newErrors.primaryPhone = "Primary phone number is required";
      } else if (!/^\d{10}$/.test(formData.primaryPhone.replace(/\D/g, ''))) {
        newErrors.primaryPhone = "Enter a valid 10-digit phone number";
      }

      if (formData.primaryWhatsapp && !/^\d{10}$/.test(formData.primaryWhatsapp.replace(/\D/g, ''))) {
        newErrors.primaryWhatsapp = "Enter a valid 10-digit WhatsApp number";
      }

      if (formData.businessEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.businessEmail)) {
          newErrors.businessEmail = "Enter a valid email address";
        }
      }
    }

    if (step === 3) {
      if (!formData.pincode.trim()) {
        newErrors.pincode = "Pincode is required";
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = "Enter a valid 6-digit pincode";
      }

      if (!formData.addressLine.trim()) {
        newErrors.addressLine = "Address is required";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!formData.state.trim()) {
        newErrors.state = "State is required";
      }
    }

    if (step === 4 && formData.hasWebsite && !formData.websiteUrl.trim()) {
      newErrors.websiteUrl = "Website URL is required when 'I have a website' is checked";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    // Phone number validation - only numbers, max 10 digits
    if (name === "primaryPhone" || name === "primaryWhatsapp") {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    // Pincode validation - only numbers, max 6 digits
    if (name === "pincode") {
      processedValue = value.replace(/\D/g, '').slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : processedValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const selectShopType = (type) => {
    setFormData((prev) => ({ ...prev, shopType: type }));
    setShowShopTypeDropdown(false);
    if (errors.shopType) {
      setErrors((prev) => ({ ...prev, shopType: "" }));
    }
  };

  const selectCategory = (category) => {
    setFormData((prev) => ({ ...prev, businessCategory: category }));
    setShowCategoryDropdown(false);
    if (errors.businessCategory) {
      setErrors((prev) => ({ ...prev, businessCategory: "" }));
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:5002/api/create-store",
        { data: formData },
        { withCredentials: true }
      );
      console.log("Store created successfully:", res.data);
          dispatch(setShopPush(res.data.store));
      onClose(); 
    } catch (error) {
      console.error("Error creating store:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to create store. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIcon = ({ number, active, completed, icon: Icon }) => (
    <div className="flex flex-col items-center">
      <div
        className={`
        w-10 h-10 rounded-full flex items-center justify-center
        ${completed ? "bg-green-600" : active ? "bg-blue-500" : "bg-gray-100"}
        transition-all duration-200
      `}
      >
        {Icon ? (
          <Icon className="w-5 h-5 text-white" />
        ) : (
          <span
            className={`font-semibold ${
              completed || active ? "text-white" : "text-gray-400"
            }`}
          >
            {number}
          </span>
        )}
      </div>
      <div
        className={`text-xs mt-2 font-medium ${
          active
            ? "text-blue-600"
            : completed
            ? "text-blue-600"
            : "text-gray-500"
        }`}
      >
        Step {number}
      </div>
    </div>
  );

  const StepConnector = ({ active }) => (
    <div
      className={`flex-1 h-0.5 ${
        active ? "bg-blue-500" : "bg-gray-100"
      } mx-2 mt-5`}
    />
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl relative">
        {/* Header */}
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Store
              </h2>
              <p className="text-gray-600 mt-1 text-sm">
                Complete all steps to set up your business profile
              </p>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-8 max-w-lg mx-auto">
            <StepIcon
              number={1}
              active={step === 1}
              completed={step > 1}
              icon={Store}
            />
            <StepConnector active={step > 1} />
            <StepIcon
              number={2}
              active={step === 2}
              completed={step > 2}
              icon={Phone}
            />
            <StepConnector active={step > 2} />
            <StepIcon
              number={3}
              active={step === 3}
              completed={step > 3}
              icon={MapPin}
            />
            <StepConnector active={step > 3} />
            <StepIcon
              number={4}
              active={step === 4}
              completed={step > 4}
              icon={Globe}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Business Information
                </h3>
                <p className="text-gray-500 text-sm">
                  Enter your basic business details
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Shop Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="shopName"
                    placeholder="Enter your shop name"
                    value={formData.shopName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 ${
                      errors.shopName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.shopName && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.shopName}
                    </div>
                  )}
                </div>

                <div className="relative dropdown-container">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Shop Type <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`w-full px-4 py-3 border rounded-lg cursor-pointer flex items-center justify-between hover:border-gray-400 transition ${
                      errors.shopType ? "border-red-500" : "border-gray-300"
                    }`}
                    onClick={() =>
                      setShowShopTypeDropdown(!showShopTypeDropdown)
                    }
                  >
                    <span
                      className={
                        formData.shopType ? "text-gray-900" : "text-gray-400"
                      }
                    >
                      {formData.shopType || "Select shop type"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        showShopTypeDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {errors.shopType && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.shopType}
                    </div>
                  )}

                  {showShopTypeDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {SHOP_TYPES.map((type) => (
                        <div
                          key={type}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition"
                          onClick={() => selectShopType(type)}
                        >
                          <span
                            className={`${
                              formData.shopType === type
                                ? "text-blue-600 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {type}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative dropdown-container">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Business Category <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`w-full px-4 py-3 border rounded-lg cursor-pointer flex items-center justify-between hover:border-gray-400 transition ${
                      errors.businessCategory ? "border-red-500" : "border-gray-300"
                    }`}
                    onClick={() =>
                      setShowCategoryDropdown(!showCategoryDropdown)
                    }
                  >
                    <span
                      className={
                        formData.businessCategory
                          ? "text-gray-900"
                          : "text-gray-400"
                      }
                    >
                      {formData.businessCategory === "retail"
                        ? "Retail"
                        : formData.businessCategory === "wholesale"
                        ? "Wholesale"
                        : formData.businessCategory === "both"
                        ? "Both Retail & Wholesale"
                        : "Select category"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        showCategoryDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {errors.businessCategory && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.businessCategory}
                    </div>
                  )}

                  {showCategoryDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {[
                        { value: "retail", label: "Retail" },
                        { value: "wholesale", label: "Wholesale" },
                        { value: "both", label: "Both Retail & Wholesale" },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition"
                          onClick={() => selectCategory(option.value)}
                        >
                          <span
                            className={`${
                              formData.businessCategory === option.value
                                ? "text-blue-600 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Contact Information
                </h3>
                <p className="text-gray-500 text-sm">
                  How can customers reach your business?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Primary Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="primaryPhone"
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={formData.primaryPhone}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 ${
                      errors.primaryPhone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.primaryPhone ? (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.primaryPhone}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 mt-1">
                        10 digits required
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {formData.primaryPhone.length}/10
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    name="primaryWhatsapp"
                    type="tel"
                    placeholder="Optional 10-digit WhatsApp number"
                    value={formData.primaryWhatsapp}
                    onChange={handleChange}
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 ${
                      errors.primaryWhatsapp ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.primaryWhatsapp && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.primaryWhatsapp}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.primaryWhatsapp.length}/10
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Business Email
                  </label>
                  <input
                    name="businessEmail"
                    type="email"
                    placeholder="business@example.com"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 ${
                      errors.businessEmail ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.businessEmail && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.businessEmail}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Location Details
                </h3>
                <p className="text-gray-500 text-sm">
                  Where is your business located?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="pincode"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    maxLength={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.pincode ? (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.pincode}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 mt-1">
                        6 digits required
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {formData.pincode.length}/6
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="addressLine"
                    placeholder="Street address"
                    value={formData.addressLine}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 ${
                      errors.addressLine ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.addressLine && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.addressLine}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.city && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.city}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.state && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.state}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Online Presence
                </h3>
                <p className="text-gray-500 text-sm">
                  Do you have an existing business website?
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition">
                  <input
                    type="checkbox"
                    name="hasWebsite"
                    id="hasWebsite"
                    checked={formData.hasWebsite}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="hasWebsite"
                    className="cursor-pointer select-none"
                  >
                    <div className="font-medium text-gray-900">
                      I already have a website
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Check this if you have an existing business website
                    </p>
                  </label>
                </div>

                {formData.hasWebsite && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Website URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="websiteUrl"
                      placeholder="https://www.example.com"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      required={formData.hasWebsite}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 ${
                        errors.websiteUrl ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.websiteUrl && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.websiteUrl}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <span>{errors.submit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Actions */}
        <div className="border-t border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Step {step} of 4</div>

            <div className="flex gap-3">
              {step > 1 && (
                <button
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                  onClick={prevStep}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              )}

              {step < 4 ? (
                <button
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={nextStep}
                  disabled={isSubmitting}
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    "Create Store"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStoreForm;