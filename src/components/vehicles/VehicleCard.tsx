import { Car, Calendar, Gauge } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface VehicleCardProps {
  vehicle: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    imageUrls: string[];
  };
  onView?: (id: string) => void;
}

export const VehicleCard = ({ vehicle, onView }: VehicleCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={vehicle.imageUrls[0] || "/api/placeholder/400/300"}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="object-cover w-full h-64"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            Featured
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${vehicle.price.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={16} />            
            <span>{vehicle.mileage.toLocaleString()} mi</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => onView?.(vehicle.id)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};