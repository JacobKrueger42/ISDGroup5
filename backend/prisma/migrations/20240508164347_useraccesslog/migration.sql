-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAccessLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loginDate" DATETIME NOT NULL,
    "logoutDate" DATETIME,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_UserAccessLog" ("id", "loginDate", "logoutDate", "userId") SELECT "id", "loginDate", "logoutDate", "userId" FROM "UserAccessLog";
DROP TABLE "UserAccessLog";
ALTER TABLE "new_UserAccessLog" RENAME TO "UserAccessLog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
