"use client";
import { useBag } from '@/context/BagContext';
import { useState } from 'react';

const BagModal = ({ isOpen, onClose }) => {
  const { bag, removeFromBag, clearBag } = useBag();
  const [activeTab, setActiveTab] = useState('all');

  if (!isOpen) return null;

  // Group items by type
  const groupedItems = bag.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});

  const getTypeLabel = (type) => {
    const labels = {
      'tv': 'TV Channels',
      'fm': 'FM Stations', 
      'ooh': 'OOH Displays',
      'decaux': 'Decaux OOH',
      'liftboard': 'Liftboards',
      'newspaper': 'Newspapers',
      'influencer': 'Influencers'
    };
    return labels[type] || type;
  };

  const getTypeIcon = (type) => {
    const icons = {
      'tv': '📺',
      'fm': '📻',
      'ooh': '🖼️',
      'decaux': '🚌',
      'liftboard': '📋',
      'newspaper': '📰',
      'influencer': '👤'
    };
    return icons[type] || '📦';
  };

  const filteredItems = activeTab === 'all' 
    ? bag 
    : bag.filter(item => item.type === activeTab);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700">
              <path d="M6 7V6a6 6 0 1 1 12 0v1" />
              <rect width="18" height="13" x="3" y="7" rx="2" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900">My Bag ({bag.length} items)</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'all' 
                ? 'text-pink-600 border-b-2 border-pink-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All Items ({bag.length})
          </button>
          {Object.keys(groupedItems).map(type => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-2 ${
                activeTab === type 
                  ? 'text-pink-600 border-b-2 border-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{getTypeIcon(type)}</span>
              {getTypeLabel(type)} ({groupedItems[type].length})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="mx-auto text-gray-300 mb-4">
                <path d="M6 7V6a6 6 0 1 1 12 0v1" />
                <rect width="18" height="13" x="3" y="7" rx="2" />
              </svg>
              <p className="text-gray-500 text-lg">Your bag is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some channels or influencers to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <div key={`${item.type}-${item.item.id || index}`} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{getTypeIcon(item.type)}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.item.name || item.item.title || `${getTypeLabel(item.type)} Item`}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {getTypeLabel(item.type)}
                        {item.item.address && ` • ${item.item.address}`}
                        {item.item.followers && ` • ${item.item.followers} followers`}
                        {item.item.tv_daily_avg_views && ` • ${item.item.tv_daily_avg_views} views`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromBag(item.type, item.item.id || index)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                    title="Remove from bag"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {bag.length > 0 && (
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <button
              onClick={clearBag}
              className="text-red-600 hover:text-red-800 text-sm font-medium transition"
            >
              Clear All
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Continue analyzing
              </button>
              <button
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium"
                onClick={() => {
                  // TODO: Implement checkout functionality
                  alert('Checkout functionality coming soon!');
                }}
              >
                Checkout ({bag.length} items)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BagModal; 