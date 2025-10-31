/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { sendAdminStatusEmail } from "@/lib/email";
import { Resend } from "resend";



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
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { newRole, name, email } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: {id: parseInt(id)},
  })

  if (!existingUser) {
    return NextResponse.json({error: "User not found"}, {status: 404});
  }

  // const updatedUser = await prisma.user.update({
  //   where: { id: parseInt(id) },
  //   data: {
  //     ...(newRole && { role: newRole }),
  //     ...(name && { name }),
  //     ...(email && { email }),
  //   },
  // });

  if(newRole && newRole !== existingUser.role) {
    const isNowAdmin = newRole === "ADMIN";

    if(isNowAdmin) {
      const token = crypto.randomUUID();

      await prisma.user.update({
        where: {id: parseInt(id) },
        data: {
          pendingAdmin: true,
          adminConfirmToken: token,
        }
      });

      const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/confirm-admin?token=${token}`;
      await resend.emails.send({
         from: "Admin Portal <no-reply@resend.dev>",
      to: existingUser.email,
      subject: "Confirm Admin Access",
      html: `
        <p>Hi ${existingUser.name || "User"},</p>
        <p>You’ve been invited to become an <strong>Admin</strong> on the CBT Examination Software Platform.</p>
        <p>Please click the link below to confirm your admin role:</p>
        <p><a href="${confirmLink}" 
          style="display:inline-block;background:#2563eb;color:white;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:bold;">
      Confirm Admin Access
    </a></p>
        <p>If you do not wish to be an admin, you can safely ignore this message.</p>
      `,
      });
      return NextResponse.json({message: "Admin Invitation Sent. Awaiting Confirmation"});
    } const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        ...(newRole && { role: newRole }),
        ...(name && { name }),
        ...(email && { email }),
        pendingAdmin: false,
        adminConfirmToken: null,
      },
    });

    if (existingUser.role === "ADMIN" && newRole === "USER") {
      await sendAdminStatusEmail(updatedUser.email, updatedUser.name || "User", false);
    }

    return NextResponse.json({ updatedUser }, { status: 200 });
  }

  
} catch(err: any) {
  console.error("Error in PUT /api/admin/users/[id]:", err);
  return NextResponse.json(
    {error: "Something went wrong", details: err.message},
    {status: 500}
  );
}
}