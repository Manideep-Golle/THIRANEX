@echo off
REM LuxeMarket Quick Start Script (Windows)

echo ==========================================
echo   LUXEMARKET - Quick Start
echo ==========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)

REM Check if .env exists
if not exist ".env" (
    echo.
    echo ⚠️  .env file not found!
    echo Please create a .env file with your Supabase credentials:
    echo.
    echo VITE_SUPABASE_URL=https://your-project.supabase.co
    echo VITE_SUPABASE_ANON_KEY=your-anon-key
    echo.
    echo See IMPLEMENTATION_GUIDE.txt for detailed instructions.
    pause
    exit /b 1
)

echo.
echo 🚀 Starting development server...
echo The app will open at http://localhost:5173
echo.
call npm run dev
