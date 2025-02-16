import { PrismaClient, Token } from "@prisma/client";
import { TokenGenerationType } from "../types";

const TOKEN_VALID_TIME_MS = 60000;
export const TOKEN_VALID_TIME_S = TOKEN_VALID_TIME_MS / 1000;

export function calcTimeLeft(token: Token) {
    const dueDateTime = token.fechaExpiracion.getTime();
    const createdDateTime = new Date().getTime();

    return (dueDateTime - createdDateTime) / 1000;
}

export async function createToken(
    clienteId: number,
    prisma: PrismaClient,
    tokenGenerator: () => string
) {
    const currentTime = new Date();
    const fechaExpiracion = new Date(
        currentTime.getTime() + TOKEN_VALID_TIME_MS
    );
    // Generar el token
    const generatedToken = tokenGenerator();

    // Agrego token a la db
    return await prisma.token.create({
        data: {
            token: generatedToken,
            fechaExpiracion,
            clienteId,
        },
    });
}

export async function invalidateToken(token: Token, prisma: PrismaClient) {
    return await prisma.token.update({
        where: { id: token.id },
        data: { activo: false },
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

export function tokensComparerFactory(
    type: TokenGenerationType
): (dbToken: string, recievedToken: string) => boolean {
    switch (type) {
        case "crypto":
            return (dbToken: string, recievedToken: string) => {
                return false;
            };
        case "simple":
            return (dbToken: string, recievedToken: string) => {
                return dbToken === recievedToken;
            };
    }
}
