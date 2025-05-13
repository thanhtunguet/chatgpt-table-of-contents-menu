# ChatGPT TOC Panel

A Chrome extension that adds a floating Table of Contents panel to ChatGPT conversations, making it easier to navigate through long discussions.

## Features

- Floating, collapsible TOC panel on the right side of ChatGPT interface
- Lists all conversation turns (User and ChatGPT messages)
- Includes subheadings from ChatGPT responses (excluding code blocks)
- Smooth scrolling to selected messages and headings
- Visual highlighting of selected subheadings
- Supports both light and dark themes
- Matches ChatGPT's visual style

## Installation

1. Clone or download this repository
2. Generate the extension icons from `icon.svg`:
   - Convert to `icon48.png` (48x48 pixels)
   - Convert to `icon128.png` (128x128 pixels)
   You can use online SVG to PNG converters or tools like ImageMagick:
   ```bash
   convert -background none -size 48x48 icon.svg icon48.png
   convert -background none -size 128x128 icon.svg icon128.png
   ```
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the extension directory
6. The extension will automatically activate when you visit `https://chat.openai.com/`

## Usage

1. Visit ChatGPT in Chrome
2. Look for the "TOC" handle on the right side of the page
3. Click the handle to toggle the TOC panel
4. Click on any entry to scroll to that message
5. Click on subheadings to scroll and highlight specific sections

## Files

- `manifest.json`: Extension configuration
- `content.js`: Main functionality
- `styles.css`: Visual styling
- `icon.svg`: Source vector icon
- `icon48.png` and `icon128.png`: Extension icons (generated from icon.svg)

## Development

To modify the extension:

1. Make changes to the source files
2. Reload the extension in `chrome://extensions/`
3. Refresh the ChatGPT page to see your changes

## License

MIT License 