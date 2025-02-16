-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "fecha_generacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_expiración" DATETIME NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "tokens_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "uso_tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fechaUso" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenUsado" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "uso_tokens_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "uso_tokens_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");
