import {z} from "zod";

export const createContentSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    contentPath: z.string({
        required_error: "Content path is required",
    }),
    category: z.number({
        required_error: "Category is required",
    }),
});


