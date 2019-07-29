const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

let { baseUrl, paths } = tsConfig.compilerOptions;
for (let path in paths) {
  paths[path][0] = paths[path][0]
    .replace("src", "dist")
}

tsConfigPaths.register({ baseUrl, paths });
