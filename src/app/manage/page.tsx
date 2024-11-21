'use client';

import { useState, useEffect } from 'react';
import { 
  Car, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Plus,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalVehicles: number;
  activeListings: number;
  pendingInquiries: number;
  recentViews: number;
  totalValue: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    activeListings: 0,
    pendingInquiries: 0,
    recentViews: 0,
    totalValue: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/manage/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back to SMK Auto management</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/manage/vehicles/new"
            className="flex items-center gap-3 p-4 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors"
          >
            <Plus className="text-violet-600" />
            <span>Add New Vehicle</span>
          </Link>
          
          <Link 
            href="/manage/inquiries"
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <MessageSquare className="text-blue-600" />
            <span>View Inquiries</span>
          </Link>
          
          <Link 
            href="/manage/vehicles"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Car className="text-green-600" />
            <span>Manage Inventory</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-100 rounded-full">
              <Car className="text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold">{stats.totalVehicles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold">{stats.activeListings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Inquiries</p>
              <p className="text-2xl font-bold">{stats.pendingInquiries}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <DollarSign className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold">
                ${stats.totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {/* We'll implement this with real data later */}
          <div className="p-4 flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <MessageSquare size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium">New inquiry for 2023 BMW M3</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
          </div>
          {/* Add more activity items */}
        </div>
      </div>
    </div>
  );
}