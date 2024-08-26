/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `PomodoroSession` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `completedSessions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `settingsId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `UserSetting` table. All the data in the column will be lost.
  - You are about to drop the column `longBreakInterval` on the `UserSetting` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `UserSetting` table. All the data in the column will be lost.
  - You are about to drop the `PomodoroTaskMapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PomodoroTaskMapping" DROP CONSTRAINT "PomodoroTaskMapping_pomodoroIntervalId_fkey";

-- DropForeignKey
ALTER TABLE "PomodoroTaskMapping" DROP CONSTRAINT "PomodoroTaskMapping_taskId_fkey";

-- DropIndex
DROP INDEX "PomodoroInterval_sessionId_idx";

-- DropIndex
DROP INDEX "PomodoroInterval_taskId_idx";

-- DropIndex
DROP INDEX "PomodoroSession_deletedAt_idx";

-- DropIndex
DROP INDEX "PomodoroSession_userId_idx";

-- DropIndex
DROP INDEX "Task_deletedAt_idx";

-- DropIndex
DROP INDEX "Task_userId_idx";

-- DropIndex
DROP INDEX "User_settingsId_idx";

-- DropIndex
DROP INDEX "User_settingsId_key";

-- DropIndex
DROP INDEX "User_username_key";

-- DropIndex
DROP INDEX "UserSetting_deletedAt_idx";

-- DropIndex
DROP INDEX "UserSetting_userId_idx";

-- AlterTable
ALTER TABLE "PomodoroSession" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "completedSessions",
DROP COLUMN "settingsId",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "UserSetting" DROP COLUMN "deletedAt",
DROP COLUMN "longBreakInterval",
DROP COLUMN "version";

-- DropTable
DROP TABLE "PomodoroTaskMapping";
