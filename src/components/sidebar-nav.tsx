import React from 'react';
import { NavLink } from 'react-router-dom';


import { cn } from "../shadcn/lib/utils";
import { buttonVariants } from "../shadcn/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
    }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {

    return (
        <nav
            className={cn(
                "flex flex-col gap-3",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                        cn(
                            buttonVariants({ variant: "link" }),
                            isActive
                                ? "bg-slate-200 text-blue-500 underline"
                                : "hover:bg-slate-200 hover:underline",
                            "justify-start flex-none"
                        )
                    }
                >
                    {item.title}
                </NavLink>
            ))}
            <div className="flex-grow"></div>
        </nav>

    );
}
