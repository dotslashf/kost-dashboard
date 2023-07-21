/*
  Warnings:

  - You are about to drop the column `endRentedAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `startRentedAt` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "endRentedAt",
DROP COLUMN "startRentedAt";
