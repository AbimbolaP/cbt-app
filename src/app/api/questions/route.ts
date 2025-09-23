import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.question.findMany();
  return NextResponse.json(questions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const question = await prisma.question.create({
    data:body
  });
  return NextResponse.json(question)
}