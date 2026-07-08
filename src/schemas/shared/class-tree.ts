import { z } from "zod";

export const ClassTreeSchema = z.enum(["archer", "warrior", "assassin", "mage", "shaman"]);

export type ClassTree = z.infer<typeof ClassTreeSchema>;
