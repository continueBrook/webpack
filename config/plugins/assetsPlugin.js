const { Compilation, sources } = require("webpack");

class AssetsPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("AssetsPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "AssetsPlugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          for (const asset in assets) {
            if (asset === "b.js") {
              compilation.updateAsset(asset, (source) => {
                return new sources.RawSource(
                  Buffer.from("console.log('12312')")
                );
              });
            }
          }
        }
      );
    });
  }
}

module.exports = AssetsPlugin;
