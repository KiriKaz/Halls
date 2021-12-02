/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `excerpt` on the `Post` table. All the data in the column will be lost.
  - Added the required column `commentCount` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewCount` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewCount` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthLevel" AS ENUM ('USER', 'BETA', 'AUTHOR', 'MOD', 'ADMIN', 'EASTERN');

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "excerpt",
ADD COLUMN     "commentCount" INTEGER NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "indexable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "reviewCount" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "viewCount" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Post_id_seq";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "profileBio" TEXT,
    "pfp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "authLevel" "AuthLevel" NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReview" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "body" TEXT,
    "postId" TEXT,

    CONSTRAINT "PostReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComment" (
    "id" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditedTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body" TEXT NOT NULL,
    "postId" TEXT,
    "userId" TEXT NOT NULL,
    "postReviewId" TEXT,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL,
    "dislikes" INTEGER NOT NULL,
    "profileCommentId" TEXT,

    CONSTRAINT "ProfileComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostComment_postReviewId_key" ON "PostComment"("postReviewId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReview" ADD CONSTRAINT "PostReview_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileComment" ADD CONSTRAINT "ProfileComment_profileCommentId_fkey" FOREIGN KEY ("profileCommentId") REFERENCES "ProfileComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
