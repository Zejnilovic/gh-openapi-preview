# GitHub OpenAPI Preview

A Chrome extension that adds an **“OpenAPI Preview”** tab to GitHub’s file view for `.yaml|.yml|.json` OpenAPI specs. Click the tab to open a full-screen modal powered by [Swagger UI](https://swagger.io/tools/swagger-ui/).

## Features

- **Auto-detect** OpenAPI spec files (based on file extension and `openapi: x.y.z` header)
- **Injects** a new tab alongside **Code** and **Blame** in GitHub’s file toolbar
- **Renders** the spec in a modal dialog using Swagger UI
- **Works** on both public and private GitHub repositories

## Installation

1. **Clone** this repository  
   ```bash
   git clone https://github.com/Zejnilovic/gh-openapi-preview.git
   cd gh-openapi-preview
2. **Fetch Swagger UI assets**
   ```bash
   git clone https://github.com/swagger-api/swagger-ui.git tmp-swagger
   cp tmp-swagger/dist/swagger-ui-bundle.js .
   cp tmp-swagger/dist/swagger-ui-standalone-preset.js .
   cp tmp-swagger/dist/swagger-ui.css .
   rm -rf tmp-swagger
   ```
3. **Load in Chrome**
   * Open `chrome://extensions/`
   * Enable **Developer mode**
   * Click **Load unpacked** and select this folder

## Usage

1. Browse to any GitHub “blob” page ending in `.yaml`, `.yml`, or `.json`, for example:
   `https://github.com/yourorg/yourrepo/blob/main/openapi.yaml`
2. Click the **OpenAPI Preview** tab in the file toolbar.
3. Explore your API spec in the Swagger UI modal. Close it with the **×** or by clicking outside the dialog.

## Attribution

* This extension uses **Swagger UI** for rendering your OpenAPI definitions.
* Original project: [swagger-api/swagger-ui](https://github.com/swagger-api/swagger-ui)
* Licensed under the **Apache 2.0 License** (see [LICENSE-2.0.txt](https://github.com/swagger-api/swagger-ui/blob/master/LICENSE)).

