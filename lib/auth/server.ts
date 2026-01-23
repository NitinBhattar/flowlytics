import "dotenv/config";
import { createAuthServer } from "@neondatabase/auth/next/server";
export const authServer = createAuthServer();
