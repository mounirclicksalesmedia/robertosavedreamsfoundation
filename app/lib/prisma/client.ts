import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient with error logging
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error'],
  });
};

// Define a global type for the prisma client
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Use the global variable if available, otherwise create a new client
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Only assign to the global object in development to prevent memory leaks in production
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma; 