# WebAI-MCP

> Make your AI tools 10x more aware and capable of interacting with your browser
<!-- Trigger workflow: 2025-05-27 -->

[![Latest Release](https://img.shields.io/github/v/release/cpjet64/webai-mcp?style=flat-square)](https://github.com/cpjet64/webai-mcp/releases)
[![NPM MCP Server](https://img.shields.io/npm/v/@cpjet64/webai-mcp?style=flat-square&label=MCP%20Server)](https://www.npmjs.com/package/@cpjet64/webai-mcp)
[![NPM WebAI Server](https://img.shields.io/npm/v/@cpjet64/webai-server?style=flat-square&label=WebAI%20Server)](https://www.npmjs.com/package/@cpjet64/webai-server)

English | [简体中文](./docs/i18n/README_CN.md)

WebAI-MCP is a comprehensive browser automation and monitoring solution that enables AI applications to capture and analyze browser data through a Chrome extension. It provides 20+ tools for screenshots, console logs, network monitoring, storage access, audits, and cross-platform auto-paste functionality.

## ✨ Key Features

- 📸 **Screenshot Capture** - High-quality screenshots with auto-paste to any IDE
- 🔍 **Element Inspection** - CSS selector-based inspection with computed styles
- 📊 **Console & Network Monitoring** - Real-time browser logs and network requests
- 🍪 **Storage Access** - Cookies, localStorage, and sessionStorage data
- 🧪 **Comprehensive Audits** - Accessibility, performance, SEO, and best practices
- 🎯 **Cross-Platform Auto-Paste** - Windows, macOS, Linux support for all IDEs
- 🌐 **Network & Proxy Management** - Complete network configuration tools
- 🔧 **Automated Diagnostics** - System validation and setup workflows
- 🛡️ **Enhanced Error Handling** - Robust error recovery and reporting

## 🚀 Installation Methods

Choose the installation method that best fits your workflow:

### **Method 1: Temporary Download & Run (Recommended for Testing)**

Always gets the latest version, no permanent installation:

```bash
# 1. Start WebAI Server (run in separate terminal)
npx @cpjet64/webai-server@latest

# 2. MCP Server will be auto-started by your IDE when configured
# Configure your IDE with: npx @cpjet64/webai-mcp@latest
```

### **Method 2: Global Installation (Recommended for Regular Use)**

Install once, run anytime:

```bash
# 1. Install globally
npm install -g @cpjet64/webai-mcp@latest
npm install -g @cpjet64/webai-server@latest

# 2. Run anytime with simple commands
webai-server
# MCP server runs automatically when your IDE calls it
```

### **Method 3: Local Project Installation**

Install in your current project directory:

```bash
# 1. Install to current project
npm install @cpjet64/webai-mcp@latest
npm install @cpjet64/webai-server@latest

# 2. Run with npx
npx webai-server
# Configure IDE with: npx @cpjet64/webai-mcp
```

### **Method 4: Download from Releases**

1. **Chrome Extension**: Download from [Latest Release](https://github.com/cpjet64/webai-mcp/releases/latest)
2. **Servers**: Use any of the above NPM methods

### **📋 Setup Steps**

1. **Install Chrome Extension**:
   - Download the `.zip` file from releases
   - Extract and load in Chrome → Extensions → Developer mode → Load unpacked

2. **Configure Your MCP Client**:

   **For Augment:**
   1. Open Augment settings
   2. Go to MCP Servers configuration
   3. Add new server:
      - **Name**: `webai`
      - **Command**: `npx -y @cpjet64/webai-mcp@latest`
   4. Save configuration

   **For Cursor IDE:**
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

   **For Claude Desktop:**
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

   **For Cline/Zed/Other MCP Clients:**
   - Command: `npx @cpjet64/webai-mcp@latest`
   - Check your client's documentation for specific configuration format

3. **Start WebAI Server**:
   - Open a new terminal and run: `npx @cpjet64/webai-server@latest`

4. **Open DevTools**:
   - Open Chrome DevTools → BrowserToolsMCP panel
   - Ensure connection is established

5. **Test the Setup**:
   - Basic test: *"Take a screenshot"*
   - Advanced test: *"Run an accessibility audit"*
   - System test: *"Run system diagnostics"*
   - Network test: *"Configure proxy settings"*

## 🧪 Development Version

Want to try the latest features before they're released?

### **Temporary Download & Run (Dev)**
```bash
# Always gets latest dev version
npx @cpjet64/webai-server@dev
# Configure IDE with: npx @cpjet64/webai-mcp@dev
```

### **Global Installation (Dev)**
```bash
# Install dev versions globally
npm install -g @cpjet64/webai-mcp@dev
npm install -g @cpjet64/webai-server@dev

# Update dev versions
npm update -g @cpjet64/webai-mcp@dev
npm update -g @cpjet64/webai-server@dev
```

### **Local Installation (Dev)**
```bash
# Install dev versions locally
npm install @cpjet64/webai-mcp@dev
npm install @cpjet64/webai-server@dev
```

**Note**: Development versions include the latest features but may be unstable. Use `@latest` for production.

### **💡 Important Notes**

**Two Servers Required**:
- **`@cpjet64/webai-mcp`** → MCP server for your IDE
- **`@cpjet64/webai-server`** → Local middleware server

**Troubleshooting**:
- Close ALL Chrome windows and restart if having issues
- Restart the webai-server
- Ensure only ONE DevTools panel is open

After those three steps, open up your chrome dev tools and then the WebAI-MCP panel.

If you're still having issues try these steps:
- Quit / close down your browser. Not just the window but all of Chrome itself.
- Restart the local node server (webai-server)
- Make sure you only have ONE instance of chrome dev tools panel open

After that, it should work but if it doesn't let me know and I can share some more steps to gather logs/info about the issue!

## 🛠️ Complete Feature Set

WebAI-MCP provides **20+ MCP tools** for comprehensive browser automation:

### **📊 Browser Monitoring**
- **Console Logs** - Capture and analyze browser console output
- **Network Requests** - Monitor XHR/fetch requests and responses
- **Screenshots** - Take high-quality screenshots with auto-paste
- **Selected Elements** - Inspect currently selected DOM elements

### **🍪 Storage Access**
- **Cookies** - Read and analyze browser cookies
- **localStorage** - Access localStorage data
- **sessionStorage** - Access sessionStorage data

### **🔍 Advanced Element Inspection**
- **CSS Selector Inspection** - Inspect elements using CSS selectors
- **Computed Styles** - Get computed CSS styles for elements
- **Chrome Debugging API** - Deep element analysis

### **🧪 Audit & Analysis Tools**
- **Accessibility Audit** - WCAG compliance checking
- **Performance Audit** - Page speed and optimization analysis
- **SEO Audit** - Search engine optimization analysis
- **Best Practices Audit** - Web development best practices
- **NextJS Audit** - NextJS-specific optimization checks
- **Audit Mode** - Run all audits in sequence
- **Debugger Mode** - Run all debugging tools in sequence

### **🔧 Automated Diagnostics**
- **System Diagnostics** - Comprehensive system and environment validation
- **Automated Setup** - Intelligent setup and configuration workflows
- **Installation Validation** - Verify installation integrity and dependencies
- **Platform Detection** - Cross-platform compatibility checking

### **🌐 Network & Proxy Management**
- **Proxy Configuration** - Complete proxy setup and management
- **Network Diagnostics** - Network connectivity and performance testing
- **Proxy Auto-detection** - Automatic system proxy discovery
- **Network Recommendations** - Environment-specific network optimization

### **🛡️ Enhanced Error Handling**
- **Intelligent Error Recovery** - Automatic error detection and recovery
- **Detailed Error Reporting** - Comprehensive error context and solutions
- **Graceful Degradation** - Fallback mechanisms for failed operations

### **🎯 Cross-Platform Auto-Paste**
- **Windows Auto-paste** - PowerShell-based automation for all IDEs
- **macOS Auto-paste** - AppleScript automation with element detection
- **Linux Auto-paste** - xdotool automation for window management
- **Multi-IDE Support** - Cursor, VS Code, Zed, Claude Desktop, Custom apps
- **Configurable Target** - User-selectable IDE from extension panel

### **🖥️ Platform-Specific Features**
- **Windows Optimization** - Windows-specific path handling and features
- **macOS Integration** - Native macOS compatibility and optimization
- **Linux Support** - Full Linux distribution compatibility
- **Cross-platform Validation** - Unified experience across all platforms

### **🧹 Utility Tools**
- **Wipe Logs** - Clear stored logs and data
- **Process Management** - Intelligent process monitoring and cleanup
- **Configuration Management** - Centralized settings and preferences

---

## 🔑 Key Additions

| Audit Type         | Description                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Accessibility**  | WCAG-compliant checks for color contrast, missing alt text, keyboard navigation traps, ARIA attributes, and more.                        |
| **Performance**    | Lighthouse-driven analysis of render-blocking resources, excessive DOM size, unoptimized images, and other factors affecting page speed. |
| **SEO**            | Evaluates on-page SEO factors (like metadata, headings, and link structure) and suggests improvements for better search visibility.      |
| **Best Practices** | Checks for general best practices in web development.                                                                                    |
| **NextJS Audit**   | Injects a prompt used to perform a NextJS audit.                                                                                         |
| **Audit Mode**     | Runs all auditing tools in a sequence.                                                                                                   |
| **Debugger Mode**  | Runs all debugging tools in a sequence.                                                                                                  |

---

## 🛠️ Using Audit Tools

### ✅ **Before You Start**

Ensure you have:

- An **active tab** in your browser
- The **BrowserTools extension enabled**

### ▶️ **Running Audits**

**Headless Browser Automation**:
 Puppeteer automates a headless Chrome instance to load the page and collect audit data, ensuring accurate results even for SPAs or content loaded via JavaScript.

The headless browser instance remains active for **60 seconds** after the last audit call to efficiently handle consecutive audit requests.

**Structured Results**:
 Each audit returns results in a structured JSON format, including overall scores and detailed issue lists. This makes it easy for MCP-compatible clients to interpret the findings and present actionable insights.

The MCP server provides tools to run audits on the current page. Here are example queries you can use to trigger them:

#### Accessibility Audit (`runAccessibilityAudit`)

Ensures the page meets accessibility standards like WCAG.

> **Example Queries:**
>
> - "Are there any accessibility issues on this page?"
> - "Run an accessibility audit."
> - "Check if this page meets WCAG standards."

#### Performance Audit (`runPerformanceAudit`)

Identifies performance bottlenecks and loading issues.

> **Example Queries:**
>
> - "Why is this page loading so slowly?"
> - "Check the performance of this page."
> - "Run a performance audit."

#### SEO Audit (`runSEOAudit`)

Evaluates how well the page is optimized for search engines.

> **Example Queries:**
>
> - "How can I improve SEO for this page?"
> - "Run an SEO audit."
> - "Check SEO on this page."

#### Best Practices Audit (`runBestPracticesAudit`)

Checks for general best practices in web development.

> **Example Queries:**
>
> - "Run a best practices audit."
> - "Check best practices on this page."
> - "Are there any best practices issues on this page?"

#### Audit Mode (`runAuditMode`)

Runs all audits in a particular sequence. Will run a NextJS audit if the framework is detected.

> **Example Queries:**
>
> - "Run audit mode."
> - "Enter audit mode."

#### NextJS Audits (`runNextJSAudit`)

Checks for best practices and SEO improvements for NextJS applications

> **Example Queries:**
>
> - "Run a NextJS audit."
> - "Run a NextJS audit, I'm using app router."
> - "Run a NextJS audit, I'm using page router."

#### Debugger Mode (`runDebuggerMode`)

Runs all debugging tools in a particular sequence

> **Example Queries:**
>
> - "Enter debugger mode."

## Architecture

There are three core components all used to capture and analyze browser data:

1. **Chrome Extension**: A browser extension that captures screenshots, console logs, network activity, DOM elements, and browser storage (cookies, localStorage, sessionStorage).
2. **Node Server**: An intermediary server that facilitates communication between the Chrome extension and any instance of an MCP server.
3. **MCP Server**: A Model Context Protocol server that provides standardized tools for AI clients to interact with the browser.

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌─────────────┐
│  MCP Client │ ──► │  MCP Server  │ ──► │  Node Server  │ ──► │   Chrome    │
│  (e.g.      │ ◄── │  (Protocol   │ ◄── │ (Middleware)  │ ◄── │  Extension  │
│   Cursor)   │     │   Handler)   │     │               │     │             │
└─────────────┘     └──────────────┘     └───────────────┘     └─────────────┘
```

Model Context Protocol (MCP) is a capability supported by Anthropic AI models that
allow you to create custom tools for any compatible client. MCP clients like Claude
Desktop, Cursor, Cline or Zed can run an MCP server which "teaches" these clients
about a new tool that they can use.

These tools can call out to external APIs but in our case, **all logs are stored locally** on your machine and NEVER sent out to any third-party service or API. WebAI-MCP runs a local instance of a NodeJS API server which communicates with the WebAI-MCP Chrome Extension.

All consumers of the WebAI-MCP Server interface with the same NodeJS API and Chrome extension.

#### Chrome Extension

- Monitors XHR requests/responses and console logs
- Tracks selected DOM elements
- Sends all logs and current element to the WebAI Connector
- Connects to Websocket server to capture/send screenshots
- Retrieves cookies, localStorage, and sessionStorage data
- Allows user to configure token/truncation limits + screenshot folder path

#### Node Server

- Acts as middleware between the Chrome extension and MCP server
- Receives logs and currently selected element from Chrome extension
- Processes requests from MCP server to capture logs, screenshot or current element
- Retrieves browser storage data (cookies, localStorage, sessionStorage)
- Sends Websocket command to the Chrome extension for capturing a screenshot
- Intelligently truncates strings and # of duplicate objects in logs to avoid token limits
- Removes cookies and sensitive headers to avoid sending to LLMs in MCP clients

#### MCP Server

- Implements the Model Context Protocol
- Provides standardized tools for AI clients
- Compatible with various MCP clients (Cursor, Cline, Zed, Claude Desktop, etc.)

## 🎯 Usage Examples

Once installed, you can use natural language commands with your MCP client:

### **Storage Access**
- *"What cookies are set on this page?"*
- *"Show me the localStorage data"*
- *"What's in sessionStorage?"*

### **Element Inspection**
- *"Inspect all buttons on this page"*
- *"Get the computed styles for .header elements"*
- *"Find all elements with class 'nav-item'"*

### **Audits & Analysis**
- *"Run an accessibility audit"*
- *"Check the performance of this page"*
- *"Analyze SEO issues"*
- *"Enter audit mode"*

### **Debugging**
- *"Take a screenshot"*
- *"Show me console errors"*
- *"What network requests were made?"*
- *"Enter debugger mode"*

### **Network & Proxy Management**
- *"Configure proxy settings"*
- *"Test network connectivity"*
- *"Auto-detect system proxy"*
- *"Optimize network settings for this environment"*

### **Automated Diagnostics**
- *"Run system diagnostics"*
- *"Validate installation"*
- *"Check platform compatibility"*
- *"Setup automated configuration"*

### **Cross-Platform Auto-Paste**
- *"Take a screenshot and paste it to VS Code"* (configure target IDE in extension)
- *"Screenshot this page"* (auto-pastes to configured IDE)
- **Windows**: PowerShell automation with process detection
- **macOS**: AppleScript with element detection and fallbacks
- **Linux**: xdotool automation (requires `xclip` and `xdotool`)

## 🔧 Compatibility

### **MCP Clients**
- ✅ **Augment** - Full integration and testing
- ✅ **Cursor IDE** - Primary integration
- ✅ **Claude Desktop** - Full support
- ✅ **Cline** - Compatible
- ✅ **Zed** - Compatible
- ✅ **Any MCP-compatible client**

### **Operating Systems**
- ✅ **Windows** - Full support with path conversion
- ✅ **macOS** - Native support
- ✅ **Linux** - Native support

### **Node.js Versions**
- ✅ **Node.js 18+** - Recommended
- ✅ **Node.js 20** - Fully tested
- ✅ **Node.js 22** - Latest support

### **Browsers**
- ✅ **Chrome** - Primary support
- ✅ **Chromium** - Compatible
- ✅ **Edge** - Compatible (Chromium-based)

## 📚 Documentation

- **Setup Guide**: [Release Setup Documentation](./docs/RELEASE_SETUP.md)
- **Chinese Documentation**: [简体中文文档](./docs/i18n/README_CN.md)
- **Original Docs**: [BrowserTools MCP Docs](https://browsertools.agentdesk.ai/)

## 🔄 Migration from Browser Tools MCP

If you're currently using the original `browser-tools-mcp` or `AgentDeskAI/browser-tools-mcp`, here's how to migrate to WebAI-MCP:

### **📦 Package Migration**

**1. Update MCP Server Package:**
```bash
# Remove old package
npm uninstall @cpjet64/browser-tools-mcp
# OR if using original
npm uninstall @munawwar-forks/browser-tools-mcp

# Install new package
npm install @cpjet64/webai-mcp
```

**2. Update WebAI Server Package:**
```bash
# Remove old package
npm uninstall @cpjet64/browser-tools-server
# OR if using original
npm uninstall @munawwar-forks/browser-tools-server

# Install new package
npm install @cpjet64/webai-server
```

### **⚙️ Configuration Updates**

**Update your MCP client configuration:**

**Before (Original):**
```json
{
  "mcpServers": {
    "browser-tools": {
      "command": "npx",
      "args": ["@munawwar-forks/browser-tools-mcp"]
    }
  }
}
```

**After (WebAI-MCP):**
```json
{
  "mcpServers": {
    "webai": {
      "command": "npx",
      "args": ["@cpjet64/webai-mcp"]
    }
  }
}
```

### **🔧 Chrome Extension**

**Option 1: Download from Releases (Recommended)**
1. Download the latest `.zip` from [Releases](https://github.com/cpjet64/webai-mcp/releases)
2. Remove the old extension from Chrome
3. Load the new extension using "Load unpacked"

**Option 2: Build from Source**
```bash
git clone https://github.com/cpjet64/webai-mcp.git
cd webai-mcp/chrome-extension
# Load the folder in Chrome Extensions → Developer mode → Load unpacked
```

### **✨ New Features Available After Migration**

- 🎯 **Cross-Platform Auto-Paste** - Windows, macOS, Linux support
- 🔧 **Automated Diagnostics** - System validation and setup workflows
- 🌐 **Network & Proxy Management** - Complete network configuration tools
- 🛡️ **Enhanced Error Handling** - Better error recovery and reporting
- 🍪 **Storage Access Tools** - Cookies, localStorage, sessionStorage
- 🧪 **Advanced Audits** - Accessibility, performance, SEO analysis

### **🔍 Verification**

After migration, test that everything works:
```bash
# Start the new WebAI server
npx @cpjet64/webai-server

# Test in your MCP client
"Take a screenshot"
"Run system diagnostics"
"Configure proxy settings"
```

### **💡 Migration Notes**

- **Backward Compatible** - All existing functionality preserved
- **Same API** - No changes to MCP tool interfaces
- **Enhanced Features** - Additional tools and capabilities
- **Better Stability** - Improved error handling and cross-platform support

## 🤝 Contributing

WebAI-MCP is actively maintained and welcomes contributions.

### **🐛 Issues & Feature Requests**
- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Provide detailed reproduction steps and environment information

### **🔄 Development**
- Fork the repository and create feature branches
- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation as needed

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Original Project**: [AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp)
- **Community Contributors**: All contributors who have helped improve this project
- **MCP Protocol**: [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/)

---

**Made with ❤️ by cpjet64** | **Independent Project** | **v1.4.1** | **Fully Integrated**
