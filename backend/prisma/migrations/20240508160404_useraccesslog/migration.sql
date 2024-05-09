/*
  Warnings:

  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AuditLog";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserAccessLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loginDate" DATETIME NOT NULL,
    "logoutDate" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL
);
