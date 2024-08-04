import { FieldError, Path, UseFormRegister } from "react-hook-form"

// Define a generic type for form data
type GenericFormData = Record<string, any>

// Define a generic type for form field props
type FormFieldProps<T extends GenericFormData> = {
    type: string;
    placeholder?: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    disabled?: boolean;
    className?: string;
}

export type { GenericFormData, FormFieldProps }
