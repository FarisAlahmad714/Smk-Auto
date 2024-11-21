// src/app/manage/vehicles/route.ts
import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const vehicle = await prisma.vehicle.create({
      data: {
        make: body.make,
        model: body.model,
        year: parseInt(body.year),
        price: parseFloat(body.price),
        mileage: parseInt(body.mileage),
        description: body.description,
        imageUrls: body.imageUrls,
        features: body.features,
        status: body.status || 'available'
      }
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    );
  }
}