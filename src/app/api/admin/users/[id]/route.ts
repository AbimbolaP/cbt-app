import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.user.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { newRole, name, email } = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: {
      ...(newRole && { role: newRole }),
      ...(name && { name }),
      ...(email && { email }),
    },
  });

  return NextResponse.json({ success: true, updatedUser });
}