-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "isThumbsDown" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isThumbsUp" BOOLEAN NOT NULL DEFAULT false;
