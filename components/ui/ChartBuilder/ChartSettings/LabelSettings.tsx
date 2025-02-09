import { Chart } from "@/types/chart";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "@/components/ui/color-picker";

interface LabelSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

type LabelGroup = 'keyLabels' | 'valueLabels';

export default function LabelSettings({ chart, setChart }: LabelSettingsProps) {

    const labelPositions =
        chart.chartType === 'pie'
            ? (['inside', 'outside', 'insideStart', 'insideEnd', 'end', 'center'] as const)
            : ([
                'top',
                'left',
                'right',
                'bottom',
                'inside',
                'outside',
                'insideLeft',
                'insideRight',
                'insideTop',
                'insideBottom',
                'insideTopLeft',
                'insideBottomLeft',
                'insideTopRight',
                'insideBottomRight',
                'insideStart',
                'insideEnd',
                'end',
                'center'
            ] as const);

    const updateLabel = (
        labelGroup: LabelGroup,
        dataKey: string,
        field: string,
        value: any
    ) => {
        setChart({
            ...chart,
            [labelGroup]: chart[labelGroup].map(label =>
                label.dataKey === dataKey ? { ...label, [field]: value } : label
            )
        });
    };

    const renderLabels = (labelGroup: LabelGroup, title: string) => (
        <section>
            <h2 className="text-xl font-semibold">{title}</h2>
            {chart[labelGroup].map((label) => (
                <div key={label.dataKey} className="space-y-4 p-4 border rounded">
                    <h3 className="text-lg font-semibold">{label.dataKey}</h3>

                    <div className="flex items-center justify-between">
                        <label htmlFor={`label-switch-${label.dataKey}`} className="text-sm font-medium">
                            Labels
                        </label>
                        <Switch
                            id={`label-switch-${label.dataKey}`}
                            checked={label.enabled}
                            onCheckedChange={(checked) =>
                                updateLabel(labelGroup, label.dataKey, 'enabled', checked)
                            }
                        />
                    </div>

                    {label.enabled && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Position</label>
                                <select
                                    value={label.position}
                                    onChange={(e) =>
                                        updateLabel(labelGroup, label.dataKey, 'position', e.target.value)
                                    }
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    {labelPositions.map((pos) => (
                                        <option key={pos} value={pos}>
                                            {pos}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {(chart.chartType === 'pie' && label.position === 'center') || (chart.chartType === 'pie' && label.position === 'inside') ? null : (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Offset</label>
                                    <Slider
                                        value={[label.offset]}
                                        min={0}
                                        max={20}
                                        step={1}
                                        onValueChange={([value]) =>
                                            updateLabel(labelGroup, label.dataKey, 'offset', value)
                                        }
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Font Size</label>
                                <Slider
                                    value={[label.fontSize]}
                                    min={0}
                                    max={52}
                                    step={1}
                                    onValueChange={([value]) =>
                                        updateLabel(labelGroup, label.dataKey, 'fontSize', value)
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Color</label>
                                <ColorPicker
                                    default_value={label.fill}
                                    onChange={(color) =>
                                        updateLabel(labelGroup, label.dataKey, 'fill', color)
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </section>
    );

    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Label Settings</h1>

            <div className="p-4 border rounded">
                {chart.chartType !== 'pie' && (
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="key-labels-toggle" className="text-sm font-medium">
                            Individual Key Label Editing
                        </label>
                        <Switch
                            id="key-labels-toggle"
                            checked={chart.keyLabelsIndividualEdit}
                            onCheckedChange={(checked) =>
                                setChart({ ...chart, keyLabelsIndividualEdit: checked })
                            }
                        />
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <label htmlFor="value-labels-toggle" className="text-sm font-medium">
                        Individual Value Label Editing
                    </label>
                    <Switch
                        id="value-labels-toggle"
                        checked={chart.valueLabelsIndividualEdit}
                        onCheckedChange={(checked) =>
                            setChart({ ...chart, valueLabelsIndividualEdit: checked })
                        }
                    />
                </div>

                {chart.chartType !== 'pie' ? (
                    chart.keyLabelsIndividualEdit ? (
                        renderLabels('keyLabels', 'Key Labels')
                    ) : (
                        <div className="p-4 border rounded">
                            <h2 className="text-xl font-semibold">Key Labels</h2>
                            <p className="text-sm text-gray-600">
                                Individual key label editing is disabled.
                            </p>
                        </div>
                    )
                ) : null}

                {chart.valueLabelsIndividualEdit ? (
                    renderLabels('valueLabels', 'Value Labels')
                ) : (
                    <div className="p-4 border rounded">
                        <h2 className="text-xl font-semibold">Value Labels</h2>
                        <p className="text-sm text-gray-600">
                            Individual value label editing is disabled.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}