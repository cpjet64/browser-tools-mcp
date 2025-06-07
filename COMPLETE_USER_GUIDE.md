# WebAI-MCP Complete User Guide

> **Current Version**: v1.5.1-dev.3 | **Updated**: January 2025

## 🎯 Overview

WebAI-MCP is a comprehensive browser automation platform that provides AI agents with deep insights into browser behavior and user experience. This guide covers everything you need to know as a user.

### **4-Tier Architecture**
```
MCP Client → webai-mcp → webai-server → Chrome Extension
   (AI)    →   (MCP)   →   (Bridge)   →    (Browser)
```

## 📦 Installation & Setup

### **Method 1: Quick Start (Recommended for Testing)**

Always gets the latest version, no permanent installation:

```bash
# 1. Start WebAI Server (run in separate terminal)
npx @cpjet64/webai-server@dev

# 2. Configure your IDE with MCP server
# Add to your IDE's MCP configuration: npx @cpjet64/webai-mcp@dev
```

### **Method 2: Global Installation (Recommended for Regular Use)**

Install once, run anytime:

```bash
# 1. Install globally
npm install -g @cpjet64/webai-mcp@dev
npm install -g @cpjet64/webai-server@dev

# 2. Run anytime with simple commands
webai-server
# MCP server runs automatically when your IDE calls it
```

### **Method 3: Local Development Installation**

For developers who want to modify the code:

```bash
# 1. Clone the repository
git clone https://github.com/cpjet64/webai-mcp.git
cd webai-mcp

# 2. Install dependencies
npm run install:all

# 3. Build packages
npm run build:all

# 4. Run locally
cd webai-server && npm start
# Configure IDE with: node /path/to/webai-mcp/webai-mcp/dist/mcp-server.js
```

## 🔧 Chrome Extension Setup

### **Installation**

