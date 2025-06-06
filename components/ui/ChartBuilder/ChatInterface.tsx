import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { memo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChatInterfaceProps {
    chatHistory: { role: string; content: string }[]
    message: string
    setMessage: (message: string) => void
    handleSubmit: (e: React.FormEvent) => void
    handleDemo: () => void
    handleRequestSelect: (value: string) => void
}

export const ChatInterface = memo(function ChatInterface({
    chatHistory,
    message,
    setMessage,
    handleSubmit,
    handleDemo,
    handleRequestSelect,
}: ChatInterfaceProps) {
    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 mb-4 pr-4 pl-4 pt-4">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                        <span
                            className={`inline-block p-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))}
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex items-center pb-4 pr-4 pl-4">
                <Input
                    type="text"
                    placeholder="Type your chart request..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 mr-2"
                />
                <Button type="submit">
                    <Send className="h-4 w-4" />
                </Button>
                {chatHistory.length === 0 && (
                    <div className="flex items-center ml-4">
                        <Button type="button" className="mr-2" onClick={handleDemo} variant="outline">
                            Demo
                        </Button>
                        <Select onValueChange={handleRequestSelect}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select request type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bar3">Bar chart 3 random values</SelectItem>
                                <SelectItem value="areabig">Area chart big data</SelectItem>
                                <SelectItem value="stackedbar">Stacked bar chart</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </form>
        </div>
    )
})

