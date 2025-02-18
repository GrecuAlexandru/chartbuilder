import { z } from "zod";
import { Chart } from "./chart";

function extractDefaultValues(
    schema: z.ZodTypeAny,
    visited = new WeakMap<z.ZodTypeAny, any>()
): any {
    if (visited.has(schema)) {
        return visited.get(schema);
    }

    // Handle ZodDefault - return its default value
    if (schema instanceof z.ZodDefault) {
        const defaultValue = schema._def.defaultValue();
        visited.set(schema, defaultValue);
        return defaultValue;
    }

    // Handle ZodObject - recursively extract defaults from its shape
    if (schema instanceof z.ZodObject) {
        const defaults: Record<string, any> = {};
        for (const [key, value] of Object.entries(schema.shape)) {
            const fieldDefault = extractDefaultValues(value as z.ZodTypeAny, visited);
            if (fieldDefault !== undefined) {
                defaults[key] = fieldDefault;
            }
        }
        visited.set(schema, defaults);
        return defaults;
    }

    // Handle ZodDiscriminatedUnion - create an object with defaults for each variant
    if (schema instanceof z.ZodDiscriminatedUnion) {
        const variants: Record<string, any> = {};
        for (const option of schema._def.options) {
            const discriminatorValue = option.shape[schema._def.discriminator]._def.value;
            variants[discriminatorValue] = extractDefaultValues(option, visited);
        }
        visited.set(schema, variants);
        return variants;
    }

    // Handle ZodArray
    if (schema instanceof z.ZodArray) {
        return [];
    }

    // Handle ZodOptional
    if (schema instanceof z.ZodOptional) {
        return extractDefaultValues(schema._def.innerType, visited);
    }

    // For primitive types with no default, return undefined
    return undefined;
}

// Create and export the default values
export const ChartDefaultValues = extractDefaultValues(Chart);

// Type for the default values
export type ChartDefaults = typeof ChartDefaultValues;