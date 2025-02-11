"use client"

import React, { useEffect } from "react"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { BarChart, AreaChart, LineChart, RadarChart, ScatterChart, RadialBarChart, LabelList, PieChart, Bar, Area, Pie, Radar, RadialBar, Line, XAxis, YAxis, CartesianGrid, Legend, Scatter, PolarGrid, PolarAngleAxis } from "recharts"
import { useToPng } from '@hugocxl/react-to-image'
import { Button } from "@/components/ui/button"
import { Chart } from "@/types/chart"

interface ChartViewProps {
    chart?: Chart
    chartData: any[]
    chartConfig: any
}

export function ChartView({ chart, chartData, chartConfig }: ChartViewProps) {
    const [_, convert, ref] = useToPng<HTMLDivElement>({
        quality: 0.8,
        canvasHeight: 500,
        canvasWidth: 500,
        onSuccess: data => {
            const link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = data;
            link.click();
        }
    })

    const renderChart = () => {
        if (!chart) return <div>Loading...</div>;

        const firstLabel = chartData[0]?.label;
        if (['bar', 'area', 'line', 'scatter'].includes(chart.chartType) && 'xAxis' in chart && 'yAxis' in chart) {
            if (Number.isInteger(Number(firstLabel))) {
                if (chart.chartType === 'bar' && chart.uiBarChartLayout === 'horizontal') {
                    chart.xAxis.type = 'number';
                    chart.yAxis.type = 'category';
                } else if (chart.chartType === 'bar' && chart.uiBarChartLayout === 'vertical') {
                    chart.xAxis.type = 'category';
                    chart.yAxis.type = 'number';
                }
            } else {
                if (chart.chartType === 'bar' && chart.uiBarChartLayout === 'horizontal') {
                    chart.xAxis.type = 'category';
                    chart.yAxis.type = 'number';
                } else if (chart.chartType === 'bar' && chart.uiBarChartLayout === 'vertical') {
                    chart.xAxis.type = 'number';
                    chart.yAxis.type = 'category';
                }
            }
        }

        switch (chart.chartType) {
            case 'bar':
                return (
                    <ChartContainer ref={ref} config={chartConfig} className="w-full p-4 pb-8 bg-white">
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            layout={chart.uiBarChartLayout}
                            barCategoryGap={chart.uiBarChartBarCategoryGap}
                            barGap={chart.uiBarChartBarGap}
                            stackOffset={chart.uiBarChartStackOffset}
                            reverseStackOrder={chart.uiBarChartReverseStackOrder}
                        >
                            {chart.cartesianGrid.enabled && (
                                <CartesianGrid
                                    horizontal={chart.cartesianGrid.horizontal ?? true}
                                    vertical={chart.cartesianGrid.vertical ?? true}
                                    fill={chart.cartesianGrid.backgroundFill}
                                    fillOpacity={chart.cartesianGrid.fillOpacity}
                                />
                            )}
                            {chart.xAxis.enabled && chart.uiBarChartLayout == 'horizontal' && (
                                <XAxis
                                    dataKey="label"
                                    stroke="#333"

                                    tickLine={chart.xAxis.tickLine}
                                    axisLine={chart.xAxis.axisLine}
                                    height={chart.xAxis.height}
                                    orientation={chart.xAxis.orientation}
                                    type={chart.xAxis.type}
                                    allowDecimals={chart.xAxis.allowDecimals}
                                    tickCount={chart.xAxis.tickCount}
                                    padding={{ left: chart.xAxis.paddingLeft, right: chart.xAxis.paddingRight }}
                                    tickSize={chart.xAxis.tickSize}
                                    mirror={chart.xAxis.mirror}
                                    reversed={chart.xAxis.reversed}
                                />
                            )}
                            {chart.yAxis.enabled && chart.uiBarChartLayout == 'horizontal' && (
                                <YAxis
                                    // type="number"
                                    stroke="#333"

                                    tickLine={chart.yAxis.tickLine}
                                    axisLine={chart.yAxis.axisLine}
                                    width={chart.yAxis.height}
                                    orientation={chart.yAxis.orientation == 'bottom' ? 'left' : 'right'}
                                    type={chart.yAxis.type}
                                    allowDecimals={chart.yAxis.allowDecimals}
                                    tickCount={chart.yAxis.tickCount}
                                    padding={{ top: chart.yAxis.paddingLeft, bottom: chart.yAxis.paddingRight }}
                                    tickSize={chart.yAxis.tickSize}
                                    mirror={chart.yAxis.mirror}
                                    reversed={chart.yAxis.reversed}
                                />
                            )}
                            {chart.xAxis.enabled && chart.uiBarChartLayout == 'vertical' && (
                                <XAxis
                                    // type="number"
                                    type={chart.xAxis.type}
                                    stroke="#333"

                                    tickLine={chart.xAxis.tickLine}
                                    axisLine={chart.xAxis.axisLine}
                                    width={chart.yAxis.height}
                                    orientation={chart.xAxis.orientation}
                                    allowDecimals={chart.xAxis.allowDecimals}
                                    tickCount={chart.xAxis.tickCount}
                                    padding={{ left: chart.xAxis.paddingLeft, right: chart.xAxis.paddingRight }}
                                    tickSize={chart.xAxis.tickSize}
                                    mirror={chart.xAxis.mirror}
                                    reversed={chart.xAxis.reversed}
                                />
                            )}
                            {chart.yAxis.enabled && chart.uiBarChartLayout == 'vertical' && (
                                <YAxis
                                    dataKey="label"
                                    type={chart.yAxis.type}
                                    // type="category"
                                    stroke="#333"

                                    tickLine={chart.yAxis.tickLine}
                                    axisLine={chart.yAxis.axisLine}
                                    width={chart.yAxis.height}
                                    orientation={chart.yAxis.orientation == 'bottom' ? 'left' : 'right'}
                                    allowDecimals={chart.yAxis.allowDecimals}
                                    tickCount={chart.yAxis.tickCount}
                                    padding={{ top: chart.yAxis.paddingLeft, bottom: chart.yAxis.paddingRight }}
                                    tickSize={chart.yAxis.tickSize}
                                    mirror={chart.yAxis.mirror}
                                    reversed={chart.yAxis.reversed}
                                />
                            )}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Bar
                                    key={index}
                                    dataKey={key}
                                    fill={chartConfig[key].color}
                                    isAnimationActive={false}
                                    background={chart.uiBarBackgroundFill == 'false' ? false : { fill: chart.uiBarBackgroundFill }}
                                    radius={chart.uiBarRadius}
                                >
                                    {chart.keyLabels[index].enabled && (
                                        <LabelList
                                            key={index}
                                            dataKey="label"
                                            position={chart.keyLabels[index].position}
                                            offset={chart.keyLabels[index].offset}
                                            fontSize={chart.keyLabels[index].fontSize}
                                            fill={chart.keyLabels[index].fill}
                                        />
                                    )}
                                    {chart.valueLabels[index].enabled && (
                                        <LabelList
                                            key={index}
                                            dataKey={key}
                                            position={chart.valueLabels[index].position}
                                            offset={chart.valueLabels[index].offset}
                                            fontSize={chart.valueLabels[index].fontSize}
                                            fill={chart.valueLabels[index].fill}
                                        />
                                    )}
                                </Bar>
                            ))}
                            {chart.legend.enabled &&
                                <ChartLegend
                                    // content={<ChartLegendContent />}
                                    layout={chart.legend.layout}
                                    align={chart.legend.align}
                                    verticalAlign={chart.legend.verticalAlign}
                                    iconSize={chart.legend.iconSize}
                                    iconType={chart.legend.iconType}
                                />
                            }
                        </BarChart>
                    </ChartContainer>
                );
            case 'area':
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            stackOffset={chart.uiAreaChartStackOffset}
                        >
                            {chart.cartesianGrid.enabled && (
                                <CartesianGrid
                                    horizontal={chart.cartesianGrid.horizontal ?? true}
                                    vertical={chart.cartesianGrid.vertical ?? true}
                                    fill={chart.cartesianGrid.backgroundFill}
                                    fillOpacity={chart.cartesianGrid.fillOpacity}
                                />
                            )}
                            {chart.xAxis.enabled && (
                                <XAxis
                                    dataKey="label"
                                    stroke="#333"

                                    tickLine={chart.xAxis.tickLine}
                                    axisLine={chart.xAxis.axisLine}
                                    height={chart.xAxis.height}
                                    orientation={chart.xAxis.orientation}
                                    type={chart.xAxis.type}
                                    allowDecimals={chart.xAxis.allowDecimals}
                                    tickCount={chart.xAxis.tickCount}
                                    padding={{ left: chart.xAxis.paddingLeft, right: chart.xAxis.paddingRight }}
                                    tickSize={chart.xAxis.tickSize}
                                    mirror={chart.xAxis.mirror}
                                    reversed={chart.xAxis.reversed}
                                />
                            )}
                            {chart.yAxis.enabled && (
                                <YAxis
                                    // type="number"
                                    stroke="#333"

                                    tickLine={chart.yAxis.tickLine}
                                    axisLine={chart.yAxis.axisLine}
                                    width={chart.yAxis.height}
                                    orientation={chart.yAxis.orientation == 'bottom' ? 'left' : 'right'}
                                    type={chart.yAxis.type}
                                    allowDecimals={chart.yAxis.allowDecimals}
                                    tickCount={chart.yAxis.tickCount}
                                    padding={{ top: chart.yAxis.paddingLeft, bottom: chart.yAxis.paddingRight }}
                                    tickSize={chart.yAxis.tickSize}
                                    mirror={chart.yAxis.mirror}
                                    reversed={chart.yAxis.reversed}
                                />
                            )}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Area
                                    key={index}
                                    dataKey={key}
                                    fill={chartConfig[key].color}
                                    isAnimationActive={false}
                                    type={chart.uiAreaType}
                                    stroke={chart.uiAreaStroke}
                                    strokeWidth={chart.uiAreaStrokeWidth}
                                    connectNulls={chart.uiAreaConnectNulls}
                                >
                                    {chart.keyLabels[index].enabled && (
                                        <LabelList
                                            key={index}
                                            dataKey="label"
                                            position={chart.keyLabels[index].position}
                                            offset={chart.keyLabels[index].offset}
                                            fontSize={chart.keyLabels[index].fontSize}
                                            fill={chart.keyLabels[index].fill}
                                        />
                                    )}
                                    {chart.valueLabels[index].enabled && (
                                        <LabelList
                                            key={index}
                                            dataKey={key}
                                            position={chart.valueLabels[index].position}
                                            offset={chart.valueLabels[index].offset}
                                            fontSize={chart.valueLabels[index].fontSize}
                                            fill={chart.valueLabels[index].fill}
                                        />
                                    )}
                                </Area>
                            ))}
                            {chart.legend.enabled &&
                                <ChartLegend
                                    // content={<ChartLegendContent />}
                                    layout={chart.legend.layout}
                                    align={chart.legend.align}
                                    verticalAlign={chart.legend.verticalAlign}
                                    iconSize={chart.legend.iconSize}
                                    iconType={chart.legend.iconType}
                                />
                            }
                        </AreaChart>
                    </ChartContainer>
                );
            case 'line':
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                        >
                            {chart.cartesianGrid.enabled && (
                                <CartesianGrid
                                    horizontal={chart.cartesianGrid.horizontal ?? true}
                                    vertical={chart.cartesianGrid.vertical ?? true}
                                    fill={chart.cartesianGrid.backgroundFill}
                                    fillOpacity={chart.cartesianGrid.fillOpacity}
                                />
                            )}
                            {chart.xAxis.enabled && (
                                <XAxis
                                    dataKey="label"
                                    stroke="#333"

                                    tickLine={chart.xAxis.tickLine}
                                    axisLine={chart.xAxis.axisLine}
                                    height={chart.xAxis.height}
                                    orientation={chart.xAxis.orientation}
                                    type={chart.xAxis.type}
                                    allowDecimals={chart.xAxis.allowDecimals}
                                    tickCount={chart.xAxis.tickCount}
                                    padding={{ left: chart.xAxis.paddingLeft, right: chart.xAxis.paddingRight }}
                                    tickSize={chart.xAxis.tickSize}
                                    mirror={chart.xAxis.mirror}
                                    reversed={chart.xAxis.reversed}
                                />
                            )}
                            {chart.yAxis.enabled && (
                                <YAxis
                                    // type="number"
                                    stroke="#333"

                                    tickLine={chart.yAxis.tickLine}
                                    axisLine={chart.yAxis.axisLine}
                                    width={chart.yAxis.height}
                                    orientation={chart.yAxis.orientation == 'bottom' ? 'left' : 'right'}
                                    type={chart.yAxis.type}
                                    allowDecimals={chart.yAxis.allowDecimals}
                                    tickCount={chart.yAxis.tickCount}
                                    padding={{ top: chart.yAxis.paddingLeft, bottom: chart.yAxis.paddingRight }}
                                    tickSize={chart.yAxis.tickSize}
                                    mirror={chart.yAxis.mirror}
                                    reversed={chart.yAxis.reversed}
                                />
                            )}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Line
                                    isAnimationActive={false}
                                    key={index}
                                    dataKey={key}
                                    type={chart.uiLineType}
                                    stroke={chart.uiLineStroke}
                                    strokeWidth={chart.uiLineStrokeWidth}
                                    connectNulls={chart.uiLineConnectNulls}
                                >
                                    {chart.keyLabels[index].enabled && (
                                        <LabelList
                                            key={index}
                                            dataKey="label"
                                            position={chart.keyLabels[index].position}
                                            offset={chart.keyLabels[index].offset}
                                            fontSize={chart.keyLabels[index].fontSize}
                                            fill={chart.keyLabels[index].fill}
                                        />
                                    )}
                                    {chart.valueLabels[index].enabled && (
                                        <LabelList
                                            key={index}
                                            dataKey={key}
                                            position={chart.valueLabels[index].position}
                                            offset={chart.valueLabels[index].offset}
                                            fontSize={chart.valueLabels[index].fontSize}
                                            fill={chart.valueLabels[index].fill}
                                        />
                                    )}
                                </Line>
                            ))}
                        </LineChart>
                    </ChartContainer>
                );
            case 'scatter':
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <ScatterChart
                            accessibilityLayer
                            data={chartData}
                        >
                            {chart.cartesianGrid.enabled && (
                                <CartesianGrid
                                    horizontal={chart.cartesianGrid.horizontal ?? true}
                                    vertical={chart.cartesianGrid.vertical ?? true}
                                    fill={chart.cartesianGrid.backgroundFill}
                                    fillOpacity={chart.cartesianGrid.fillOpacity}
                                />
                            )}
                            {chart.xAxis.enabled && (
                                <XAxis
                                    dataKey="label"
                                    stroke="#333"

                                    tickLine={chart.xAxis.tickLine}
                                    axisLine={chart.xAxis.axisLine}
                                    height={chart.xAxis.height}
                                    orientation={chart.xAxis.orientation}
                                    type={chart.xAxis.type}
                                    allowDecimals={chart.xAxis.allowDecimals}
                                    tickCount={chart.xAxis.tickCount}
                                    padding={{ left: chart.xAxis.paddingLeft, right: chart.xAxis.paddingRight }}
                                    tickSize={chart.xAxis.tickSize}
                                    mirror={chart.xAxis.mirror}
                                    reversed={chart.xAxis.reversed}
                                />
                            )}
                            {chart.yAxis.enabled && (
                                <YAxis
                                    // type="number"
                                    stroke="#333"

                                    tickLine={chart.yAxis.tickLine}
                                    axisLine={chart.yAxis.axisLine}
                                    width={chart.yAxis.height}
                                    orientation={chart.yAxis.orientation == 'bottom' ? 'left' : 'right'}
                                    type={chart.yAxis.type}
                                    allowDecimals={chart.yAxis.allowDecimals}
                                    tickCount={chart.yAxis.tickCount}
                                    padding={{ top: chart.yAxis.paddingLeft, bottom: chart.yAxis.paddingRight }}
                                    tickSize={chart.yAxis.tickSize}
                                    mirror={chart.yAxis.mirror}
                                    reversed={chart.yAxis.reversed}
                                />
                            )}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Scatter
                                    key={index}
                                    dataKey={key}
                                    fill={chartConfig[key].color}
                                    isAnimationActive={false}
                                >
                                    {chart.keyLabels[index].enabled && (
                                        <LabelList
                                            key={index}
                                            dataKey="label"
                                            position={chart.keyLabels[index].position}
                                            offset={chart.keyLabels[index].offset}
                                            fontSize={chart.keyLabels[index].fontSize}
                                            fill={chart.keyLabels[index].fill}
                                        />
                                    )}
                                    {chart.valueLabels[index].enabled && (
                                        <LabelList
                                            key={index}
                                            dataKey={key}
                                            position={chart.valueLabels[index].position}
                                            offset={chart.valueLabels[index].offset}
                                            fontSize={chart.valueLabels[index].fontSize}
                                            fill={chart.valueLabels[index].fill}
                                        />
                                    )}
                                </Scatter>
                            ))}
                            {chart.legend.enabled &&
                                <ChartLegend
                                    // content={<ChartLegendContent />}
                                    layout={chart.legend.layout}
                                    align={chart.legend.align}
                                    verticalAlign={chart.legend.verticalAlign}
                                    iconSize={chart.legend.iconSize}
                                    iconType={chart.legend.iconType}
                                />
                            }
                        </ScatterChart>
                    </ChartContainer>
                );
            case 'pie':
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <PieChart accessibilityLayer>
                            <Pie
                                data={chartData}
                                dataKey={chart.data[0].dataSeries[0].dataSeriesLabel}
                                cx={chart.uiPieCX}
                                cy={chart.uiPieCY}
                                innerRadius={chart.uiPieInnerRadius}
                                outerRadius={chart.uiPieOuterRadius}
                                startAngle={chart.uiPieStartAngle}
                                endAngle={chart.uiPieEndAngle}
                                minAngle={chart.uiPieMinAngle}
                                paddingAngle={chart.uiPiePaddingAngle}
                                activeIndex={chart.uiPieActiveIndex}
                                isAnimationActive={false}
                            >
                                {chart.valueLabelsIndividualEdit && chart.valueLabels.map((label, index) => (
                                    <LabelList
                                        key={index}
                                        dataKey={chart.data[0].dataSeries[0].dataSeriesLabel}
                                        position={label.position}
                                        offset={label.offset}
                                        fontSize={label.fontSize}
                                        fill={label.fill}
                                        stroke="none"
                                    />
                                ))}
                                {!chart.valueLabelsIndividualEdit && (
                                    <LabelList
                                        dataKey={chart.data[0].dataSeries[0].dataSeriesLabel}
                                        position={chart.valueLabels[0].position}
                                        offset={chart.valueLabels[0].offset}
                                        fontSize={chart.valueLabels[0].fontSize}
                                        fill={chart.valueLabels[0].fill}
                                        stroke="none"
                                    />
                                )}
                            </Pie>
                            {chart.legend.enabled &&
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="label" />}
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                    layout={chart.legend.layout}
                                    align={chart.legend.align}
                                    verticalAlign={chart.legend.verticalAlign}
                                    iconSize={chart.legend.iconSize}
                                    iconType={chart.legend.iconType}
                                />
                            }
                        </PieChart>
                    </ChartContainer>
                );
            case 'radar':
                const radarPolarAngles = Array.from(
                    { length: chart.polarGrid.polarAnglesCount || 0 },
                    (_, i) => 360 / (chart.polarGrid.polarAnglesCount || 1) * i
                );

                const radarPolarRadius = Array.from(
                    { length: chart.polarGrid.polarRadiusCount || 0 },
                    (_, i) => (chart.polarGrid.outerRadius || 0) / (chart.polarGrid.polarRadiusCount || 1) * (i + 1)
                );

                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <RadarChart
                            accessibilityLayer
                            data={chartData}
                            cx={chart.uiRadarChartCX}
                            cy={chart.uiRadarChartCY}
                        >
                            {chart.uiPolarAngleAxisEnabled &&
                                <PolarAngleAxis
                                    dataKey="label"
                                    allowDuplicatedCategory={chart.uiPolarAngleAxisAllowDuplicatedCategory}
                                />
                            }
                            {chart.polarGrid.enabled &&
                                <PolarGrid
                                    innerRadius={chart.polarGrid.innerRadius}
                                    outerRadius={chart.polarGrid.outerRadius}
                                    polarAngles={radarPolarAngles}
                                    polarRadius={radarPolarRadius}
                                    gridType={chart.polarGrid.gridType}
                                />
                            }
                            {chart.legend.enabled &&
                                <ChartLegend
                                    content={<ChartLegendContent />}
                                    layout={chart.legend.layout}
                                    align={chart.legend.align}
                                    verticalAlign={chart.legend.verticalAlign}
                                    iconSize={chart.legend.iconSize}
                                    iconType={chart.legend.iconType}
                                />
                            }
                            <Radar
                                isAnimationActive={false}
                                dataKey={chart.data[0].dataSeries[0].dataSeriesLabel}
                                fill={`var(--color-${chart.data[0].dataSeries[0].dataSeriesLabel})`}
                                fillOpacity={chart.uiRadarBarFillOpacity}
                            >
                                {chart.valueLabelsIndividualEdit && chart.valueLabels.map((label, index) => (
                                    <LabelList
                                        key={index}
                                        dataKey={chart.data[0].dataSeries[0].dataSeriesLabel}
                                        position={label.position}
                                        offset={label.offset}
                                        fontSize={label.fontSize}
                                        fill={label.fill}
                                        stroke="none"
                                    />
                                ))}
                                {!chart.valueLabelsIndividualEdit && (
                                    <LabelList
                                        dataKey={chart.data[0].dataSeries[0].dataSeriesLabel}
                                        position={chart.valueLabels[0].position}
                                        offset={chart.valueLabels[0].offset}
                                        fontSize={chart.valueLabels[0].fontSize}
                                        fill={chart.valueLabels[0].fill}
                                        stroke="none"
                                    />
                                )}
                            </Radar>
                        </RadarChart>
                    </ChartContainer>
                );
            case 'radial':

                const radialPolarAngles = Array.from(
                    { length: chart.polarGrid.polarAnglesCount || 0 },
                    (_, i) => 360 / (chart.polarGrid.polarAnglesCount || 1) * i
                );

                const radialPolarRadius = Array.from(
                    { length: chart.polarGrid.polarRadiusCount || 0 },
                    (_, i) => (chart.polarGrid.outerRadius || 0) / (chart.polarGrid.polarRadiusCount || 1) * (i + 1)
                );
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <RadialBarChart
                            accessibilityLayer
                            data={chartData}
                            barCategoryGap={chart.uiRadialBarChartBarCategoryGap}
                            barGap={chart.uiRadialBarChartBarGap}
                            cx={chart.uiRadialBarChartCX}
                            cy={chart.uiRadialBarChartCY}
                            startAngle={chart.uiRadialBarChartStartAngle}
                            endAngle={chart.uiRadialBarChartEndAngle}
                            innerRadius={chart.uiRadialBarChartInnerRadius}
                            outerRadius={chart.uiRadialBarChartOuterRadius}
                        >
                            {chart.polarGrid.enabled &&
                                <PolarGrid
                                    innerRadius={chart.polarGrid.innerRadius}
                                    outerRadius={chart.polarGrid.outerRadius}
                                    polarAngles={radialPolarAngles}
                                    polarRadius={radialPolarRadius}
                                    gridType={chart.polarGrid.gridType}
                                />
                            }
                            {chart.legend.enabled &&
                                <ChartLegend
                                    content={<ChartLegendContent />}
                                    layout={chart.legend.layout}
                                    align={chart.legend.align}
                                    verticalAlign={chart.legend.verticalAlign}
                                    iconSize={chart.legend.iconSize}
                                    iconType={chart.legend.iconType}
                                />
                            }
                            <RadialBar
                                dataKey={chart.data[0].dataSeries[0].dataSeriesLabel}
                                fill={`var(--color-${chart.data[0].dataSeries[0].dataSeriesLabel})`}
                                fillOpacity={chart.uiRadialBarFillOpacity}
                                background={chart.uiRadialBarBackground}
                                isAnimationActive={false}
                            >
                                {chart.valueLabelsIndividualEdit && chart.valueLabels.map((label, index) => (
                                    <LabelList
                                        key={index}
                                        dataKey={chart.data[0].dataSeries[0].dataSeriesLabel}
                                        position={label.position}
                                        offset={label.offset}
                                        fontSize={label.fontSize}
                                        fill={label.fill}
                                        stroke="none"
                                    />
                                ))}
                                {!chart.valueLabelsIndividualEdit && (
                                    <LabelList
                                        dataKey={chart.data[0].dataSeries[0].dataSeriesLabel}
                                        position={chart.valueLabels[0].position}
                                        offset={chart.valueLabels[0].offset}
                                        fontSize={chart.valueLabels[0].fontSize}
                                        fill={chart.valueLabels[0].fill}
                                        stroke="none"
                                    />
                                )}
                                {/* <LabelList
                                    position="insideStart"
                                    dataKey="label"
                                    className="fill-white capitalize mix-blend-luminosity"
                                    fontSize={11}
                                /> */}
                            </RadialBar>
                        </RadialBarChart>
                    </ChartContainer>
                );
            default:
                return <div>Unsupported chart type</div>;
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="w-full flex items-center justify-center border rounded-lg">
                {renderChart()}
            </div>
            <Button onClick={convert} className="w-1/2">Download Image</Button>
        </div>
    )
}

