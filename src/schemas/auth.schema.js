import {z} from "zod";

export const registerSchema = z.object({
userName: z.string({
    required_error: "Name is required",
}),
type: z.string({
    required_error: "Type is required",
}),
password: z.string({
    required_error: "Password is required",
}).min(6, "Password too short"),
email: z.string({
    required_error: "Email is required",
}
).email({
    message: "Must be a valid email",
}),
})

export const loginSchema = z.object({
email: z.string({
    required_error: "Email is required",
}
).email({
    message: "Must be a valid email",
}),
password: z.string({
    required_error: "Password is required",
}).min(6, "Password too short"),
})