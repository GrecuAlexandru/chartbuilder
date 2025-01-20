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
        displayXAxis: z.boolean(),
        displayYAxis: z.boolean(),
        areaChartStacked: z.boolean(),
        uiCartesianGridEnabled: z.boolean(),
        uiCartesianGridHorizontal: z.boolean(),
        uiCartesianGridVertical: z.boolean(),
        uiCartesianGridStrokeDasharray: z.string(),
        uiCartesianGridBackgroundFill: z.string(),
        // uiCartesianGridFillOpacity: z.number().min(0).max(1)
    }),
    z.object({
        chartType: z.literal('bar'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        displayXAxis: z.boolean(),
        displayYAxis: z.boolean(),
        barChartHorizontal: z.boolean(),
        barChartNegative: z.boolean(),
        uiCartesianGridEnabled: z.boolean(),
        uiCartesianGridHorizontal: z.boolean(),
        uiCartesianGridVertical: z.boolean(),
        uiCartesianGridStrokeDasharray: z.string(),
        uiCartesianGridBackgroundFill: z.string(),
        // uiCartesianGridFillOpacity: z.number().min(0).max(1)
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        displayXAxis: z.boolean(),
        displayYAxis: z.boolean(),
        lineChartDots: z.boolean(),
    }),
    z.object({
        chartType: z.literal('scatter'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        displayXAxis: z.boolean(),
        displayYAxis: z.boolean(),
        scatterChartThreeDimensions: z.boolean(),
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