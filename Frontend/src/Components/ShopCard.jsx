// Components/ShopCard.jsx
import React from 'react';
import { 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Edit3, 
  CheckCircle, 
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const ShopCard = ({ shop, onEdit }) => {
  const getStatusIcon = () => {
    if (shop.isVerified && shop.isOnboarded) {
      return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Live' };
    } else if (shop.isVerified) {
      return { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Verified' };
    } else if (shop.status === 'draft') {
      return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Draft' };
    } else {
      return { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Pending' };
    }
  };

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'retail': return 'Retail';
      case 'wholesale': return 'Wholesale';
      case 'both': return 'Both';
      default: return category;
    }
  };

  const status = getStatusIcon();
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm w-full">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="p-2.5 bg-blue-50 rounded-lg shrink-0">
              <Store className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
                  {shop.shopName}
                </h3>
                <button
                  onClick={() => onEdit(shop._id)}
                  className="p-1.5 hover:bg-gray-100 rounded-md transition-colors shrink-0"
                  title="Edit Store"
                >
                  <Edit3 className="w-4 h-4 text-gray-500 hover:text-blue-600 transition-colors" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${status.bg} ${status.color}`}>
                  <StatusIcon className="w-3.5 h-3.5 shrink-0" />
                  {status.label}
                </span>
                <div className="text-xs text-gray-400">•</div>
                <span className="text-sm text-gray-600 truncate">{shop.shopCode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="space-y-4">
          {/* Shop Type & Category Row */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 mb-1">Shop Type</div>
              <div className="text-sm text-gray-900 font-medium">{shop.shopType}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Category</div>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                {getCategoryLabel(shop.businessCategory)}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-5 flex justify-center">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-900 font-medium">{shop.primaryPhone}</div>
                <div className="text-xs text-gray-500">Primary Phone</div>
              </div>
            </div>

            {shop.primaryWhatsapp && (
              <div className="flex items-center gap-3">
                <div className="w-5 flex justify-center">
                  <span className="text-xs text-gray-400 font-medium">WA</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-gray-900">{shop.primaryWhatsapp}</div>
                  <div className="text-xs text-gray-500">WhatsApp</div>
                </div>
              </div>
            )}

            {shop.businessEmail && (
              <div className="flex items-center gap-3">
                <div className="w-5 flex justify-center">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-gray-900 truncate">{shop.businessEmail}</div>
                  <div className="text-xs text-gray-500">Email</div>
                </div>
              </div>
            )}
          </div>

          {/* Address Section */}
          {(shop.addressLine || shop.city || shop.state || shop.pincode) && (
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-5 flex justify-center pt-0.5">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-gray-900">{shop.addressLine}</div>
                  <div className="text-sm text-gray-600">
                    {[shop.city, shop.state, shop.pincode].filter(Boolean).join(', ')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Website Section */}
          {shop.hasWebsite && shop.websiteUrl && (
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-5 flex justify-center">
                  <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <a 
                    href={shop.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate block"
                  >
                    {shop.websiteUrl.replace(/^https?:\/\//, '')}
                  </a>
                  <div className="text-xs text-gray-500">Website</div>
                </div>
              </div>
            </div>
          )}

          {/* Created Date */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">Created on</div>
              <div className="text-sm text-gray-900 font-medium">
                {new Date(shop.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3.5 border-t border-gray-100 bg-gray-50 rounded-b-lg">
        <button 
          onClick={() => onEdit(shop._id)}
          className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1.5 group"
        >
          Manage Store
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ShopCard;