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
  const questions = await prisma.question.findMany();
  return NextResponse.json(questions);
}
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
   if(!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({
      error: "Unauthorized"
    },{
      status: 401
    });
  }
  const { primary, option1, option2, option3, option4, answer } = await req.json();

  if (!primary || !option1 || !option2 || !option3 || !option4 || !answer) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const question = await prisma.question.create({
    data: { primary, option1, option2, option3, option4, answer },
  });

  return NextResponse.json(question);
}
