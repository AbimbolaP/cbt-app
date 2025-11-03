// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const token = searchParams.get("token");
//     const resend = new Resend(process.env.RESEND_API_KEY!);

//   if (!token) {
//     return NextResponse.json({ error: "Invalid or missing token" }, { status: 400 });
//   }

//   const user = await prisma.user.findFirst({
//     where: { adminConfirmToken: token, pendingAdmin: true },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "Token invalid or expired" }, { status: 404 });
//   }

//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       role: "ADMIN",
//       pendingAdmin: false,
//       adminConfirmToken: null,
//     },
//   });

//   // Send confirmation success mail
//   await resend.emails.send({
//     from: "Admin Portal <no-reply@resend.dev>",
//     to: user.email,
//     subject: "Admin Access Activated",
//     html: `
//       <p>Hi ${user.name || "User"},</p>
//       <p>Your admin privileges have been activated successfully!</p>
//       <p>You can now log in and manage admin tasks.</p>
//       <p>-- ARIEL CBT TEAM</p>
//     `,
//   });

//   return NextResponse.json({ message: "Admin access confirmed successfully." });
// }

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/confirm-admin?status=invalid", req.url)
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        adminConfirmToken: token,
        pendingAdmin: true,
      },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL("/confirm-admin?status=notfound", req.url)
      );
    }


    await prisma.user.update({
      where: { id: user.id },
      data: {
        role: "ADMIN",
        pendingAdmin: false,
        adminConfirmToken: null,
      },
    });

    return NextResponse.redirect(
      new URL("/confirm-admin?status=success", req.url)
    );
  } catch (error) {
    console.error("Error confirming admin:", error);
    return NextResponse.redirect(
      new URL("/confirm-admin?status=error", req.url)
    );
  }
}
