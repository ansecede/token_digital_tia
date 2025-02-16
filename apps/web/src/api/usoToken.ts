import { ParsedUsoToken, parseUsoTokenResponse } from "../lib/usoToken";

export type ApiUsoToken = {
    id: number;
    fechaUso: Date;
    tokenUsado: string;
    tokenId: number;
    clienteId: number;
    tipoUsoId: number;
};

export async function getUsosToken(): Promise<ParsedUsoToken[]> {
    const res = await fetch("http://localhost:5000/usosToken");
    const usos = await res.json();
    const parsedUsos = parseUsoTokenResponse(usos);

    return parsedUsos;
}
