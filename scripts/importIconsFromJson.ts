/**
 * Icon Import Script
 * 
 * Imports icons from AI Studio JSON output and writes them to /public/stories/china/icons/
 * 
 * Usage:
 *   1. Save AI Studio JSON output to: tools/ai-studio-icons.json
 *   2. Run: npm run icons:import
 */

import * as fs from "fs";
import * as path from "path";

interface AiStudioIcon {
    id: string;
    name: string;
    usage: string;
    svg_code: string;
}

const INPUT_PATH = path.join(process.cwd(), "tools", "ai-studio-icons.json");
const OUTPUT_DIR = path.join(
    process.cwd(),
    "public",
    "stories",
    "china",
    "icons"
);

function main() {
    console.log("🚀 Starting icon import process...\n");

    // Check if input file exists
    if (!fs.existsSync(INPUT_PATH)) {
        console.error(`❌ Input JSON not found at: ${INPUT_PATH}`);
        console.error(`\n💡 Create the file with AI Studio icon output and try again.`);
        process.exit(1);
    }

    // Read and parse JSON
    const raw = fs.readFileSync(INPUT_PATH, "utf-8");
    let icons: AiStudioIcon[];

    try {
        icons = JSON.parse(raw);
    } catch (err) {
        console.error("❌ Failed to parse JSON from AI Studio:", err);
        process.exit(1);
    }

    if (!Array.isArray(icons)) {
        console.error("❌ Expected an array of icons in the JSON file.");
        console.error(`\n💡 JSON format should be: [{ id, name, usage, svg_code }, ...]`);
        process.exit(1);
    }

    console.log(`📦 Found ${icons.length} icons to process\n`);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`📁 Created directory: ${OUTPUT_DIR}\n`);
    }

    // Process each icon
    let successCount = 0;
    let warningCount = 0;

    for (const icon of icons) {
        const safeId = icon.id.replace(/[^a-zA-Z0-9_\-]/g, "_");
        const filePath = path.join(OUTPUT_DIR, `${safeId}.svg`);

        const svg = icon.svg_code.trim();

        // Basic sanity check
        if (!svg.startsWith("<svg")) {
            console.warn(`⚠️  Icon ${icon.id} has svg_code that does not start with <svg>`);
            warningCount++;
        }

        // Write SVG file
        fs.writeFileSync(filePath, svg + "\n", "utf-8");
        console.log(`✅ Written: ${path.relative(process.cwd(), filePath)}`);
        successCount++;
    }

    // Summary
    console.log(`\n${"=".repeat(60)}`);
    console.log(`🎉 Icon import complete!`);
    console.log(`   ✅ ${successCount} icons successfully written`);
    if (warningCount > 0) {
        console.log(`   ⚠️  ${warningCount} warnings (check SVG format)`);
    }
    console.log(`   📁 Output: ${OUTPUT_DIR}`);
    console.log(`${"=".repeat(60)}\n`);
}

main();
