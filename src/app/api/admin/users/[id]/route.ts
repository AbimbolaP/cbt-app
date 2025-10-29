/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { sendAdminStatusEmail } from "@/lib/email";


interface RouteContext {
  params: Promise<{ id: string }>;
}


export async function DELETE(
  req: Request,
  context: any
) {
   const { id } = context.params as { id: string };
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.user.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  context: RouteContext
) {
try{
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { newRole, name, email } = await req.json();

  const exisitingUser = await prisma.user.findUnique({
    where: {id: parseInt(id)},
  })

  if (!exisitingUser) {
    return NextResponse.json({error: "User not found"}, {status: 404});
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      ...(newRole && { role: newRole }),
      ...(name && { name }),
      ...(email && { email }),
    },
  });

  if(newRole && newRole !==exisitingUser.role) {
    const isNowAdmin = newRole === "ADMIN";

    await sendAdminStatusEmail(
      updatedUser.email,
      updatedUser.name || "User",
      isNowAdmin
    );
  }

  return NextResponse.json({ updatedUser }, {status: 200});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch(err: any) {
  console.error("Error in PUT /api/admin/users/[id]:", err);
  return NextResponse.json(
    {error: "Something went wrong", details: err.message},
    {status: 500}
  );
}
}