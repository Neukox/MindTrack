import type { Reflection } from "@/lib/types/reflection.type";

export type CreateReflectionData = Pick<
  Reflection,
  "title" | "content" | "category" | "emotion"
>;

export type UpdateReflectionData = Partial<CreateReflectionData>;
