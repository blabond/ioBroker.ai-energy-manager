const { readFileSync, writeFileSync } = require("node:fs");
const { basename, resolve } = require("node:path");

const manifestPath = resolve(__dirname, "../admin/custom/mf-manifest.json");
const jsonConfigPath = resolve(__dirname, "../admin/jsonConfig.json5");

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const components = Array.isArray(manifest.exposes)
  ? manifest.exposes.find((item) => item?.name === "Components")
  : null;
const mainAsset = components?.assets?.js?.sync?.find((item) =>
  /(^|\/)main-[^/]+\.js$/u.test(String(item || "")),
);

if (!mainAsset) {
  throw new Error("Unable to determine admin UI asset for cache busting");
}

const cacheKey = basename(mainAsset, ".js").replace(/^main-/u, "");
const jsonConfig = readFileSync(jsonConfigPath, "utf8");
const updatedJsonConfig = jsonConfig.replace(
  /url:\s*"custom\/customComponents\.js(?:\?v=[^"]*)?"/u,
  `url: "custom/customComponents.js?v=${cacheKey}"`,
);

if (updatedJsonConfig === jsonConfig) {
  if (jsonConfig.includes(`custom/customComponents.js?v=${cacheKey}`)) {
    process.exit(0);
  }
  throw new Error(
    "Unable to update custom component URL in admin/jsonConfig.json5",
  );
}

writeFileSync(jsonConfigPath, updatedJsonConfig);
