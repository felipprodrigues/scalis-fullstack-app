-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "transactionId" TEXT NOT NULL PRIMARY KEY,
    "transactionAccountId" TEXT,
    "destinationAccountId" TEXT,
    "amount" INTEGER NOT NULL,
    "transactionType" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_transactionAccountId_fkey" FOREIGN KEY ("transactionAccountId") REFERENCES "BankAccount" ("accountId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_destinationAccountId_fkey" FOREIGN KEY ("destinationAccountId") REFERENCES "BankAccount" ("accountId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "destinationAccountId", "timestamp", "transactionAccountId", "transactionId", "transactionType") SELECT "amount", "destinationAccountId", "timestamp", "transactionAccountId", "transactionId", "transactionType" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
