import type { AxiosRequestConfig } from "axios";

export function callParamsSerializer(
  serializer: AxiosRequestConfig["paramsSerializer"],
  params: Record<string, unknown> = {},
): string | undefined {
  if (!serializer) {
    return undefined;
  }

  if (typeof serializer === "function") {
    return serializer(params);
  }

  return serializer.serialize?.(params);
}
