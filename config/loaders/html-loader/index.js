const fs = require("fs");
const path = require("path");

module.exports = function (source) {
  console.log("---------------", source);
  console.log(path.resolve("./dist/a.html"));

  fs.writeFileSync(
    path.resolve("./dist/a.html"),
    JSON.stringify("<html></html>")
  );

  return "module.exports = " + JSON.stringify("<html></html>");
};
