/* Chart with default values */


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
        areaChartStacked: z.boolean(),
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
        chartType: z.literal('bar'),
        data: z.array(DataRow),
        legend: LegendSettings,
        barChartHorizontal: z.boolean(),
        barChartNegative: z.boolean().optional(),

        // UI Settings

        // Bar Chart
        uiBarChartLayout: z.enum(['vertical', 'horizontal']).optional().default('horizontal'),
        uiBarChartBarCategoryGap: z.number().optional().default(10),
        uiBarChartBarGap: z.number().optional().default(4),
        uiBarChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette', 'sign']).optional().default('none'),
        uiBarChartReverseStackOrder: z.boolean().optional().default(false),

        // Bar
        uiBarBackgroundFill: z.string().optional().default('false'),

        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        legend: LegendSettings,
        lineChartDots: z.boolean().default(false),

        // UI Settings

        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
    }),
    z.object({
        chartType: z.literal('scatter'),
        data: z.array(DataRow),
        legend: LegendSettings,
        scatterChartThreeDimensions: z.boolean().default(false),

        // UI Settings

        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
    }),
    z.object({
        chartType: z.literal('pie'),
        data: z.array(DataRow),
        legend: LegendSettings,
        pieChartDonut: z.boolean().default(false),
    }),
    z.object({
        chartType: z.literal('radar'),
        data: z.array(DataRow),
        legend: LegendSettings,
        radarChartDots: z.boolean().default(false),
    }),
    z.object({
        chartType: z.literal('radial'),
        data: z.array(DataRow),
        legend: LegendSettings,
        radialChartText: z.boolean().default(false),
    }),
]);

export type ChartType = z.infer<typeof ChartType>;
export type DataSeries = z.infer<typeof DataSeries>;
export type DataRow = z.infer<typeof DataRow>;
export type Chart = z.infer<typeof Chart>;