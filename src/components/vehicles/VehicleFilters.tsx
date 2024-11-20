// src/components/vehicle/VehicleFilters.tsx
import { Select } from '@/components/ui/Select';

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

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: string, value: any) => void;
}

const currentYear = new Date().getFullYear();

export const VehicleFilters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const makeOptions = [
    { value: '', label: 'Select Make' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Mercedes', label: 'Mercedes' },
    { value: 'Audi', label: 'Audi' }
  ];

  const bodyStyles = [
    { value: '', label: 'Select Body Style' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'coupe', label: 'Coupe' }
  ];

  const transmissions = [
    { value: '', label: 'Select Transmission' },
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' }
  ];

  return (
    <div className="space-y-4">
      <Select
        label="Make"
        options={makeOptions}
        value={filters.make}
        onChange={(e) => onFilterChange('make', e.target.value)}
      />

      <Select
        label="Body Style"
        options={bodyStyles}
        value={filters.bodyStyle}
        onChange={(e) => onFilterChange('bodyStyle', e.target.value)}
      />

      <Select
        label="Transmission"
        options={transmissions}
        value={filters.transmission}
        onChange={(e) => onFilterChange('transmission', e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
        <div className="space-y-2">
          {[
            'Leather Seats',
            'Navigation',
            'Bluetooth',
            'Backup Camera'
          ].map(feature => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                checked={filters.features[feature] || false}
                onChange={(e) => onFilterChange('features', {
                  ...filters.features,
                  [feature]: e.target.checked
                })}
              />
              <span className="ml-2 text-sm text-gray-600">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};