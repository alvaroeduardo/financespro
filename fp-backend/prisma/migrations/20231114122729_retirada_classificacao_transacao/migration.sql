/*
  Warnings:

  - You are about to drop the `ClassificacaoTransacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ClassificacaoTransacao";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Caixa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataAbertura" DATETIME NOT NULL,
    "dataFechamento" DATETIME,
    "saldoInicial" REAL NOT NULL,
    "saldoFinal" REAL,
    "status" TEXT NOT NULL,
    "observacao" TEXT
);
INSERT INTO "new_Caixa" ("dataAbertura", "dataFechamento", "id", "observacao", "saldoFinal", "saldoInicial", "status") SELECT "dataAbertura", "dataFechamento", "id", "observacao", "saldoFinal", "saldoInicial", "status" FROM "Caixa";
DROP TABLE "Caixa";
ALTER TABLE "new_Caixa" RENAME TO "Caixa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
