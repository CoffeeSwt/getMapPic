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

const makeColFile = async () => {
  const dir = "./namalskCol";
  const fileNames = await getFiles(dir);
  const imgs = fileNames.map((item) => {
    const regex = /c(\d+)\.jpg/;
    const match = item.match(regex);
    const c = match[1];
    return {
      src: `${dir}/${item}`,
      x: c * 256,
      y: 0,
    };
  });
  const b64 = await mergeImages(imgs, {
    Canvas: Canvas,
    Image: Image,
    width: 32767,
    height: 32767,
  });
  const data = b64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(data, "base64");
  fs.writeFile(`./build/namalsk.png`, buffer, (err) => {
    if (err) throw err;
    console.log(`map has been saved!`);
  });
};

const main = async () => {
  makeColFile();
};

main();
