// src/components/vehicle/VehicleGrid.tsx
import { VehicleCard } from './VehicleCard';

interface VehicleGridProps {
 vehicles: any[];
 onVehicleView: (id: string) => void;
}

export const VehicleGrid = ({ vehicles, onVehicleView }: VehicleGridProps) => {
 return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {vehicles.map((vehicle) => (
       <VehicleCard
         key={vehicle.id}
         vehicle={vehicle}
         onView={onVehicleView}
       />
     ))}
   </div>
 );
};