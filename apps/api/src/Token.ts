import { PrismaClient, Token } from "@prisma/client";
import { TokenGenerationType } from "./types";

export function calcTimeLeft(token: Token) {
    const dueDateTime = token.fechaExpiracion.getTime();
    const createdDateTime = new Date().getTime();

    return (dueDateTime - createdDateTime) / 1000;
}

export async function createToken(
    usuarioId: number,
    prisma: PrismaClient,
    tokenGenerator: () => string
) {
    const currentTime = new Date();
    const fechaExpiracion = new Date(currentTime.getTime() + 61000); // 61 seconds later
    // Generar el token
    const generatedToken = tokenGenerator();

    // Agrego token a la db
    return await prisma.token.create({
        data: {
            token: generatedToken,
            fechaExpiracion,
            usuarioId,
        },
    });
}

export function tokenGeneratorFactory(type: TokenGenerationType): () => string {
    switch (type) {
        case "crypto":
            return () => {
                return "123456";
            };
        case "simple":
            return () => {
                const min = 100000;
                const max = 999999;
                return String(
                    Math.floor(Math.random() * (max - min + 1)) + min
                );
            };
    }
}

export async function invalidateToken(token: Token, prisma: PrismaClient) {
    return prisma.token.update({
        where: { id: token.id },
        data: { activo: false },
    });
}
