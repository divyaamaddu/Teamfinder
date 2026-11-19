import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { env } from "./env.js";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: env.databaseUrl });

export default pool;