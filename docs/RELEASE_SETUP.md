# 🚀 Release Automation Setup

This guide explains how to set up automated releases for your browser-tools-mcp fork.

## 📋 Prerequisites

1. **GitHub Repository** - Your fork with the workflows
2. **NPM Account** - For publishing packages
3. **GitHub Secrets** - For secure token storage

## 🔑 Setup NPM Publishing (Optional)

If you want to publish your packages to NPM automatically:

### 1. Create NPM Access Token

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Click your profile → **Access Tokens**
3. Click **Generate New Token** → **Granular Access Token**
4. Configure:
   - **Token Name**: `github-actions-browser-tools-mcp`
   - **Expiration**: 1 year (or your preference)
   - **Packages and scopes**: Select your packages or use "All packages"
   - **Permissions**: `Read and write`

### 2. Add NPM Token to GitHub Secrets

1. Go to your GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. **Name**: `NPM_DEPLOY`
5. **Secret**: Paste your NPM access token
6. Click **Add secret**

## 🎯 How to Use the Workflows

### 🔄 Method 1: Version Bump + Auto Release

1. **Go to Actions tab** in your GitHub repository
2. **Select "🔄 Version Bump"** workflow
3. **Click "Run workflow"**
4. **Choose version type**: patch, minor, or major
5. **Click "Run workflow"**

This will:
- ✅ Bump version in all package.json files
- ✅ Update Chrome extension manifest
- ✅ Update README files
- ✅ Commit and push changes
- ✅ Automatically trigger release creation
- ✅ Publish to NPM (if token configured)

### 📝 Method 2: Manual Version Edit

1. **Edit version** in `browser-tools-mcp/package.json`
2. **Commit and push** to main branch
3. **Release workflow** will automatically detect the version change
4. **Release will be created** with packages and Chrome extension

### 🎯 Method 3: Manual Release

1. **Go to Actions tab** in your GitHub repository
2. **Select "🚀 Release"** workflow
3. **Click "Run workflow"**
4. **Choose options** and run

## 📦 What Gets Released

Each release automatically includes:

### 🎁 Release Assets
- **Chrome Extension**: `browser-tools-chrome-extension-vX.X.X.zip`
- **MCP Package**: `browser-tools-mcp-vX.X.X.tgz`
- **Server Package**: `browser-tools-server-vX.X.X.tgz`

### 📚 Release Notes
- **Changelog**: Automatically generated from git commits
- **Installation instructions**: Ready-to-use commands
- **Feature list**: Complete feature overview
- **Compatibility info**: Node.js, OS, and MCP client support

### 📤 NPM Publishing (if configured)
- **MCP Server**: Published to NPM registry
- **Browser Tools Server**: Published to NPM registry
- **Global installation**: `npx @your-username/browser-tools-mcp@latest`

## 🧪 Testing

The **🧪 Test** workflow runs automatically on:
- ✅ Every push to main
- ✅ Every pull request
- ✅ Manual trigger

**Test Matrix:**
- **Operating Systems**: Ubuntu, Windows, macOS
- **Node.js Versions**: 18, 20, 22
- **Checks**: Build, TypeScript, smoke tests

## 🔧 Customization

### Package Names
Edit the `name` field in:
- `browser-tools-mcp/package.json`
- `browser-tools-server/package.json`

### Release Notes
Modify the release notes template in:
- `.github/workflows/release.yml` (line ~95)

### Version Bump Behavior
Customize version bump logic in:
- `.github/workflows/version-bump.yml`

## 🚨 Troubleshooting

### NPM Publishing Fails
- ✅ Check NPM token is valid and has write permissions
- ✅ Verify package names are available on NPM
- ✅ Ensure you have access to publish under the scope

### Release Not Created
- ✅ Check if version was actually changed in package.json
- ✅ Verify the version doesn't already have a release
- ✅ Check GitHub Actions logs for errors

### Build Failures
- ✅ Ensure all TypeScript files compile locally
- ✅ Check dependencies are properly installed
- ✅ Verify Node.js version compatibility

## 🎉 Success!

Once set up, your release process is fully automated:

1. **Bump version** → **Auto release** → **Auto publish** → **Ready to use!**

Your users can now install with:
```bash
npx @your-username/browser-tools-mcp@latest
npx @your-username/browser-tools-server@latest
```

And download the Chrome extension from your GitHub releases! 🚀
