const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const svgPath = path.join(__dirname, "favicon.svg");
const svgBuffer = fs.readFileSync(svgPath);

const sizes = [
  { name: "favicon-16x16.png",  size: 16  },
  { name: "favicon-32x32.png",  size: 32  },
  { name: "favicon-192x192.png", size: 192 },
  { name: "favicon-512x512.png", size: 512 },
];

async function generate() {
  for (const { name, size } of sizes) {
    const outPath = path.join(__dirname, name);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`생성: ${name} (${size}x${size})`);
  }

  // favicon.ico — sharp가 ICO를 직접 지원하지 않으므로 32x32 PNG로 대체
  const tmpPath = path.join(__dirname, "_tmp.png");
  const icoPath = path.join(__dirname, "favicon.ico");
  await sharp(svgBuffer).resize(32, 32).png().toFile(tmpPath);
  fs.copyFileSync(tmpPath, icoPath);
  fs.unlinkSync(tmpPath);
  console.log("생성: favicon.ico (32x32)");

  console.log("\n모든 파비콘 생성 완료.");
}

generate().catch((err) => {
  console.error("오류:", err);
  process.exit(1);
});
