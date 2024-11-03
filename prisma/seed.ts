import { Prisma, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { ingredients, categories, products } from './constants';

const prisma = new PrismaClient();

const generateProductItem = ({ productId, pizzaType, size } : { productId: number; pizzaType?: 1 | 2; size?: 20 | 30 | 40; }) => {
   return {
     productId,
     price: Math.floor(Math.random() * (200 - 10 + 1) + 10),
     pizzaType,
     size,
   } as Prisma.ProductItemUncheckedCreateInput
};

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

   await prisma.category.createMany({
      data: categories
   })

   await prisma.ingradient.createMany({
      data: ingredients
   })

   await prisma.product.createMany({
      data: products
   })

   const pizza1 = await prisma.product.create({
      data: {
         name: "Pepperoni Fresh",
         imageUrl: "https://media.dodostatic.com/image/r:292x292/11EE8739E55F5BCE89E33C950E9F9698.avif",
         categoryId: 1,
         ingradients: {
            connect: ingredients.slice(0, 5)
         }
      }
   })

   const pizza2 = await prisma.product.create({
      data: {
         name: "Cheese Pizza",
         imageUrl: "https://media.dodostatic.com/image/r:292x292/11EF16A483ADD64E91433787A0041619.avif",
         categoryId: 1,
         ingradients: {
            connect: ingredients.slice(5, 10)
         }
      }
   })

   const pizza3 = await prisma.product.create({
      data: {
         name: "Chorizo Fresh",
         imageUrl: "https://media.dodostatic.com/image/r:292x292/11EE87464C2BF76CBD2D76B7567BA5A0.avif",
         categoryId: 1,
         ingradients: {
            connect: ingredients.slice(10, 40)
         }
      }
   })

   await prisma.productItem.createMany({
      data: [
         generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
         generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
         generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

         generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

         generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
         generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30 }),
         generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 40 }),
         generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 20 }),
         generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
         generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

         generateProductItem({ productId: 1 }),
         generateProductItem({ productId: 2 }),
         generateProductItem({ productId: 3 }),
         generateProductItem({ productId: 4 }),
         generateProductItem({ productId: 5 }),
         generateProductItem({ productId: 6 }),
         generateProductItem({ productId: 7 }),
         generateProductItem({ productId: 8 }),
         generateProductItem({ productId: 9 }),
         generateProductItem({ productId: 10 }),
         generateProductItem({ productId: 11 }),
         generateProductItem({ productId: 12 }),
         generateProductItem({ productId: 13 }),
         generateProductItem({ productId: 14 }),
         generateProductItem({ productId: 15 }),
         generateProductItem({ productId: 16 }),
         generateProductItem({ productId: 17 }),
      ]
   })
}

// function down is created for removing data before new seeding
async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
   await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
   await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
   await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
   await prisma.$executeRaw`TRUNCATE TABLE "Ingradient" RESTART IDENTITY CASCADE;`;
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