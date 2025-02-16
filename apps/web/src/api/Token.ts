import { ErrorRes } from "./errorRes";

export type Token = {
    data: {
        token: {
            id: number;
            token: string;
            fechaGeneracion: Date;
            fechaExpiracion: Date;
            activo: boolean;
            usuarioId: number;
        };
        timeLeft: number;
    };
};

type TokenResponse =
    | { success: true; data: Token }
    | { success: false; error: ErrorRes };

export async function getActiveToken(cliente: number): Promise<TokenResponse> {
    const res = await fetch(
        `http://localhost:5000/generarToken?cliente=${cliente}`
    );
    const token = await res.json();

    if (!res.ok) {
        return { success: false, error: token as unknown as ErrorRes };
    }

    return { success: true, data: token as unknown as Token };
}

export async function getAllTokens(): Promise<Token[]> {
    const res = await fetch("http://localhost:5000/tokens");
    const tokens = await res.json();

    return tokens;
}
