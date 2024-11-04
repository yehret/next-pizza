import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
   const ingradients = await prisma.ingradient.findMany()

   return NextResponse.json(ingradients);
}