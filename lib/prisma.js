import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

import ws from "ws";
neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch(driver attempts to send "one-shot" queries using standard HTTP fetch requests instead of maintaining a WebSocket connection.)
neonConfig.poolQueryViaFetch = true;

// Type definitions
// declare global {
//   var prisma: PrismaClient | undefined
// }

const connectionString = `${process.env.DATABASE_URL}`;
//adapter is a bridge that allows Prisma Client to use a specific JavaScript-based database driver instead of its default native Rust engine.
const adapter = new PrismaNeon({ connectionString });
const prisma =
  global.prisma ||
  new PrismaClient(process.env.NEXT_RUNTIME === "edge" ? { adapter } : {});

if (process.env.NEXT_RUNTIME !== "edge") global.prisma = prisma;

export default prisma;