1. **Download Extension**:
   - Download from [Chrome Web Store](https://chrome.google.com/webstore) (coming soon)
   - Or load unpacked from `chrome-extension/` directory

2. **Load Unpacked Extension** (Development):
   ```
   1. Open Chrome → Extensions → Developer mode ON
   2. Click "Load unpacked"
   3. Select the chrome-extension/ folder
   4. Extension should appear in toolbar
   ```

3. **Verify Installation**:
   - Extension icon appears in Chrome toolbar
   - Right-click on any webpage → "Inspect" → "WebAI" tab should be visible

### **Configuration**

1. **Open Extension Panel**: Click the WebAI extension icon
2. **Configure Auto-paste** (optional):
   - Check "Enable Auto-paste"
   - Select target IDE: Cursor, VS Code, Zed, Claude Desktop, or Custom
3. **Test Connection**: Take a screenshot to verify everything works

## 🛠️ Available Tools (22 Tools)

### **Core Browser Tools**
- `takeScreenshot` - High-quality screenshots with auto-paste
- `getConsoleLogs` - Browser console monitoring
- `getNetworkLogs` - Network request tracking
- `inspectElementsBySelector` - Element inspection with styles
- `wipeLogs` - Clear browser logs

### **Storage & Data Access**
- `getCookies` - Browser cookies access
- `getLocalStorage` - localStorage data retrieval
- `getSessionStorage` - sessionStorage data retrieval

### **Element Interaction**
- `clickElement` - Enhanced clicking with coordinates
- `fillInput` - Input field manipulation
- `selectOption` - Dropdown selection
- `submitForm` - Form submission

### **Browser Control**
- `refreshBrowser` - Advanced page refresh
- `getSelectedElement` - Currently selected element

### **Auditing & Analysis**
- `runAccessibilityAudit` - A11y compliance checking
- `runPerformanceAudit` - Performance analysis
- `runSEOAudit` - SEO optimization analysis
- `runBestPracticesAudit` - Web best practices

### **Version Management**
- `checkVersionCompatibility` - Component compatibility check
- `getVersionInfo` - Comprehensive version details
- `getVersions` - Quick version overview

## 🎯 Auto-Paste Functionality

### **What is Auto-Paste?**

Auto-paste automatically copies screenshots to your clipboard and pastes them directly into your IDE with a descriptive message. This eliminates the manual copy-paste workflow when sharing screenshots with AI assistants.

### **Supported Platforms & IDEs**

#### **macOS (AppleScript)**
- **Cursor** - Process detection + AppleScript automation
- **VS Code** - Process detection + AppleScript automation  
- **Zed** - Process detection + AppleScript automation
- **Claude Desktop** - Process detection + AppleScript automation
- **Custom Apps** - User-defined application names

#### **Windows (PowerShell)**
- **Cursor** - Process name: `Cursor.exe`
- **VS Code** - Process name: `Code.exe`
- **VS Code Insiders** - Process name: `Code - Insiders.exe`
- **Zed** - Process name: `Zed.exe`
- **Claude Desktop** - Process name: `Claude.exe`
- **Custom Applications** - User-defined process names

#### **Linux (Bash + xdotool)**
- **Cursor** - Window detection + xdotool automation
- **VS Code** - Window detection + xdotool automation
- **Zed** - Window detection + xdotool automation
- **Claude Desktop** - Window detection + xdotool automation
- **Custom Apps** - User-defined application names

### **Auto-Paste Setup**

1. **Enable in Extension**: Check "Enable Auto-paste" in the Chrome extension panel
2. **Select Target IDE**: Choose from dropdown or select "Custom Application"
3. **Test**: Take a screenshot and verify it appears in your IDE

### **Windows-Specific Setup**

#### **Requirements (Built-in)**
- ✅ **Windows 10/11** - Full support
- ✅ **PowerShell 5.1+** - Included with Windows
- ✅ **System.Windows.Forms** - Built-in .NET assembly
- ✅ **System.Drawing** - Built-in .NET assembly

#### **PowerShell Permissions**
```powershell
# Test if PowerShell can run automation scripts
Get-ExecutionPolicy
# Should show: RemoteSigned, Unrestricted, or Bypass
```

If restricted, run as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### **Verify IDE Process Names**
```powershell
# Check running IDE processes
Get-Process | Where-Object {$_.ProcessName -like "*Code*" -or $_.ProcessName -like "*Cursor*" -or $_.ProcessName -like "*Zed*"}
```

## 🧪 Testing Auto-Paste

### **Test 1: Basic Functionality**
1. **Open your target IDE** (VS Code, Cursor, etc.)
2. **Open Chrome** with the extension
3. **Navigate to any webpage**
4. **Take a screenshot** using the extension
5. **Verify** the image appears in your IDE with "here is the screenshot" text

### **Test 2: Multiple IDEs**
1. **Open multiple IDEs** (VS Code + Cursor)
2. **Set target IDE** in extension settings
3. **Take screenshot**
4. **Verify** it pastes to the correct IDE

### **Test 3: Window States**
1. **Minimize your IDE**
2. **Take screenshot**
3. **Verify** IDE window is restored and receives paste

## 📊 Version Management

### **Quick Version Check**
Ask your AI assistant: "What versions of WebAI-MCP components are currently installed?"

**Example Output:**
```
📋 WebAI-MCP Component Versions
===============================

• MCP Server: 1.5.1-dev.3 ✅
• WebAI Server: 1.5.1-dev.3 ✅
• Chrome Extension: 1.5.1 ✅

🖥️  System: win32 (x64)
📦 Node.js: v20.11.0 | NPM: 10.2.4
```

### **Check for Updates**
Ask your AI assistant: "Are there any updates available for WebAI-MCP?"

### **Compatibility Check**
Ask your AI assistant: "Check if my WebAI-MCP components are compatible"

## 🛠️ Troubleshooting

### **Common Issues**

#### **"WebAI server not found"**
**Solutions:**
1. **Verify server is running**: Check if `webai-server` process is active
2. **Check ports**: Server runs on ports 3025-3027
3. **Restart server**: Stop and restart `webai-server`
4. **Check firewall**: Ensure ports 3025-3027 are not blocked

#### **"Chrome extension not working"**
**Solutions:**
1. **Reload extension**: Chrome → Extensions → Reload WebAI extension
2. **Check permissions**: Ensure extension has necessary permissions
3. **Restart Chrome**: Close and reopen Chrome browser
4. **Check DevTools**: Look for WebAI tab in Chrome DevTools

#### **"Screenshots not auto-pasting"**
**Solutions:**
1. **Check auto-paste setting**: Ensure "Enable Auto-paste" is checked
2. **Verify target IDE**: Confirm correct IDE is selected
3. **Check IDE is running**: Ensure target IDE process is active
4. **Test manually**: Try copying/pasting manually first

#### **"Element not found" errors**
**Solutions:**
1. **Verify selector**: Check CSS selector is correct
2. **Wait for page load**: Ensure page is fully loaded
3. **Check element visibility**: Element must be visible on page
4. **Try different selector**: Use more specific or alternative selectors

### **Windows Auto-Paste Issues**

#### **"IDE is not running"**
```powershell
# Check if your IDE is actually running
Get-Process | Where-Object {$_.ProcessName -like "*YourIDE*"}
```

#### **"Failed to copy image to clipboard"**
1. **Check file permissions** on screenshot folder
2. **Verify PowerShell execution policy**
3. **Try running as Administrator**

#### **"Window activation failed"**
1. **Disable focus stealing prevention**: Windows Settings → System → Focus assist → Off
2. **Check if IDE has multiple windows open**
3. **Try clicking on IDE window manually first**

### **Performance Issues**

#### **Slow screenshot capture**
1. **Check browser performance**: Close unnecessary tabs
2. **Verify system resources**: Ensure adequate RAM/CPU
3. **Update Chrome**: Use latest Chrome version

#### **High memory usage**
1. **Restart components**: Restart webai-server and Chrome extension
2. **Clear browser cache**: Clear Chrome cache and cookies
3. **Check for memory leaks**: Monitor system resources

## 🎉 Best Practices

### **For Optimal Performance**
1. **Keep components updated**: Regularly check for updates
2. **Use latest Chrome**: Keep Chrome browser updated
3. **Monitor system resources**: Ensure adequate RAM/CPU
4. **Regular restarts**: Restart components if experiencing issues

### **For Security**
1. **Review permissions**: Only grant necessary permissions
2. **Monitor data access**: Be aware of what data is being accessed
3. **Use privacy modes**: Configure privacy filtering as needed

### **For Development**
1. **Use version tools**: Regularly check component compatibility
2. **Test thoroughly**: Verify functionality after updates
3. **Report issues**: Submit bug reports with detailed information

## 📞 Support & Resources

- **GitHub Repository**: [https://github.com/cpjet64/webai-mcp](https://github.com/cpjet64/webai-mcp)
- **Issue Tracker**: [GitHub Issues](https://github.com/cpjet64/webai-mcp/issues)
- **NPM Packages**: [@cpjet64/webai-mcp](https://www.npmjs.com/package/@cpjet64/webai-mcp) | [@cpjet64/webai-server](https://www.npmjs.com/package/@cpjet64/webai-server)
- **Chinese Documentation**: [简体中文文档](./docs/i18n/README_CN.md)

## 🔍 Advanced Usage Examples

### **Taking Screenshots**
```
"Take a screenshot of the current page"
"Capture a screenshot and paste it to my IDE"
"Screenshot the current browser tab"
```

### **Element Interaction**
```
"Click the submit button"
"Fill the email field with test@example.com"
"Select 'Option 2' from the dropdown menu"
"Submit the contact form"
```

### **Browser Analysis**
```
"Show me the console logs"
"What network requests were made?"
"Analyze the page performance"
"Check this page for accessibility issues"
```

### **Storage Inspection**
```
"What cookies are set on this page?"
"Show me the localStorage data"
"What's stored in sessionStorage?"
```

## 🎯 Tool Usage Patterns

### **DOM Interaction Pattern**
```typescript
// Enhanced element clicking with coordinates and options
clickElement({
  selector: "#submit-button",           // CSS selector
  coordinates: { x: 100, y: 200 },     // Optional coordinates
  waitForElement: true,                // Wait for element visibility
  timeout: 5000,                       // Timeout in milliseconds
  scrollIntoView: true                 // Scroll element into view
})

// Input field manipulation
fillInput({
  selector: "input[name='email']",     // CSS selector for input
  text: "user@example.com",            // Text to enter
  clearFirst: true,                    // Clear existing value first
  waitForElement: true,                // Wait for element visibility
  timeout: 5000,                       // Timeout in milliseconds
  triggerEvents: true                  // Trigger input/change events
})

// Dropdown selection
selectOption({
  selector: "select[name='country']",  // CSS selector for select
  value: "US",                         // Value of option to select
  text: "United States",               // OR visible text of option
  index: 0,                            // OR index of option (0-based)
  waitForElement: true,                // Wait for element visibility
  timeout: 5000                        // Timeout in milliseconds
})

// Form submission
submitForm({
  formSelector: "#contact-form",       // CSS selector for form
  submitButtonSelector: "button[type='submit']", // OR submit button selector
  waitForElement: true,                // Wait for element visibility
  timeout: 5000,                       // Timeout in milliseconds
  waitForNavigation: false             // Wait for navigation after submit
})
```

### **Browser Control Pattern**
```typescript
// Advanced browser refresh with comprehensive options
refreshBrowser({
  waitForLoad: true,                   // Wait for page to fully load
  timeout: 10000,                      // Timeout for page load
  preserveScrollPosition: false,       // Preserve scroll position
  clearCache: false                    // Clear browser cache before refresh
})
```

### **Audit Pattern**
```typescript
// Comprehensive page auditing
runAccessibilityAudit()              // Check WCAG compliance
runPerformanceAudit()                // Analyze page performance
runSEOAudit()                        // SEO optimization analysis
runBestPracticesAudit()              // Web development best practices
```

## 🔧 Configuration Options

### **Privacy Filtering Levels**
- **Level 1 (Hide Nothing)**: All data visible
- **Level 2 (Hide Sensitive)**: Passwords, tokens, keys filtered
- **Level 3 (Hide All Data)**: Maximum privacy protection

### **Auto-Paste Configuration**
```javascript
settings = {
  allowAutoPaste: true,           // Enable/disable auto-paste
  targetIDE: "cursor",           // Selected IDE
  customAppName: "MyIDE"         // Custom app name (if targetIDE === "custom")
}
```

### **Screenshot Options**
- **Full page capture**: Entire webpage including scrolled content
- **Visible area only**: Current viewport
- **Element-specific**: Capture specific elements with highlighting

## 🚀 Integration Examples

### **MCP Client Configuration**

#### **Cursor IDE**
```json
{
  "mcpServers": {
    "webai-mcp": {
      "command": "npx",
      "args": ["@cpjet64/webai-mcp@dev"]
    }
  }
}
```

#### **Claude Desktop**
```json
{
  "mcpServers": {
    "webai-mcp": {
      "command": "npx",
      "args": ["@cpjet64/webai-mcp@dev"]
    }
  }
}
```

#### **VS Code with Cline**
```json
{
  "mcpServers": {
    "webai-mcp": {
      "command": "npx",
      "args": ["@cpjet64/webai-mcp@dev"]
    }
  }
}
```

## 📈 Performance Optimization

### **System Requirements**
- **Node.js**: 18.0.0 or higher
- **Chrome**: Version 90 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **CPU**: Dual-core minimum

### **Optimization Tips**
1. **Close unnecessary browser tabs**: Reduces memory usage
2. **Regular component restarts**: Prevents memory leaks
3. **Monitor system resources**: Use task manager to check usage
4. **Update regularly**: Keep all components current

### **Performance Monitoring**
- Use `runPerformanceAudit` to identify bottlenecks
- Monitor network requests with `getNetworkLogs`
- Check console for errors with `getConsoleLogs`

This complete user guide provides everything you need to successfully install, configure, and use WebAI-MCP for enhanced AI-browser interactions.
