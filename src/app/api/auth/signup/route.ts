import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
  const { name, email, password, role } = await req.json();

  if(!name || !email || !password) {
    return NextResponse.json(
      {error: "Missing required fields"},
      { status: 400 }
    );
  }

const existingUser = await prisma.user.findUnique({ where: { email }});

if(existingUser) {
  return NextResponse.json(
    {error: "User already exists"},
    { status:400 }
  )
}

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name, 
      email,
      password: hashed,
      role: role || "STUDENT"
    },
  });
  const { password:_password, ...safeUser } = user;

  return NextResponse.json(safeUser);
} catch (err) {
  console.error("SignUp error:", err);
  return NextResponse.json(
     {error: "Something went wrong"},
     {status: 500}
  );
}}