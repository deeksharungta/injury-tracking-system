/*
  Warnings:

  - You are about to drop the column `auth0Id` on the `UserDetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `UserDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserDetails_auth0Id_key";

-- AlterTable
ALTER TABLE "UserDetails" DROP COLUMN "auth0Id";

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_email_key" ON "UserDetails"("email");
