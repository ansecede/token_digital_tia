import { Timer } from "@/src/lib/Timer";

type Props = {
    timeLeft: Timer;
};
export default function CountdownTimer({ timeLeft }: Props) {
    return (
        <div className="mb-8 flex justify-center space-x-4">
            <div className="text-center">
                <span className="text-4xl font-semibold">00:</span>
                <span className="text-4xl font-semibold">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                </span>
            </div>
        </div>
    );
}
