-- CreateTable
CREATE TABLE "Transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoTransacao" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "dataTransacao" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ClassificacaoTransacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idTransacao" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    CONSTRAINT "ClassificacaoTransacao_idTransacao_fkey" FOREIGN KEY ("idTransacao") REFERENCES "Transacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Parcelas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idTransacao" INTEGER NOT NULL,
    "valorParcela" REAL NOT NULL,
    "dataVencimento" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL,
    CONSTRAINT "Parcelas_idTransacao_fkey" FOREIGN KEY ("idTransacao") REFERENCES "Transacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
