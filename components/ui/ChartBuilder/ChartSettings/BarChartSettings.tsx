import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Chart } from "@/types/chart";
import ColorPicker from "@/components/ui/color-picker"


interface BarChartSettingsProps {
    chart: Chart
    setChart: (chart: Chart) => void
}

export default function BarChartSettings({ chart, setChart }: BarChartSettingsProps) {
    if (chart.chartType !== 'bar') return null;

    return (
        <>
            <div className="space-y-4 mt-4 mb-8">
                <h1 className="text-2xl font-semibold">Bar Chart Settings</h1>
                <div>
                    <h1>Layout</h1>
                    <select
                        id="layout"
                        value={chart.uiBarChartLayout ?? 'vertical'}
                        onChange={(e) => setChart({ ...chart, uiBarChartLayout: e.target.value as any })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="vertical">Vertical</option>
                        <option value="horizontal">Horizontal</option>
                    </select>
                </div>
                <div>
                    <h1>Bar Category Gap</h1>
                    <Input
                        id="barCategoryGap"
                        type="text"
                        value={chart.uiBarChartBarCategoryGap ?? ''}
                        onChange={(e) => setChart({ ...chart, uiBarChartBarCategoryGap: parseInt(e.target.value) })}
                        className="w-full"
                    />
                </div>
                <div>
                    <h1>Bar Gap</h1>
                    <Input
                        id="barGap"
                        type="text"
                        value={chart.uiBarChartBarGap ?? ''}
                        onChange={(e) => setChart({ ...chart, uiBarChartBarGap: parseInt(e.target.value) })}
                        className="w-full"
                    />
                </div>
                <div>
                    <h1>Stack Offset</h1>
                    <select
                        id="stackOffset"
                        value={chart.uiBarChartStackOffset ?? 'none'}
                        onChange={(e) => setChart({ ...chart, uiBarChartStackOffset: e.target.value as any })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="expand">Expand</option>
                        <option value="none">None</option>
                        <option value="wiggle">Wiggle</option>
                        <option value="silhouette">Silhouette</option>
                        <option value="sign">Sign</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <h1>Reverse Stack Order</h1>
                    <Switch
                        id="reverseStackOrder"
                        checked={chart.uiBarChartReverseStackOrder ?? false}
                        onCheckedChange={(checked) => setChart({ ...chart, uiBarChartReverseStackOrder: checked })}
                    />
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <h1 className="text-2xl font-semibold">Bar Settings</h1>
                <div>
                    <h1>Background Fill</h1>
                    <ColorPicker
                        default_value={chart.uiBarBackgroundFill ?? chart.cartesianGrid.backgroundFill ?? '#ffffff'}
                        onChange={(color) => setChart({ ...chart, uiBarBackgroundFill: color })}
                    />
                    <Button
                        onClick={() => setChart({ ...chart, uiBarBackgroundFill: chart.cartesianGrid.backgroundFill ?? '#ffffff' })}
                        className="mt-2"
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </>
    )
}