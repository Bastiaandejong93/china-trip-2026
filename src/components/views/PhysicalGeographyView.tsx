"use client";

import { ReactNode } from "react";

export function PhysicalGeographyView({ children }: { children: ReactNode }) {
    return (
        <div className="relative h-full w-full overflow-y-auto bg-ink-black pt-24 pb-12">
            <div className="container mx-auto px-4">
                {children}
            </div>
        </div>
    );
}
