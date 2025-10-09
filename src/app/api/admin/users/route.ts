import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export async function GET() {
  const session = await getServerSession(authOptions);

  if(!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({
      error: "Unauthorized"
    },{
      status: 401
    });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      score: true,
    }
  });

  return NextResponse.json(users);
}