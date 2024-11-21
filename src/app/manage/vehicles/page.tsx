'use client';

import { useState, useEffect } from 'react';
import { VehicleGrid } from '@/components/vehicles/VehicleGrid';
import { VehicleForm } from '@/app/manage/vehicles/VehicleForm';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Search } from 'lucide-react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description?: string;
  imageUrls: string[];
  features: string[];
  status: string;
}

export default function ManageVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/manage/vehicles');
      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (vehicleData: VehicleFormData) => {
    try {
      const method = vehicleData.id ? 'PUT' : 'POST';
      const endpoint = vehicleData.id
        ? `/api/manage/vehicles/${vehicleData.id}`
        : '/api/manage/vehicles';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...vehicleData,
          price: parseFloat(vehicleData.price), // Convert string to number
          mileage: parseInt(vehicleData.mileage, 10), // Convert string to number
        }),
      });

      if (response.ok) {
        await fetchVehicles();
        setShowAddForm(false);
        setEditingVehicle(null);
      }
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2" size={20} />
          Add Vehicle
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vehicles..."
              className="pl-10 w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <VehicleGrid
            vehicles={vehicles}
            onEdit={setEditingVehicle}
            isManageView={true}
          />
        )}
      </div>

      {(showAddForm || editingVehicle) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingVehicle(null);
                  }}
                >
                  Close
                </Button>
              </div>
              <VehicleForm
  initialData={
    editingVehicle
      ? {
          id: editingVehicle.id, // Optional id field for editing
          make: editingVehicle.make,
          model: editingVehicle.model,
          year: editingVehicle.year,
          price: editingVehicle.price.toString(), // Convert number to string
          mileage: editingVehicle.mileage.toString(), // Convert number to string
          description: editingVehicle.description || '',
          features: editingVehicle.features,
          imageUrls: editingVehicle.imageUrls,
          status: editingVehicle.status,
        }
      : undefined
  }
  onSubmit={handleSave}
/>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
