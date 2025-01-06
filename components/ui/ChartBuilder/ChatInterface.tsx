import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface ChatInterfaceProps {
    chatHistory: { role: string, content: string }[]
    message: string
    setMessage: (message: string) => void
    handleSubmit: (e: React.FormEvent) => void
}

export function ChatInterface({
    chatHistory,
    message,
    setMessage,
    handleSubmit
}: ChatInterfaceProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center">
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
            </form>
        </div>
    )
}