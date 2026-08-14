-- CreateTable
CREATE TABLE "Escuderia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,

    CONSTRAINT "Escuderia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Piloto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "escuderiaId" INTEGER NOT NULL,

    CONSTRAINT "Piloto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Piloto" ADD CONSTRAINT "Piloto_escuderiaId_fkey" FOREIGN KEY ("escuderiaId") REFERENCES "Escuderia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
