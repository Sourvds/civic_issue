@echo off
REM LocalPulse - Vercel Deployment Helper for Windows

echo.
echo LocalPulse Vercel Deployment Setup
echo ====================================
echo.

echo Checking git installation...
git --version >nul 2>&1
if errorlevel 1 (
    echo Error: Git is not installed
    pause
    exit /b 1
)

echo Git found!
echo.
echo Pushing to GitHub...
echo Please ensure you have GitHub credentials configured
echo.

git add .
git commit -m "Add Vercel deployment configuration" 2>nul
git push -u origin main

if errorlevel 1 (
    echo.
    echo Warning: Push may have failed - check GitHub credentials
    echo Visit: https://github.com/settings/tokens
    echo Create a Personal Access Token with 'repo' scope
) else (
    echo.
    echo Successfully pushed to GitHub!
)

echo.
echo Next steps:
echo 1. Go to https://vercel.com
echo 2. Sign in with GitHub
echo 3. Click 'New Project'
echo 4. Import: https://github.com/Sourvds/civic_issue
echo 5. Select 'frontend' directory as root
echo 6. Deploy!
echo.
echo Your app will be live soon!
echo.
pause
