#!/bin/bash

echo "🚀 Setting up China Explained - Cinematic Scrollytelling Website"
echo "============================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "✅ Environment file created (.env.local)"
    echo "⚠️  Please update NEXT_PUBLIC_MAPBOX_TOKEN in .env.local with your Mapbox token"
else
    echo "✅ Environment file already exists"
fi

# Check if Mapbox token is set
if grep -q "your_mapbox_token_here" .env.local; then
    echo "⚠️  WARNING: Mapbox token is not set in .env.local"
    echo "   Get your token at: https://mapbox.com/account/access-tokens"
    echo "   Then update NEXT_PUBLIC_MAPBOX_TOKEN in .env.local"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Get your Mapbox token at https://mapbox.com/account/access-tokens"
echo "   2. Add it to .env.local: NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here"
echo "   3. Run: npm run dev"
echo ""
echo "🌐 The website will be available at: http://localhost:3000"
echo ""
echo "📚 For more information, see README.md"