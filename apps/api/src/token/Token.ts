import { PrismaClient, Token } from "@prisma/client";
import { TokenGenerationType } from "../types";

const SECRET = new TextEncoder().encode("TestKeYWow");
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
    tokenGenerator: () => Promise<string>
) {
    const currentTime = new Date();
    const fechaExpiracion = new Date(
        currentTime.getTime() + TOKEN_VALID_TIME_MS
    );
    // Generar el token
    const generatedToken = await tokenGenerator();

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

export function tokenGeneratorFactory(
    type: TokenGenerationType
): () => Promise<string> {
    switch (type) {
        case "crypto":
            return async () => {
                const data = new DataView(new ArrayBuffer(8));
                const interval = Date.now() / 1000 / TOKEN_VALID_TIME_S / 10;
                data.setBigUint64(0, BigInt(Math.floor(interval)), false);

                const algo = { name: "HMAC", hash: "SHA-1" };
                const key = await crypto.subtle.importKey(
                    "raw",
                    SECRET,
                    algo,
                    false,
                    ["sign"]
                );
                const hmacHash = new Uint8Array(
                    await crypto.subtle.sign(algo, key, data.buffer)
                );

                const offset = hmacHash[hmacHash.byteLength - 1] & 0x0f;
                const hotp =
                    ((hmacHash[offset] & 0x7f) << 24) |
                    ((hmacHash[1 + offset] & 0xff) << 16) |
                    ((hmacHash[2 + offset] & 0xff) << 8) |
                    (hmacHash[3 + offset] & 0xff);
                return String(hotp % 1_000_000);
            };
        case "simple":
            return async () => {
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
                return dbToken === recievedToken;
            };
        case "simple":
            return (dbToken: string, recievedToken: string) => {
                return dbToken === recievedToken;
            };
    }
}
