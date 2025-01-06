
import { Button } from "@/components/ui/button"

export function ChartSettings() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Chart Settings</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Chart Type</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Bar</option>
                        <option>Line</option>
                        <option>Pie</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Color Scheme</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Default</option>
                        <option>Pastel</option>
                        <option>Vibrant</option>
                    </select>
                </div>
                <Button>Update Chart</Button>
            </div>
        </div>
    )
}