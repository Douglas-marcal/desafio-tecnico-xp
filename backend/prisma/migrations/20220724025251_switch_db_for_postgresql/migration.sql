-- CreateTable
CREATE TABLE "Cliente" (
    "CodCliente" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "Saldo" DECIMAL(65,2) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("CodCliente")
);

-- CreateTable
CREATE TABLE "Ativo" (
    "CodAtivo" SERIAL NOT NULL,
    "QtdeAtivo" INTEGER NOT NULL,
    "Valor" DECIMAL(65,2) NOT NULL,
    "NomeAtivo" TEXT NOT NULL,

    CONSTRAINT "Ativo_pkey" PRIMARY KEY ("CodAtivo")
);

-- CreateTable
CREATE TABLE "Ativo_Cliente" (
    "CodCliente" INTEGER NOT NULL,
    "CodAtivo" INTEGER NOT NULL,
    "QtdeAtivo" INTEGER NOT NULL,

    CONSTRAINT "Ativo_Cliente_pkey" PRIMARY KEY ("CodCliente","CodAtivo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ativo_NomeAtivo_key" ON "Ativo"("NomeAtivo");

-- AddForeignKey
ALTER TABLE "Ativo_Cliente" ADD CONSTRAINT "Ativo_Cliente_CodCliente_fkey" FOREIGN KEY ("CodCliente") REFERENCES "Cliente"("CodCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ativo_Cliente" ADD CONSTRAINT "Ativo_Cliente_CodAtivo_fkey" FOREIGN KEY ("CodAtivo") REFERENCES "Ativo"("CodAtivo") ON DELETE RESTRICT ON UPDATE CASCADE;
