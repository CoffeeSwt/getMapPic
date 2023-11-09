const fs = require("fs");

// 读取XML文件
const xml = fs.readFileSync("zombie_territories.xml", "utf8");

// 将dmax和dmin值乘以2
const regex = /d(max|min)="(\d+)"/g;
const xmlContent = xml.replace(regex, (match, p1, p2) => {
  const newValue = parseInt(p2) * 2;
  return `d${p1}="${newValue}"`;
});

// 将修改后的XML写回文件
fs.writeFileSync("file.xml", xmlContent);
