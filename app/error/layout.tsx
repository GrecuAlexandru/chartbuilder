import type React from "react"

export const metadata = {
    title: "Error Page",
    description: "An error occurred",
}

export default function ErrorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}