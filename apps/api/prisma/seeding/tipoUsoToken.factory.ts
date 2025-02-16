import { PrismaClient, TipoUsoToken } from "@prisma/client";
import { tokenUsageTypes } from "../../src/usoToken/usoToken";

export async function createTokenUsageTypes(prisma: PrismaClient) {
    const tokenUsageTypesList: TipoUsoToken[] = Object.entries(
        tokenUsageTypes
    ).map(([key, value], idx) => ({
        id: idx + 1,
        nombre: key,
        descripcion: value,
    }));

    const creados: (typeof tokenUsageTypesList)[number][] = [];
    tokenUsageTypesList.forEach(async (usageType) => {
        const insertado = await prisma.tipoUsoToken.upsert({
            where: { id: usageType.id },
            update: {},
            create: usageType,
        });
        creados.push(insertado);
    });
    console.log({ created: creados });
}
