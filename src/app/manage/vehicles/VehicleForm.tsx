'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Upload, X } from 'lucide-react';

interface VehicleFormProps {
  initialData?: VehicleFormData;
  onSubmit: (data: VehicleFormData) => Promise<void>;
}

interface VehicleFormData {
  make: string;
  model: string;
  year: number;
  price: string;
  mileage: string;
  description: string;
  features: string[];
  imageUrls: string[];
  status: string;
}

export function VehicleForm({ initialData, onSubmit }: VehicleFormProps) {
  const [formData, setFormData] = useState<VehicleFormData>(
    initialData || {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: '',
      mileage: '',
      description: '',
      features: [],
      imageUrls: [],
      status: 'available',
    }
  );

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const response = await fetch('/api/manage/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data: { url: string } = await response.json();
        setFormData((prev: VehicleFormData) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, data.url],
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Make"
          value={formData.make}
          onChange={(e) => setFormData({ ...formData, make: e.target.value })}
          required
        />

        <Input
          label="Model"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          required
        />

        <Input
          label="Year"
          type="number"
          value={formData.year}
          onChange={(e) =>
            setFormData({ ...formData, year: parseInt(e.target.value, 10) })
          }
          required
        />

        <Input
          label="Price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />

        <Input
          label="Mileage"
          type="number"
          value={formData.mileage}
          onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
          required
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          options={[
            { value: 'available', label: 'Available' },
            { value: 'sold', label: 'Sold' },
            { value: 'pending', label: 'Pending' },
          ]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          className="w-full border rounded-lg p-2 min-h-[100px]"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="flex flex-wrap gap-4">
          {formData.imageUrls.map((url: string, index: number) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt=""
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => {
                  setFormData((prev: VehicleFormData) => ({
                    ...prev,
                    imageUrls: prev.imageUrls.filter(
                      (_: string, i: number) => i !== index
                    ),
                  }));
                }}
                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Upload className="text-gray-400" />
          </label>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Saving...' : initialData ? 'Update Vehicle' : 'Add Vehicle'}
      </Button>
    </form>
  );
}
