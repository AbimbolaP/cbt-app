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

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { score },
  });

  return NextResponse.json({ message: "Score updated", user });
}
