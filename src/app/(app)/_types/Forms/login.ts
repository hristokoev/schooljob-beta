import { z, ZodType } from "zod"
import { useTranslations } from "next-intl"

type LoginFormData = {
    email: string;
    password: string;
}

const useLoginFieldSchema = (): ZodType<LoginFormData> => {
    const t = useTranslations("login.validation")

    return z.object({
        email: z.string().email({ message: t("email") }),
        password: z
            .string({ message: t("password") })
            .min(6, { message: t("passwordLength", { number: 6 }) })
            .max(32, { message: t("passwordLength", { number: 32 }) }),
    })
}

export { type LoginFormData, useLoginFieldSchema }
