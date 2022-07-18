-- CreateTable
CREATE TABLE `Cliente` (
    `CodCliente` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `Saldo` INTEGER NOT NULL,

    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`CodCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ativo` (
    `CodAtivo` INTEGER NOT NULL AUTO_INCREMENT,
    `QtdeAtivo` INTEGER NOT NULL,
    `Valor` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`CodAtivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ativo_Cliente` (
    `CodCliente` INTEGER NOT NULL,
    `CodAtivo` INTEGER NOT NULL,
    `QtdeAtivo` INTEGER NOT NULL,

    PRIMARY KEY (`CodCliente`, `CodAtivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ativo_Cliente` ADD CONSTRAINT `Ativo_Cliente_CodCliente_fkey` FOREIGN KEY (`CodCliente`) REFERENCES `Cliente`(`CodCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ativo_Cliente` ADD CONSTRAINT `Ativo_Cliente_CodAtivo_fkey` FOREIGN KEY (`CodAtivo`) REFERENCES `Ativo`(`CodAtivo`) ON DELETE RESTRICT ON UPDATE CASCADE;
