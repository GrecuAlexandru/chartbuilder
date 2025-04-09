import { Input } from "@/components/ui/input"
import { Chart } from "@/types/chart"
import ColorPicker from "@/components/ui/color-picker"

interface ChartStyleSettingsProps {
    chart: Chart
    setChart: (chart: Chart) => void
}

export default function ChartStyleSettings({ chart, setChart }: ChartStyleSettingsProps) {
    return (
        <div className="space-y-4 mt-4 mb-8">
            <h1 className="text-2xl font-semibold">Chart Style Settings</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h2 className="font-medium">Width</h2>
                    <Input
                        type="number"
                        value={chart.chartStyleSettings.width}
                        onChange={(e) => setChart({
                            ...chart,
                            chartStyleSettings: {
                                ...chart.chartStyleSettings,
                                width: parseInt(e.target.value) || 800
                            }
                        })}
                    />
                </div>
                <div>
                    <h2 className="font-medium">Height</h2>
                    <Input
                        type="number"
                        value={chart.chartStyleSettings.height}
                        onChange={(e) => setChart({
                            ...chart,
                            chartStyleSettings: {
                                ...chart.chartStyleSettings,
                                height: parseInt(e.target.value) || 400
                            }
                        })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="font-medium">Margin</h2>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(chart.chartStyleSettings.margin).map(([key, value]) => (
                        <div key={key}>
                            <label className="capitalize">{key}</label>
                            <Input
                                type="number"
                                value={value}
                                onChange={(e) => setChart({
                                    ...chart,
                                    chartStyleSettings: {
                                        ...chart.chartStyleSettings,
                                        margin: {
                                            ...chart.chartStyleSettings.margin,
                                            [key]: parseInt(e.target.value) || 5
                                        }
                                    }
                                })}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-medium">Background Color</h2>
                <ColorPicker
                    default_value={chart.chartStyleSettings.backgroundFill}
                    onChange={(color) => setChart({
                        ...chart,
                        chartStyleSettings: {
                            ...chart.chartStyleSettings,
                            backgroundFill: color
                        }
                    })}
                />
            </div>

            <div>
                <h2 className="font-medium">Background Opacity</h2>
                <Input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={chart.chartStyleSettings.backgroundOpacity}
                    onChange={(e) => setChart({
                        ...chart,
                        chartStyleSettings: {
                            ...chart.chartStyleSettings,
                            backgroundOpacity: parseFloat(e.target.value) || 1
                        }
                    })}
                />
            </div>
        </div>
    )
}
