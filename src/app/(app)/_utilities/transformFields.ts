import { convertValue } from "./convertValue";
import { type Option } from "@/types";

// Define the return type of transformToFrontend
function transformToFrontend(field: string | string[]): Option | Option[] {
    if (!field) return []; // Return type here will be Option[]
    if (typeof field === 'string') {
        return {
            label: convertValue(field),
            value: field
        } as Option;
    }
    return field.map(item => ({
        label: convertValue(item),
        value: item
    })) as Option[];
}

// Define the return type of transformToPayload
function transformToPayload(array: Option[]): string[] {
    if (!array) return [];
    return array.map(item => item.value);
}

export { transformToFrontend, transformToPayload };
