import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const params = req.nextUrl.searchParams;
    const isTokenRoute = path === "/token";
    const hasClientParam = Boolean(params.get("cliente"));
    const shouldRedirect = isTokenRoute && !hasClientParam;

    const cookiesStore = await cookies();
    const clienteId = cookiesStore.get("clienteId");

    if (clienteId && shouldRedirect) {
        const sss = new URL(`/token?cliente=${clienteId.value}`, req.nextUrl);
        console.log("Redirecciono");
        return NextResponse.redirect(sss);
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
