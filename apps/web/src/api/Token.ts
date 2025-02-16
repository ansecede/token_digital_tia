import { ParsedToken, parseTokenReponse } from "../lib/Token";
import { ErrorRes } from "./errorRes";
import { Cliente } from "./Cliente";

export type ApiToken = {
    id: number;
    token: string;
    fechaGeneracion: Date;
    fechaExpiracion: Date;
    activo: boolean;
    cliente: Cliente;
    clienteId: number;
};

export type TokenData = {
    data: {
        token: ApiToken;
        timeLeft: number;
    };
};

type TokenResponse =
    | { success: true; data: TokenData }
    | { success: false; error: ErrorRes };

export async function getActiveToken(cliente: number): Promise<TokenResponse> {
    const res = await fetch(
        `http://localhost:5000/generarToken?cliente=${cliente}`
    );
    const token = await res.json();

    if (!res.ok) {
        return { success: false, error: token as unknown as ErrorRes };
    }

    return { success: true, data: token as unknown as TokenData };
}

export async function getAllTokens(): Promise<ParsedToken[]> {
    const res = await fetch("http://localhost:5000/tokens");
    const tokens = await res.json();
    const parsedTokens = parseTokenReponse(tokens);

    return parsedTokens;
}
