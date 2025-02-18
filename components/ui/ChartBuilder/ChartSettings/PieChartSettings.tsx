import { Chart } from "@/types/chart";
import { ChartDefaultValues } from "@/types/chartDefaults";
import { Input } from "@/components/ui/input";

interface PieChartSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function PieChartSettings({ chart, setChart }: PieChartSettingsProps) {
    if (chart.chartType !== 'pie') return null;

    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Pie Chart Settings</h1>
            <div>
                <h1>Center X (%)</h1>
                <Input
                    id="cx"
                    type="number"
                    value={(chart.uiPieCX ?? '50%')}
                    onChange={(e) =>
                        setChart({
                            ...chart,
                            uiPieCX:
                                e.target.value === '' ? ChartDefaultValues.pie.uiPieCX : parseInt(e.target.value)
                        })
                    }
                />
            </div>
            <div>
                <h1>Center Y (%)</h1>
                <Input
                    id="cy"
                    type="text"
                    value={(chart.uiPieCY ?? '50%')}
                    onChange={(e) =>
                        setChart({
                            ...chart,
                            uiPieCY:
                                e.target.value === '' ? ChartDefaultValues.pie.uiPieCY : parseInt(e.target.value)
                        })
                    }
                />
            </div>
            <div>
                <h1>Inner Radius</h1>
                <Input
                    id="innerRadius"
                    type="number"
                    value={chart.uiPieInnerRadius ?? ChartDefaultValues.pie.uiPieInnerRadius}
                    onChange={(e) =>
                        setChart({
                            ...chart,
                            uiPieInnerRadius:
                                e.target.value === '' ? ChartDefaultValues.pie.uiPieInnerRadius : parseInt(e.target.value)
                        })
                    }
                />
            </div>
            <div>
                <h1>Outer Radius</h1>
                <Input
                    id="outerRadius"
                    type="number"
                    value={chart.uiPieOuterRadius ?? ChartDefaultValues.pie.uiPieOuterRadius}
                    onChange={(e) =>
                        setChart({
                            ...chart,
                            uiPieOuterRadius:
                                e.target.value === '' ? ChartDefaultValues.pie.uiPieOuterRadius : parseInt(e.target.value)
                        })
                    }
                />
            </div>
            <div>
                <h1>Start Angle</h1>
                <Input
                    id="startAngle"
                    type="number"
                    value={chart.uiPieStartAngle ?? ChartDefaultValues.pie.uiPieStartAngle}
                    onChange={(e) =>
                        setChart({
                            ...chart,
                            uiPieStartAngle:
                                e.target.value === '' ? ChartDefaultValues.pie.uiPieStartAngle : parseInt(e.target.value)
                        })
                    }
                />
            </div>
            <div>
                <h1>End Angle</h1>
                <Input
                    id="endAngle"
                    type="number"
                    value={chart.uiPieEndAngle ?? ChartDefaultValues.pie.uiPieEndAngle}
                    onChange={(e) =>
                        setChart({
                            ...chart,
                            uiPieEndAngle:
                                e.target.value === '' ? ChartDefaultValues.pie.uiPieEndAngle : parseInt(e.target.value)
                        })
                    }
                />
            </div>
            <div>
                <h1>Minimum Angle</h1>
                <Input
                    id="minAngle"
                    type="number"
                    value={chart.uiPieMinAngle ?? ChartDefaultValues.pie.uiPieMinAngle}
                    onChange={(e) =>
                        setChart({
                            ...chart,
                            uiPieMinAngle:
                                e.target.value === '' ? ChartDefaultValues.pie.uiPieMinAngle : parseInt(e.target.value)
                        })
                    }
                />
            </div>
            <div>
                <h1>Padding Angle</h1>
                <Input
                    id="paddingAngle"
                    type="number"
                    value={chart.uiPiePaddingAngle ?? ChartDefaultValues.pie.uiPiePaddingAngle}
                    onChange={(e) =>
                        setChart({
                            ...chart,
                            uiPiePaddingAngle:
                                e.target.value === '' ? ChartDefaultValues.pie.uiPiePaddingAngle : parseInt(e.target.value)
                        })
                    }
                />
            </div>
            <div>
                <h1>Active Segment</h1>
                <Input
                    id="activeIndex"
                    type="number"
                    value={chart.uiPieActiveIndex ?? ChartDefaultValues.pie.uiPieActiveIndex}
                    onChange={(e) =>
                        setChart({
                            ...chart,
                            uiPieActiveIndex:
                                e.target.value === '' ? ChartDefaultValues.pie.uiPieActiveIndex : parseInt(e.target.value)
                        })
                    }
                />
            </div>
        </div>
    );
}