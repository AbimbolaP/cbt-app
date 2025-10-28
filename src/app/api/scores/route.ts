import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { score } = await req.json();

 if (typeof score !== "number") {
    return NextResponse.json({ error: "Invalid score" }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { score },
    });

    return NextResponse.json({
      message: "Score updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Failed to update score:", error);
    return NextResponse.json(
      { error: "Failed to update score" },
      { status: 500 }
    );
  }}
