"use client";
import "dotenv/config";
import { createAuthClient } from "@neondatabase/auth/next";
export const authClient = createAuthClient();
