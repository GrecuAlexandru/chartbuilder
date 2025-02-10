/*
    Chart without default values. It doesn't work otherwise.
    The API doesn't replace values that have `.default()`.
*/

import { z } from "zod";

export const ChartType = z.enum([
    "area",
    "bar",
    "line",
    "pie",
    "radar",
    "radial",
    "scatter",
]);

export const DataSeries = z.object({
    dataSeriesLabel: z.string(),
    dataSeriesValue: z.number(),
});

export const DataRow = z.object({
    label: z.string(),
    dataSeries: z.array(DataSeries),
});

const AxisSettings = z.object({
    enabled: z.boolean(),
    height: z.number().optional(),
    orientation: z.enum(['top', 'bottom']).optional(),
    type: z.enum(['number', 'category']).optional(),
    allowDecimals: z.boolean().optional(),
    tickCount: z.number().optional(),
    tickLine: z.boolean().optional(),
    axisLine: z.boolean().optional(),
    paddingLeft: z.number().optional(),
    paddingRight: z.number().optional(),
    tickSize: z.number().optional(),
    mirror: z.boolean().optional(),
    reversed: z.boolean().optional(),
});

const CartesianGridSettings = z.object({
    enabled: z.boolean(),
    horizontal: z.boolean().optional(),
    vertical: z.boolean().optional(),
    backgroundFill: z.string(),
    fillOpacity: z.number().optional(),
});

const PolarGridSettings = z.object({
    enabled: z.boolean(),
    innerRadius: z.number().optional(),
    outerRadius: z.number().optional(),
    polarAnglesCount: z.number().optional(),
    polarRadiusCount: z.number().optional(),
    gridType: z.enum(['circle', 'polygon']).optional(),
});

const LegendSettings = z.object({
    enabled: z.boolean(),
    layout: z.enum(['horizontal', 'vertical']).optional(),
    align: z.enum(['left', 'center', 'right']).optional(),
    verticalAlign: z.enum(['top', 'middle', 'bottom']).optional(),
    iconSize: z.number().optional(),
    iconType: z.enum(['line', 'plainline', 'square', 'rect', 'circle', 'cross', 'diamond', 'star', 'triangle', 'wye']).optional(),
});

const LabelSettings = z.object({
    individual: z.boolean().optional(),
    enabled: z.boolean(),
    dataKey: z.string(),
    position: z.enum(['top', 'left', 'right', 'bottom', 'inside', 'outside', 'insideLeft', 'insideRight', 'insideTop', 'insideBottom', 'insideTopLeft', 'insideBottomLeft', 'insideTopRight', 'insideBottomRight', 'insideStart', 'insideEnd', 'end', 'center']).optional(),
    offset: z.number().optional(),
    fontSize: z.number().optional(),
    fill: z.string().optional(),
});

