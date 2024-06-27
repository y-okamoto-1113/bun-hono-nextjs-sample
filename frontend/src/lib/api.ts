import type { ApiExpensesRoutesType } from "@backend/app";
import { hc } from "hono/client";

const client = hc<ApiExpensesRoutesType>("/");

export const api = client.api;
