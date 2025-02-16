import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { redirect } from "next/navigation";
// import  { useActionState } from "react";

// function getUser() {}
export default function LoginPage() {
    // const [state, action, isPending] = useActionState(getUser, undefined);
    return (
        <div className="h-full grid place-content-center grid-cols-[40%]">
            <form
                action={async (formData) => {
                    "use server";
                    redirect(`/token?cliente=${formData.get("userId")}`);
                }}
                className="w-full min-w-3xs px-10 flex gap-2 flex-col items-left py-28 rounded-2xl bg-black/20"
            >
                <Label htmlFor="userId" className="text-xl">
                    Id de Usuario:
                </Label>
                <Input
                    name="userId"
                    id="userId"
                    type="number"
                    min={1}
                    placeholder="Un número"
                    className="placeholder:text-xl py-6"
                />
                <Button type="submit" className="w-1/2 py-6 mt-4 text-lg">
                    Iniciar
                </Button>
            </form>
        </div>
    );
}
