import { Chart } from "@/types/chart";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface RadarChartSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function RadarChartSettings({ chart, setChart }: RadarChartSettingsProps) {
    if (chart.chartType !== 'radar') return null;

    return (
        <>
            <div className="space-y-4 mt-4 mb-8">
                <h1 className="text-2xl font-semibold">Radar Chart Settings</h1>
                <div>
                    <h1>Center X (%)</h1>
                    <Input
                        id="cx"
                        type="text"
                        value={(chart.uiRadarChartCX ?? '50%')}
                        onChange={(e) => setChart({ ...chart, uiRadarChartCX: e.target.value })}
                    />
                </div>
                <div>
                    <h1>Center Y (%)</h1>
                    <Input
                        id="cy"
                        type="text"
                        value={(chart.uiRadarChartCY ?? '50%')}
                        onChange={(e) => setChart({ ...chart, uiRadarChartCY: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-4 mt-4 mb-8">
                <h1 className="text-2xl font-semibold">Radar Settings</h1>
                <div>
                    <h1>Fill Opacity</h1>
                    <Slider
                        id="fillOpacity"
                        value={[chart.uiRadarBarFillOpacity ?? 0.8]}
                        onValueChange={(value) => setChart({ ...chart, uiRadarBarFillOpacity: value[0] })}
                        min={0}
                        max={1}
                        step={0.1}
                        className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        {(chart.uiRadarBarFillOpacity ?? 0.8).toFixed(1)}
                    </div>
                </div>
            </div>
        </>
    );
}