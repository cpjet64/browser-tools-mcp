# @cpjet64/webai-mcp

**MCP (Model Context Protocol) server for WebAI browser integration**

[![npm version](https://badge.fury.io/js/@cpjet64%2Fwebai-mcp.svg)](https://www.npmjs.com/package/@cpjet64/webai-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start

### Installation

```bash
# Run directly with npx (recommended)
npx @cpjet64/webai-mcp

# Or install globally
npm install -g @cpjet64/webai-mcp
webai-mcp
```

### MCP Client Configuration

Add to your MCP client configuration:

#### **Cursor / Claude Desktop**
```json
{
  "mcpServers": {
    "webai-mcp": {
      "command": "npx",
      "args": ["@cpjet64/webai-mcp"]
    }
  }
}
```

#### **Cline (VS Code)**
```json
{
  "mcpServers": {
    "webai-mcp": {
      "command": "npx",
      "args": ["@cpjet64/webai-mcp"]
    }
  }
}
```

## 🛠️ Features

- **📸 Screenshot Capture** - High-quality screenshots with auto-paste to IDEs
- **🔍 Element Inspection** - CSS selector-based inspection with computed styles  
- **📊 Console & Network Monitoring** - Real-time browser logs and network requests
- **🍪 Storage Access** - Cookies, localStorage, and sessionStorage data
- **🧪 Comprehensive Audits** - Accessibility, performance, SEO, and best practices
- **🔧 Automated Diagnostics** - System validation and setup workflows
- **🛡️ Enhanced Error Handling** - Intelligent error recovery and reporting

## 📋 Available MCP Tools

| Tool | Description |
|------|-------------|
| `takeScreenshot` | Capture high-quality screenshots |
| `getConsoleLogs` | Retrieve browser console logs |
| `getNetworkLogs` | Get network request/response data |
| `inspectElement` | Inspect elements with CSS selectors |
| `getCookies` | Access browser cookies |
| `getLocalStorage` | Retrieve localStorage data |
| `getSessionStorage` | Access sessionStorage data |
| `runAccessibilityAudit` | WCAG compliance checking |
| `runPerformanceAudit` | Page speed analysis |
| `runSEOAudit` | SEO optimization analysis |
| `runBestPracticesAudit` | Web development best practices |
| `runAuditMode` | Run all audits in sequence |
| `runDebuggerMode` | Comprehensive debugging tools |

## 🔧 Requirements

- **Node.js**: 18+ 
- **Browser**: Chrome/Chromium with WebAI Chrome Extension
- **MCP Client**: Cursor, Claude Desktop, Cline, or Zed

## 📦 Complete Setup

1. **Install WebAI Server**:
   ```bash
   npx @cpjet64/webai-server
   ```

2. **Install Chrome Extension**:
   - Download from [WebAI-MCP Releases](https://github.com/cpjet64/WebAI-MCP/releases)
   - Load unpacked in Chrome Developer Mode

3. **Configure MCP Client** (see configuration above)

## 🌐 Cross-Platform Support

- **Windows**: Full support with PowerShell automation
- **macOS**: AppleScript integration with fallbacks  
- **Linux**: xdotool automation (requires `xclip` and `xdotool`)

## 📚 Documentation

- **Main Repository**: [WebAI-MCP](https://github.com/cpjet64/WebAI-MCP)
- **Issues**: [Report bugs](https://github.com/cpjet64/WebAI-MCP/issues)
- **Discussions**: [Community](https://github.com/cpjet64/WebAI-MCP/discussions)

## 🔗 Related Packages

- **[@cpjet64/webai-server](https://www.npmjs.com/package/@cpjet64/webai-server)** - WebAI browser connector server
- **[WebAI Chrome Extension](https://github.com/cpjet64/WebAI-MCP/releases)** - Browser integration

## 📄 License

MIT License - see [LICENSE](https://github.com/cpjet64/WebAI-MCP/blob/main/LICENSE) for details.

---

**Made with ❤️ by cpjet64** | **v1.4.1** | **Independent Project**
