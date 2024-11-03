import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

// function up is created for generating seed data
async function up() {
   await prisma.user.createMany({
      data: [
         {
            fullName: "John Doe",
            email: "john.doe@example.com",
            password: hashSync('111111', 10),
            verified: new Date(),
            role: "USER"
         },
         {
            fullName: "Admin",
            email: "admin@example.com",
            password: hashSync('111111', 10),
            verified: new Date(),
            role: "ADMIN"
         }
      ]
   })
}

// function down is created for removing data
async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
}

async function main() {
   try {
      await down()
      await up()
   } catch (error) {
      console.error(error);
   }
}

main()
   .then(async () => {
      await prisma.$disconnect()
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });