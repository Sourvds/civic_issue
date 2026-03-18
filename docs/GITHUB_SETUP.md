# GitHub Setup & Push Instructions

## Issue: GitHub Authentication

You're getting a 403 Permission Denied error. Here are 3 ways to fix it:

---

## Method 1: Using Personal Access Token (Recommended) 🔐

### Step 1: Create GitHub Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "LocalPulse Deployment"
4. Select scopes: ✅ `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (save it securely)

### Step 2: Update Git Remote
```bash
cd "c:\Users\sd710\OneDrive\Desktop\Sem6 Project\localpulse"

# Replace <TOKEN> with your actual token
git remote set-url origin https://<TOKEN>@github.com/iamsoura005/Civic-issue.git

# Verify it worked
git remote -v
```

### Step 3: Push to GitHub
```bash
git push -u origin main
```

---

## Method 2: Using SSH Keys (Most Secure) 🔑

### Step 1: Generate SSH Key
```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for all prompts (no passphrase for automation)
```

### Step 2: Add SSH Key to GitHub
1. Copy your public key:
```powershell
cat $env:USERPROFILE\.ssh\id_ed25519.pub
```

2. Go to https://github.com/settings/keys
3. Click "New SSH key"
4. Paste your public key
5. Click "Add SSH key"

### Step 3: Update Git Remote with SSH
```bash
cd "c:\Users\sd710\OneDrive\Desktop\Sem6 Project\localpulse"

git remote set-url origin git@github.com:iamsoura005/Civic-issue.git

# Verify
git remote -v
```

### Step 4: Push
```bash
git push -u origin main
```

---

## Method 3: Using Git Credentials Manager 💾

### Windows 10/11: Built-in Credential Manager

```powershell
cd "c:\Users\sd710\OneDrive\Desktop\Sem6 Project\localpulse"

# Enable credential storage
git config --global credential.helper manager-core

# Try push - a dialog will appear asking for credentials
git push -u origin main
```

When prompted:
- **Username**: `iamsoura005`
- **Password**: Your GitHub Personal Access Token (from Method 1)

---

## Verify Push Success

After any method, check if uploaded:

```bash
# Check remote
git remote -v

# Check branch
git branch -a

# View commits pushed
git log --oneline -5
```

You should see your commits in GitHub! ✅

---

## Common Issues & Fixes

### Issue: "The requested URL returned error: 403"
**Fix**: Use Personal Access Token instead of password

### Issue: "Permission denied (publickey)"
**Fix**: SSH key not added to GitHub account

### Issue: "Repository not found"
**Fix**: Check repository URL is correct
```bash
# Correct format
https://github.com/iamsoura005/Civic-issue.git
```

### Issue: "Host key verification failed"
**Fix**: Accept SSH host key first
```bash
ssh -T git@github.com
# Type "yes"
```

---

## Quick Commands Reference

```bash
# Check current remote
git remote -v

# Update remote URL
git remote set-url origin <NEW_URL>

# Check what will be pushed
git log origin/main..main

# Push all commits
git push -u origin main

# Push specific branch
git push -u origin main

# View push history
git reflog
```

---

## Recommended: Method 1 (Token) for First Time

1. Get Personal Access Token from https://github.com/settings/tokens
2. Run in PowerShell:
```powershell
cd "c:\Users\sd710\OneDrive\Desktop\Sem6 Project\localpulse"
git remote set-url origin https://<PASTE_TOKEN_HERE>@github.com/iamsoura005/Civic-issue.git
git push -u origin main
```

3. Go to https://github.com/iamsoura005/Civic-issue to verify ✅

---

## After Push: Next Steps

### 1. Verify in GitHub
- Go to https://github.com/iamsoura005/Civic-issue
- Check that all files are there
- Check commits: should see "Initial commit: Complete LocalPulse..."

### 2. Deploy to Vercel
- See: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

### 3. Set Up Environment Variables in Vercel
- Frontend: `VITE_API_URL`
- Backend: `MONGODB_URI`, `JWT_SECRET`, `AI_ENGINE_URL`

### 4. Connect Database
- Use MongoDB Atlas
- Create .env files for each service

---

## Branch Protection (Optional)

```bash
# After first push, protect main branch in GitHub:
# 1. Go to GitHub repo Settings
# 2. Click "Branches"
# 3. Add rule for "main"
# 4. Require pull request reviews before merging
```

---

**Need help?** Run any of these commands and share output:

```bash
git remote -v
git log --oneline -3
git status
```
