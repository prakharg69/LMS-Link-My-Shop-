import React from 'react';
import { Store, Eye, Edit, Trash2, Globe, Lock, Calendar, Phone } from 'lucide-react';

function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Banner */}
      <div className="h-32 bg-linear-to-r from-purple-500 to-pink-500 relative">
        {listing.isPublic ? (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-medium text-green-700">
            <Globe className="w-3 h-3" />
            Public
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-medium text-amber-700">
            <Lock className="w-3 h-3" />
            Draft
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{listing.title}</h3>
            {listing.tagline && (
              <p className="text-gray-600 text-sm mt-1">{listing.tagline}</p>
            )}
          </div>
        </div>

        {/* Shop Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Store className="w-4 h-4" />
          <span>{listing.shopId?.shopName || 'Shop'}</span>
          <span className="text-gray-400">•</span>
          <span>{listing.shopId?.shopCode || ''}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-xs text-gray-500">Services</p>
            <p className="font-semibold text-gray-900">
              {listing.services?.length || 0}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-xs text-gray-500">Updated</p>
            <p className="font-semibold text-gray-900 text-sm">
              {new Date(listing.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;