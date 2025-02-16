import { Router, Request } from "express";
import { GenerarTokenQueryParams, TokenGenerationType } from "../types";
import {
    calcTimeLeft,
    createToken,
    invalidateToken,
    tokenGeneratorFactory,
    TOKEN_VALID_TIME_S,
} from "./Token";
import { sendError } from "../lib/http";
import prisma from "../lib/db";

const router: Router = Router();
const TOKEN_GENERATION_TYPE: TokenGenerationType = "simple";

router.get("/tokens", async (_, res) => {
    const tokens = await prisma.token.findMany({
        include: {
            cliente: true,
        },
    });

    const flattenTokens = tokens.map((token) => ({
        ...token,
        nombreCliente: token.cliente.nombre,
    }));

    res.send(flattenTokens);
});

router.get(
    "/generarToken",
    async (
        req: Request<unknown, unknown, unknown, GenerarTokenQueryParams>,
        res
    ) => {
        const clientePorBuscar = req.query.cliente;
        if (!clientePorBuscar) {
            return sendError(res, "BAD_REQUEST", "ID del cliente es requerido");
        }
        const cliente = await prisma.cliente.findUnique({
            where: { id: +clientePorBuscar },
        });
        if (!cliente) {
            return sendError(res, "BAD_REQUEST", "Cliente no existe");
        }

        const tokenActivo = await prisma.token.findFirst({
            where: { clienteId: cliente.id, activo: true },
        });

        const tokenGenerator = tokenGeneratorFactory(TOKEN_GENERATION_TYPE);
        if (!tokenActivo) {
            // Generar nuevo token activo para el cliente y agregarlo a la db
            const newToken = await createToken(
                cliente.id,
                prisma,
                tokenGenerator
            );
            return res.send({
                token: newToken,
                timeLeft: TOKEN_VALID_TIME_S,
            });
        }

        // Calcular tiempo restante
        const timeLeft = calcTimeLeft(tokenActivo);

        if (timeLeft < 0) {
            // Si el tiempo restante ya paso, invalidar ese token y generar uno nuevo
            await invalidateToken(tokenActivo, prisma);
            const newToken = await createToken(
                cliente.id,
                prisma,
                tokenGenerator
            );
            return res.send({
                token: newToken,
                timeLeft: TOKEN_VALID_TIME_S,
            });
        }

        // Devolver el token con el tiempo restante
        res.send({
            token: tokenActivo,
            timeLeft: timeLeft,
        });
    }
);

export default router;
