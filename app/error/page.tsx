"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ErrorPage() {
    const searchParams = useSearchParams()
    const [code, setCode] = useState<string | null>(null)

    useEffect(() => {
        setCode(searchParams.get("code"))
    }, [searchParams])

    if (code === null) {
        return null
    }

    let errorMessage = "An unknown error occurred"

    switch (code) {
        case "401":
            errorMessage = "Unauthorized: You need to be logged in to access this feature"
            break
        case "429":
            errorMessage = "API Rate Limit Exceeded: You have reached your free tier limit of 100 requests"
            break
        case "413":
            errorMessage = "Chat History Too Large: Please reduce the size of your conversation"
            break
        case "500":
            errorMessage = "Internal Server Error: Failed to process your request"
            break
    }

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
                    Error {code}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    {errorMessage}
                </p>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        prefetch={false}
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}