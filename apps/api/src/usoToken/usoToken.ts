import { PrismaClient } from "@prisma/client";

export const tokenUsageTypes = {
    SUCCESS: "Exitoso",
    INACTIVE: "No activo",
    EXPIRED: "",
    NOT_VALID: "No válido",
} as const;
type TokenUsageType = keyof typeof tokenUsageTypes;

export async function createUsoToken(
    {
        usuarioId,
        tokenId,
        recievedToken,
        tipoUsoName,
    }: {
        usuarioId: number;
        tokenId: number;
        recievedToken: string;
        tipoUsoName: TokenUsageType;
    },
    prisma: PrismaClient
) {
    const tipoUsoId = await prisma.tipoUsoToken.findFirst({
        where: { nombre: tipoUsoName },
    });

    if (!tipoUsoId) {
        throw new Error(
            `No se encontró en la base de datos el tipo de uso: ${tipoUsoName}`
        );
    }
    return await prisma.usoToken.create({
        data: {
            tokenUsado: recievedToken,
            tokenId,
            usuarioId,
            tipoUsoId: tipoUsoId.id,
        },
    });
}
