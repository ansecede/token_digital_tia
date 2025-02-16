import { Router, Request } from "express";
import { TokenGenerationType, UsarTokenQueryParams } from "../types";
import {
    calcTimeLeft,
    tokensComparerFactory,
    invalidateToken,
} from "../token/Token";
import { sendError } from "../lib/http";
import { createUsoToken } from "./usoToken";
import prisma from "../lib/db";

const router: Router = Router();
const TOKEN_GENERATION_TYPE: TokenGenerationType = "simple";

router.get("/usosToken", async (_, res) => {
    const usoTokens = await prisma.usoToken.findMany();

    res.send(usoTokens);
});

router.post(
    "/usarToken",
    async (
        req: Request<unknown, unknown, unknown, UsarTokenQueryParams>,
        res
    ) => {
        const idCliente = req.query.cliente;
        const tokenRecibido = req.query.token;

        const tokenActivo = await prisma.token.findFirst({
            where: { usuarioId: +idCliente, activo: true },
        });

        if (!tokenActivo) {
            // Este usuario no ha generado ningun token aun, así que devolver error
            // await createUsoToken(
            //     {
            //         recievedToken: tokenRecibido,
            //         tipoUsoName: "INACTIVE",
            //         tokenId: tokenActivo.id,
            //         usuarioId: tokenActivo.usuarioId,
            //     },
            //     prisma
            // );
            return sendError(
                res,
                "BAD_REQUEST",
                "El usuario no tiene un token activo"
            );
        }

        // Calcular tiempo restante
        const timeLeft = calcTimeLeft(tokenActivo);

        if (timeLeft < 0) {
            // Si el tiempo restante ya paso, invalidar ese token y devolver error
            // TODO: Generar row de uso del token
            await invalidateToken(tokenActivo, prisma);
            await createUsoToken(
                {
                    recievedToken: tokenRecibido,
                    tipoUsoName: "EXPIRED",
                    tokenId: tokenActivo.id,
                    usuarioId: tokenActivo.usuarioId,
                },
                prisma
            );
            return sendError(res, "BAD_REQUEST", "Token no válido");
        }
        // Comparar tokens
        const tokenComparer = tokensComparerFactory(TOKEN_GENERATION_TYPE);
        const result = tokenComparer(tokenActivo.token, tokenRecibido);

        if (!result) {
            await createUsoToken(
                {
                    recievedToken: tokenRecibido,
                    tipoUsoName: "NOT_VALID",
                    tokenId: tokenActivo.id,
                    usuarioId: tokenActivo.usuarioId,
                },
                prisma
            );
            return sendError(res, "BAD_REQUEST", "Token no válido");
        }

        // TODO: Generar row de uso del token
        await createUsoToken(
            {
                recievedToken: tokenRecibido,
                tipoUsoName: "SUCCESS",
                tokenId: tokenActivo.id,
                usuarioId: tokenActivo.usuarioId,
            },
            prisma
        );
        return res.send({ message: "Success" });
    }
);

export default router;
