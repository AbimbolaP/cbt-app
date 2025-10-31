/*
  Warnings:

  - A unique constraint covering the columns `[adminConfirmToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "adminConfirmToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_adminConfirmToken_key" ON "public"."User"("adminConfirmToken");
