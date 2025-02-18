import { Chart } from "@/types/chart";
import { ChartDefaultValues } from "@/types/chartDefaults";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface XAxisSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function XAxisSettings({ chart, setChart }: XAxisSettingsProps) {
    if (chart.chartType !== 'area' && chart.chartType !== 'bar' && chart.chartType !== 'line' && chart.chartType !== 'scatter') return null;

    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">X Axis Settings</h1>
            <div className="flex items-center justify-between">
                <h1>Enable X Axis</h1>
                <Switch
                    checked={chart.xAxis?.enabled ?? false}
                    onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, enabled: checked } })}
                />
            </div>
            <div className={`space-y-4 ${!chart.xAxis?.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                    <h1>Tick Line</h1>
                    <Switch
                        checked={chart.xAxis?.tickLine ?? true}
                        onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, tickLine: checked } })}
                    />
                </div>
                <div>
                    <h1>Axis Line</h1>
                    <Switch
                        checked={chart.xAxis?.axisLine ?? true}
                        onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, axisLine: checked } })}
                    />
                </div>
                <div>
                    <h1>Height</h1>
                    <Input
                        type="number"
                        value={chart.xAxis?.height ?? ChartDefaultValues.xAxis.height}
                        onChange={(e) => setChart({
                            ...chart,
                            xAxis: {
                                ...chart.xAxis,
                                height: e.target.value === '' ? ChartDefaultValues.xAxis.height : parseInt(e.target.value)
                            }
                        })}
                    />
                </div>
                <div>
                    <h1>Orientation</h1>
                    <select
                        value={chart.xAxis?.orientation ?? 'bottom'}
                        onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, orientation: e.target.value as 'top' | 'bottom' } })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <h1>Allow Decimals</h1>
                    <Switch
                        checked={chart.xAxis?.allowDecimals ?? true}
                        onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, allowDecimals: checked } })}
                    />
                </div>
                <div>
                    <h1>Tick Count</h1>
                    <Input
                        type="number"
                        value={chart.xAxis?.tickCount ?? ChartDefaultValues.xAxis.tickCount}
                        onChange={(e) => setChart({
                            ...chart,
                            xAxis: {
                                ...chart.xAxis,
                                tickCount: e.target.value === '' ? ChartDefaultValues.xAxis.tickCount : parseInt(e.target.value)
                            }
                        })}
                    />
                </div>
                <div>
                    <h1>Padding Left</h1>
                    <Input
                        type="number"
                        value={chart.xAxis?.paddingLeft ?? ChartDefaultValues.xAxis.paddingLeft}
                        onChange={(e) => setChart({
                            ...chart,
                            xAxis: {
                                ...chart.xAxis,
                                paddingLeft: e.target.value === '' ? ChartDefaultValues.xAxis.paddingLeft : parseInt(e.target.value)
                            }
                        })}
                    />
                </div>
                <div>
                    <h1>Padding Right</h1>
                    <Input
                        type="number"
                        value={chart.xAxis?.paddingRight ?? 0}
                        onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, paddingRight: parseInt(e.target.value) } })}
                    />
                </div>
                <div>
                    <h1>Tick Size</h1>
                    <Input
                        type="number"
                        value={chart.xAxis?.tickSize ?? ChartDefaultValues.xAxis.tickSize}
                        onChange={(e) => setChart({
                            ...chart,
                            xAxis: {
                                ...chart.xAxis,
                                tickSize: e.target.value === '' ? ChartDefaultValues.xAxis.tickSize : parseInt(e.target.value)
                            }
                        })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <h1>Mirror</h1>
                    <Switch
                        checked={chart.xAxis?.mirror ?? false}
                        onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, mirror: checked } })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <h1>Reversed</h1>
                    <Switch
                        checked={chart.xAxis?.reversed ?? false}
                        onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, reversed: checked } })}
                    />
                </div>
            </div>
            <div>
                <h1>Domain Min</h1>
                <select
                    value={chart.xAxis?.domainMin ?? '0'}
                    onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, domainMin: e.target.value as '0' | 'auto' | 'dataMin' } })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="0">0</option>
                    <option value="auto">Auto</option>
                    <option value="dataMin">Data Min</option>
                </select>
                {chart.xAxis?.domainMin === 'dataMin' && (
                    <div className="mt-2">
                        <Input
                            type="number"
                            value={chart.xAxis?.dataMinNumber ?? 0}
                            onChange={(e) => setChart({
                                ...chart,
                                xAxis: {
                                    ...chart.xAxis,
                                    dataMinNumber: e.target.value === '' ? 0 : parseFloat(e.target.value)
                                }
                            })}
                        />
                    </div>
                )}
            </div>

            <div>
                <h1>Domain Max</h1>
                <select
                    value={chart.xAxis?.domainMax ?? 'auto'}
                    onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, domainMax: e.target.value as 'auto' | 'dataMax' } })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="auto">Auto</option>
                    <option value="dataMax">Data Max</option>
                </select>
                {chart.xAxis?.domainMax === 'dataMax' && (
                    <div className="mt-2">
                        <Input
                            type="number"
                            value={chart.xAxis?.dataMaxNumber ?? 0}
                            onChange={(e) => setChart({
                                ...chart,
                                xAxis: {
                                    ...chart.xAxis,
                                    dataMaxNumber: e.target.value === '' ? 0 : parseFloat(e.target.value)
                                }
                            })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}