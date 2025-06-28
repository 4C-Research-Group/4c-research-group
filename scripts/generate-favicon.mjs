import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import path from "path";

async function generateFavicon() {
  try {
    console.log("🔄 Generating favicon files from logo.png...");

    // Load the logo image
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const image = await loadImage(logoPath);

    // Create different sizes
    const sizes = [16, 32, 48, 64, 128, 256];

    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext("2d");

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Calculate scaling to fit the image in a square
      const scale = Math.min(size / image.width, size / image.height);
      const scaledWidth = image.width * scale;
      const scaledHeight = image.height * scale;
      const x = (size - scaledWidth) / 2;
      const y = (size - scaledHeight) / 2;

      // Draw the image centered
      ctx.drawImage(image, x, y, scaledWidth, scaledHeight);

      // Save as PNG
      const buffer = canvas.toBuffer("image/png");
      const outputPath = path.join(
        process.cwd(),
        "public",
        `favicon-${size}x${size}.png`
      );
      fs.writeFileSync(outputPath, buffer);

      console.log(`✅ Generated favicon-${size}x${size}.png`);
    }

    // Create ICO file (simplified - just copy the 32x32 version)
    const ico32Path = path.join(process.cwd(), "public", "favicon-32x32.png");
    const icoPath = path.join(process.cwd(), "public", "favicon.ico");
    if (fs.existsSync(ico32Path)) {
      fs.copyFileSync(ico32Path, icoPath);
      console.log("✅ Generated favicon.ico");
    }

    console.log("🎉 Favicon generation complete!");
    console.log("\n📝 Next steps:");
    console.log(
      "1. The favicon files have been generated in the public/ directory"
    );
    console.log("2. The layout.tsx has been updated with favicon metadata");
    console.log("3. Your browser should now show the logo in the tab");
  } catch (error) {
    console.error("❌ Error generating favicon:", error);
    console.log(
      "\n💡 Alternative: You can manually copy logo.png to favicon.ico in the public/ directory"
    );
  }
}

generateFavicon();
