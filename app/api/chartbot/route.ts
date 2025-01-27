import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { NextRequest, NextResponse } from 'next/server';
import { ChatCompletionMessageParam } from "openai/resources/chat";
import { createClient } from '@/utils/supabase/server';
import { ApiChart, ChartType } from "@/types/apichart";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ChartResponse = z.object({
    chart: ApiChart,
});

const ChartNoData = z.object({
    chartType: ChartType,
    columns: z.array(z.string()).optional(),
    displayLegend: z.boolean().optional(),
    displayLabel: z.boolean().optional(),
    displayXAxis: z.boolean().optional(),
    displayYAxis: z.boolean().optional(),
    areaChartStacked: z.boolean().optional(),
    barChartHorizontal: z.boolean().optional(),
    barChartNegative: z.boolean().optional(),
    line_chart_linear: z.boolean().optional(),
    lineChartDots: z.boolean().optional(),
    pie_chart_labels: z.boolean().optional(),
    pieChartDonut: z.boolean().optional(),
    pieChartDonut_with_text: z.boolean().optional(),
    radarChartDots: z.boolean().optional(),
    radial_chart_grid: z.boolean().optional(),
    radialChartText: z.boolean().optional(),
    scatterChartThreeDimensions: z.boolean().optional(),
});

const ChartResponseNoData = z.object({
    chart: ChartNoData,
});

function countPropsAndDepth(obj: any, depth = 1): { totalProps: number; maxDepth: number } {
    if (obj === null || typeof obj !== "object") {
        return { totalProps: 0, maxDepth: depth };
    }
    let totalProps = 0;
    let maxDepth = depth;
    for (const key in obj) {
        totalProps++;
        const { totalProps: nestedProps, maxDepth: nestedDepth } = countPropsAndDepth(obj[key], depth + 1);
        totalProps += nestedProps;
        maxDepth = Math.max(maxDepth, nestedDepth);
    }
    return { totalProps, maxDepth };
}

function removeAllOptionalFields(
    schema: z.ZodTypeAny,
    visited = new WeakMap<z.ZodTypeAny, z.ZodTypeAny>()
): z.ZodTypeAny {
    if (visited.has(schema)) {
        return visited.get(schema)!;
    }

    // If it's an optional or default, unwrap to its inner type.
    if (schema instanceof z.ZodOptional || schema instanceof z.ZodDefault) {
        const unwrapped = removeAllOptionalFields(schema._def.innerType, visited);
        visited.set(schema, unwrapped);
        return unwrapped;
    }

    // Remove optional properties from object shapes altogether.
    if (schema instanceof z.ZodObject) {
        const shape: Record<string, z.ZodTypeAny> = {};
        for (const [key, propSchema] of Object.entries(schema.shape)) {
            // Skip this property if it is optional at the top level
            if (propSchema instanceof z.ZodOptional || propSchema instanceof z.ZodDefault) {
                continue;
            }
            shape[key] = removeAllOptionalFields(propSchema as z.ZodTypeAny, visited);
        }
        const newObj = z.object(shape);
        visited.set(schema, newObj);
        return newObj;
    }

    // Recurse on arrays.
    if (schema instanceof z.ZodArray) {
        const arr = z.array(removeAllOptionalFields(schema._def.type, visited));
        visited.set(schema, arr);
        return arr;
    }

    // Recurse on unions.
    if (schema instanceof z.ZodUnion) {
        const union = z.union(
            schema._def.options.map((option: z.ZodTypeAny) => removeAllOptionalFields(option, visited))
        );
        visited.set(schema, union);
        return union;
    }

    // Recurse on discriminated unions.
    if (schema instanceof z.ZodDiscriminatedUnion) {
        const newOptions = schema._def.options.map((option: z.ZodTypeAny) =>
            removeAllOptionalFields(option, visited)
        );
        const newDUnion = z.discriminatedUnion(schema._def.discriminator, newOptions);
        visited.set(schema, newDUnion);
        return newDUnion;
    }

    visited.set(schema, schema);
    return schema;
}

async function generateChart(body: { text: string, history?: { role: string, content: string }[] }) {
    const systemPrompt = `You are a detail-oriented data visualization assistant for creating charts based on user prompts. Analyze user requests and generate accurate, structured, and schema-compliant chart configurations. Always ensure you are extracting the data series correctly and entirely. Make sure you do not add more data series than asked.`;
    const explanation = `DataRow's label represents the name or value of the point on the X axis (e.g. "January", "February", "March" or 1, 2, 3). DataRow's dataSeries can represent multiple Categories (e.g. "Desktop users", "Mobile users") for drawing different lines/bars/etc on the chart. Each dataSeriesLabel represents the name of the Category and dataSeriesValue represents the value of the point on the Y axis.`;
    const messages: ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: explanation },
        { role: "user", content: "Generate a bar chart with 3 values for each of the 2 categories" },
        { role: "assistant", content: `"data": [{ "label": "Label1", "dataSeries": [{ "dataSeriesLabel": "Desktop", "dataSeriesValue": 1 }, { "dataSeriesLabel": "Mobile", "dataSeriesValue": 3 }] }, { "label": "Label2", "dataSeries": [{ "dataSeriesLabel": "Desktop", "dataSeriesValue": 5 }, { "dataSeriesLabel": "Mobile", "dataSeriesValue": 8 }] }, { "label": "Label3", "dataSeries": [{ "dataSeriesLabel": "Desktop", "dataSeriesValue": 10 }, { "dataSeriesLabel": "Mobile", "dataSeriesValue": 5 }] }].` },
        { role: "user", content: "Generate a pie chart with 2 values" },
        { role: "assistant", content: `"data":[{"label":"Label1","dataSeries":[{"dataSeriesLabel":"Desktop","dataSeriesValue":1}]},{"label":"Label2","dataSeries":[{"dataSeriesLabel":"Desktop","dataSeriesValue":5}]}]` },
        { role: "user", content: "From now on we will be working on the same chart, which I will define in the next message." },
    ]

    if (body.history && body.history.length > 0) {
        messages.push(...(body.history as ChatCompletionMessageParam[]));
    }

    // Add current message
    messages.push({ role: "user", content: body.text });

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: messages,
        response_format: zodResponseFormat(removeAllOptionalFields(ChartResponse), "chart_response"),
    });

    const { totalProps, maxDepth } = countPropsAndDepth(completion.choices[0].message.parsed);
    console.log("Properties:", totalProps, "Levels:", maxDepth);


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

    //TODO: probabil nu e prea corecta treaba asta, cred ca mai bine se ia
    // response-ul de la ultimul request si se verifica valoarea de acolo
    if (body.chatHistory) {
        const tokens = body.chatHistory.reduce((acc: any, msg: { content: string | any[]; }) => acc + msg.content.length, 0);
        if (tokens > 5000) {
            return NextResponse.json({ error: "Chat history too large" }, { status: 413 });
        }
    }

    const chart_response = await generateChart(body);

    // Update user's API calls
    const { error: updateError } = await supabase.rpc("increment_api_calls");

    if (updateError) {
        return NextResponse.json({ error: "Failed to update API calls" }, { status: 500 });
    }

    return NextResponse.json(chart_response);
}