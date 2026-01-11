import React, { useState } from 'react';
import { Search, Store, ChevronDown, Check } from 'lucide-react';

function ShopSelectDropdown({ shops, selectedShop, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredShops = shops?.filter(shop =>
    shop.shopName?.toLowerCase().includes(search.toLowerCase()) ||
    shop.shopCode?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition text-left"
      >
        <div className="flex items-center gap-3">
          {selectedShop ? (
            <>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Store className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedShop.shopName}</p>
                <p className="text-sm text-gray-500">{selectedShop.shopCode}</p>
              </div>
            </>
          ) : (
            <span className="text-gray-500">Select a shop...</span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-auto">
          {/* Search Input */}
          <div className="sticky top-0 bg-white p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search shops..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                autoFocus
              />
            </div>
          </div>

          {/* Shop List */}
          <div className="py-2">
            {filteredShops.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                No shops found
              </div>
            ) : (
              filteredShops.map((shop) => (
                <button
                  key={shop._id}
                  type="button"
                  onClick={() => {
                    onSelect(shop);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Store className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-left">{shop.shopName}</p>
                      <p className="text-sm text-gray-500 text-left">{shop.shopCode} • {shop.shopType}</p>
                    </div>
                  </div>
                  {selectedShop?._id === shop._id && (
                    <Check className="w-5 h-5 text-purple-600" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopSelectDropdown;