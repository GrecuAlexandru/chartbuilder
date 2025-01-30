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


const LegendSettings = z.object({
    enabled: z.boolean(),
    layout: z.enum(['horizontal', 'vertical']).optional(),
    align: z.enum(['left', 'center', 'right']).optional(),
    verticalAlign: z.enum(['top', 'middle', 'bottom']).optional(),
    iconSize: z.number().optional(),
    iconType: z.enum(['line', 'plainline', 'square', 'rect', 'circle', 'cross', 'diamond', 'star', 'triangle', 'wye']).optional(),
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

        // Bar Chart
        uiBarChartLayout: z.enum(['vertical', 'horizontal']).optional(),
        uiBarChartBarCategoryGap: z.number().optional(),
        uiBarChartBarGap: z.number().optional(),
        uiBarChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette', 'sign']).optional(),
        uiBarChartReverseStackOrder: z.boolean().optional(),

        // Bar
        uiBarBackgroundFill: z.string().optional(),
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        xAxis: AxisSettings,
        yAxis: AxisSettings,
        cartesianGrid: CartesianGridSettings,
        legend: LegendSettings,

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
    }),
    z.object({
        chartType: z.literal('pie'),
        data: z.array(DataRow),
        legend: LegendSettings,

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
        legend: LegendSettings,
        radarChartDots: z.boolean(),
    }),
    z.object({
        chartType: z.literal('radial'),
        data: z.array(DataRow),
        legend: LegendSettings,
        radialChartText: z.boolean(),
    }),
]);


export type ChartType = z.infer<typeof ChartType>;
export type DataSeries = z.infer<typeof DataSeries>;
export type DataRow = z.infer<typeof DataRow>;
export type ApiChart = z.infer<typeof ApiChart>;