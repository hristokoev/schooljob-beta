import { z, ZodType } from "zod"

type LoginFormData = {
    email: string;
    password: string;
}

const LoginFieldSchema: ZodType<LoginFormData> = z
    .object({
        email: z.string().email(),
        password: z
            .string()
            .min(2, { message: "Password is too short" })
            .max(20, { message: "Password is too long" }),
    })


export { type LoginFormData, LoginFieldSchema }
