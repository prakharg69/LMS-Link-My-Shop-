import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Store, Phone, MapPin, Globe, ChevronDown } from "lucide-react";

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
  "Other"
];

function CreateStoreForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [showShopTypeDropdown, setShowShopTypeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

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
    websiteUrl: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
 
  const selectShopType = (type) => {
    setFormData(prev => ({ ...prev, shopType: type }));
    setShowShopTypeDropdown(false);
  };

  const selectCategory = (category) => {
    setFormData(prev => ({ ...prev, businessCategory: category }));
    setShowCategoryDropdown(false);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    console.log("FINAL DATA:", formData);
    
  };

  const StepIcon = ({ number, active, completed, icon: Icon }) => (
    <div className="flex flex-col items-center">
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center
        ${completed ? "bg-blue-600" : active ? "bg-blue-500" : "bg-gray-100"}
        transition-all duration-200
      `}>
        {Icon ? (
          <Icon className="w-5 h-5 text-white" />
        ) : (
          <span className={`font-semibold ${completed || active ? "text-white" : "text-gray-400"}`}>
            {number}
          </span>
        )}
      </div>
      <div className={`text-xs mt-2 font-medium ${active ? "text-blue-600" : completed ? "text-blue-600" : "text-gray-500"}`}>
        Step {number}
      </div>
    </div>
  );

  const StepConnector = ({ active }) => (
    <div className={`flex-1 h-0.5 ${active ? "bg-blue-500" : "bg-gray-100"} mx-2 mt-5`} />
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl relative">
        
        {/* Header */}
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create New Store</h2>
              <p className="text-gray-600 mt-1 text-sm">Complete all steps to set up your business profile</p>
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
            <StepIcon number={1} active={step === 1} completed={step > 1} icon={Store} />
            <StepConnector active={step > 1} />
            <StepIcon number={2} active={step === 2} completed={step > 2} icon={Phone} />
            <StepConnector active={step > 2} />
            <StepIcon number={3} active={step === 3} completed={step > 3} icon={MapPin} />
            <StepConnector active={step > 3} />
            <StepIcon number={4} active={step === 4} completed={step > 4} icon={Globe} />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Information</h3>
                <p className="text-gray-500 text-sm">Enter your basic business details</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Shop Name</label>
                  <input
                    name="shopName"
                    placeholder="Enter your shop name"
                    value={formData.shopName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Shop Type</label>
                  <div 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between hover:border-gray-400 transition"
                    onClick={() => setShowShopTypeDropdown(!showShopTypeDropdown)}
                  >
                    <span className={formData.shopType ? "text-gray-900" : "text-gray-400"}>
                      {formData.shopType || "Select shop type"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showShopTypeDropdown ? "rotate-180" : ""}`} />
                  </div>
                  
                  {showShopTypeDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {SHOP_TYPES.map((type) => (
                        <div
                          key={type}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition"
                          onClick={() => selectShopType(type)}
                        >
                          <span className={`${formData.shopType === type ? "text-blue-600 font-medium" : "text-gray-700"}`}>
                            {type}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Category</label>
                  <div 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between hover:border-gray-400 transition"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  >
                    <span className={formData.businessCategory ? "text-gray-900" : "text-gray-400"}>
                      {formData.businessCategory === "retail" ? "Retail" : 
                       formData.businessCategory === "wholesale" ? "Wholesale" :
                       formData.businessCategory === "both" ? "Both Retail & Wholesale" : 
                       "Select category"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`} />
                  </div>
                  
                  {showCategoryDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {[
                        { value: "retail", label: "Retail" },
                        { value: "wholesale", label: "Wholesale" },
                        { value: "both", label: "Both Retail & Wholesale" }
                      ].map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition"
                          onClick={() => selectCategory(option.value)}
                        >
                          <span className={`${formData.businessCategory === option.value ? "text-blue-600 font-medium" : "text-gray-700"}`}>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Contact Information</h3>
                <p className="text-gray-500 text-sm">How can customers reach your business?</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Phone</label>
                  <input
                    name="primaryPhone"
                    placeholder="Enter phone number"
                    value={formData.primaryPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp Number</label>
                  <input
                    name="primaryWhatsapp"
                    placeholder="Optional WhatsApp number"
                    value={formData.primaryWhatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Email</label>
                  <input
                    name="businessEmail"
                    type="email"
                    placeholder="business@example.com"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Location Details</h3>
                <p className="text-gray-500 text-sm">Where is your business located?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pincode</label>
                  <input
                    name="pincode"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                  <input
                    name="addressLine"
                    placeholder="Street address"
                    value={formData.addressLine}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                  <input
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Online Presence</h3>
                <p className="text-gray-500 text-sm">Do you have an existing business website?</p>
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
                  <label htmlFor="hasWebsite" className="cursor-pointer select-none">
                    <div className="font-medium text-gray-900">I already have a website</div>
                    <p className="text-sm text-gray-500 mt-0.5">Check this if you have an existing business website</p>
                  </label>
                </div>

                {formData.hasWebsite && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Website URL</label>
                    <input
                      name="websiteUrl"
                      placeholder="https://www.example.com"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Actions */}
        <div className="border-t border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Step {step} of 4
            </div>
            
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
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  onClick={nextStep}
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  onClick={handleSubmit}
                >
                  Create Store
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