import {z} from "zod";

export const createCategorySchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    categoryPath: z.string({
        required_error: "Category path is required",
    }),
    category: z.number({
        required_error: "Category is required",
    }),
});

