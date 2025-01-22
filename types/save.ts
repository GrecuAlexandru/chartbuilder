import { z } from "zod";

// Chart Types
export const ChartType = z.enum([
    "area",
    "bar",
    "line",
    "pie",
    "radar",
    "radial",
    "scatter",
]);

// Data Structure
export const DataSeries = z.object({
    dataSeriesLabel: z.string(),
    dataSeriesValue: z.number(),
});

export const DataRow = z.object({
    label: z.string(),
    dataSeries: z.array(DataSeries),
});

// Main Chart Schema
export const Chart = z.discriminatedUnion('chartType', [
    z.object({
        chartType: z.literal('area'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        areaChartStacked: z.boolean(),

        // UI Settings

        // XAxis
        uiXAxisEnabled: z.boolean(),
        uiXAxisHeight: z.number(),
        uiXAxisOrientation: z.enum(['top', 'bottom']),
        uiXAxisType: z.enum(['number', 'category']),
        uiXAxisAllowDecimals: z.boolean(),
        uiXAxisTickCount: z.number(),
        uiXAxisPaddingLeft: z.number(),
        uiXAxisPaddingRight: z.number(),
        uiXAxisTickSize: z.number(),
        uiXAxisMirror: z.boolean(),
        uiXAxisReversed: z.boolean(),

        // YAxis
        uiYAxisEnabled: z.boolean(),

        // Cartesian Grid
        uiCartesianGridEnabled: z.boolean(),
        uiCartesianGridHorizontal: z.boolean(),
        uiCartesianGridVertical: z.boolean(),
        uiCartesianGridBackgroundFill: z.string(),
        uiCartesianGridFillOpacity: z.number(),
    }),
    z.object({
        chartType: z.literal('bar'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        barChartHorizontal: z.boolean(),
        barChartNegative: z.boolean(),

        // UI Settings

        // Bar Chart
        uiBarChartLayout: z.enum(['vertical', 'horizontal']),
        uiBarChartBarCategoryGap: z.number(),
        uiBarChartBarGap: z.number(),
        uiBarChartBarSize: z.number(),
        uiBarChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette', 'sign']),
        uiBarChartReverseStackOrder: z.boolean(),

        // XAxis
        uiXAxisEnabled: z.boolean(),
        uiXAxisHeight: z.number(),
        uiXAxisOrientation: z.enum(['top', 'bottom']),
        uiXAxisType: z.enum(['number', 'category']),
        uiXAxisAllowDecimals: z.boolean(),
        uiXAxisTickCount: z.number(),
        uiXAxisPaddingLeft: z.number(),
        uiXAxisPaddingRight: z.number(),
        uiXAxisTickSize: z.number(),
        uiXAxisMirror: z.boolean(),
        uiXAxisReversed: z.boolean(),

        // YAxis
        uiYAxisEnabled: z.boolean(),

        // Cartesian Grid
        uiCartesianGridEnabled: z.boolean(),
        uiCartesianGridHorizontal: z.boolean(),
        uiCartesianGridVertical: z.boolean(),
        uiCartesianGridBackgroundFill: z.string(),
        uiCartesianGridFillOpacity: z.number(),
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        lineChartDots: z.boolean(),

        // UI Settings

        // XAxis
        uiXAxisEnabled: z.boolean(),
        uiXAxisHeight: z.number(),
        uiXAxisOrientation: z.enum(['top', 'bottom']),
        uiXAxisType: z.enum(['number', 'category']),
        uiXAxisAllowDecimals: z.boolean(),
        uiXAxisTickCount: z.number(),
        uiXAxisPaddingLeft: z.number(),
        uiXAxisPaddingRight: z.number(),
        uiXAxisTickSize: z.number(),
        uiXAxisMirror: z.boolean(),
        uiXAxisReversed: z.boolean(),

        // YAxis
        uiYAxisEnabled: z.boolean(),
    }),
    z.object({
        chartType: z.literal('scatter'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        scatterChartThreeDimensions: z.boolean(),

        // UI Settings

        // XAxis
        uiXAxisEnabled: z.boolean(),
        uiXAxisHeight: z.number(),
        uiXAxisOrientation: z.enum(['top', 'bottom']),
        uiXAxisType: z.enum(['number', 'category']),
        uiXAxisAllowDecimals: z.boolean(),
        uiXAxisTickCount: z.number(),
        uiXAxisPaddingLeft: z.number(),
        uiXAxisPaddingRight: z.number(),
        uiXAxisTickSize: z.number(),
        uiXAxisMirror: z.boolean(),
        uiXAxisReversed: z.boolean(),

        // YAxis
        uiYAxisEnabled: z.boolean(),
    }),
    z.object({
        chartType: z.literal('pie'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        pieChartDonut: z.boolean(),
    }),
    z.object({
        chartType: z.literal('radar'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        radarChartDots: z.boolean(),
    }),
    z.object({
        chartType: z.literal('radial'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        radialChartText: z.boolean(),
    }),
]);


export type ChartType = z.infer<typeof ChartType>;
export type DataSeries = z.infer<typeof DataSeries>;
export type DataRow = z.infer<typeof DataRow>;
export type Chart = z.infer<typeof Chart>;