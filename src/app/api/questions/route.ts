import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  // const questions = await prisma.question.findMany();
  // return NextResponse.json(questions);
  try {
    const questions = await prisma.question.findMany();
    console.log(questions);
    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error("Error fetching questions:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch questions" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

  export async function POST(req: Request) {
    const body = await req.json();
    const question = await prisma.question.create({
      data: body
    });
    return NextResponse.json(question)
  }