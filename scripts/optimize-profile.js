const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeProfile() {
  const input = path.join(__dirname, "../public/profile.png");
  const publicDir = path.join(__dirname, "../public");

  if (!fs.existsSync(input)) {
    console.error("profile.png not found at public/profile.png");
    process.exit(1);
  }

  const metadata = await sharp(input).metadata();
  console.log(
    `Original: ${metadata.width}x${metadata.height}, ${(fs.statSync(input).size / 1024).toFixed(0)}KB`
  );

  await sharp(input)
    .resize(960, 1280, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(publicDir, "profile.webp"));

  const profileThumb = await sharp(input)
    .resize(420, 560, { fit: "cover", position: "top" })
    .toBuffer();

  const textOverlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#050816"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="480" y="0" width="720" height="630" fill="#050816" opacity="0.85"/>
      <text x="540" y="290" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-size="54" font-weight="700">Yash Giradkar</text>
      <text x="540" y="350" fill="#94a3b8" font-family="Arial,Helvetica,sans-serif" font-size="26">Business Analyst · Product Analyst</text>
      <text x="540" y="390" fill="#64748b" font-family="Arial,Helvetica,sans-serif" font-size="22">Data Analyst</text>
      <rect x="540" y="420" width="80" height="4" rx="2" fill="#3b82f6"/>
    </svg>
  `);

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 5, g: 8, b: 22, alpha: 1 },
    },
  })
    .composite([
      { input: profileThumb, left: 40, top: 35 },
      { input: textOverlay, left: 0, top: 0 },
    ])
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, "og-image.webp"));

  const webpSize = fs.statSync(path.join(publicDir, "profile.webp")).size;
  const ogSize = fs.statSync(path.join(publicDir, "og-image.webp")).size;
  console.log(`profile.webp: ${(webpSize / 1024).toFixed(0)}KB`);
  console.log(`og-image.webp: ${(ogSize / 1024).toFixed(0)}KB`);
  console.log("Done!");
}

optimizeProfile().catch(console.error);
