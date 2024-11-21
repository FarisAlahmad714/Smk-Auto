// src/app/api/vehicles/route.ts
import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '.prisma/client'

const prisma = new PrismaClient();

// GET /api/vehicles - Get all vehicles with filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const make = searchParams.get('make');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const year = searchParams.get('year');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build filter object
    const where: any = {};
    
    if (make) where.make = make;
    if (year) where.year = parseInt(year);
    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) where.price.gte = parseInt(priceMin);
      if (priceMax) where.price.lte = parseInt(priceMax);
    }

    // Get total count for pagination
    const total = await prisma.vehicle.count({ where });

    // Get vehicles with pagination
    const vehicles = await prisma.vehicle.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      vehicles,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      }
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/vehicles - Create new vehicle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const vehicle = await prisma.vehicle.create({
      data: {
        make: body.make,
        model: body.model,
        year: body.year,
        price: body.price,
        mileage: body.mileage,
        description: body.description,
        imageUrls: body.imageUrls,
        features: body.features,
        status: body.status || 'available'
      }
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}