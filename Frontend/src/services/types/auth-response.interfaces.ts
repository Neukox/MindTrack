import type { User } from "@/lib/types/user.type";
import type { SuccessResponse } from "./response.interface";

export interface AuthResponse extends SuccessResponse {
  user: User;
  accessToken: string;
}
