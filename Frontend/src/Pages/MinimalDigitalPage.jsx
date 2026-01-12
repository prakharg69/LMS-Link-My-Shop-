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
  Check,
  Navigation
} from 'lucide-react';

const MinimalDigitalPage = ({ pageData }) => {
  // --- Data Injection ---
  const data = pageData || {
    title: "Hangot",
    tagline: "Taste that makes you smile",
    description: "Our food platform is created for people who love good food and easy ordering.\nWe bring together trusted restaurants and skilled kitchens in one place.\nEvery meal is prepared with fresh ingredients and quality care.\nFrom quick bites to full meals, we deliver taste, comfort, and convenience to your doorstep.",
    primaryColor: "#6366F1",
    shopId: "695ab9ed14a0902c1dc96850",
    status: "draft",
    bannerImage: { name: 'Photo-1.jpeg' }, 
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
      googleMapLink: "https://chat.deepseek.com/a/chat/s/99ada174-15e8-4ed8-a115-eca4f7b48811"
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

  // --- Color Palette Logic ---
  const colorPalettes = {
    "#6366F1": { 
      bg: "#F8FAFC", card: "#FFFFFF", textMain: "#0F172A", textSub: "#64748B", 
      accent: "#6366F1", accentBg: "#EEF2FF", border: "#E2E8F0", badgeText: "#312e81" 
    },
    "#10B981": { 
      bg: "#F0FDFA", card: "#FFFFFF", textMain: "#115E59", textSub: "#0D9488", 
      accent: "#10B981", accentBg: "#D1FAE5", border: "#CCFBF1", badgeText: "#064E3B" 
    },
    "#F59E0B": { 
      bg: "#FFFBEB", card: "#FFFFFF", textMain: "#451A03", textSub: "#B45309", 
      accent: "#F59E0B", accentBg: "#FEF3C7", border: "#FDE68A", badgeText: "#78350F" 
    },
    "#EF4444": { 
      bg: "#FEF2F2", card: "#FFFFFF", textMain: "#7F1D1D", textSub: "#B91C1C", 
      accent: "#EF4444", accentBg: "#FEE2E2", border: "#FECACA", badgeText: "#450A0A" 
    },
    "#8B5CF6": { 
      bg: "#F5F3FF", card: "#FFFFFF", textMain: "#2E1065", textSub: "#6D28D9", 
      accent: "#8B5CF6", accentBg: "#EDE9FE", border: "#DDD6FE", badgeText: "#4C1D95" 
    }
  };

  const theme = colorPalettes[data.primaryColor] || colorPalettes["#6366F1"];

  // --- Banner Image Handler ---
  const getBannerSource = () => {
    if (!data.bannerImage) {
      return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
    }
    if (typeof data.bannerImage === 'string') {
      return data.bannerImage;
    }
    if (data.bannerImage instanceof File) {
      return URL.createObjectURL(data.bannerImage);
    }
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  };

  const bannerSrc = getBannerSource();

  return (
    <div 
      className="min-h-screen font-sans transition-colors duration-300"
      style={{ backgroundColor: theme.bg, color: theme.textMain, fontFamily: data.fontFamily || 'Inter, sans-serif' }}
    >
      
      {/* --- Minimal Header --- */}
      <header className="bg-white/50 backdrop-blur-md border-b sticky top-0 z-50" style={{ borderColor: theme.border }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: theme.accent }}
            >
              {data.title.charAt(0)}
            </div>
            <h1 className="font-semibold text-lg tracking-tight" style={{ color: theme.textMain }}>
              {data.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded" style={{ color: theme.textSub, backgroundColor: theme.bg }}>
                {data.status}
             </span>
          </div>
        </div>
      </header>

      {/* --- Banner Section --- */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden bg-gray-100">
        <img 
          src={bannerSrc} 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- Hero Section --- */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
        <h2 
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ color: theme.textMain }}
        >
          {data.tagline}
        </h2>
        <div className="w-12 h-1 mx-auto mb-8 rounded-full" style={{ backgroundColor: theme.accent }}></div>
        
        <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: theme.textSub }}>
          {data.description}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href={`tel:${data.contact.phone}`} 
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white shadow-sm hover:shadow-md transition-all"
            style={{ backgroundColor: theme.accent }}
          >
            <Phone size={18} />
            Call Now
          </a>
          <a 
            href={data.address.googleMapLink} 
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-white border hover:bg-gray-50 transition-all"
            style={{ color: theme.textMain, borderColor: theme.border }}
          >
            <Navigation size={18} />
            Get Directions
          </a>
        </div>
      </section>

      {/* --- Availability Strip --- */}
      {(data.deliveryAvailable || data.homeServiceAvailable) && (
        <div className="max-w-5xl mx-auto px-6 pb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {data.deliveryAvailable && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border" style={{ backgroundColor: theme.card, borderColor: theme.border, color: theme.textSub }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                Delivery Available
              </div>
            )}
            {data.homeServiceAvailable && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border" style={{ backgroundColor: theme.card, borderColor: theme.border, color: theme.textSub }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                Home Service
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Main Grid Layout --- */}
      <main className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* --- Left Column --- */}
        <div className="md:col-span-7 space-y-8">
          
          <div className="bg-white rounded-xl border p-6 space-y-6" style={{ borderColor: theme.border }}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: theme.accentBg, color: theme.accent }}>
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider mb-1" style={{ color: theme.textSub }}>Address</h4>
                <p className="font-medium" style={{ color: theme.textMain }}>{data.address.addressLine}</p>
                <p className="text-sm" style={{ color: theme.textSub }}>{data.address.city}, {data.address.state} - {data.address.pincode}</p>
              </div>
            </div>
            <div className="h-px w-full" style={{ backgroundColor: theme.border }}></div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: theme.accentBg, color: theme.accent }}>
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider mb-1" style={{ color: theme.textSub }}>Email</h4>
                <a href={`mailto:${data.contact.email}`} className="font-medium hover:underline" style={{ color: theme.textMain }}>
                  {data.contact.email}
                </a>
              </div>
            </div>
          </div>

          {data.services && data.services.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: theme.textSub }}>Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.services.map((service, idx) => (
                  <div key={idx} className="bg-white rounded-lg border p-4 flex items-center gap-3" style={{ borderColor: theme.border }}>
                    <Check size={16} className="flex-shrink-0" style={{ color: theme.accent }} />
                    <span className="text-sm font-medium" style={{ color: theme.textMain }}>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.facilities && data.facilities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: theme.textSub }}>Facilities</h3>
              <div className="space-y-3">
                {data.facilities.map((facility, idx) => (
                  <div key={idx} className="flex items-center gap-3" style={{ color: theme.textMain }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                    <span className="text-sm font-medium">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* --- Right Column --- */}
        <div className="md:col-span-5 space-y-8">
          
          {/* Timings Card */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: theme.border }}>
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: theme.border }}>
              <h3 className="font-bold" style={{ color: theme.textMain }}>Hours</h3>
              <Clock size={18} style={{ color: theme.textSub }} />
            </div>
            <div className="divide-y" style={{ borderColor: theme.border }}>
              {data.timings.weekly.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`flex justify-between items-center p-4 ${day.isClosed ? 'opacity-50 bg-gray-50' : ''}`}
                  style={{ color: theme.textMain }}
                >
                  <span className="text-sm font-medium capitalize w-24">{day.day}</span>
                  <span className="text-sm font-medium">
                    {day.isClosed ? (
                      <span className="text-red-400">Closed</span>
                    ) : (
                      <span>{day.openTime} - {day.closeTime}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social & Payment Section */}
          <div className="text-center">
            {/* Social Heading */}
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: theme.textSub }}>Connect</h3>
            
            {/* Social Icons */}
            <div className="flex justify-center gap-4 mb-8">
              {data.socialLinks.website && <a href={data.socialLinks.website} className="p-3 rounded-full bg-white border hover:scale-105 transition-transform" style={{ borderColor: theme.border }}><Globe size={20} style={{color:theme.textSub}}/></a>}
              {data.socialLinks.instagram && <a href={data.socialLinks.instagram} className="p-3 rounded-full bg-white border hover:scale-105 transition-transform" style={{ borderColor: theme.border }}><Instagram size={20} style={{color:theme.textSub}}/></a>}
              {data.socialLinks.facebook && <a href={data.socialLinks.facebook} className="p-3 rounded-full bg-white border hover:scale-105 transition-transform" style={{ borderColor: theme.border }}><Facebook size={20} style={{color:theme.textSub}}/></a>}
            </div>
            
            {/* Payment Heading (Added here) */}
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: theme.textSub }}>Payment Methods</h3>
            
            {/* Payment Badges */}
            <div className="flex justify-center gap-2 flex-wrap">
              {data.paymentMethods.map((method, idx) => (
                <span 
                  key={idx} 
                  className="text-xs font-medium px-3 py-1 rounded border bg-white"
                  style={{ borderColor: theme.border, color: theme.textSub }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* --- Minimal Footer --- */}
      <footer className="border-t py-8 mt-auto" style={{ borderColor: theme.border }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: theme.textSub }}>
            {data.title}
          </p>
          <p className="text-xs" style={{ color: theme.textSub }}>
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default MinimalDigitalPage;