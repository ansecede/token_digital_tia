"use client";
import { getActiveToken, TokenData } from "@/src/api/Token";
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

    const [activeToken, setActiveToken] = useState<TokenData>();

    useEffect(() => {
        async function fetchActiveToken() {
            const activeToken = await getActiveToken(clienteId);
            if (!activeToken.success) {
                throw new Error(activeToken.error.message);
            }

            setActiveToken(activeToken.data);
        }

        fetchActiveToken();
    }, [clienteId]);

    return (
        <div>
            <p>TokenPage</p>
            <pre>{JSON.stringify(activeToken, null, 4)}</pre>
        </div>
    );
}
