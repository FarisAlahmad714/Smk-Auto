import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [
      totalVehicles,
      activeListings,
      pendingInquiries,
      inventoryValue
    ] = await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({
        where: { status: 'available' }
      }),
      prisma.inquiry.count({
        where: { status: 'NEW' }
      }),
      prisma.vehicle.aggregate({
        _sum: {
          price: true
        },
        where: { status: 'available' }
      })
    ]);

    return NextResponse.json({
      totalVehicles,
      activeListings,
      pendingInquiries,
      recentViews: 0, // Implement view tracking later
      totalValue: inventoryValue._sum.price || 0
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}