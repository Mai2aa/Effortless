import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://AI%20Form%20Builder_owner:Xe0lGc4bgtup@ep-snowy-lake-a5ox5zfj.us-east-2.aws.neon.tech/AI%20Form%20Builder?sslmode=require',
  }
});
