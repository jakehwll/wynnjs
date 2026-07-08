import { z } from "zod";

import { AbilityMapPagesSchema } from "./ability";

export const GetAbilityMapResultSchema = AbilityMapPagesSchema;

export type GetAbilityMapResult = z.infer<typeof GetAbilityMapResultSchema>;
