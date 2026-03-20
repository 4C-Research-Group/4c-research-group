#!/bin/bash

# Script to prepare the app for GitHub Pages deployment
echo "🚀 Preparing for GitHub Pages deployment..."

# Backup original middleware
if [ -f "middleware.ts" ]; then
  echo "📦 Backing up original middleware..."
  cp middleware.ts middleware.backup.ts
fi

# Disable middleware for static build
echo "🔧 Disabling middleware for static build..."
if [ -f "middleware.disabled.ts" ]; then
  cp middleware.disabled.ts middleware.ts
fi

# Set environment variable for static build
echo "🔧 Setting static build environment..."
export NEXT_PUBLIC_STATIC_BUILD=true

# Build for GitHub Pages
echo "🏗️ Building for GitHub Pages..."
npm run build:pages

# Export static files
echo "📦 Exporting static files..."
npm run export:pages

# Add .nojekyll file to prevent GitHub Pages processing
echo "📄 Adding .nojekyll file..."
touch out/.nojekyll

# Restore original middleware
echo "🔄 Restoring original middleware..."
if [ -f "middleware.backup.ts" ]; then
  cp middleware.backup.ts middleware.ts
  rm middleware.backup.ts
fi

echo "✅ GitHub Pages build complete! Files are in the 'out' directory."
echo "📋 To deploy: Copy contents of 'out' directory to your GitHub Pages branch"
