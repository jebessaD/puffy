/*
  Warnings:

  - Made the column `color` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DEFAULT 'N/A',
ALTER COLUMN "size" SET NOT NULL,
ALTER COLUMN "size" SET DEFAULT 'N/A';