// Main Chart Schema
export const ApiChart = z.discriminatedUnion('chartType', [
    z.object({
        chartType: z.literal('area'),
        data: z.array(DataRow),
        xAxis: AxisSettings,
        yAxis: AxisSettings,
        cartesianGrid: CartesianGridSettings,
        legend: LegendSettings,
        keyLabelsIndividualEdit: z.boolean().optional(),
        valueLabelsIndividualEdit: z.boolean().optional(),
        keyLabels: z.array(LabelSettings),
        valueLabels: z.array(LabelSettings),

        // Area Chart
        uiAreaChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette']).optional(),

        // Area
        uiAreaType: z.enum(['basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'bump', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']).optional(),
        uiAreaStroke: z.string().optional(),
        uiAreaStrokeWidth: z.number().optional(),
        uiAreaConnectNulls: z.boolean().optional(),
    }),
    z.object({
        chartType: z.literal('bar'),
        data: z.array(DataRow),
        xAxis: AxisSettings,
        yAxis: AxisSettings,
        cartesianGrid: CartesianGridSettings,
        legend: LegendSettings,
        keyLabelsIndividualEdit: z.boolean().optional(),
        valueLabelsIndividualEdit: z.boolean().optional(),
        keyLabels: z.array(LabelSettings),
        valueLabels: z.array(LabelSettings),

        // Bar Chart
        uiBarChartLayout: z.enum(['vertical', 'horizontal']).optional(),
        uiBarChartBarCategoryGap: z.number().optional(),
        uiBarChartBarGap: z.number().optional(),
        uiBarChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette', 'sign']).optional(),
        uiBarChartReverseStackOrder: z.boolean().optional(),

        // Bar
        uiBarBackgroundFill: z.string().optional(),
        uiBarRadius: z.number().optional(),
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        xAxis: AxisSettings,
        yAxis: AxisSettings,
        cartesianGrid: CartesianGridSettings,
        legend: LegendSettings,
        keyLabelsIndividualEdit: z.boolean().optional(),
        valueLabelsIndividualEdit: z.boolean().optional(),
        keyLabels: z.array(LabelSettings),
        valueLabels: z.array(LabelSettings),

        // Line
        uiLineType: z.enum(['basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'bump', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']).optional(),
        uiLineStroke: z.string().optional(),
        uiLineStrokeWidth: z.number().optional(),
        uiLineConnectNulls: z.boolean().optional(),
    }),
    z.object({
        chartType: z.literal('scatter'),
        data: z.array(DataRow),
        xAxis: AxisSettings,
        yAxis: AxisSettings,
        cartesianGrid: CartesianGridSettings,
        legend: LegendSettings,
        keyLabels: z.array(LabelSettings),
        valueLabels: z.array(LabelSettings),
    }),
    z.object({
        chartType: z.literal('pie'),
        data: z.array(DataRow),
        legend: LegendSettings,
        keyLabelsIndividualEdit: z.boolean().optional(),
        valueLabelsIndividualEdit: z.boolean().optional(),
        keyLabels: z.array(LabelSettings),
        valueLabels: z.array(LabelSettings),

        // Pie
        uiPieCX: z.string().optional(),
        uiPieCY: z.string().optional(),
        uiPieInnerRadius: z.number().optional(),
        uiPieOuterRadius: z.number().optional(),
        uiPieStartAngle: z.number().optional(),
        uiPieEndAngle: z.number().optional(),
        uiPieMinAngle: z.number().optional(),
        uiPiePaddingAngle: z.number().optional(),
        uiPieActiveIndex: z.number().optional(),
    }),
    z.object({
        chartType: z.literal('radar'),
        data: z.array(DataRow),
        polarGrid: PolarGridSettings,
        legend: LegendSettings,
        keyLabelsIndividualEdit: z.boolean().optional(),
        valueLabelsIndividualEdit: z.boolean().optional(),
        keyLabels: z.array(LabelSettings),
        valueLabels: z.array(LabelSettings),

        // Radar Chart
        uiRadarChartCX: z.string().optional(),
        uiRadarChartCY: z.string().optional(),

        // Radar
        uiRadarFillOpacity: z.number().optional(),

        // PolarAngleAxis
        uiPolarAngleAxisEnabled: z.boolean(),
        uiPolarAngleAxisAllowDuplicatedCategory: z.boolean().optional(),
    }),
    z.object({
        chartType: z.literal('radial'),
        data: z.array(DataRow),
        polarGrid: PolarGridSettings,
        legend: LegendSettings,
        keyLabelsIndividualEdit: z.boolean().optional(),
        valueLabelsIndividualEdit: z.boolean().optional(),
        keyLabels: z.array(LabelSettings),
        valueLabels: z.array(LabelSettings),

        // Radial Bar Chart
        uiRadialFillOpacity: z.number().optional(),
        uiRadialBarChartBarCategoryGap: z.string().optional(),
        uiRadialBarChartBarGap: z.number().optional(),
        uiRadialBarChartCX: z.string().optional(),
        uiRadialBarChartCY: z.string().optional(),
        uiRadialBarChartStartAngle: z.number().optional(),
        uiRadialBarChartEndAngle: z.number().optional(),
        uiRadialBarChartInnerRadius: z.string().optional(),
        uiRadialBarChartOuterRadius: z.string().optional(),

        // Radial Bar
        uiRadialBarBackground: z.boolean().optional(),
    }),
]);


export type ChartType = z.infer<typeof ChartType>;
export type DataSeries = z.infer<typeof DataSeries>;
export type DataRow = z.infer<typeof DataRow>;
export type ApiChart = z.infer<typeof ApiChart>;