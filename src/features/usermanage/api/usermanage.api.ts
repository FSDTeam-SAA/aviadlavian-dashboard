// src/features/usermanage/api/usermanage.api.ts

// get all users /user/get-all-users

import { api } from "@/lib/api";
import { GetAllUsersResponse } from "../types/usermanage.types";
import { getSession } from "next-auth/react";

export async function getAllUsers(): Promise<GetAllUsersResponse> {
  const session = await getSession();
  const res = await api.get<GetAllUsersResponse>("/user/get-all-users", {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  return res.data;
}
