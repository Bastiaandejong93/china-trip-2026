# Icon System for China Explained Story

## Overview

This directory contains the icon import system for the China Explained scrollytelling story.

## File Structure

```
/public/stories/china/icons/     # Generated SVG icon files
/src/data/stories/china-explained/icons.ts   # Icon metadata & types
/scripts/importIconsFromJson.ts  # Import script
/tools/ai-studio-icons.json      # AI Studio output (you create this)
```

## Usage

### 1. Generate Icons with AI Studio

Create icons using AI Studio and save the JSON output to:
```
tools/ai-studio-icons.json
```

Expected JSON format:
```json
[
  {
    "id": "city_shanghai",
    "name": "Shanghai skyline",
    "usage": "Use for the Shanghai chapter icon and map legends.",
    "svg_code": "<svg ...>...</svg>"
  }
]
```

### 2. Import Icons

Run the import script:
```bash
npm run icons:import
```

This will:
- Read `tools/ai-studio-icons.json`
- Validate the JSON structure
- Write SVG files to `public/stories/china/icons/`
- Report success/warnings

### 3. Use Icons in Chapters

Icons are automatically integrated via the `renderChapterIcon` callback in the story page.

Add `iconId` to any chapter:
```typescript
{
  id: "shanghai-intro",
  title: "Shanghai – China's Electric Front Door",
  iconId: "city_shanghai",
  // ... other chapter properties
}
```

## Icon Types

- **Cities**: `city_shanghai`, `city_wuhan`, etc.
- **Transport**: `transport_highspeed_train`, `transport_plane`
- **Activities**: `activity_night_market`, `activity_mountain_hike`, `activity_temple_visit`
- **UI**: `ui_calendar_day`, `ui_hotel_bed`, `ui_camera`

See `src/data/stories/china-explained/icons.ts` for the complete list.
