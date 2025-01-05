"use client"

import * as React from "react"
import { BarChart, LineChart, PieChart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export function ChartControlSidebar() {
    return (
        <div className="w-80 border-r">
            <SidebarHeader>
                <h2 className="text-lg font-semibold px-4 py-2">Chart Controls</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Chart Type</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <LineChart className="w-4 h-4 mr-2" />
                                    Line Chart
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <BarChart className="w-4 h-4 mr-2" />
                                    Bar Chart
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <PieChart className="w-4 h-4 mr-2" />
                                    Pie Chart
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium">
                            Data Series
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-2 space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="series1">Series 1</Label>
                                <Input id="series1" placeholder="Enter series name" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="series2">Series 2</Label>
                                <Input id="series2" placeholder="Enter series name" />
                            </div>
                            <Button size="sm" className="w-full mt-2">
                                Add Series
                            </Button>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>

                <SidebarGroup>
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium">
                            Axes
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-2 space-y-4">
                            <div className="space-y-2">
                                <Label>X-Axis</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select X-Axis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="date">Date</SelectItem>
                                        <SelectItem value="category">Category</SelectItem>
                                        <SelectItem value="numeric">Numeric</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Y-Axis</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Y-Axis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="linear">Linear</SelectItem>
                                        <SelectItem value="log">Logarithmic</SelectItem>
                                        <SelectItem value="percentage">Percentage</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>

                <SidebarGroup>
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium">
                            Legend
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-2 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Switch id="show-legend" />
                                <Label htmlFor="show-legend">Show Legend</Label>
                            </div>
                            <RadioGroup defaultValue="right">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="top" id="legend-top" />
                                    <Label htmlFor="legend-top">Top</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="right" id="legend-right" />
                                    <Label htmlFor="legend-right">Right</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="bottom" id="legend-bottom" />
                                    <Label htmlFor="legend-bottom">Bottom</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="left" id="legend-left" />
                                    <Label htmlFor="legend-left">Left</Label>
                                </div>
                            </RadioGroup>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>

                <SidebarGroup>
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium">
                            Appearance
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-2 space-y-4">
                            <div className="space-y-2">
                                <Label>Chart Title</Label>
                                <Input placeholder="Enter chart title" />
                            </div>
                            <div className="space-y-2">
                                <Label>Font Size</Label>
                                <Slider defaultValue={[14]} max={24} min={8} step={1} />
                            </div>
                            <div className="space-y-2">
                                <Label>Color Scheme</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select color scheme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Default</SelectItem>
                                        <SelectItem value="pastel">Pastel</SelectItem>
                                        <SelectItem value="neon">Neon</SelectItem>
                                        <SelectItem value="monochrome">Monochrome</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>

                <SidebarGroup>
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium">
                            Interactivity
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-2 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Switch id="enable-tooltip" />
                                <Label htmlFor="enable-tooltip">Enable Tooltip</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="enable-zoom" />
                                <Label htmlFor="enable-zoom">Enable Zoom</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="enable-pan" />
                                <Label htmlFor="enable-pan">Enable Pan</Label>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>
            </SidebarContent>
        </div>
    )
}

