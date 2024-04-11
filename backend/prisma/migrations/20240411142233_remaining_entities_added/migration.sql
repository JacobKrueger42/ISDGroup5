/*
  Warnings:

  - Added the required column `isArchived` to the `CatalogueEntry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AuditLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventDescription" TEXT NOT NULL,
    "topicName" TEXT NOT NULL,
    "loggedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "provider" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PaymentDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unitQuantity" INTEGER NOT NULL,
    "unitCost" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "catalogueEntryId" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_catalogueEntryId_fkey" FOREIGN KEY ("catalogueEntryId") REFERENCES "CatalogueEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentConfirmation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "confirmedAt" DATETIME NOT NULL,
    "reference" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PaymentConfirmation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ShippingDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trackingId" TEXT NOT NULL,
    "deliverService" TEXT NOT NULL,
    "shippedAt" DATETIME NOT NULL,
    "estDeliveryAt" DATETIME NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ShippingDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CatalogueEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "uniqueProductCode" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "productCategory" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CatalogueEntry_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CatalogueEntry" ("createdAt", "id", "price", "productCategory", "productId", "stockQuantity", "uniqueProductCode", "updatedAt") SELECT "createdAt", "id", "price", "productCategory", "productId", "stockQuantity", "uniqueProductCode", "updatedAt" FROM "CatalogueEntry";
DROP TABLE "CatalogueEntry";
ALTER TABLE "new_CatalogueEntry" RENAME TO "CatalogueEntry";
CREATE UNIQUE INDEX "CatalogueEntry_productId_key" ON "CatalogueEntry"("productId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentConfirmation_orderId_key" ON "PaymentConfirmation"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingDetail_orderId_key" ON "ShippingDetail"("orderId");
