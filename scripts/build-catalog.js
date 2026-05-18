const fs = require("fs");
const https = require("https");

const pluginManifestUrls = JSON.parse(fs.readFileSync("plugins.json", "utf8"));

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          fetchJson(response.headers.location).then(resolve, reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Failed to fetch ${url}: ${response.statusCode}`));
          return;
        }

        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          resolve(JSON.parse(body));
        });
      })
      .on("error", reject);
  });
}

async function main() {
  const manifests = await Promise.all(pluginManifestUrls.map(fetchJson));
  const plugins = manifests.flat();
  fs.writeFileSync("manifest.json", `${JSON.stringify(plugins, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
