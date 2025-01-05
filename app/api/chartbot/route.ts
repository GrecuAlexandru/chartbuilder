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

const DataSeries = z.object({
    data_series_label: z.string(),
    data_series_value: z.number(),
})

const DataRow = z.object({
    label: z.string(),
    data_series: z.array(DataSeries),
});

const Chart = z.object({
    chart_type: ChartType,
    data: z.array(DataRow),
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

//"data":[{"name":"Value1","data_points":[{"name":"Desktop","value":1},{"name":"Mobile","value":3}]},{"name":"Value2","data_points":[{"name":"Desktop","value":5},{"name":"Mobile","value":8}]},{"name":"Value3","data_points":[{"name":"Desktop","value":10},{"name":"Mobile","value":5}]}]

async function generateChart(body: any) {
    const systemPrompt = `You are a detail-oriented data visualization assistant for creating charts based on user prompts. Analyze user requests and generate accurate, structured, and schema-compliant chart configurations. Always ensure you are extracting the data series correctly and entirely. Make sure you do not add more data series than asked.`;
    // const examplePromptComplex = `Example data of chart with 2 different categories and 3 values for each category: "data":[{"label":"Label1","data_series":[{"data_series_label":"Desktop","data_series_value":1},{"data_series_label":"Mobile","data_series_value":3}]},{"label":"Label2","data_series":[{"data_series_label":"Desktop","data_series_value":5},{"data_series_label":"Mobile","data_series_value":8}]},{"label":"Label3","data_series":[{"data_series_label":"Desktop","data_series_value":10},{"data_series_label":"Mobile","data_series_value":5}]}].`;
    // const examplePromptSimple = `Example data of chart with 2 values: "data":[{"label":"Label1","data_series":[{"data_series_label":"Desktop","data_series_value":1}]},{"label":"Label2","data_series":[{"data_series_label":"Desktop","data_series_value":5}]}].`;
    const explanation = `DataRow's label represents the name or value of the point on the X axis (e.g. "January", "February", "March" or 1, 2, 3). DataRow's data_series can represent multiple Categories (e.g. "Desktop users", "Mobile users") for drawing different lines/bars/etc on the chart. Each data_series_label represents the name of the Category and data_series_value represents the value of the point on the Y axis.`;
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: explanation },
            { role: "user", content: "Generate a bar chart with 3 values for each of the 2 categories" },
            { role: "assistant", content: `"data": [{ "label": "Label1", "data_series": [{ "data_series_label": "Desktop", "data_series_value": 1 }, { "data_series_label": "Mobile", "data_series_value": 3 }] }, { "label": "Label2", "data_series": [{ "data_series_label": "Desktop", "data_series_value": 5 }, { "data_series_label": "Mobile", "data_series_value": 8 }] }, { "label": "Label3", "data_series": [{ "data_series_label": "Desktop", "data_series_value": 10 }, { "data_series_label": "Mobile", "data_series_value": 5 }] }].` },
            { role: "user", content: "Generate a pie chart with 2 values" },
            { role: "assistant", content: `"data":[{"label":"Label1","data_series":[{"data_series_label":"Desktop","data_series_value":1}]},{"label":"Label2","data_series":[{"data_series_label":"Desktop","data_series_value":5}]}]` },
            { role: "user", content: body.text },
        ],
        response_format: zodResponseFormat(ChartResponse, "chart_response"),
    });

    console.log(completion.usage);

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