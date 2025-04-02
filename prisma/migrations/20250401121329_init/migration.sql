/*
  Warnings:

  - Made the column `isDeleted` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deleteStatus" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isDeleted" SET NOT NULL;
