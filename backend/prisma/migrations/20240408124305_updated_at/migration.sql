-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "firstName", "id", "lastName", "password", "phone", "role", "updatedAt") SELECT "createdAt", "email", "firstName", "id", "lastName", "password", "phone", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uniqueProductCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("brandName", "createdAt", "id", "name", "uniqueProductCode", "updatedAt") SELECT "brandName", "createdAt", "id", "name", "uniqueProductCode", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_uniqueProductCode_key" ON "Product"("uniqueProductCode");
CREATE TABLE "new_CatalogueEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "uniqueProductCode" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "productCategory" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CatalogueEntry_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CatalogueEntry" ("createdAt", "id", "price", "productCategory", "productId", "stockQuantity", "uniqueProductCode", "updatedAt") SELECT "createdAt", "id", "price", "productCategory", "productId", "stockQuantity", "uniqueProductCode", "updatedAt" FROM "CatalogueEntry";
DROP TABLE "CatalogueEntry";
ALTER TABLE "new_CatalogueEntry" RENAME TO "CatalogueEntry";
CREATE UNIQUE INDEX "CatalogueEntry_productId_key" ON "CatalogueEntry"("productId");
CREATE UNIQUE INDEX "CatalogueEntry_uniqueProductCode_key" ON "CatalogueEntry"("uniqueProductCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
