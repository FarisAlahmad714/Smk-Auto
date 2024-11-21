'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/layout';
import { Spinner } from '@/components/ui/Spinner';
import { 
  Calendar, 
  Gauge, 
  Check, 
  Phone, 
  Mail, 
  Share,
  Heart,
  ArrowLeft
} from 'lucide-react';

interface VehicleDetails {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  imageUrls: string[];
  features: string[];
  transmission: string;
  bodyStyle: string;
  status: string;
}

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`/api/vehicles/${params.id}`);
        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [params.id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      </Layout>
    );
  }

  if (!vehicle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
            <button 
              onClick={() => router.push('/inventory')}
              className="text-violet-600 hover:text-violet-700 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Inventory
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <button 
            onClick={() => router.back()}
            className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Results
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={vehicle.imageUrls[activeImage]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="object-cover w-full h-full"
                />
              </div>
              
              {/* Thumbnail Grid */}
              {vehicle.imageUrls.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {vehicle.imageUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`
                        aspect-w-16 aspect-h-9 rounded-lg overflow-hidden
                        ${index === activeImage ? 'ring-2 ring-violet-600' : ''}
                      `}
                    >
                      <img
                        src={url}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={18} />
                    {vehicle.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge size={18} />
                    {vehicle.mileage.toLocaleString()} miles
                  </span>
                </div>
              </div>

              <div className="text-3xl font-bold text-violet-600">
                ${vehicle.price.toLocaleString()}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4">
              <button 
  onClick={() => setShowContactForm(true)}
  className="flex-1 bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700"
>
  Contact Dealer
</button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart size={20} />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share size={20} />
                </button>
              </div>

              {/* Vehicle Details */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">Body Style</span>
                    <p>{vehicle.bodyStyle}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Transmission</span>
                    <p>{vehicle.transmission}</p>
                  </div>
                  {/* Add more details */}
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-y-2">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}