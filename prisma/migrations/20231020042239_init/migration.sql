/*
  Warnings:

  - Changed the type of `injuries` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "injuries",
ADD COLUMN     "injuries" JSONB NOT NULL;
