import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any ) {
  const { id } = context.params as { id: string };
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.question.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   context: any
) {
  try{
    const { id } = context.params as { id: string };
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

    const body = await req.json();
    const { primary, option1, option2, option3, option4, answer } = body;

    if (!primary || !option1 || !option2 || !option3 || !option4 || !answer) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const updatedQuestion = await prisma.question.update({
      where: { id: parseInt(id) },
      data: {
        primary,
        option1,
        option2,
        option3,
        option4,
        answer,
      },
    });

    return NextResponse.json({ updatedQuestion }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/admin/questions/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}