# WebAI-MCP Version Check Tools

WebAI-MCP provides comprehensive version checking tools that agents can use via MCP protocol to check all component versions, compatibility, and update availability.

## 🔧 Available MCP Tools

### 1. `getVersions` - Quick Version Check

**Description**: Get current versions of all WebAI-MCP components (quick check)

**Usage**: 
```
"What versions of WebAI-MCP components are currently installed?"
"Show me the current versions"
"Check component versions"
```

**Output**:
```
📋 WebAI-MCP Component Versions
===============================

• MCP Server: 1.4.3-dev.5 ✅
• WebAI Server: 1.4.3-dev.3 ✅
• Chrome Extension: 1.4.3 ✅

🖥️  System: win32 (x64)
📦 Node.js: v20.11.0 | NPM: 10.2.4
```

---

### 2. `getVersionInfo` - Comprehensive Version Information

**Description**: Get comprehensive version information including update availability

**Usage**:
```
"Check for updates to WebAI-MCP"
"Are there newer versions available?"
"Show me detailed version information"
```

**Output**:
```
📋 WebAI-MCP Version Information
=================================

📦 Current Versions:
  • MCP Server: 1.4.3-dev.5 ✅
  • WebAI Server: 1.4.3-dev.3 ✅
  • Chrome Extension: 1.4.3 ✅

🌐 Latest Available:
  • MCP Server: 1.4.2
  • WebAI Server: 1.4.2

🔄 Updates Available:
  • npm update -g @cpjet64/webai-mcp@latest
  • npm update -g @cpjet64/webai-server@latest

=================================
```

---

### 3. `checkVersionCompatibility` - Compatibility Check

**Description**: Check version compatibility between all components with detailed analysis

**Usage**:
```
"Check if my WebAI-MCP components are compatible"
"Run version compatibility check"
"Diagnose version issues"
```

**Output**:
```
🔍 WebAI-MCP Version Compatibility Check
==========================================

📦 Component Versions:
  • MCP Server: 1.4.3-dev.5 ✅
  • WebAI Server: 1.4.3-dev.3 ✅
  • Chrome Extension: 1.4.3 ✅

🖥️  System Information:
  • Node.js: v20.11.0
  • NPM: 10.2.4
  • Platform: win32 (x64)
  • Timestamp: 2024-01-15T10:30:00.000Z

⚠️  Warnings:
  • Development versions detected - may have compatibility issues

💡 Recommendations:
  • Consider updating to the latest compatible versions

🎯 Overall Compatibility: ✅ Compatible
==========================================
```

## 🎯 Use Cases

### For Developers
- **Quick Status Check**: Use `getVersions` to quickly see what's installed
- **Update Management**: Use `getVersionInfo` to check for updates
- **Troubleshooting**: Use `checkVersionCompatibility` to diagnose issues

### For Support
- **System Information**: Get complete system details for support tickets
- **Compatibility Issues**: Identify version mismatches causing problems
- **Update Guidance**: Provide specific update commands to users

### For Automation
- **CI/CD Pipelines**: Verify component versions in automated workflows
- **Health Checks**: Monitor version compatibility in production
- **Update Notifications**: Alert when updates are available

## 🔍 What Each Tool Checks

### Component Detection
- **MCP Server**: Checks `@cpjet64/webai-mcp` package.json
- **WebAI Server**: Checks `@cpjet64/webai-server` package.json  
- **Chrome Extension**: Checks extension manifest.json

### System Information
- **Node.js Version**: Current Node.js runtime version
- **NPM Version**: NPM package manager version
- **Platform**: Operating system and architecture
- **Timestamp**: When the check was performed

### Compatibility Analysis
- **Major Version Matching**: Ensures components have compatible major versions
- **Development Version Detection**: Warns about dev/beta versions
- **Missing Components**: Identifies components that couldn't be found
- **Update Recommendations**: Suggests specific update commands

## 🚀 Example Agent Interactions

### Quick Check
```
User: "What version of WebAI-MCP am I running?"
Agent: Uses getVersions tool
Result: Shows current versions of all components
```

### Update Check
```
User: "Are there any updates available for WebAI-MCP?"
Agent: Uses getVersionInfo tool
Result: Shows current vs latest versions and update commands
```

### Troubleshooting
```
User: "WebAI-MCP isn't working properly"
Agent: Uses checkVersionCompatibility tool
Result: Identifies version mismatches and provides recommendations
```

### System Diagnostics
```
User: "Run a complete system check"
Agent: Uses checkVersionCompatibility tool
Result: Complete system information and compatibility analysis
```

## 🔧 Technical Details

### Version Detection Logic
1. **Search Multiple Paths**: Checks common installation locations
2. **Package Validation**: Verifies package names match expected patterns
3. **Fallback Handling**: Gracefully handles missing or invalid packages
4. **Legacy Support**: Maintains compatibility with old package names

### Update Detection
1. **NPM Registry Check**: Queries NPM for latest published versions
2. **Version Comparison**: Compares current vs available versions
3. **Command Generation**: Provides specific update commands
4. **Error Handling**: Handles network issues and package availability

### Compatibility Rules
1. **Major Version Matching**: Components should have same major version
2. **Development Version Warnings**: Alerts about potential instability
3. **Missing Component Detection**: Identifies incomplete installations
4. **Recommendation Engine**: Provides actionable next steps

## 💡 Best Practices

### For Users
- Run `getVersions` regularly to stay informed
- Use `checkVersionCompatibility` when experiencing issues
- Follow update commands from `getVersionInfo` exactly

### For Developers
- Include version checks in troubleshooting workflows
- Use compatibility checks before major updates
- Monitor system information for environment-specific issues

### For Support Teams
- Always start with `checkVersionCompatibility` for issue reports
- Use system information to understand user environments
- Provide specific update commands rather than generic instructions

These tools provide comprehensive version management capabilities that help ensure WebAI-MCP components work together properly and stay up to date.
