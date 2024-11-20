// src/app/inventory/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, Phone, Clock } from 'lucide-react';
import Link from 'next/link';

const heroImages = [
  {
    url: '/api/placeholder/1920/600',
    title: 'SMK-Auto',
    subtitle: 'Experience excellence in every drive'
  },
  // Add more images
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <div className="relative h-[600px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImages[currentSlide].url})` }}
            >
              <div className="absolute inset-0 bg-black/50">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-6xl font-bold mb-4">
                      {heroImages[currentSlide].title}
                    </h1>
                    <p className="text-xl mb-8">
                      {heroImages[currentSlide].subtitle}
                    </p>
                    <Link 
                      href="/inventory"
                      className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg inline-flex items-center group"
                    >
                      Browse Inventory
                      <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Our Showroom</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-violet-600 mr-3" />
                  <p>123 Dealer Street, City, State 12345</p>
                </div>
                <div className="flex items-center">
                  <Phone className="text-violet-600 mr-3" />
                  <p>(123) 456-7890</p>
                </div>
                <div className="flex items-center">
                  <Clock className="text-violet-600 mr-3" />
                  <div>
                    <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                    <p>Saturday: 10:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[400px] bg-gray-200 rounded-lg">
              {/* Add Google Maps embed here */}
              <div className="w-full h-full rounded-lg overflow-hidden">
                Map placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Just Dropped Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Just Dropped</h2>
            <Link 
              href="/inventory"
              className="text-violet-600 hover:text-violet-700 inline-flex items-center"
            >
              View All
              <ChevronRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECENT_VEHICLES.map((vehicle) => (
              <div 
                key={vehicle.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{vehicle.title}</h3>
                  <p className="text-2xl font-bold text-violet-600 mb-2">
                    ${vehicle.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 mb-4">{vehicle.mileage.toLocaleString()} miles</p>
                  <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const RECENT_VEHICLES = [
  {
    id: 1,
    title: '2023 BMW M3 Competition',
    price: 82000,
    mileage: 1500,
    imageUrl: '/api/placeholder/400/300'
  },
  // Add more vehicles
];