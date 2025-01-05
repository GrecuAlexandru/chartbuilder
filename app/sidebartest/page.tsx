import { SidebarProvider } from "@/components/ui/sidebar"
import { ChartControlSidebar } from "@/app/sidebartest/chart-control-sidebar"

export default function ChartPage() {
    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <ChartControlSidebar />
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-4">Chart Visualization</h1>
                    <div className="bg-gray-100 border rounded-lg h-[600px] flex items-center justify-center">
                        Chart Placeholder
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}