import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Globe,
  Instagram,
  Facebook,
  Truck,
  Home,
  Info,
  Utensils,
  ShieldCheck,
  CreditCard,
  Monitor,
  HeadphonesIcon,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ModernDigitalPage = ({ pageData }) => {
  // --- Data Propagation (Using the exact data from your previous prompt) ---
  const data = pageData || {
    title: "Hangot",
    tagline: "Taste that makes you smile",
    description: "Our food platform is created for people who love good food and easy ordering.\nWe bring together trusted restaurants and skilled kitchens in one place.\nEvery meal is prepared with fresh ingredients and quality care.\nFrom quick bites to full meals, we deliver taste, comfort, and convenience to your doorstep.",
    primaryColor: "#F59E0B",
    fontFamily: "Inter",
    contact: {
      phone: "9049101246",
      whatsapp: "9595653309",
      email: "kashishr604@gmail.com"
    },
    address: {
      addressLine: "lovely professional university",
      city: "Phagwara",
      state: "Punjab",
      pincode: "144411",
      googleMapLink: "https://maps.google.com" // Simplified for demo
    },
    socialLinks: {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.Facebook.com/",
      website: "https://www.Hangout.com/"
    },
    paymentMethods: ['Cash', 'UPI', 'Card'],
    timings: {
      isOpen24x7: false,
      weekly: [
        { day: 'monday', openTime: '09:00', closeTime: '18:00', isClosed: true },
        { day: 'tuesday', openTime: '09:00', closeTime: '18:00', isClosed: false },
        { day: 'wednesday', openTime: '09:00', closeTime: '18:00', isClosed: false },
        { day: 'thursday', openTime: '09:00', closeTime: '18:00', isClosed: false },
        { day: 'friday', openTime: '09:00', closeTime: '18:00', isClosed: true },
        { day: 'saturday', openTime: '09:00', closeTime: '18:00', isClosed: false },
        { day: 'sunday', openTime: '', closeTime: '', isClosed: true }
      ]
    },
    deliveryAvailable: true,
    homeServiceAvailable: true,
    services: [
      "Online food ordering from multiple restaurants",
      "Fast and reliable home delivery",
      "Wide variety of cuisines and dishes",
      "Customer support for quick assistance"
    ],
    facilities: [
      "Clean and hygienic food preparation environment",
      "Secure and easy online payment system",
      "User-friendly website for smooth ordering",
      "Real-time order tracking facility",
      "Customer support for quick assistance"
    ]
  };

  // --- Simple Color Palette Mapping ---
  const colorPalette = {
    '#6366F1': {
      primary: '#6366F1',
      light: '#EEF2FF',
      dark: '#4F46E5',
      text: '#FFFFFF'
    },
    '#10B981': {
      primary: '#10B981',
      light: '#D1FAE5',
      dark: '#059669',
      text: '#FFFFFF'
    },
    '#F59E0B': {
      primary: '#F59E0B',
      light: '#FEF3C7',
      dark: '#D97706',
      text: '#FFFFFF'
    },
    '#EF4444': {
      primary: '#EF4444',
      light: '#FEE2E2',
      dark: '#DC2626',
      text: '#FFFFFF'
    },
    '#8B5CF6': {
      primary: '#8B5CF6',
      light: '#EDE9FE',
      dark: '#7C3AED',
      text: '#FFFFFF'
    }
  };

  const palette = colorPalette[data.primaryColor] || colorPalette['#6366F1'];

  // --- Helper: Map Services to Icons ---
  const getServiceIcon = (index) => {
    const icons = [
      <Utensils size={20} />, 
      <Truck size={20} />, 
      <Globe size={20} />, 
      <HeadphonesIcon size={20} />
    ];
    return icons[index] || <CheckCircle size={20} />;
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans`} style={{ fontFamily: data.fontFamily }}>
      
      {/* --- Modern Navbar (Glassmorphism) --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 transition-all">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-md"
                style={{ 
                  backgroundColor: palette.primary,
                  color: palette.text
                }}
              >
                {data.title.charAt(0)}
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight leading-none text-black">{data.title}</h1>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-500">Digital Profile</span>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 bg-slate-50 text-slate-500">
              {data.status}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section with Floating Card --- */}
      <div className="relative">
        {/* Banner Area */}
        <div className="h-[400px] w-full overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
          
        </div>

        {/* Floating Card - The Focal Point */}
        <div className="relative z-10 px-4 sm:px-6 -mt-20">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
            
            {/* Header Content inside Card */}
            <div className="p-8 sm:p-10 text-center border-b border-slate-50">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-2 tracking-tight">
                {data.title}
              </h1>
              <p className="text-lg text-gray-600 font-medium mb-8 max-w-lg mx-auto">
                {data.tagline}
              </p>

              {/* Action Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href={`tel:${data.contact.phone}`} 
                  className="group flex items-center justify-center gap-3 p-4 rounded-2xl hover:shadow-md transition-all duration-300"
                  style={{ 
                    backgroundColor: palette.light,
                    border: `1px solid ${palette.primary}20`
                  }}
                >
                  <div 
                    className="p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      backgroundColor: palette.primary,
                      color: palette.text
                    }}
                  >
                    <Phone size={22} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Phone</p>
                    <p className="font-semibold text-black">{data.contact.phone}</p>
                  </div>
                </a>

                <a 
                  href={data.address.googleMapLink} 
                  target="_blank" 
                  className="group flex items-center justify-center gap-3 p-4 rounded-2xl hover:shadow-md transition-all duration-300"
                  style={{ 
                    backgroundColor: palette.light,
                    border: `1px solid ${palette.primary}20`
                  }}
                >
                  <div 
                    className="p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      backgroundColor: palette.primary,
                      color: palette.text
                    }}
                  >
                    <MapPin size={22} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Location</p>
                    <p className="font-semibold text-black">{data.address.city}</p>
                  </div>
                </a>

                <a 
                  href={`mailto:${data.contact.email}`} 
                  className="group flex items-center justify-center gap-3 p-4 rounded-2xl hover:shadow-md transition-all duration-300"
                  style={{ 
                    backgroundColor: palette.light,
                    border: `1px solid ${palette.primary}20`
                  }}
                >
                  <div 
                    className="p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      backgroundColor: palette.primary,
                      color: palette.text
                    }}
                  >
                    <Mail size={22} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Email</p>
                    <p className="font-semibold text-black truncate w-32">{data.contact.email}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Availability Pills */}
        {(data.deliveryAvailable || data.homeServiceAvailable) && (
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {data.deliveryAvailable && (
              <div 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold text-sm shadow-sm"
                style={{ 
                  backgroundColor: palette.light,
                  color: palette.primary,
                  borderColor: `${palette.primary}30`
                }}
              >
                <Truck size={18} />
                <span>Delivery Available</span>
              </div>
            )}
            {data.homeServiceAvailable && (
              <div 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold text-sm shadow-sm"
                style={{ 
                  backgroundColor: palette.light,
                  color: palette.primary,
                  borderColor: `${palette.primary}30`
                }}
              >
                <Home size={18} />
                <span>Home Service Available</span>
              </div>
            )}
          </div>
        )}

        {/* About Section */}
        <section className="mb-16 text-center max-w-2xl mx-auto">
          <div 
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ backgroundColor: palette.light }}
          >
            <Info size={24} style={{ color: palette.primary }} />
          </div>
          
          <h2 className="text-3xl font-bold text-black mb-4">About Us</h2>
          <p className="text-gray-600 leading-8 text-lg font-light whitespace-pre-line">
            {data.description}
          </p>
        </section>

        {/* Services & Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Services */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3 pb-4 border-b border-slate-50">
              <Utensils size={20} style={{ color: palette.primary }} />
              Our Services
            </h3>
            <div className="space-y-5">
              {data.services.map((service, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div 
                    className="mt-1 transition-colors duration-300"
                    style={{ color: `${palette.primary}80` }}
                  >
                    {getServiceIcon(idx)}
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{service}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Facilities */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3 pb-4 border-b border-slate-50">
              <ShieldCheck size={20} style={{ color: palette.primary }} />
              Facilities
            </h3>
            <div className="space-y-5">
              {data.facilities.map((facility, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div 
                    className="mt-1 transition-colors duration-300"
                    style={{ color: `${palette.primary}80` }}
                  >
                    <CheckCircle size={18} />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{facility}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Timings */}
        <section className="mt-16">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <Clock size={24} style={{ color: palette.primary }} />
              Opening Hours
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.timings.weekly.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`flex justify-between items-center px-5 py-3.5 rounded-xl border ${day.isClosed ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100'}`}
                >
                  <span className={`font-medium capitalize ${day.isClosed ? 'text-gray-400' : 'text-gray-700'}`}>{day.day}</span>
                  
                  {day.isClosed ? (
                    <span className="text-red-500 font-bold text-xs uppercase tracking-wide flex items-center gap-1">
                      <XCircle size={14}/> Closed
                    </span>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span 
                        className="font-medium text-sm px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: palette.light,
                          color: palette.primary
                        }}
                      >
                        {day.openTime} - {day.closeTime}
                      </span>
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ 
                          backgroundColor: palette.primary,
                          boxShadow: `0 0 10px ${palette.primary}80`
                        }}
                      ></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* --- Modern Footer --- */}
      <footer className="bg-gray-900 text-white pt-20 pb-10 mt-12 rounded-t-3xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{data.title}</h3>
              <p className="text-gray-400 text-sm leading-7 mb-8 max-w-xs">
                {data.description.substring(0, 100)}...
              </p>
              <div className="flex gap-4">
                {data.socialLinks.website && (
                  <a 
                    href={data.socialLinks.website} 
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:scale-110 transition-all"
                    style={{ backgroundColor: palette.primary }}
                  >
                    <Globe size={20}/>
                  </a>
                )}
                {data.socialLinks.instagram && (
                  <a 
                    href={data.socialLinks.instagram} 
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:scale-110 transition-all"
                    style={{ backgroundColor: palette.primary }}
                  >
                    <Instagram size={20}/>
                  </a>
                )}
                {data.socialLinks.facebook && (
                  <a 
                    href={data.socialLinks.facebook} 
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:scale-110 transition-all"
                    style={{ backgroundColor: palette.primary }}
                  >
                    <Facebook size={20}/>
                  </a>
                )}
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: palette.primary }} />
                  <span className="text-white">{data.address.addressLine}, {data.address.city}, {data.address.state} - {data.address.pincode}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="flex-shrink-0" style={{ color: palette.primary }} />
                  <span className="text-white">{data.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="flex-shrink-0" style={{ color: palette.primary }} />
                  <span className="text-white">{data.contact.email}</span>
                </li>
              </ul>
            </div>

            {/* Payment */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                {data.paymentMethods.map((method, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-xs font-bold text-gray-300 flex items-center gap-2"
                  >
                    <CreditCard size={14}/> {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} {data.title}. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ModernDigitalPage;