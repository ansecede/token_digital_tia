"use client";
import {
    createInitialTimeLeft,
    didTimerEnd,
    Timer,
    updateTimeLeft,
} from "@/src/lib/Timer";
import useLogInClient from "./hooks/useLogInClient";
import ProgressBar from "./ui/ProgressBar";
import CountdownTimer from "./ui/Timer";
import { useCallback, useEffect, useState } from "react";
import { getActiveToken, TokenData } from "@/src/api/Token";

type Info = {
    token: string;
    clienteId: number;
};
export default function TokenPage() {
    const clienteId = useLogInClient();
    const [activeToken, setActiveToken] = useState<TokenData>();
    const [timeLeft, setTimeLeft] = useState<Timer>({ seconds: 0 });
    const [info, setInfo] = useState<Info>({ clienteId: 0, token: "" });

    const fetchActiveToken = useCallback(async () => {
        const activeToken = await getActiveToken(clienteId);
        if (!activeToken.success) {
            throw new Error(activeToken.error.message);
        }
        const { data } = activeToken;
        setActiveToken(data);
        setTimeLeft(createInitialTimeLeft(data.timeLeft));
        setInfo({ clienteId: data.token.clienteId, token: data.token.token });
    }, [clienteId]);

    useEffect(() => {
        fetchActiveToken();
    }, [clienteId, fetchActiveToken]);

    useEffect(() => {
        if (timeLeft.seconds > 0 && activeToken) {
            const timer = setInterval(() => {
                setTimeLeft(updateTimeLeft);

                if (didTimerEnd(timeLeft)) {
                    clearInterval(timer);
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft, setTimeLeft, activeToken]);

    useEffect(() => {
        if (timeLeft.seconds === 0 && activeToken) {
            fetchActiveToken(); // Regenerar token cuando el tiempo llega a 0
        }
    }, [timeLeft, activeToken, fetchActiveToken]);

    return (
        <div className="h-full px-10 text-center flex flex-col justify-center">
            {activeToken ? (
                <>
                    <h1 className="text-5xl mb-12">
                        Mostrando token para el cliente con id: {info.clienteId}
                    </h1>
                    <h1 className="text-center text-4xl font-bold mb-12">
                        {info.token}
                    </h1>
                    <p className="text-xl mb-2">Tiempo restante del token:</p>
                    <ProgressBar seconds={timeLeft.seconds} />
                    <CountdownTimer timeLeft={timeLeft} />
                    {/* <pre>{JSON.stringify(activeToken, null, 4)}</pre> */}
                </>
            ) : (
                <h2 className="text-3xl">Cargando token...</h2>
            )}
        </div>
    );
}
