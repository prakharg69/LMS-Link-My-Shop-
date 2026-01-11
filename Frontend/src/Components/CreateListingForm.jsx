import React, { useState, useEffect } from 'react';
import { X, Eye, Smartphone, Monitor, ChevronDown, Clock, Check, Globe, Lock } from 'lucide-react';
import ShopSelectDropdown from './ShopSelectDropdown';

function CreateListingForm({ shops, onClose }) {
  const [formData, setFormData] = useState({
    shopId: '',
    title: '',
    tagline: '',
    description: '',
    logo: '',
    bannerImage: '',
    contact: {
      phone: '',
      whatsapp: '',
      email: ''
    },
    address: {
      addressLine: '',
      city: '',
      state: '',
      pincode: '',
      googleMapLink: ''
    },
    timings: {
      isOpen24x7: false,
      weekly: [
        { day: 'monday', openTime: '09:00', closeTime: '18:00', isClosed: false },
        { day: 'tuesday', openTime: '09:00', closeTime: '18:00', isClosed: false },
        { day: 'wednesday', openTime: '09:00', closeTime: '18:00', isClosed: false },
        { day: 'thursday', openTime: '09:00', closeTime: '18:00', isClosed: false },
        { day: 'friday', openTime: '09:00', closeTime: '18:00', isClosed: false },
        { day: 'saturday', openTime: '10:00', closeTime: '17:00', isClosed: false },
        { day: 'sunday', openTime: '', closeTime: '', isClosed: true }
      ]
    },
    services: [],
    facilities: [],
    paymentMethods: [],
    deliveryAvailable: false,
    homeServiceAvailable: false,
    socialLinks: {
      instagram: '',
      facebook: '',
      website: ''
    },
    theme: 'default',
    primaryColor: '#6366F1',
    fontFamily: 'Inter',
    layout: 'simple',
    status: 'draft',
    isPublic: false
  });

  const [selectedShop, setSelectedShop] = useState(null);
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile'
  const [currentService, setCurrentService] = useState('');
  const [currentFacility, setCurrentFacility] = useState('');
  const [currentPayment, setCurrentPayment] = useState('');

  // Update form when shop is selected
  useEffect(() => {
    if (selectedShop) {
      setFormData(prev => ({
        ...prev,
        shopId: selectedShop._id,
        title: selectedShop.shopName || '',
        contact: {
          phone: selectedShop.phone || '',
          whatsapp: selectedShop.whatsapp || '',
          email: selectedShop.email || ''
        },
        address: {
          addressLine: selectedShop.address || '',
          city: selectedShop.city || '',
          state: selectedShop.state || '',
          pincode: selectedShop.pincode || ''
        }
      }));
    }
  }, [selectedShop]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else if (name.includes('contact.')) {
      const [, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value
        }
      }));
    } else if (name.includes('address.')) {
      const [, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else if (name.includes('timings.weekly')) {
      const dayIndex = parseInt(name.split('.')[2]);
      const field = name.split('.')[3];
      
      setFormData(prev => {
        const newWeekly = [...prev.timings.weekly];
        if (field === 'isClosed') {
          newWeekly[dayIndex] = { ...newWeekly[dayIndex], isClosed: checked };
        } else {
          newWeekly[dayIndex] = { ...newWeekly[dayIndex], [field]: value };
        }
        return {
          ...prev,
          timings: { ...prev.timings, weekly: newWeekly }
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const addService = () => {
    if (currentService.trim()) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, currentService.trim()]
      }));
      setCurrentService('');
    }
  };

  const removeService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const addFacility = () => {
    if (currentFacility.trim()) {
      setFormData(prev => ({
        ...prev,
        facilities: [...prev.facilities, currentFacility.trim()]
      }));
      setCurrentFacility('');
    }
  };

  const removeFacility = (index) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
  };

  const addPaymentMethod = () => {
    if (currentPayment.trim()) {
      setFormData(prev => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, currentPayment.trim()]
      }));
      setCurrentPayment('');
    }
  };

  const removePaymentMethod = (index) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // API call to save the digital page
    // try {
    //   const response = await axios.post('/api/digital-pages', formData);
    //   console.log('Saved:', response.data);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Side - Form */}
      <div className="lg:w-2/3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create Digital Shop Page</h2>
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg ${viewMode === 'desktop' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'}`}
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-lg ${viewMode === 'mobile' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'}`}
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="w-5 h-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Basic Info */}
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Services Offered</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentService}
                  onChange={(e) => setCurrentService(e.target.value)}
                  placeholder="Add a service"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={addService}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>
              {formData.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg">
                      <span className="text-sm">{service}</span>
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="text-purple-500 hover:text-purple-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, status: 'published'})}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Publish Now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Live Preview */}
      <div className="lg:w-1/3">
        <div className="sticky top-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              <div className="flex items-center gap-2 text-sm">
                {formData.isPublic ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <Globe className="w-4 h-4" />
                    Public
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600">
                    <Lock className="w-4 h-4" />
                    Draft
                  </span>
                )}
              </div>
            </div>

            {/* Desktop Preview Frame */}
            <div className={`relative bg-gray-50 rounded-lg border border-gray-300 overflow-hidden transition-all duration-300 ${
              viewMode === 'desktop' ? 'p-4' : 'p-2'
            }`}>
              {/* Preview Window Frame */}
              <div className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${
                viewMode === 'desktop' ? 'w-full aspect-video' : 'w-64 aspect-[9/16] mx-auto'
              }`}>
                {/* Preview Content */}
                <div className="h-full overflow-auto p-4">
                  {/* Banner Image */}
                  {formData.bannerImage ? (
                    <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4"></div>
                  ) : (
                    <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>
                  )}
                  
                  {/* Shop Info */}
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {formData.title || 'Shop Name'}
                    </h2>
                    {formData.tagline && (
                      <p className="text-gray-600 text-sm">{formData.tagline}</p>
                    )}
                  </div>
                  
                  {/* Description */}
                  {formData.description && (
                    <div className="mb-4">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {formData.description.length > 100 
                          ? `${formData.description.substring(0, 100)}...` 
                          : formData.description}
                      </p>
                    </div>
                  )}
                  
                  {/* Services Preview */}
                  {formData.services.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {formData.services.slice(0, 3).map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                            {service}
                          </span>
                        ))}
                        {formData.services.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{formData.services.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Contact Preview */}
                  {(formData.contact.phone || formData.contact.email) && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">Contact</h4>
                      <div className="space-y-1 text-sm">
                        {formData.contact.phone && (
                          <p className="text-gray-600">📞 {formData.contact.phone}</p>
                        )}
                        {formData.contact.email && (
                          <p className="text-gray-600">✉️ {formData.contact.email}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Timings Preview */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Timings
                    </h4>
                    {formData.timings.isOpen24x7 ? (
                      <p className="text-green-600 text-sm">Open 24/7</p>
                    ) : (
                      <p className="text-gray-600 text-sm">
                        {formData.timings.weekly[0]?.openTime 
                          ? `${formData.timings.weekly[0].openTime} - ${formData.timings.weekly[0].closeTime}`
                          : 'Set timings'
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Preview Label */}
              <div className="absolute bottom-2 left-2">
                <span className="text-xs text-gray-500">
                  {viewMode === 'desktop' ? 'Desktop View' : 'Mobile View'}
                </span>
              </div>
            </div>
            
            {/* Preview Instructions */}
            <div className="mt-4 text-sm text-gray-600">
              <p>Changes in the form will update live in this preview.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateListingForm;