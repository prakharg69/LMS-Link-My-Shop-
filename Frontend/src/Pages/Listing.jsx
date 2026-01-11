import React, { useState } from 'react';
import { Store, Plus, Grid, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { useStore } from '../Redux/hook';
import CreateListingForm from "../Components/CreateListingForm";
import ListingCard from '../Components/ListingCard';

function Listing() {
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'listings'
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { shop } = useStore();

  // Get all digital pages (you'll need to fetch these from your API)
  const [digitalPages, setDigitalPages] = useState([]); // This should come from API

  const filteredListings = digitalPages.filter(page => 
    page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.shopId?.shopName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Store className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Digital Shop Pages</h1>
              <p className="text-sm text-gray-500 mt-0.5">Create and manage your online store listings</p>
            </div>
          </div>
          <button 
            className="bg-purple-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            onClick={() => setActiveTab('create')}
          >
            <Plus className="w-4 h-4" />
            Create Listing
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-3.5 bg-white border-b border-gray-200">
        <div className="flex space-x-1">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'create'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('create')}
          >
            Create New
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'listings'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('listings')}
          >
            All Listings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'create' ? (
          <CreateListingForm shops={shop} />
        ) : (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition text-gray-900 placeholder-gray-500 text-sm"
                />
              </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No listings yet
                </h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto text-sm">
                  Create your first digital shop page to showcase your store online
                </p>
                <button 
                  className="bg-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
                  onClick={() => setActiveTab('create')}
                >
                  <Plus className="w-4 h-4" />
                  Create Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Listing;