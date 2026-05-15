#!/bin/bash
# LuxeMarket Quick Start Script

echo "=========================================="
echo "  LUXEMARKET - Quick Start"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  .env file not found!"
    echo "Please create a .env file with your Supabase credentials:"
    echo ""
    echo "VITE_SUPABASE_URL=https://your-project.supabase.co"
    echo "VITE_SUPABASE_ANON_KEY=your-anon-key"
    echo ""
    echo "See IMPLEMENTATION_GUIDE.txt for detailed instructions."
    exit 1
fi

echo ""
echo "🚀 Starting development server..."
echo "The app will open at http://localhost:5173"
echo ""
npm run dev
