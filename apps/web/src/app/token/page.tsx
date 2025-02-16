"use client";
import { useSearchParams } from "next/navigation";

export default function TokenPage() {
    const searchParams = useSearchParams();

    const cliente = searchParams.get("cliente");
    if (!cliente)
        throw new Error(
            "Se necesita especificar un cliente para acceder al token."
        );
    return <div>TokenPage</div>;
}
