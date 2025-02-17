type Props = {
    seconds: number;
};

export default function ProgressBar({ seconds }: Props) {
    const percentage = (seconds / 60) * 100;

    return (
        <div className="mb-2 flex justify-center space-x-4">
            <div className="w-1/2 bg-gray-200 rounded-full h-4 ">
                <div
                    className="bg-yellow-god h-4 rounded-full"
                    style={{
                        width: `${percentage}%`,
                        transition: "width 1s linear",
                    }}
                ></div>
            </div>
        </div>
    );
}
