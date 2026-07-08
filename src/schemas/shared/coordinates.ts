import { z } from "zod";

export const MapCoordinate3DSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

export type MapCoordinate3D = z.infer<typeof MapCoordinate3DSchema>;
