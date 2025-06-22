'use client'

import { useState } from 'react'

export function SermonsArchive() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Sermons', count: 150 },
    { id: 'recent', label: 'Recent', count: 20 },
    { id: 'popular', label: 'Most Popular', count: 15 },
    { id: 'series', label: 'Series', count: 8 },
    { id: 'video', label: 'Video', count: 85 },
    { id: 'audio', label: 'Audio Only', count: 65 }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Complete Collection
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Sermon Archive
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access our complete library of sermons with powerful search and filtering tools to find exactly what you're looking for
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Sermons
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by title, speaker, topic, or scripture..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div>
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter By
              </label>
              <select
                id="filter"
                className="block w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label} ({filter.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Filters:</p>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedFilter === filter.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              {searchTerm ? `Results for "${searchTerm}"` : 'All Sermons'}
            </p>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
              {filters.find(f => f.id === selectedFilter)?.count || 150} sermons
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Most Popular</option>
              <option>A-Z</option>
            </select>
          </div>
        </div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Sample sermon cards - these would be populated dynamically */}
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  ['from-blue-600 to-indigo-700', 'from-purple-600 to-pink-700', 'from-green-600 to-emerald-700'][i % 3]
                }`}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  
                  {/* Simulated video pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                        `,
                        backgroundSize: '25px 25px',
                        animation: `moveBackground ${20 + i * 2}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Type and Duration Badges */}
                <div className="absolute top-3 left-3">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                    {['video', 'audio', 'video'][i % 3]}
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                    {['42:15', '38:22', '45:30'][i % 3]}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                  {['Walking in Faith', 'The Power of Prayer', 'God\'s Grace in Trials'][i % 3]}
                </h3>
                
                <div className="text-sm text-gray-600 mb-3">
                  <span>{['Pastor Michael Johnson', 'Pastor Sarah Williams', 'Pastor David Chen'][i % 3]}</span>
                  <span className="mx-2">•</span>
                  <span>{['Dec 10, 2023', 'Dec 3, 2023', 'Nov 26, 2023'][i % 3]}</span>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {[
                    'Discover what it means to trust God completely and walk by faith in every area of your life.',
                    'Learn how to develop a powerful prayer life that transforms both you and your circumstances.',
                    'Finding hope and strength in God\'s sufficient grace during life\'s most difficult moments.'
                  ][i % 3]}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {['Faith in Action', 'Prayer Life', 'Grace & Truth'][i % 3]} Series
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More / Pagination */}
        <div className="text-center">
          <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 mr-4">
            Load More Sermons
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold hover:bg-gray-50 transition-all duration-300">
            View All in List
          </button>
        </div>

        {/* Archive Stats */}
        <div className="bg-white rounded-2xl p-8 mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Archive Statistics</h3>
            <p className="text-gray-600">Our growing collection of biblical teaching</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-sm text-gray-600">Total Sermons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-sm text-gray-600">Series</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">85</div>
              <div className="text-sm text-gray-600">Video Messages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100+</div>
              <div className="text-sm text-gray-600">Hours of Content</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(25px) translateY(25px); }
        }
      `}</style>
    </section>
  )
} 