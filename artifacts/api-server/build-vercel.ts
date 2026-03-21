import path from "path";
import { fileURLToPath } from "url";
import { build as esbuild } from "esbuild";
import { rm } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildVercel() {
  const distDir = path.resolve(__dirname, "dist");
  await rm(distDir, { recursive: true, force: true });

  console.log("building for vercel...");
  await esbuild({
    entryPoints: [path.resolve(__dirname, "src/app.ts")],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: path.resolve(distDir, "app.cjs"),
    define: { "process.env.NODE_ENV": '"production"' },
    minify: true,
    logLevel: "info",
  });

  console.log("done.");
}

buildVercel().catch((err) => {
  console.error(err);
  process.exit(1);
});
