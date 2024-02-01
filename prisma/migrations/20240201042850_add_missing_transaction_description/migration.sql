/*
  Warnings:

  - Added the required column `description` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "transactionId" TEXT NOT NULL PRIMARY KEY,
    "transactionAccountId" TEXT NOT NULL,
    "amount" TEXT NOT NULL DEFAULT '0.00',
    "transactionType" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    CONSTRAINT "Transaction_transactionAccountId_fkey" FOREIGN KEY ("transactionAccountId") REFERENCES "Account" ("accountId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "timestamp", "transactionAccountId", "transactionId", "transactionType") SELECT "amount", "timestamp", "transactionAccountId", "transactionId", "transactionType" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
