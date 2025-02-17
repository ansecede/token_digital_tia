import { ParsedUsoToken, parseUsoTokenResponse } from "../lib/usoToken";
import { Cliente } from "./Cliente";
import { TipoUso } from "./TipoUso";

export type ApiUsoToken = {
    id: number;
    fechaUso: Date;
    tokenUsado: string;
    tokenId: number;
    clienteId: number;
    cliente: Cliente;
    tipoUsoId: number;
    tipoUso: TipoUso;
};

export async function getUsosToken(): Promise<ParsedUsoToken[]> {
    const res = await fetch("http://localhost:5000/usosToken");
    const usos = await res.json();
    console.log(usos);

    const parsedUsos = parseUsoTokenResponse(usos);
    console.log(parsedUsos);

    return parsedUsos;
}
