import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// get the absolute path of the backend directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = path.join(__dirname, "../.env"); // explicitly use backend/.env

dotenv.config({ path: envPath });

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not set in the environment variables");
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("❌ DATABASE_URL is not set in the environment variables");
}

export const sql = neon(connectionString);