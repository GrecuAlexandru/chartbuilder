import { Chart } from "@/types/chart";
import { ChartDefaultValues } from "@/types/chartDefaults"
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

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
                        value={chart.uiRadarChartCX ?? ChartDefaultValues.radar.uiRadarChartCX}
                        onChange={(e) =>
                            setChart({
                                ...chart,
                                uiRadarChartCX:
                                    e.target.value === ''
                                        ? ChartDefaultValues.radar.uiRadarChartCX
                                        : parseInt(e.target.value)
                            })
                        }
                    />
                </div>
                <div>
                    <h1>Center Y (%)</h1>
                    <Input
                        id="cy"
                        type="text"
                        value={chart.uiRadarChartCY ?? ChartDefaultValues.radar.uiRadarChartCY}
                        onChange={(e) =>
                            setChart({
                                ...chart,
                                uiRadarChartCY:
                                    e.target.value === ''
                                        ? ChartDefaultValues.radar.uiRadarChartCY
                                        : parseInt(e.target.value)
                            })
                        }
                    />
                </div>
            </div>

            <div className="space-y-4 mt-4 mb-8">
                <h1 className="text-2xl font-semibold">Radar Settings</h1>
                <div>
                    <h1>Fill Opacity</h1>
                    <Slider
                        id="fillOpacity"
                        value={[chart.uiRadarBarFillOpacity ?? ChartDefaultValues.radar.uiRadarBarFillOpacity]}
                        onValueChange={(value) =>
                            setChart({
                                ...chart,
                                uiRadarBarFillOpacity: value[0]
                            })
                        }
                        min={0}
                        max={1}
                        step={0.1}
                        className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        {(chart.uiRadarBarFillOpacity ?? ChartDefaultValues.radar.uiRadarBarFillOpacity).toFixed(1)}
                    </div>
                </div>
            </div>

            <div className="space-y-4 mt-4 mb-8">
                <h1 className="text-2xl font-semibold">Polar Settings</h1>
                <div className="flex items-center justify-between">
                    <h1>Polar Angle Axis Enabled</h1>
                    <Switch
                        id="polarAngleAxisEnabled"
                        checked={chart.uiPolarAngleAxisEnabled ?? true}
                        onCheckedChange={(checked) =>
                            setChart({ ...chart, uiPolarAngleAxisEnabled: checked })
                        }
                    />
                </div>
                <div className="flex items-center justify-between">
                    <h1>Polar Angle Axis Allow Duplicated Category</h1>
                    <Switch
                        id="polarAllowDuplicated"
                        checked={chart.uiPolarAngleAxisAllowDuplicatedCategory ?? true}
                        onCheckedChange={(checked) =>
                            setChart({ ...chart, uiPolarAngleAxisAllowDuplicatedCategory: checked })
                        }
                    />
                </div>
            </div>
        </>
    );
}
