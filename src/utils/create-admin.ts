// src/utils/create-admin.ts
import { Prisma, PrismaClient } from '.prisma/client'
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  const password = await hash('your-admin-password', 12);
  
  const admin = await prisma.admin.create({
    data: {
      name: 'Admin',
      email: 'admin@smkauto.com',
      password
    }
  });

  console.log('Admin created:', admin);
}

createAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect());