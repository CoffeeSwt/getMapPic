const fs = require("fs");
const path = require("path");
const mergeImages = require("merge-images");
const { Canvas, Image } = require("canvas");

const getFiles = (directory) => {
  return new Promise((resolve, reject) => {
    const directoryPath = path.join(__dirname, directory);
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      resolve(files);
    });
  });
};

const makeColFile = async (col) => {
  const dir = "./namalsk";
  const fileNames = await getFiles(dir);
  const imgs = fileNames
    .map((item) => {
      const regex = /c(\d+)r(\d+)\.jpg/;
      const match = item.match(regex);
      const x = match[1];
      const y = match[2];
      return {
        src: `${dir}/${item}`,
        x: 0,
        y: 256 * y,
        col: x,
      };
    })
    .filter((item) => item.col == col);
  const b64 = await mergeImages(imgs, {
    Canvas: Canvas,
    Image: Image,
    width: 256,
    height: 32767,
  });
  const data = b64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(data, "base64");
  fs.writeFile(`./namalskCol/c${col}.png`, buffer, (err) => {
    if (err) throw err;
    console.log(`col ${col} has been saved!`);
  });
};

const main = async () => {
  for (let i = 0, len = 127; i <= len; i++) {
    makeColFile(i);
  }
};

main();
