/*
  Warnings:

  - You are about to drop the `Parcelas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idCaixa` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Parcelas";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Caixa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataAbertura" DATETIME NOT NULL,
    "dataFechamento" DATETIME NOT NULL,
    "saldoInicial" REAL NOT NULL,
    "saldoFinal" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "observacao" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassificacaoTransacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idTransacao" INTEGER NOT NULL,
    "descricao" TEXT,
    CONSTRAINT "ClassificacaoTransacao_idTransacao_fkey" FOREIGN KEY ("idTransacao") REFERENCES "Transacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClassificacaoTransacao" ("descricao", "id", "idTransacao") SELECT "descricao", "id", "idTransacao" FROM "ClassificacaoTransacao";
DROP TABLE "ClassificacaoTransacao";
ALTER TABLE "new_ClassificacaoTransacao" RENAME TO "ClassificacaoTransacao";
CREATE TABLE "new_Transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCaixa" INTEGER NOT NULL,
    "tipoTransacao" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "dataTransacao" DATETIME NOT NULL,
    "descricao" TEXT,
    CONSTRAINT "Transacao_idCaixa_fkey" FOREIGN KEY ("idCaixa") REFERENCES "Caixa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transacao" ("categoria", "dataTransacao", "descricao", "id", "tipoTransacao", "valor") SELECT "categoria", "dataTransacao", "descricao", "id", "tipoTransacao", "valor" FROM "Transacao";
DROP TABLE "Transacao";
ALTER TABLE "new_Transacao" RENAME TO "Transacao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
