const fs = require("fs").promises;
const path = require("path");
const [jsonPath] = process.argv.slice(2);
const sortJSON = require("sort-json");

const walk = async (dir, filelist = []) => {
  const files = await fs.readdir(dir);

  for (file of files) {
    const filepath = path.join(dir, file);
    const stat = await fs.stat(filepath);

    if (stat.isDirectory()) {
      filelist = await walk(filepath, filelist);
    } else if (filepath.indexOf(".json") !== -1) {
      filelist.push(filepath);
    }
  }

  return filelist;
};

walk(jsonPath).then((response) => {
  sortJSON.overwrite(response);
});
