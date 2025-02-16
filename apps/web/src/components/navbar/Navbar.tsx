"use client";
import { cn } from "@/src/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="z-50 px-20 py-4 w-full fixed bg-zinc-900 border-b border-dark-gray/50">
            <div className="flex items-center min-h-12 h-12 justify-evenly text-zinc-400">
                <NavItem href={"/login"} pathname={pathname}>
                    Cliente
                </NavItem>
                <NavItem href={"/token"} pathname={pathname}>
                    Token
                </NavItem>
                <NavItem href={"/tabla"} pathname={pathname}>
                    Tabla
                </NavItem>
            </div>
        </nav>
    );
}

type Props = { pathname: string } & React.ComponentProps<typeof Link>;

function NavItem({ pathname, href, className, children, ...props }: Props) {
    return (
        <Link
            data-selected={href === pathname}
            className={cn(
                "hover:text-zinc-100 data-[selected=true]:text-zinc-100 flex items-center text-lg font-medium transition-colors sm:text-base",
                className
            )}
            href={href ?? "/"}
            {...props}
        >
            {children}
        </Link>
    );
}
