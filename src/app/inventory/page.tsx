'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { VehicleFilters } from '@/components/vehicles/VehicleFilters';
import { VehicleGrid } from '@/components/vehicles/VehicleGrid';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

interface FilterState {
  make: string;
  model: string;
  yearRange: [number, number];
  priceRange: [number, number];
  mileageRange: [number, number];
  bodyStyle: string;
  transmission: string;
  features: { [key: string]: boolean };
}

export default function InventoryPage() {
  const currentYear = new Date().getFullYear();
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    make: '',
    model: '',
    yearRange: [currentYear - 10, currentYear],
    priceRange: [0, 200000],
    mileageRange: [0, 150000],
    bodyStyle: '',
    transmission: '',
    features: {}
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Vehicle Inventory</h1>
          <div className="flex items-center text-gray-300">
            <span>Home</span>
            <ChevronDown className="mx-2" size={16} />
            <span className="text-white">Inventory</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Filter Toggle for Mobile */}
          <Button 
            className="md:hidden w-full mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2" size={16} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64`}>
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                <h2 className="text-lg font-semibold mb-6">Refine Search</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <Slider
                      min={0}
                      max={200000}
                      step={5000}
                      value={filters.priceRange}
                      onChange={(value) => handleFilterChange('priceRange', value)}
                      formatLabel={(value) => `$${value.toLocaleString()}`}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Year</label>
                    <Slider
                      min={currentYear - 10}
                      max={currentYear}
                      value={filters.yearRange}
                      onChange={(value) => handleFilterChange('yearRange', value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Mileage</label>
                    <Slider
                      min={0}
                      max={150000}
                      step={5000}
                      value={filters.mileageRange}
                      onChange={(value) => handleFilterChange('mileageRange', value)}
                      formatLabel={(value) => `${value.toLocaleString()} mi`}
                    />
                  </div>

                  <VehicleFilters 
                    filters={filters}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-medium">24 Vehicles Available</span>
                  </div>
                  <select className="border rounded-lg px-3 py-2">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Mileage: Low to High</option>
                  </select>
                </div>
              </div>

              <VehicleGrid 
                vehicles={MOCK_VEHICLES}
                onVehicleView={(id) => console.log('View vehicle:', id)}
              />

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg ${
                        page === 1
                          ? 'bg-violet-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const MOCK_VEHICLES = [
  {
    id: '1',
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 45000,
    mileage: 12000,
    imageUrls: ['/api/placeholder/400/300'],
    condition: 'Excellent'
  },
  // Add more vehicles...
];