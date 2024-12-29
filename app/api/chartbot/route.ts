import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ChartType = z.enum([
    "area",
    "bar",
    "line",
    "pie",
    "radar",
    "radial",
    "scatter",
]);

const DataPoint = z.object({
    name: z.string().optional(),
    values: z.array(z.union([z.string(), z.number()])),
});

const Chart = z.object({
    chart_type: ChartType,
    data: z.array(DataPoint),
    display_legend: z.boolean().optional(),
    display_label: z.boolean().optional(),
    display_x_axis: z.boolean().optional(),
    display_y_axis: z.boolean().optional(),
    area_chart_stacked: z.boolean().optional(),
    bar_chart_horizontal: z.boolean().optional(),
    bar_chart_negative: z.boolean().optional(),
    line_chart_linear: z.boolean().optional(),
    line_chart_dots: z.boolean().optional(),
    pie_chart_labels: z.boolean().optional(),
    pie_chart_donut: z.boolean().optional(),
    pie_chart_donut_with_text: z.boolean().optional(),
    radar_chart_dots: z.boolean().optional(),
    radial_chart_grid: z.boolean().optional(),
    radial_chart_text: z.boolean().optional(),
    scatter_chart_three_dim: z.boolean().optional(),
});

const ChartResponse = z.object({
    chart: Chart,
});

const ChartNoData = z.object({
    chart_type: ChartType,
    columns: z.array(z.string()).optional(),
    display_legend: z.boolean().optional(),
    display_label: z.boolean().optional(),
    display_x_axis: z.boolean().optional(),
    display_y_axis: z.boolean().optional(),
    area_chart_stacked: z.boolean().optional(),
    bar_chart_horizontal: z.boolean().optional(),
    bar_chart_negative: z.boolean().optional(),
    line_chart_linear: z.boolean().optional(),
    line_chart_dots: z.boolean().optional(),
    pie_chart_labels: z.boolean().optional(),
    pie_chart_donut: z.boolean().optional(),
    pie_chart_donut_with_text: z.boolean().optional(),
    radar_chart_dots: z.boolean().optional(),
    radial_chart_grid: z.boolean().optional(),
    radial_chart_text: z.boolean().optional(),
    scatter_chart_three_dim: z.boolean().optional(),
});

const ChartResponseNoData = z.object({
    chart: ChartNoData,
});

async function generateChart(body: any) {
    const systemPrompt = "You are a detail-oriented data visualization assistant. Analyze user requests and generate accurate, structured, and schema-compliant chart configurations. Always ensure you are extracting the data points correctly and entirely.";

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: body.text },
        ],
        response_format: zodResponseFormat(ChartResponse, "chart_response"),
    });

    return completion.choices[0].message.parsed;
}

async function generateChartNoData(body: any) {
    const systemPrompt = "You are a detail-oriented data visualization assistant. Analyze user requests and generate accurate, structured, and schema-compliant chart configurations. Always ensure to extract the desired columns out of the user's request.";

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: body.text },
        ],
        response_format: zodResponseFormat(ChartResponseNoData, "chart_response_no_data"),
    });

    return completion.choices[0].message.parsed;
}

export async function POST(req: NextRequest) {
    // Check if user is authenticated
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has exceeded API rate limit for free tier
    const { data, error: apiCallsError } = await supabase
        .from('users')
        .select('api_calls')
        .eq('id', user.id)
        .single();

    if (apiCallsError || !data) {
        return NextResponse.json({ error: "Failed to retrieve API calls" }, { status: 500 });
    }

    const { api_calls } = data;

    if (api_calls >= 10) {
        return NextResponse.json({ error: "API rate limit exceeded" }, { status: 429 });
    }

    const body = await req.json();
    const chart_response = await generateChart(body);

    // Update user's API calls
    const { error: updateError } = await supabase.rpc("increment_api_calls");

    if (updateError) {
        return NextResponse.json({ error: "Failed to update API calls" }, { status: 500 });
    }

    return NextResponse.json(chart_response);
}