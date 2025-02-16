"use client";
import { getToken, Token } from "@/src/api/Token";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TokenPage() {
    const searchParams = useSearchParams();

    const cliente = searchParams.get("cliente");
    if (!cliente)
        throw new Error(
            "Se necesita especificar un cliente para acceder al token."
        );
    const clienteId = Number(cliente);
    if (isNaN(clienteId)) {
        throw new Error("Parámetro cliente debe ser un valor númerico");
    }
    const [token, setToken] = useState<Token>();

    useEffect(() => {
        async function fetchToken() {
            const token = await getToken(clienteId);
            if (!token.success) {
                throw new Error(token.error.message);
            }
            console.log(token);

            setToken(token.data);
        }

        fetchToken();
    }, [clienteId]);

    return (
        <div>
            <p>TokenPage</p>
            <pre>{JSON.stringify(token, null, 4)}</pre>
        </div>
    );
}
