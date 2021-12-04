/*
  Warnings:

  - Changed the type of `content` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "commentCount" SET DEFAULT 0,
DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "reviewCount" SET DEFAULT 0,
ALTER COLUMN "viewCount" SET DEFAULT 0;
