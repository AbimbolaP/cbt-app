import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await prisma.user.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
