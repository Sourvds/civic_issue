#!/bin/bash

# LocalPulse - Vercel Deployment Helper

echo "🚀 LocalPulse Vercel Deployment Setup"
echo "======================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed"
    exit 1
fi

echo "✅ Git found"
echo ""

# Push to GitHub
echo "📦 Pushing to GitHub..."
echo "Please ensure you have GitHub credentials configured"
echo ""

git add .
git commit -m "Add Vercel deployment configuration" 2>/dev/null || echo "No changes to commit"
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub"
else
    echo "⚠️ Push failed - check GitHub credentials"
    echo "Visit: https://github.com/settings/tokens"
    echo "Create a Personal Access Token with 'repo' scope"
fi

echo ""
echo "📋 Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'New Project'"
echo "4. Import: https://github.com/Sourvds/civic_issue"
echo "5. Select 'frontend' directory as root"
echo "6. Deploy!"
echo ""
echo "🎉 Your app will be live soon!"
