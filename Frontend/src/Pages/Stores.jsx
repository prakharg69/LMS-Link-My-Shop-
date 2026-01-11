import React, { useState } from 'react';
import CreateStoreForm from '../Components/CreateStoreForm';
import ShopCard from '../Components/ShopCard';
import { useStore } from '../Redux/hook';
import { Store, Plus, Search, Filter } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

function Stores() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { shop } = useStore();
  
  const CreateStoreHandle = () => {
    setShow(prev => !prev);
  };
      const navigate = useNavigate();

  const handleEditShop = (shopId) => {
    console.log('Edit shop:', shopId);
    navigate(`/Store-Edit/${shopId}`)
  };

  const filteredShops = shop?.filter(shopItem => 
    shopItem.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shopItem.shopType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shopItem.shopCode.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getStats = () => {
    const total = shop?.length || 0;
    const active = shop?.filter(s => s.isOnboarded).length || 0;
    const draft = shop?.filter(s => s.status === 'draft').length || 0;
    return { total, active, draft };
  };

  const stats = getStats();

  return (
    <div className='h-full w-full flex flex-col bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-50 rounded-lg'>
              <Store className='w-6 h-6 text-blue-600' />
            </div>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>Stores</h1>
              <p className='text-sm text-gray-500 mt-0.5'>Manage your business locations</p>
            </div>
          </div>
          <button 
            className='bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2'
            onClick={CreateStoreHandle}
          >
            <Plus className='w-4 h-4' />
            Create Store
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className='px-6 py-3.5 bg-gray-50 border-b border-gray-200'>
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>Total:</span>
            <span className='text-lg font-medium text-gray-900'>{stats.total}</span>
          </div>
          <div className='w-px h-5 bg-gray-300' />
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>Active:</span>
            <span className='text-lg font-medium text-green-600'>{stats.active}</span>
          </div>
          <div className='w-px h-5 bg-gray-300' />
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>Draft:</span>
            <span className='text-lg font-medium text-amber-600'>{stats.draft}</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className='px-6 py-4 bg-white border-b border-gray-200'>
        <div className='max-w-md'>
          <div className='relative'>
            <Search className='absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type='text'
              placeholder='Search stores...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-500 text-sm'
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        <div className='p-6'>
          {filteredShops.length === 0 ? (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Store className='w-8 h-8 text-gray-400' />
              </div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                {searchQuery ? 'No stores found' : 'No stores yet'}
              </h3>
              <p className='text-gray-600 mb-6 max-w-sm mx-auto text-sm'>
                {searchQuery ? 'Try searching with different keywords' : 'Create your first store to get started'}
              </p>
              {!searchQuery && (
                <button 
                  className='bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2'
                  onClick={CreateStoreHandle}
                >
                  <Plus className='w-4 h-4' />
                  Create Store
                </button>
              )}
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
              {filteredShops.map((shopItem) => (
                <ShopCard 
                  key={shopItem._id} 
                  shop={shopItem} 
                  onEdit={handleEditShop}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Store Modal */}
      {show && <CreateStoreForm onClose={CreateStoreHandle} />}
    </div>
  );
}

export default Stores;