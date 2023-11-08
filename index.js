const fs = require("fs");
const baseURL = "https://static.xam.nu/dayz/maps/namalsk/CE3/satellite/7";

const getTile = async (col, row) => {
  const res = await fetch(`${baseURL}/${col}/${row}.jpg`, {
    referrer: "https://dayz.xam.nu/",
  });
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
};

const main = async () => {
  for (let i = 0, len = 127; i <= len; i++) {
    for (let j = 0, len = 127; j <= len; j++) {
      const fileName = `./namalsk/c${i}r${j}.jpg`;
      const res = await getTile(i, j);
      fs.writeFile(fileName, res, (err) => {
        if (err) throw err;
        console.log(fileName, "写入");
      });
    }
  }
};

main();
