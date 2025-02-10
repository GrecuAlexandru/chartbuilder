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
            : chart.chartType === 'radial'
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
        if (!chart[labelGroup]) return;

        setChart({
            ...chart,
            [labelGroup]: chart[labelGroup].map(label =>
                label.dataKey === dataKey ? { ...label, [field]: value } : label
            )
        });
    };

    const handleOverallLabelChange = (labelGroup: LabelGroup, field: string, value: any) => {
        if (!chart[labelGroup]) return;

        setChart({
            ...chart,
            [labelGroup]: chart[labelGroup].map(label => ({ ...label, [field]: value }))
        });
    };


    const renderLabels = (labelGroup: LabelGroup, title: string) => {
        if (!chart[labelGroup]) return null;

        return (
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

                                {(chart.chartType === 'pie' && label.position === 'center') ||
                                    (chart.chartType === 'pie' && label.position === 'inside') ? null : (
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
    };

    const renderOverallSettings = (labelGroup: LabelGroup, title: string) => {
        if (!chart[labelGroup]) return null;

        return (
            <div className="p-4 border rounded">
                <h2 className="text-xl font-semibold">{title} - Overall Settings</h2>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Position</label>
                    <select
                        value={chart[labelGroup][0]?.position || 'inside'}
                        onChange={(e) => handleOverallLabelChange(labelGroup, 'position', e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {labelPositions.map((pos) => (
                            <option key={pos} value={pos}>
                                {pos}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Offset</label>
                    <Slider
                        value={[chart[labelGroup][0]?.offset || 5]}
                        min={0}
                        max={20}
                        step={1}
                        onValueChange={([value]) => handleOverallLabelChange(labelGroup, 'offset', value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Font Size</label>
                    <Slider
                        value={[chart[labelGroup][0]?.fontSize || 12]}
                        min={0}
                        max={52}
                        step={1}
                        onValueChange={([value]) => handleOverallLabelChange(labelGroup, 'fontSize', value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Color</label>
                    <ColorPicker
                        default_value={chart[labelGroup][0]?.fill || '#000'}
                        onChange={(color) => handleOverallLabelChange(labelGroup, 'fill', color)}
                    />
                </div>
            </div>
        );
    };


    const renderLabelSection = (labelGroup: LabelGroup, title: string) => {
        const isKeyLabels = labelGroup === 'keyLabels';
        const enabled = chart[labelGroup] && chart[labelGroup].length > 0 ? chart[labelGroup][0].enabled : false;
        const individualEdit = isKeyLabels ? chart.keyLabelsIndividualEdit : chart.valueLabelsIndividualEdit;

        return (
            <div className="p-4 border rounded">
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor={`${labelGroup}-enabled`} className="text-sm font-medium">
                        {title} Enabled
                    </label>
                    <Switch
                        id={`${labelGroup}-enabled`}
                        checked={enabled}
                        onCheckedChange={(checked) => {
                            if (chart[labelGroup]) {
                                setChart({
                                    ...chart,
                                    [labelGroup]: chart[labelGroup].map(label => ({ ...label, enabled: checked }))
                                });
                            }
                        }}
                    />
                </div>

                {enabled && (
                    <>
                        {chart.chartType !== 'pie' && chart.chartType !== 'radar' && chart.chartType !== 'radial' && (
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor={`${labelGroup}-individual-edit`} className="text-sm font-medium">
                                    Individual {title} Editing
                                </label>
                                <Switch
                                    id={`${labelGroup}-individual-edit`}
                                    checked={individualEdit}
                                    onCheckedChange={(checked) =>
                                        setChart({
                                            ...chart,
                                            [isKeyLabels ? 'keyLabelsIndividualEdit' : 'valueLabelsIndividualEdit']: checked
                                        })
                                    }
                                />
                            </div>
                        )}

                        {individualEdit ? (
                            renderLabels(labelGroup, title)
                        ) : (
                            renderOverallSettings(labelGroup, title)
                        )}
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Label Settings</h1>

            {chart.chartType !== 'pie' && chart.chartType !== 'radar' && chart.chartType !== 'radial' && renderLabelSection('keyLabels', 'Key Labels')}
            {renderLabelSection('valueLabels', 'Value Labels')}
        </div>
    );
}