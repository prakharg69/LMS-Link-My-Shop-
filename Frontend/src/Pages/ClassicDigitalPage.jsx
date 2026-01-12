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
  FileText,
  CheckCircle
} from 'lucide-react';

const ClassicDigitalPage = ({ pageData }) => {
  // --- Data Injection ---
  const data = pageData || {
    title: "Hangot",
    tagline: "Taste that makes you smile",
    description: "Our food platform is created for people who love good food and easy ordering.\nWe bring together trusted restaurants and skilled kitchens in one place.\nEvery meal is prepared with fresh ingredients and quality care.",
    // Change this primaryColor to test themes: "#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"
    primaryColor: "#EF4444", // Defaulting to Red for demo
    shopId: "695ab9ed14a0902c1dc96850",
    status: "Draft",
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
      googleMapLink: "https://maps.google.com"
    },
    socialLinks: {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.Facebook.com/",
      website: ""
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
      "Fast and reliable home delivery"
    ],
    facilities: [] // Empty array test
  };

  // --- Color Palette Logic ---
  const colorPalettes = {
    "#6366F1": { // Indigo
      bg: "#F8FAFC", // Slate 50
      surface: "#FFFFFF",
      text: "#1e293b", // Slate 800
      subtext: "#64748b", // Slate 500
      accent: "#EEF2FF", // Indigo 50
      border: "#e2e8f0", // Slate 200
      darkText: "#312e81" // Indigo 900
    },
    "#10B981": { // Emerald
      bg: "#ECFDF5", // Emerald 50
      surface: "#FFFFFF",
      text: "#064e3b", // Emerald 900
      subtext: "#047857", // Emerald 700
      accent: "#D1FAE5", // Emerald 100
      border: "#A7F3D0", // Emerald 200
      darkText: "#064e3b"
    },
    "#F59E0B": { // Amber
      bg: "#FFFBEB", // Amber 50
      surface: "#FFFCF5",
      text: "#451a03", // Amber 900 (Dark Brown)
      subtext: "#78350f", // Amber 800
      accent: "#FEF3C7", // Amber 100
      border: "#FDE68A", // Amber 200
      darkText: "#451a03"
    },
    "#EF4444": { // Red
      bg: "#FEF2F2", // Red 50
      surface: "#FFFFFF",
      text: "#450a0a", // Red 900
      subtext: "#7f1d1d", // Red 800
      accent: "#FEE2E2", // Red 100
      border: "#FECACA", // Red 200
      darkText: "#450a0a"
    },
    "#8B5CF6": { // Violet
      bg: "#F5F3FF", // Violet 50
      surface: "#FFFFFF",
      text: "#2e1065", // Violet 950
      subtext: "#5b21b6", // Violet 800
      accent: "#EDE9FE", // Violet 100
      border: "#DDD6FE", // Violet 200
      darkText: "#2e1065"
    }
  };

  // Select palette based on primaryColor, fallback to Indigo
  const theme = colorPalettes[data.primaryColor] || colorPalettes["#6366F1"];

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      
      {/* --- Google Fonts --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');
        .classic-font { font-family: 'Playfair Display', serif; }
        .classic-body { font-family: 'Lato', sans-serif; }
      `}</style>

      {/* --- Header --- */}
      <header 
        className="sticky top-0 z-50 py-6 shadow-sm transition-colors duration-300"
        style={{ backgroundColor: theme.surface, borderBottom: `2px solid ${theme.border}` }}
      >
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-end">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 border-2 flex items-center justify-center font-serif font-bold text-2xl text-white shadow-md"
              style={{ backgroundColor: data.primaryColor, borderColor: theme.border }}
            >
              {data.title.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif tracking-wide leading-none" style={{ color: theme.darkText }}>
                {data.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <FileText size={12} style={{ color: theme.subtext }}/>
                <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: theme.subtext }}>
                DIGITAL PROFILE
                </p>
              </div>
            </div>
          </div>
          <div className="hidden sm:block text-right">
             <span 
                className="text-xs font-bold uppercase tracking-widest px-3 py-1"
                style={{ color: theme.subtext, border: `1px solid ${theme.border}`, backgroundColor: theme.bg }}
             >
                {data.status}
             </span>
          </div>
        </div>
      </header>

      {/* --- Classic Hero --- */}
      <div 
        className="pb-12 border-b transition-colors duration-300"
        style={{ backgroundColor: theme.surface, borderColor: theme.border }}
      >
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <h2 
                className="text-4xl md:text-5xl font-serif font-bold leading-tight"
                style={{ color: theme.darkText }}
              >
                {data.tagline}
              </h2>
            </div>
          </div>
          
          {/* Banner Image */}
          <div className="w-full h-64 md:h-80 overflow-hidden border-2 mb-8 relative" style={{ borderColor: theme.border }}>
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Business" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Conditional Availability Banner */}
          {(data.deliveryAvailable || data.homeServiceAvailable) && (
            <div 
              className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x border"
              style={{ borderColor: theme.border }}
            >
               {data.deliveryAvailable && (
                 <div className="flex-1 p-4 flex items-center justify-center gap-3" style={{ backgroundColor: theme.bg }}>
                   <Truck size={20} style={{ color: data.primaryColor }} />
                   <span className="font-serif font-semibold uppercase tracking-wide" style={{ color: theme.text }}>
                     Delivery Available
                   </span>
                 </div>
               )}
               {data.homeServiceAvailable && (
                 <div className="flex-1 p-4 flex items-center justify-center gap-3" style={{ backgroundColor: theme.bg }}>
                   <Home size={20} style={{ color: data.primaryColor }} />
                   <span className="font-serif font-semibold uppercase tracking-wide" style={{ color: theme.text }}>
                     Home Service
                   </span>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>

      {/* --- Main Content (File Body) --- */}
      <main className="max-w-4xl mx-auto px-6 py-16 classic-body">
        
        {/* About Section */}
        <section className="mb-16 max-w-3xl mx-auto text-center">
          <h3 
            className="text-2xl font-serif font-bold mb-6 pb-2 border-b inline-block"
            style={{ color: theme.darkText, borderColor: theme.border }}
          >
            Description
          </h3>
          <p 
            className="text-lg leading-8 whitespace-pre-line font-serif italic"
            style={{ color: theme.subtext }}
          >
            {data.description}
          </p>
        </section>

        {/* Contact Info */}
        <section className="mb-16">
          <h3 
            className="text-2xl font-serif font-bold mb-6 pb-2 border-b"
            style={{ color: theme.darkText, borderColor: theme.border }}
          >
            Contact Information
          </h3>
          <div 
            className="grid grid-cols-1 md:grid-cols-3 border divide-y md:divide-y-0 md:divide-x"
            style={{ backgroundColor: theme.surface, borderColor: theme.border }}
          >
            
            <div className="p-6 hover:bg-stone-50 transition-colors" style={{ hover: { backgroundColor: theme.bg } }}>
              <div 
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: theme.subtext }}
              >
                Location
              </div>
              <div className="flex items-start gap-3" style={{ color: theme.text }}>
                <MapPin size={18} className="mt-1 flex-0" style={{ color: data.primaryColor }}/>
                <div>
                  <p className="font-bold">{data.address.addressLine}</p>
                  <p className="text-sm">{data.address.city}, {data.address.state} {data.address.pincode}</p>
                </div>
              </div>
            </div>

            <div className="p-6 hover:bg-stone-50 transition-colors" style={{ hover: { backgroundColor: theme.bg } }}>
              <div 
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: theme.subtext }}
              >
                Telephone
              </div>
              <div className="flex items-center gap-3" style={{ color: theme.text }}>
                <Phone size={18} className="flex-shrink-0" style={{ color: data.primaryColor }}/>
                <a href={`tel:${data.contact.phone}`} className="font-bold">
                  {data.contact.phone}
                </a>
              </div>
            </div>

            <div className="p-6 hover:bg-stone-50 transition-colors" style={{ hover: { backgroundColor: theme.bg } }}>
              <div 
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: theme.subtext }}
              >
                Email
              </div>
              <div className="flex items-center gap-3" style={{ color: theme.text }}>
                <Mail size={18} className="flex-shrink-0" style={{ color: data.primaryColor }}/>
                <a href={`mailto:${data.contact.email}`} className="font-bold truncate">
                  {data.contact.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        {data.services && data.services.length > 0 && (
          <section className="mb-16">
            <h3 
              className="text-2xl font-serif font-bold mb-6 pb-2 border-b"
              style={{ color: theme.darkText, borderColor: theme.border }}
            >
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-4 border-l-2 pl-6" style={{ borderColor: theme.border }}>
                {data.services.map((service, idx) => (
                  <li key={idx} className="relative pb-2" style={{ color: theme.text }}>
                    <span 
                      className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full border"
                      style={{ borderColor: theme.border, backgroundColor: data.primaryColor }}
                    ></span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Timings */}
        <section className="mb-16">
          <h3 
            className="text-2xl font-serif font-bold mb-6 pb-2 border-b"
            style={{ color: theme.darkText, borderColor: theme.border }}
          >
            Business Hours
          </h3>
          <div className="border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
            {data.timings.weekly.map((day, idx) => (
              <div 
                key={idx} 
                className={`flex justify-between items-center py-4 px-6 border-b last:border-0 ${day.isClosed ? 'opacity-50' : ''}`}
                style={{ borderColor: theme.border, backgroundColor: day.isClosed ? theme.bg : 'transparent' }}
              >
                <span className="font-serif font-bold uppercase tracking-wide" style={{ color: theme.text }}>
                  {day.day}
                </span>
                <div className="flex items-center gap-4">
                  {day.isClosed ? (
                    <span className="italic font-serif" style={{ color: theme.subtext }}>Closed</span>
                  ) : (
                    <>
                      <span className="font-serif" style={{ color: theme.text }}>{day.openTime} — {day.closeTime}</span>
                      <div 
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: data.primaryColor }}
                      ></div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer 
        className="text-white py-16 border-t-4"
        style={{ backgroundColor: theme.darkText, borderColor: data.primaryColor }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <h2 className="text-4xl font-serif font-bold mb-4">{data.title}</h2>
          <p className="italic mb-8 font-serif max-w-lg mx-auto opacity-90">
            "{data.tagline}"
          </p>

          <div className="flex justify-center gap-6 mb-8">
            {data.socialLinks.website && <a href={data.socialLinks.website} className="hover:text-gray-200 transition-colors"><Globe size={20}/></a>}
            {data.socialLinks.instagram && <a href={data.socialLinks.instagram} className="hover:text-gray-200 transition-colors"><Instagram size={20}/></a>}
            {data.socialLinks.facebook && <a href={data.socialLinks.facebook} className="hover:text-gray-200 transition-colors"><Facebook size={20}/></a>}
          </div>

          <div className="border-t border-white/20 pt-8 mb-6">
             <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 mb-2">Payment Methods</p>
             <div className="flex justify-center gap-4 text-sm font-serif">
               {data.paymentMethods.map((method, idx) => (
                 <span key={idx} className="border border-white/20 px-3 py-1 bg-white/10">{method}</span>
               ))}
             </div>
          </div>

          <p className="text-xs uppercase tracking-widest opacity-60">
            &copy; {new Date().getFullYear()} {data.title}. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default ClassicDigitalPage;