"use client";

import { Button } from "@/src/components/ui/button";
import { goBack } from "./errorHandler";

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    return (
        <div className="h-full grid place-content-center">
            <div className="w-full px-10 flex gap-6 flex-col items-center py-28 rounded-2xl ">
                <h2 className="text-5xl">{error.message}</h2>
                {/* <p className="text-2xl">
                    Agrega al url /token?cliente={"<id_del_cliente>"}
                </p> */}
                <Button className="p-8 text-xl" onClick={goBack}>
                    Regresar
                </Button>
            </div>
        </div>
    );
}
