/* Chart with default values */


import { PolarGrid } from "recharts";
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
    enabled: z.boolean().default(true),
    tickLine: z.boolean().optional().default(true),
    axisLine: z.boolean().optional().default(true),
    height: z.number().optional().default(30),
    orientation: z.enum(['top', 'bottom']).optional().default('bottom'),
    type: z.enum(['number', 'category']).optional(),
    allowDecimals: z.boolean().optional().default(true),
    tickCount: z.number().optional().default(5),
    paddingLeft: z.number().optional().default(0),
    paddingRight: z.number().optional().default(0),
    tickSize: z.number().optional().default(6),
    mirror: z.boolean().optional().default(false),
    reversed: z.boolean().optional().default(false),
});

const CartesianGridSettings = z.object({
    enabled: z.boolean().default(true),
    horizontal: z.boolean().optional().default(true),
    vertical: z.boolean().optional().default(true),
    backgroundFill: z.string().default('#fff'),
    fillOpacity: z.number().optional().default(1),
});

const PolarGridSettings = z.object({
    enabled: z.boolean().default(true),
    innerRadius: z.number().optional().default(0),
    outerRadius: z.number().optional().default(80),
    polarAnglesCount: z.number().optional().default(6),
    polarRadiusCount: z.number().optional().default(6),
    gridType: z.enum(['circle', 'polygon']).optional().default('polygon'),
});

const LegendSettings = z.object({
    enabled: z.boolean().default(true),
    layout: z.enum(['horizontal', 'vertical']).optional().default('horizontal'),
    align: z.enum(['left', 'center', 'right']).optional().default('center'),
    verticalAlign: z.enum(['top', 'middle', 'bottom']).optional().default('bottom'),
    iconSize: z.number().optional().default(14),
    iconType: z.enum(['line', 'plainline', 'square', 'rect', 'circle', 'cross', 'diamond', 'star', 'triangle', 'wye']).optional().default('rect'),
});

// Main Chart Schema
export const Chart = z.discriminatedUnion('chartType', [
    z.object({
        chartType: z.literal('area'),
        data: z.array(DataRow),
        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
        legend: LegendSettings,

        // Area Chart
        uiAreaChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette']).optional().default('none'),

        // Area
        uiAreaType: z.enum(['basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'bump', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']).optional().default('linear'),
        uiAreaStroke: z.string().optional().default('#3182bd'),
        uiAreaStrokeWidth: z.number().optional().default(1),
        uiAreaConnectNulls: z.boolean().optional().default(false),
    }),
    z.object({
        chartType: z.literal('bar'),
        data: z.array(DataRow),
        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
        legend: LegendSettings,

        // Bar Chart
        uiBarChartLayout: z.enum(['vertical', 'horizontal']).optional().default('horizontal'),
        uiBarChartBarCategoryGap: z.number().optional().default(10),
        uiBarChartBarGap: z.number().optional().default(4),
        uiBarChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette', 'sign']).optional().default('none'),
        uiBarChartReverseStackOrder: z.boolean().optional().default(false),

        // Bar
        uiBarBackgroundFill: z.string().optional().default('false'),
        uiBarRadius: z.number().optional().default(0),
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
        legend: LegendSettings,

        // Line
        uiLineType: z.enum(['basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'bump', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']).optional().default('linear'),
        uiLineStroke: z.string().optional().default('#3182bd'),
        uiLineStrokeWidth: z.number().optional().default(1),
        uiLineConnectNulls: z.boolean().optional().default(false),
    }),
    z.object({
        chartType: z.literal('scatter'),
        data: z.array(DataRow),
        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
        legend: LegendSettings,
    }),
    z.object({
        chartType: z.literal('pie'),
        data: z.array(DataRow),
        legend: LegendSettings,

        // Pie
        uiPieCX: z.string().optional().default('50%'),
        uiPieCY: z.string().optional().default('50%'),
        uiPieInnerRadius: z.number().optional().default(0),
        uiPieOuterRadius: z.number().optional().default(80),
        uiPieStartAngle: z.number().optional().default(0),
        uiPieEndAngle: z.number().optional().default(360),
        uiPieMinAngle: z.number().optional().default(0),
        uiPiePaddingAngle: z.number().optional().default(0),
        uiPieActiveIndex: z.number().optional().default(-1),

    }),
    z.object({
        chartType: z.literal('radar'),
        data: z.array(DataRow),
        polarGrid: PolarGridSettings,
        legend: LegendSettings,

        // Radar Chart
        uiRadarChartCX: z.string().optional().default('50%'),
        uiRadarChartCY: z.string().optional().default('50%'),

        // Radar

        // PolarAngleAxis
        uiRadarBarFillOpacity: z.number().optional().default(0.8),
        uiPolarAngleAxisEnabled: z.boolean().default(true),
        uiPolarAnlgeAxisTick: z.boolean().optional().default(true),
        uiPolarAngleAxisAllowDuplicatedCategory: z.boolean().optional().default(true),
    }),
    z.object({
        chartType: z.literal('radial'),
        data: z.array(DataRow),
        polarGrid: PolarGridSettings,
        legend: LegendSettings,

        // Radial Bar Chart
        uiRadialBarChartBarCategoryGap: z.string().optional().default('10%'),
        uiRadialBarChartBarGap: z.number().optional().default(4),
        uiRadialBarChartCX: z.string().optional().default('50%'),
        uiRadialBarChartCY: z.string().optional().default('50%'),
        uiRadialBarChartStartAngle: z.number().optional().default(0),
        uiRadialBarChartEndAngle: z.number().optional().default(360),
        uiRadialBarChartInnerRadius: z.string().optional().default('30%'),
        uiRadialBarChartOuterRadius: z.string().optional().default('100%'),

        // Radial Bar
        uiRadialBarFillOpacity: z.number().optional().default(0.8),
        uiRadialBarBackground: z.boolean().optional().default(false),
    }),
]);

export type ChartType = z.infer<typeof ChartType>;
export type DataSeries = z.infer<typeof DataSeries>;
export type DataRow = z.infer<typeof DataRow>;
export type Chart = z.infer<typeof Chart>;