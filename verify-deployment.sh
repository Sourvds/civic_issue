#!/bin/bash
# Quick deployment setup script
# Run this to prepare for Vercel deployment

echo "🚀 LocalPulse Deployment Setup"
echo "=============================="

# Step 1: Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized!"
    exit 1
fi

echo "✅ Git repository found"

# Step 2: Check all required files
echo "📁 Checking project structure..."

files=(
    "frontend/package.json"
    "backend/package.json"
    "ai-engine/requirements.txt"
    "docker-compose.yml"
    "README.md"
)

for file in "${files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing: $file"
    else
        echo "✅ Found: $file"
    fi
done

# Step 3: Check environment files
echo ""
echo "🔐 Environment files:"
[ -f "frontend/.env.example" ] && echo "✅ frontend/.env.example" || echo "❌ Missing frontend/.env.example"
[ -f "backend/.env.example" ] && echo "✅ backend/.env.example" || echo "❌ Missing backend/.env.example"
[ -f "ai-engine/.env.example" ] && echo "✅ ai-engine/.env.example" || echo "❌ Missing ai-engine/.env.example"

# Step 4: Check Vercel configs
echo ""
echo "🌐 Vercel configuration:"
[ -f "frontend/vercel.json" ] && echo "✅ frontend/vercel.json" || echo "❌ Missing frontend/vercel.json"
[ -f "backend/vercel.json" ] && echo "✅ backend/vercel.json" || echo "❌ Missing backend/vercel.json"

# Step 5: Display git status
echo ""
echo "📊 Git Status:"
echo "Remote: $(git remote get-url origin)"
echo "Branch: $(git rev-parse --abbrev-ref HEAD)"
echo "Commits: $(git rev-list --count HEAD)"

echo ""
echo "✅ Deployment setup verification complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push to GitHub: git push -u origin main"
echo "2. Set up MongoDB Atlas account"
echo "3. Create environment variables"
echo "4. Deploy to Vercel"
echo ""
echo "📖 Full guide: docs/COMPLETE_DEPLOYMENT_GUIDE.md"
