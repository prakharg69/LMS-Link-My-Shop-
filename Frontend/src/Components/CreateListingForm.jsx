import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  X,
  Upload,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ShopSelectDropdown from "./ShopSelectDropdown";
import ClassicDigitalPage from "../Pages/ClassicDigitalPage";
import ModernDigitalPage from "../Pages/ModernDigitalPage";
import MinimalDigitalPage from "../Pages/MinimalDigitalPage";
import axios from "axios";

function CreateListingForm({ shops, onClose }) {
  const [formData, setFormData] = useState({
    shopId: "",
    title: "",
    tagline: "",
    description: "",
    logo: null,
    bannerImage: null,
    contact: {
      phone: "",
      whatsapp: "",
      email: "",
    },
    address: {
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      googleMapLink: "",
    },
    timings: {
      isOpen24x7: false,
      weekly: [],
    },
    services: [],
    facilities: [],
    paymentMethods: [],
    deliveryAvailable: false,
    homeServiceAvailable: false,
    socialLinks: {
      instagram: "",
      facebook: "",
      website: "",
    },
    theme: "modern",
    primaryColor: "#6366F1",
    fontFamily: "Inter",
    layout: "simple",
    status: "draft",
    isPublic: false,
  });

  const [selectedShop, setSelectedShop] = useState(null);
  const [currentService, setCurrentService] = useState("");
  const [currentFacility, setCurrentFacility] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [applyToAll, setApplyToAll] = useState({ openTime: "", closeTime: "" });


  const sections = [
    { id: "basic", title: "Basic Information" },
    { id: "contact", title: "Contact Details" },
    { id: "timings", title: "Shop Timings" },
    { id: "business", title: "Business Details" },
    { id: "social", title: "Social Links" },
    { id: "design", title: "Design Settings" },
  ];

  // Predefined payment methods with icons
  const paymentOptions = [
    { name: "Cash", icon: "💵" },
    { name: "UPI", icon: "📱" },
    { name: "Card", icon: "💳" },
    { name: "Net Banking", icon: "🌐" },
  ];

  const themeOptions = ["modern", "classic", "minimal"];
  const layoutOptions = ["simple", "image-first", "text-first"];
  const fontOptions = ["Inter", "Roboto", "Poppins", "Montserrat", "Open Sans"];
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Initialize weekly timings
  useEffect(() => {
    if (formData.timings.weekly.length === 0) {
      const weekly = daysOfWeek.map((day) => ({
        day,
        openTime: day === "sunday" ? "" : "09:00",
        closeTime: day === "sunday" ? "" : "18:00",
        isClosed: day === "sunday",
      }));
      setFormData((prev) => ({
        ...prev,
        timings: { ...prev.timings, weekly },
      }));
      setApplyToAll({ openTime: "09:00", closeTime: "18:00" });
    }
  }, []);

  // Update form when shop is selected
  useEffect(() => {
    if (selectedShop) {
      console.log("selected shop", selectedShop);

      setFormData((prev) => ({
        ...prev,
        shopId: selectedShop._id,
        title: selectedShop.shopName || "",
        contact: {
          phone: selectedShop.primaryPhone || "",
          whatsapp: selectedShop.primaryWhatsapp || "",
          email: selectedShop.businessEmail || "",
        },
        address: {
          addressLine: selectedShop.location.addressLine || "",
          city: selectedShop.location.city || "",
          state: selectedShop.location.state || "",
          pincode: selectedShop.location.pincode || "",
        },
      }));
    }
  }, [selectedShop]);
   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    // BASIC FIELDS
    data.append("shopId", formData.shopId);
    data.append("title", formData.title);
    data.append("tagline", formData.tagline);
    data.append("description", formData.description);
    data.append("theme", formData.theme);
    data.append("layout", formData.layout);
    data.append("primaryColor", formData.primaryColor);
    data.append("status", formData.status);

    // BOOLEAN (convert to string)
    data.append("deliveryAvailable", String(formData.deliveryAvailable));
    data.append("homeServiceAvailable", String(formData.homeServiceAvailable));

    // OBJECTS / ARRAYS
    data.append("contact", JSON.stringify(formData.contact));
    data.append("address", JSON.stringify(formData.address));
    data.append("socialLinks", JSON.stringify(formData.socialLinks));
    data.append("timings", JSON.stringify(formData.timings));
    data.append("services", JSON.stringify(formData.services));
    data.append("facilities", JSON.stringify(formData.facilities));
    data.append("paymentMethods", JSON.stringify(formData.paymentMethods));

    // FILES
    if (formData.logo) data.append("logo", formData.logo);
    if (formData.bannerImage) data.append("bannerImage", formData.bannerImage);

    const res = await axios.post(
      "http://localhost:5002/api/create-digital",
      data,
      { withCredentials: true }
    );

    console.log("SUCCESS:", res.data);
  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);
  }
};


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "logo") {
          setLogoPreview(reader.result);
        } else if (field === "bannerImage") {
          setBannerPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add service
  const addService = () => {
    if (currentService.trim()) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, currentService.trim()],
      }));
      setCurrentService("");
    }
  };

  // Remove service
  const removeService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  // Add facility
  const addFacility = () => {
    if (currentFacility.trim()) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, currentFacility.trim()],
      }));
      setCurrentFacility("");
    }
  };

  // Remove facility
  const removeFacility = (index) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index),
    }));
  };

  // Toggle payment method
  const togglePaymentMethod = (methodName) => {
    setFormData((prev) => {
      const paymentMethods = prev.paymentMethods.includes(methodName)
        ? prev.paymentMethods.filter((m) => m !== methodName)
        : [...prev.paymentMethods, methodName];
      return { ...prev, paymentMethods };
    });
  };

  // Handle timing changes with apply to all feature
  const handleTimingChange = (index, field, value) => {
    const newWeekly = [...formData.timings.weekly];
    newWeekly[index] = { ...newWeekly[index], [field]: value };

    // If changing open/close time and it's not Sunday, update applyToAll
    if (
      (field === "openTime" || field === "closeTime") &&
      newWeekly[index].day !== "sunday"
    ) {
      setApplyToAll((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    setFormData((prev) => ({
      ...prev,
      timings: { ...prev.timings, weekly: newWeekly },
    }));
  };

  // Apply timing to all weekdays (except Sunday)
  const applyTimingToAll = () => {
    const newWeekly = formData.timings.weekly.map((day) => {
      if (day.day === "sunday") return day; // Don't change Sunday
      return {
        ...day,
        openTime: applyToAll.openTime,
        closeTime: applyToAll.closeTime,
        isClosed: false,
      };
    });

    setFormData((prev) => ({
      ...prev,
      timings: { ...prev.timings, weekly: newWeekly },
    }));
  };



  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const goToSection = (index) => {
    setCurrentSection(index);
  };

  // Render current section
  const renderSection = () => {
    switch (sections[currentSection].id) {
      case "basic":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h3>

            {/* Shop Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Select Shop *
              </label>
              <ShopSelectDropdown
                shops={shops}
                selectedShop={selectedShop}
                onSelect={setSelectedShop}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Page Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "logo")}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload logo</span>
                    {logoPreview && (
                      <div className="mt-2">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="h-16 w-16 object-cover rounded"
                        />
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Banner Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "bannerImage")}
                    className="hidden"
                    id="banner-upload"
                  />
                  <label
                    htmlFor="banner-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload banner</span>
                    {bannerPreview && (
                      <div className="mt-2">
                        <img
                          src={bannerPreview}
                          alt="Banner preview"
                          className="h-16 w-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Phone
                </label>
                <input
                  type="tel"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="contact.whatsapp"
                  value={formData.contact.whatsapp}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Address</h4>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Address Line
                </label>
                <input
                  type="text"
                  name="address.addressLine"
                  value={formData.address.addressLine}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Google Maps Link
                </label>
                <input
                  type="url"
                  name="address.googleMapLink"
                  value={formData.address.googleMapLink}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case "timings":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Shop Timings
            </h3>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isOpen24x7"
                name="timings.isOpen24x7"
                checked={formData.timings.isOpen24x7}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label
                htmlFor="isOpen24x7"
                className="text-sm font-medium text-gray-900"
              >
                Open 24/7
              </label>
            </div>

            {!formData.timings.isOpen24x7 && (
              <div className="space-y-6">
                {/* Apply to all section */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Apply Same Time to All Weekdays
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700">Open:</label>
                      <input
                        type="time"
                        value={applyToAll.openTime}
                        onChange={(e) =>
                          setApplyToAll((prev) => ({
                            ...prev,
                            openTime: e.target.value,
                          }))
                        }
                        className="px-3 py-1.5 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700">Close:</label>
                      <input
                        type="time"
                        value={applyToAll.closeTime}
                        onChange={(e) =>
                          setApplyToAll((prev) => ({
                            ...prev,
                            closeTime: e.target.value,
                          }))
                        }
                        className="px-3 py-1.5 border border-gray-300 rounded"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={applyTimingToAll}
                      className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Apply to All
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Will apply to all weekdays except Sunday
                  </p>
                </div>

                {/* Daily schedule */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Daily Schedule</h4>
                  <div className="space-y-2">
                    {formData.timings.weekly.map((day, index) => (
                      <div
                        key={day.day}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded"
                      >
                        <div className="w-24">
                          <span className="font-medium text-gray-900 capitalize">
                            {day.day}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={day.isClosed}
                            onChange={(e) =>
                              handleTimingChange(
                                index,
                                "isClosed",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <label className="text-sm text-gray-600">
                            {day.day === "sunday" ? "Weekly Off" : "Closed"}
                          </label>
                        </div>

                        {!day.isClosed && (
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={day.openTime}
                              onChange={(e) =>
                                handleTimingChange(
                                  index,
                                  "openTime",
                                  e.target.value
                                )
                              }
                              className="px-3 py-1.5 border border-gray-300 rounded"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              value={day.closeTime}
                              onChange={(e) =>
                                handleTimingChange(
                                  index,
                                  "closeTime",
                                  e.target.value
                                )
                              }
                              className="px-3 py-1.5 border border-gray-300 rounded"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "business":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Business Details
            </h3>

            {/* Services */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Services Offered</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentService}
                  onChange={(e) => setCurrentService(e.target.value)}
                  placeholder="e.g., Mobile Repair, Home Delivery"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && addService()}
                />
                <button
                  type="button"
                  onClick={addService}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {formData.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded"
                    >
                      <span className="text-sm">{service}</span>
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Facilities */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Facilities</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentFacility}
                  onChange={(e) => setCurrentFacility(e.target.value)}
                  placeholder="e.g., Parking, AC, Free WiFi"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && addFacility()}
                />
                <button
                  type="button"
                  onClick={addFacility}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {formData.facilities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.facilities.map((facility, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded"
                    >
                      <span className="text-sm">{facility}</span>
                      <button
                        type="button"
                        onClick={() => removeFacility(index)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Methods - Predefined Buttons */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Payment Methods</h4>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {paymentOptions.map((method) => (
                  <button
                    key={method.name}
                    type="button"
                    onClick={() => togglePaymentMethod(method.name)}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                      formData.paymentMethods.includes(method.name)
                        ? "bg-purple-100 border-purple-500 text-purple-700"
                        : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg mb-1">{method.icon}</span>
                    <span className="text-xs font-medium">{method.name}</span>
                  </button>
                ))}
              </div>

              {/* Selected Payment Methods */}
              {formData.paymentMethods.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Selected Methods:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1.5 rounded"
                      >
                        <span className="text-sm">{method}</span>
                        <button
                          type="button"
                          onClick={() => togglePaymentMethod(method)}
                          className="text-purple-500 hover:text-purple-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Service Options */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Service Options</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="deliveryAvailable"
                    name="deliveryAvailable"
                    checked={formData.deliveryAvailable}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label
                    htmlFor="deliveryAvailable"
                    className="text-sm font-medium text-gray-900"
                  >
                    Delivery Available
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="homeServiceAvailable"
                    name="homeServiceAvailable"
                    checked={formData.homeServiceAvailable}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label
                    htmlFor="homeServiceAvailable"
                    className="text-sm font-medium text-gray-900"
                  >
                    Home Service Available
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "social":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Social Links
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Instagram
                </label>
                <input
                  type="url"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Facebook
                </label>
                <input
                  type="url"
                  name="socialLinks.facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="https://facebook.com/username"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Website
                </label>
                <input
                  type="url"
                  name="socialLinks.website"
                  value={formData.socialLinks.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        );

      case "design":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Design Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Theme
                </label>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  {themeOptions.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

             

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-900">
                  Font Family
                </label>
                <select
                  name="fontFamily"
                  value={formData.fontFamily}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Color Picker Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    id="primary-color-picker"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleInputChange}
                    className="absolute inset-0 w-10 h-10 opacity-0 cursor-pointer z-10"
                  />
                  <label
                    htmlFor="primary-color-picker"
                    className="relative w-10 h-10 rounded border border-gray-300 cursor-pointer flex items-center justify-center hover:border-blue-500 transition-colors group"
                    style={{ backgroundColor: formData.primaryColor }}
                    title="Click to choose color"
                  >
                    <div className="w-6 h-6 rounded border border-white/50 group-hover:border-white/80 transition-colors" />
                    <span className="sr-only">Color picker</span>
                  </label>
                </div>
                <input
                  type="text"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="#HEXCODE"
                />
                <div className="flex gap-1">
                  {['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData(prev => ({...prev, primaryColor: color}))}
                      className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      aria-label={`Select ${color}`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>Current: </span>
                <code className="px-2 py-1 bg-gray-100 rounded font-mono">
                  {formData.primaryColor}
                </code>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Side - Form */}
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Progress Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => goToSection(index)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      currentSection === index
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                Step {currentSection + 1} of {sections.length}
              </div>
            </div>
            <div className="text-center font-medium text-gray-900">
              {sections[currentSection].title}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Current Section Content */}
            <div className="min-h-100">{renderSection()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevSection}
                disabled={currentSection === 0}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  currentSection === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {currentSection === sections.length - 1 ? (
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleSubmit(new Event("submit"));
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700"
                  >
                    Publish Now
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={nextSection}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Live Preview */}
      <div className="lg:w-1/3">
        <LivePreview
          formData={formData}
          logoPreview={logoPreview}
          bannerPreview={bannerPreview}
        />
      </div>
    </div>
  );
}

// Live Preview Component using REAL components
const LivePreview = ({ formData, logoPreview, bannerPreview }) => {
  // Prepare data for the actual components
  const previewData = {
    title: formData.title || "Shop Name",
    tagline: formData.tagline || "Your business tagline",
    description: formData.description || "Business description goes here...",
    primaryColor: formData.primaryColor,
    fontFamily: formData.fontFamily,
    contact: formData.contact,
    address: formData.address,
    socialLinks: formData.socialLinks,
    paymentMethods: formData.paymentMethods,
    timings: formData.timings,
    deliveryAvailable: formData.deliveryAvailable,
    homeServiceAvailable: formData.homeServiceAvailable,
    services: formData.services,
    facilities: formData.facilities,
    status: formData.status,
    bannerImage: bannerPreview || { name: 'banner-preview.jpg' },
    logo: logoPreview || null,
    shopId: "preview-" + Date.now(),
    isPublic: false,
    theme: formData.theme,
    layout: formData.layout
  };

  // Render the actual component based on theme
  const renderActualComponent = () => {
    switch (formData.theme) {
      case 'modern':
        return <ModernDigitalPage pageData={previewData} />;
      case 'minimal':
        return <MinimalDigitalPage pageData={previewData} />;
      case 'classic':
        return <ClassicDigitalPage pageData={previewData} />;
      default:
        return <ModernDigitalPage pageData={previewData} />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
            {formData.theme.charAt(0).toUpperCase() + formData.theme.slice(1)}
          </div>
          <div 
            className="text-xs px-2 py-1 rounded border"
            style={{ 
              backgroundColor: formData.primaryColor + '20',
              color: formData.primaryColor,
              borderColor: formData.primaryColor + '40'
            }}
          >
            {formData.primaryColor}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p>Real-time preview of your {formData.theme} theme:</p>
      </div>

      {/* Preview Container */}
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 mb-4">
        {/* Browser-like header */}
        <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            Preview • {formData.title || 'Shop'}
          </div>
          <div className="w-8"></div>
        </div>

        {/* Actual Component Rendered Here - Scaled Down */}
        <div className="relative" style={{ height: '320px', overflow: 'hidden' }}>
          <div 
            style={{ 
              transform: 'scale(0.32)',
              transformOrigin: 'top left',
              width: '312.5%',
              height: '312.5%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            {renderActualComponent()}
          </div>
          
          {/* Overlay to prevent interaction */}
          <div className="absolute inset-0 pointer-events-none"></div>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="flex justify-center gap-2 mb-4">
        {['modern', 'minimal', 'classic'].map((theme) => (
          <div 
            key={theme} 
            className={`text-xs px-3 py-1.5 rounded-lg ${formData.theme === theme ? 'font-bold' : 'text-gray-500 bg-gray-100'}`}
            style={formData.theme === theme ? { 
              backgroundColor: formData.primaryColor + '20',
              color: formData.primaryColor
            } : {}}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </div>
        ))}
      </div>

      {/* Quick Info */}
      <div className="text-xs text-gray-600 space-y-1">
        <div className="flex justify-between">
          <span>Title:</span>
          <span className="font-medium truncate max-w-37.5">{formData.title || 'Not set'}</span>
        </div>
        <div className="flex justify-between">
          <span>Services:</span>
          <span className="font-medium">{formData.services.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Facilities:</span>
          <span className="font-medium">{formData.facilities.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Font:</span>
          <span className="font-medium">{formData.fontFamily}</span>
        </div>
      </div>
    </div>
  );
};

export default CreateListingForm;