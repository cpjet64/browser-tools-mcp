# WebAI-MCP Installation Guide

This comprehensive guide covers all installation methods for WebAI-MCP, helping you choose the best approach for your workflow.

## 📋 Overview

WebAI-MCP consists of three components:
1. **Chrome Extension** - Browser automation interface
2. **WebAI Server** - Local middleware server (`@cpjet64/webai-server`)
3. **MCP Server** - Protocol handler for your IDE (`@cpjet64/webai-mcp`)

## 🚀 Installation Methods

### Method 1: Temporary Download & Run (Recommended for Testing)

**Best for:** Testing, development, always getting latest version

**Pros:**
- ✅ Always gets the latest version automatically
- ✅ No permanent installation required
- ✅ Easy to switch between versions
- ✅ No disk space used for cached packages

**Cons:**
- ❌ Slower startup (downloads each time)
- ❌ Requires internet connection

**Commands:**
```bash
# Start WebAI Server (run in separate terminal)
npx @cpjet64/webai-server@latest

# Configure your IDE with:
# Command: npx
# Args: ["@cpjet64/webai-mcp@latest"]
```

**For Development Version:**
```bash
npx @cpjet64/webai-server@dev
# Configure IDE with: npx @cpjet64/webai-mcp@dev
```

---

### Method 2: Global Installation (Recommended for Regular Use)

**Best for:** Daily use, production environments, offline work

**Pros:**
- ✅ Fast startup (already installed)
- ✅ Works offline after installation
- ✅ Simple commands to run
- ✅ Consistent versions

**Cons:**
- ❌ Manual updates required
- ❌ Uses disk space
- ❌ May have version conflicts

**Installation:**
```bash
# Install globally
npm install -g @cpjet64/webai-mcp@latest
npm install -g @cpjet64/webai-server@latest
```

**Running:**
```bash
# Start server with simple command
webai-server

# MCP server runs automatically when IDE calls it
# Configure IDE with command: webai-mcp
```

**Updating:**
```bash
# Update to latest versions
npm update -g @cpjet64/webai-mcp@latest
npm update -g @cpjet64/webai-server@latest
```

**For Development Version:**
```bash
# Install dev versions
npm install -g @cpjet64/webai-mcp@dev
npm install -g @cpjet64/webai-server@dev

# Update dev versions
npm update -g @cpjet64/webai-mcp@dev
npm update -g @cpjet64/webai-server@dev
```

---

### Method 3: Local Project Installation

**Best for:** Project-specific installations, team environments

**Pros:**
- ✅ Project-specific versions
- ✅ Version control with package.json
- ✅ Team consistency
- ✅ No global namespace pollution

**Cons:**
- ❌ Must install in each project
- ❌ Longer commands to run
- ❌ Multiple versions on disk

**Installation:**
```bash
# Install to current project
npm install @cpjet64/webai-mcp@latest
npm install @cpjet64/webai-server@latest
```

**Running:**
```bash
# Run with npx
npx webai-server

# Configure IDE with:
# Command: npx
# Args: ["@cpjet64/webai-mcp"]
```

**Package.json Integration:**
```json
{
  "scripts": {
    "webai-server": "webai-server",
    "webai-mcp": "webai-mcp"
  },
  "dependencies": {
    "@cpjet64/webai-mcp": "^1.4.0",
    "@cpjet64/webai-server": "^1.4.0"
  }
}
```

---

### Method 4: Download from Releases

**Best for:** Offline environments, specific version requirements

**Chrome Extension:**
1. Download `.zip` from [Latest Release](https://github.com/cpjet64/webai-mcp/releases/latest)
2. Extract the archive
3. Load in Chrome → Extensions → Developer mode → Load unpacked

**Servers:**
Use any of the above NPM methods for the server components.

## 🔧 IDE Configuration

### Augment
1. Open Augment settings
2. Go to MCP Servers configuration
3. Add new server:
   - **Name**: `webai`
   - **Command**: Choose based on installation method:
     - Temporary: `npx -y @cpjet64/webai-mcp@latest`
     - Global: `webai-mcp`
     - Local: `npx @cpjet64/webai-mcp`

### Cursor IDE
```json
{
  "mcp": {
    "servers": {
      "webai": {
        "command": "npx",
        "args": ["@cpjet64/webai-mcp@latest"]
      }
    }
  }
}
```

### Claude Desktop
```json
{
  "mcpServers": {
    "webai": {
      "command": "npx",
      "args": ["@cpjet64/webai-mcp@latest"]
    }
  }
}
```

## 🔄 Version Management

### Check Current Versions
```bash
# Check installed versions
npm list -g @cpjet64/webai-mcp
npm list -g @cpjet64/webai-server

# Check available versions
npm view @cpjet64/webai-mcp versions --json
npm view @cpjet64/webai-server versions --json
```

### Force Clean Install
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install -g @cpjet64/webai-mcp@latest
npm install -g @cpjet64/webai-server@latest
```

## 🛠️ Troubleshooting

### Common Issues

**"Command not found" after global install:**
```bash
# Check npm global bin directory
npm config get prefix

# Add to PATH if needed (example for macOS/Linux)
export PATH="$(npm config get prefix)/bin:$PATH"
```

**Permission errors on macOS/Linux:**
```bash
# Use npm's built-in solution
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

**Multiple versions conflict:**
```bash
# Uninstall all versions
npm uninstall -g @cpjet64/webai-mcp
npm uninstall -g @cpjet64/webai-server

# Clean install
npm cache clean --force
npm install -g @cpjet64/webai-mcp@latest
npm install -g @cpjet64/webai-server@latest
```

## 📊 Comparison Table

| Method | Speed | Updates | Offline | Disk Usage | Best For |
|--------|-------|---------|---------|------------|----------|
| **Temporary** | Slow | Auto | No | None | Testing, Dev |
| **Global** | Fast | Manual | Yes | Medium | Daily Use |
| **Local** | Medium | Manual | Yes | High | Projects |
| **Releases** | Fast | Manual | Yes | Low | Offline |

## 🎯 Recommendations

- **For Developers**: Use **Temporary** method with `@dev` versions
- **For Regular Users**: Use **Global** installation with `@latest`
- **For Teams**: Use **Local** installation with version pinning
- **For Production**: Use **Global** installation with specific versions

Choose the method that best fits your workflow and requirements!
