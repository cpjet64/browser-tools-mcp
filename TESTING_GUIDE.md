# 🧪 Complete Local Testing Guide for Browser Tools MCP

This guide walks you through testing all components of Browser Tools MCP locally, including the new diagnostic and setup features.

## 📋 Prerequisites

Before testing, ensure you have:
- **Node.js 18+** installed
- **Google Chrome** or Chromium browser
- **Git** (for branch switching)
- **Terminal/Command Prompt** access

## 🚀 Quick Start - Test Everything

### Option 1: Automated Testing (Recommended)
```bash
# Switch to the enhanced branch with all features
git checkout feature/platform-enhancements

# Run the complete automated setup and validation
cd scripts
npm run full-setup
```

### Option 2: Manual Step-by-Step Testing
Follow the sections below for detailed testing of each component.

## 🔧 Component-by-Component Testing

### 1. 🔍 Test New Diagnostic Tools

#### Test the Diagnostic Script
```bash
# Switch to diagnostic features branch
git checkout feature/automated-diagnostics

# Run diagnostics
node scripts/diagnose.js
```

**Expected Output:**
- ✅ Node.js version check
- ✅ Process detection
- ✅ Port availability (3025-3030)
- ✅ Build status verification
- ✅ Chrome extension validation
- 🔧 Actionable solutions for any issues

#### Test the Setup Script
```bash
# Run automated setup
node scripts/setup.js --verbose

# Or quick setup
node scripts/setup.js --skip-diagnostics
```

**Expected Output:**
- ✅ Prerequisites validation
- ✅ Dependency installation
- ✅ Package building
- ✅ Platform-specific configuration

### 2. 🛠️ Test Enhanced Error Handling

```bash
# Switch to error handling branch
git checkout feature/enhanced-error-handling

# Build the enhanced MCP server
cd browser-tools-mcp
npm install
npm run build
cd ..
```

#### Test Error Analysis
```bash
# Start MCP server (this will show enhanced errors if issues occur)
cd browser-tools-mcp
node dist/mcp-server.js
```

**Expected Features:**
- 🔍 Intelligent error categorization
- 📝 User-friendly error messages
- 🔧 Actionable troubleshooting solutions
- ⚠️ Version compatibility warnings

### 3. 🌐 Test Proxy Support

```bash
# Switch to proxy support branch
git checkout feature/proxy-support

# Build the enhanced server
cd browser-tools-server
npm install
npm run build
cd ..
```

#### Test Proxy Configuration
```bash
# Start the enhanced server
cd browser-tools-server
node dist/browser-connector.js
```

**Test Proxy Endpoints:**
```bash
# In another terminal, test proxy endpoints
curl http://localhost:3025/proxy/config
curl http://localhost:3025/proxy/recommendations
curl -X POST http://localhost:3025/proxy/auto-detect
```

**Expected Features:**
- 🔧 Proxy configuration management
- 🌐 Auto-detection of system proxy
- 🧪 Connectivity testing
- 🏢 Corporate firewall support

### 4. 🖥️ Test Platform-Specific Features

```bash
# Switch to platform enhancements branch
git checkout feature/platform-enhancements

# Run platform-specific setup
node scripts/platform-setup.js
```

**Expected Output (varies by platform):**

**Windows:**
- ✅ Windows version detection
- ⚠️ Windows Defender guidance
- 🔧 PowerShell policy checks
- 📁 Batch file creation

**macOS:**
- ✅ macOS version detection
- 🔧 Xcode tools validation
- 🍺 Homebrew detection
- 📁 Shell script creation

**Linux:**
- 🐧 Distribution detection
- 📦 Package manager identification
- 🔧 Tool availability checks
- ⚙️ Systemd service creation

#### Test Installation Validation
```bash
# Run comprehensive validation
node scripts/validate-installation.js
```

**Expected Output:**
- ✅ Prerequisites validation
- ✅ Project structure verification
- ✅ Dependencies audit
- ✅ Build artifacts check
- ✅ Configuration validation
- ✅ Functionality testing

## 🌐 Test Browser Tools Server

### Start the Server
```bash
# Method 1: Direct start
cd browser-tools-server
npm start

# Method 2: Using NPX (recommended)
npx @cpjet64/browser-tools-server

# Method 3: Using platform scripts (if available)
# Windows: scripts/windows/start-server.bat
# macOS/Linux: scripts/macos/start-server.sh
```

### Verify Server is Running
```bash
# Check server identity
curl http://localhost:3025/.identity

# Expected response:
# {"signature":"mcp-browser-connector-24x7","version":"1.3.0"}
```

### Test Server Endpoints
```bash
# Test basic endpoints
curl http://localhost:3025/console-logs
curl http://localhost:3025/network-logs
curl http://localhost:3025/settings

# Test new proxy endpoints (if on proxy branch)
curl http://localhost:3025/proxy/config
curl http://localhost:3025/proxy/recommendations
```

## 🔌 Test MCP Server

### Start MCP Server
```bash
cd browser-tools-mcp
node dist/mcp-server.js
```

### Test MCP Tools
The MCP server should connect to the Browser Tools Server automatically. Test the tools:

