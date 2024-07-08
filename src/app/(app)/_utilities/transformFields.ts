import { convertValue } from "./convertValue"
import { type Option } from "@/types"

function transformToFrontend(field: string | string[]): Option | Option[] {
    if (!field) return []
    if (typeof field === 'string') {
        return {
            label: convertValue(field),
            value: field
        };
    }
    return field.map(item => ({
        label: convertValue(item),
        value: item
    }));
}

function transformToPayload(array: Option[]): string[] {
    if (!array) return []
    return array.map(item => item.value)
}

export { transformToFrontend, transformToPayload }