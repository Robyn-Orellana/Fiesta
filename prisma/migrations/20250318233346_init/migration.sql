-- CreateTable
CREATE TABLE "Invitado" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitado_pkey" PRIMARY KEY ("id")
);