```bash
# If using with Cursor or Claude Desktop, test these tools:
# - getConsoleLogs
# - getNetworkLogs  
# - takeScreenshot
# - runAccessibilityAudit
# - checkVersionCompatibility (new!)
```

## 🌐 Test Chrome Extension

### Install the Extension

1. **Open Chrome** and navigate to `chrome://extensions/`

2. **Enable Developer Mode** (toggle in top-right)

3. **Load Unpacked Extension:**
   - Click "Load unpacked"
   - Select the `chrome-extension` folder from your project

4. **Verify Installation:**
   - Extension should appear in the list
   - Name: "Browser Tools MCP"
   - Status: Enabled

### Test Extension Functionality

1. **Open Chrome DevTools** (F12 or right-click → Inspect)

2. **Find Browser Tools Panel:**
   - Look for "BrowserToolsMCP" tab in DevTools
   - If not visible, click the ">>" arrow to see more tabs

3. **Test Connection:**
   - Panel should show connection status
   - Should auto-connect to `localhost:3025`
   - Green indicator = connected, Red = disconnected

4. **Test Settings:**
   - Try changing server host/port in panel
   - Test connection with different settings

## 🔗 Test Full Integration

### Complete End-to-End Test

1. **Start All Components:**
   ```bash
   # Terminal 1: Start Browser Tools Server
   npx @cpjet64/browser-tools-server
   
   # Terminal 2: Start MCP Server  
   cd browser-tools-mcp
   node dist/mcp-server.js
   
   # Terminal 3: Run diagnostics
   node scripts/diagnose.js
   ```

2. **Install Chrome Extension** (see above)

3. **Test in MCP Client** (Cursor, Claude Desktop, etc.):
   - Configure MCP client to use the local server
   - Test browser automation tools
   - Verify screenshots, logs, audits work

### Integration Test Checklist

- [ ] ✅ Browser Tools Server starts without errors
- [ ] ✅ MCP Server connects to Browser Tools Server
- [ ] ✅ Chrome Extension connects to server
- [ ] ✅ MCP tools work in client (Cursor/Claude Desktop)
- [ ] ✅ Screenshots are captured successfully
- [ ] ✅ Console logs are retrieved
- [ ] ✅ Network logs are captured
- [ ] ✅ Lighthouse audits run successfully
- [ ] ✅ Error handling provides helpful messages
- [ ] ✅ Diagnostics identify and resolve issues

## 🐛 Troubleshooting

### Common Issues and Solutions

#### "Server not found" or Connection Issues
```bash
# Run diagnostics first
node scripts/diagnose.js

# Check if port is in use
netstat -an | findstr ":3025"  # Windows
lsof -i :3025                  # macOS/Linux

# Kill existing processes
taskkill /F /PID <PID>         # Windows  
kill -9 <PID>                  # macOS/Linux
```

#### "Build artifacts missing"
```bash
# Rebuild packages
cd browser-tools-mcp && npm run build
cd ../browser-tools-server && npm run build
```

#### "Chrome extension not working"
```bash
# Validate extension
node scripts/validate-installation.js

# Check Chrome extension in DevTools console
# Look for connection errors or permission issues
```

#### "Version compatibility issues"
```bash
# Check version compatibility (if on enhanced error handling branch)
cd browser-tools-mcp
node -e "import('./version-checker.js').then(m => m.VersionChecker.checkVersionCompatibility().then(console.log))"
```

### Get Help

1. **Run Full Diagnostics:**
   ```bash
   node scripts/diagnose.js
   ```

2. **Run Validation:**
   ```bash
   node scripts/validate-installation.js
   ```

3. **Check Platform Setup:**
   ```bash
   node scripts/platform-setup.js
   ```

4. **View Logs:**
   - Browser Tools Server: Check terminal output
   - Chrome Extension: Check DevTools console
   - MCP Server: Check terminal output

## 🎯 Testing Different Feature Branches

### Test Each Feature Branch Individually

```bash
# Test automated diagnostics
git checkout feature/automated-diagnostics
node scripts/diagnose.js
node scripts/setup.js

# Test enhanced error handling  
git checkout feature/enhanced-error-handling
cd browser-tools-mcp && npm run build
node dist/mcp-server.js

# Test proxy support
git checkout feature/proxy-support  
cd browser-tools-server && npm run build
node dist/browser-connector.js

# Test platform enhancements
git checkout feature/platform-enhancements
node scripts/platform-setup.js
node scripts/validate-installation.js
```

### Test All Features Together

```bash
# Switch to the branch with all features
git checkout feature/platform-enhancements

# Run complete setup and validation
cd scripts
npm run full-setup
```

## ✅ Success Criteria

Your local testing is successful when:

- [ ] All diagnostic checks pass
- [ ] Server starts and responds to health checks
- [ ] Chrome extension connects successfully  
- [ ] MCP tools work in your client application
- [ ] Screenshots, logs, and audits function properly
- [ ] Error messages are helpful and actionable
- [ ] Platform-specific optimizations are applied
- [ ] Version compatibility is validated

## 🚀 Next Steps

After successful local testing:

1. **Merge feature branches** into main
2. **Update documentation** with new features
3. **Create release** with enhanced capabilities
4. **Deploy** to production environment

Happy testing! 🎉
