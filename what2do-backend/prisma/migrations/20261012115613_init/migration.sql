/*
  Warnings:

  - You are about to drop the column `category_id` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusHistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduled_at` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StatusHistory" DROP CONSTRAINT "StatusHistory_todo_id_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_category_id_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "category_id",
DROP COLUMN "content",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "scheduled_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "StatusHistory";
