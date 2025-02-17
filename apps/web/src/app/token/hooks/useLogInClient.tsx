import { useSearchParams } from "next/navigation";

export default function useLogInClient() {
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

    return clienteId;
}
