/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `PostComment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `PostReview` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostReview" DROP CONSTRAINT "PostReview_postId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("slug");

-- AlterTable
ALTER TABLE "PostComment" DROP COLUMN "postId",
ADD COLUMN     "postSlug" TEXT;

-- AlterTable
ALTER TABLE "PostReview" DROP COLUMN "postId",
ADD COLUMN     "postSlug" TEXT;

-- AddForeignKey
ALTER TABLE "PostReview" ADD CONSTRAINT "PostReview_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "Post"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "Post"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
