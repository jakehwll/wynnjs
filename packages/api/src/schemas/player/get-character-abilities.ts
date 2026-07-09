import { z } from "zod";

import { AbilityMapPagesSchema } from "../ability/ability";

export const GetCharacterAbilitiesResultSchema = AbilityMapPagesSchema;

export type GetCharacterAbilitiesResult = z.infer<typeof GetCharacterAbilitiesResultSchema>;
