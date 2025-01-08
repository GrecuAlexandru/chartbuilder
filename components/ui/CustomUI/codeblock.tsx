"use client"

import { useEffect, useState } from "react"
import { codeToHtml } from "shiki"

interface CodeBlockProps {
    code: string
    language: string
    filename?: string
    showLineNumbers?: boolean
}

export function CodeBlock({
    code,
    language,
    filename,
    showLineNumbers = false,
}: CodeBlockProps) {
    const [highlightedCode, setHighlightedCode] = useState("")

    useEffect(() => {
        async function highlightCode() {
            const highlighted = await codeToHtml(code, {
                lang: language,
                theme: "github-light",
            })
            setHighlightedCode(highlighted)
        }

        highlightCode()
    }, [code, language, showLineNumbers])

    return (
        <div className="relative rounded-lg overflow-hidden">
            {filename && (
                <div className="bg-neutral-100 px-4 py-2 text-sm border-b border-neutral-200">
                    {filename}
                </div>
            )}
            <div
                className="p-4 overflow-auto bg-white"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
        </div>
    )
}