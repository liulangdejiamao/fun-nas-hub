const fs = require("fs");
const path = require("path");

const appsDir = path.join(process.cwd(), "apps");
const outputFile = path.join(process.cwd(), "public/data.json");

// 确保 public 目录存在
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile));
}

function generate() {
  const folders = fs.readdirSync(appsDir);
  const allApps = [];

  folders.forEach((folder) => {
    const fullPath = path.join(appsDir, folder, "info.json");
    if (fs.existsSync(fullPath)) {
      const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
      allApps.push(data);
    }
  });

  const finalData = {
    version: "1.0",
    updated_at: new Date().toISOString(),
    apps: allApps,
  };

  fs.writeFileSync(outputFile, JSON.stringify(finalData, null, 2));
  console.log("✅ data.json 已成功生成！");
}

generate();
