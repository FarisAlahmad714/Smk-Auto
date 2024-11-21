import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '.prisma/client'

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Save inquiry to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        vehicleId: body.vehicleId,
        status: 'NEW'
      }
    });

    // Here you could add email notification functionality
    // await sendNotificationEmail(inquiry);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}