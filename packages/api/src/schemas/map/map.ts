import { z } from "zod";

import { MapCoordinate3DSchema } from "../shared/coordinates";

export const WorldEventRequirementSchema = z.object({
  type: z.string(),
  value: z.union([z.number(), z.string()]),
});

export type WorldEventRequirement = z.infer<typeof WorldEventRequirementSchema>;

export const LootPoolRewardSchema = z.object({
  name: z.string(),
  type: z.string(),
  amount: z.number(),
  always: z.boolean(),
  tier: z.string().nullable().optional(),
  shiny: z.boolean().optional(),
});

export type LootPoolReward = z.infer<typeof LootPoolRewardSchema>;

export const MapLootPoolQueryOptionsSchema = z.object({
  level: z.number().optional(),
});

export type MapLootPoolQueryOptions = z.infer<typeof MapLootPoolQueryOptionsSchema>;

export const MapLootPoolContentSchema = z.object({
  name: z.string(),
  internalName: z.string(),
  type: z.string(),
  lore: z.string().nullable(),
  difficulty: z.string().nullable(),
  level: z.number().nullable(),
  length: z.string().nullable(),
  requirements: z.array(WorldEventRequirementSchema).nullable(),
  location: MapCoordinate3DSchema.nullable(),
  rewards: z.array(LootPoolRewardSchema),
});

export type MapLootPoolContent = z.infer<typeof MapLootPoolContentSchema>;

export const LootPoolSchema = z.object({
  name: z.string(),
  internalName: z.string(),
  type: z.string(),
  rewards: z.array(LootPoolRewardSchema),
});

export type LootPool = z.infer<typeof LootPoolSchema>;

const WorldEventLocationSchema = z.object({
  event: z.union([MapCoordinate3DSchema, z.null()]),
  spawn: z.union([MapCoordinate3DSchema, z.null()]),
  reward: z.union([MapCoordinate3DSchema, z.null()]),
  radius: z.number().nullable(),
  spawnRadius: z.number().nullable(),
});

export const WorldEventSchema = z.object({
  name: z.string(),
  internalName: z.string(),
  lore: z.string(),
  difficulty: z.string().nullable(),
  level: z.number().nullable(),
  length: z.string().nullable(),
  rewardPerLevel: z.record(z.string(), z.array(z.string())).nullable(),
  requirements: z.array(WorldEventRequirementSchema).nullable(),
  location: z.array(WorldEventLocationSchema),
  schedule: z.string().nullable(),
});

export type WorldEvent = z.infer<typeof WorldEventSchema>;

export const PlayerLocationMemberSchema = z.object({
  uuid: z.uuid(),
  name: z.string(),
  nickname: z.string().nullable(),
  character: z.uuid(),
  server: z.string().nullable(),
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

export type PlayerLocationMember = z.infer<typeof PlayerLocationMemberSchema>;

export const PlayerLocationSchema = z.object({
  uuid: z.uuid(),
  name: z.string(),
  nickname: z.string().nullable(),
  character: z.uuid(),
  server: z.string().nullable(),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  friends: z.array(PlayerLocationMemberSchema),
  party: z.array(PlayerLocationMemberSchema),
  guild: z.array(PlayerLocationMemberSchema),
});

export type PlayerLocation = z.infer<typeof PlayerLocationSchema>;

export const GatheringNodeSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
  angle: z.number(),
  type: z.enum(["NODE", "WALL", "CORNER"]),
  resource: z.string(),
  level: z.number(),
});

export type GatheringNode = z.infer<typeof GatheringNodeSchema>;

export const MapMarkerSchema = z.object({
  name: z.string(),
  icon: z.string(),
  x: z.string(),
  y: z.string(),
  z: z.string(),
});

export type MapMarker = z.infer<typeof MapMarkerSchema>;
