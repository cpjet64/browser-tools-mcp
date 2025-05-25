# BrowserTools MCP - Enhanced Fork by cpjet64

> Make your AI tools 10x more aware and capable of interacting with your browser

[![Latest Release](https://img.shields.io/github/v/release/cpjet64/browser-tools-mcp?style=flat-square)](https://github.com/cpjet64/browser-tools-mcp/releases)
[![NPM MCP Server](https://img.shields.io/npm/v/@cpjet64/browser-tools-mcp?style=flat-square&label=MCP%20Server)](https://www.npmjs.com/package/@cpjet64/browser-tools-mcp)
[![NPM Browser Server](https://img.shields.io/npm/v/@cpjet64/browser-tools-server?style=flat-square&label=Browser%20Server)](https://www.npmjs.com/package/@cpjet64/browser-tools-server)

English | [简体中文](./docs/i18n/README_CN.md)

This is an **enhanced fork** of the original BrowserTools MCP with significant improvements and new features. It's a powerful browser monitoring and interaction tool that enables AI-powered applications via Anthropic's Model Context Protocol (MCP) to capture and analyze browser data through a Chrome extension.

## 🚀 What's New in This Fork (v1.4.0)

This fork includes **ALL community contributions** and major enhancements with **complete feature integration**:

### ✨ **New Integrated Features**
- 🍪 **Storage Access Tools** - Access cookies, localStorage, and sessionStorage
- 🔍 **Advanced Element Inspection** - CSS selector-based element inspection with computed styles
- 📸 **Enhanced Screenshots** - Fixed screenshot capture with separate DevTools windows
- 🧪 **Audit & Debug Modes** - Comprehensive analysis tools via Lighthouse
- 🪟 **Windows Compatibility** - Full Windows support with path conversion
- 🌍 **Multi-language Documentation** - Chinese translation support
- 🤖 **Automated Releases** - Professional release automation with NPM publishing
- 🔧 **Automated Diagnostics** - Complete diagnostic and setup workflows
- 🛡️ **Enhanced Error Handling** - Robust error management and recovery
- 🌐 **Proxy Support** - Full network configuration and proxy management
- 🖥️ **Platform Enhancements** - Cross-platform compatibility and optimization

### 🔧 **Technical Improvements**
- ⚡ **Latest Dependencies** - Express 5.x, body-parser 2.x, node-fetch 3.x
- 🐛 **Bug Fixes** - stringSizeLimit and other critical fixes applied
- 🧪 **Cross-platform Testing** - Automated testing on Windows, macOS, Linux
- 📦 **Professional Packaging** - Automated Chrome extension and NPM package releases
- 🔄 **Complete Integration** - All feature branches merged into unified main branch
- 🎯 **Production Ready** - Comprehensive testing and validation infrastructure

## 🚀 Quick Installation

### **Method 1: NPM (Recommended)**

```bash
# 1. Install MCP Server (for your IDE)
npx @cpjet64/browser-tools-mcp@latest

# 2. Install Browser Tools Server (run in separate terminal)
npx @cpjet64/browser-tools-server@latest
```

### **Method 2: Download from Releases**

1. **Chrome Extension**: Download from [Latest Release](https://github.com/cpjet64/browser-tools-mcp/releases/latest)
2. **MCP Server**: `npx @cpjet64/browser-tools-mcp@latest`
3. **Browser Server**: `npx @cpjet64/browser-tools-server@latest`

### **📋 Setup Steps**

1. **Install Chrome Extension**:
   - Download the `.zip` file from releases
   - Extract and load in Chrome → Extensions → Developer mode → Load unpacked

2. **Configure Your IDE**:
   - Add `npx @cpjet64/browser-tools-mcp@latest` to your MCP client configuration
   - Different IDEs have different configs - check your IDE's MCP documentation

3. **Start Browser Server**:
   - Open a new terminal and run: `npx @cpjet64/browser-tools-server@latest`

4. **Open DevTools**:
   - Open Chrome DevTools → BrowserToolsMCP panel
   - Ensure connection is established

### **💡 Important Notes**

**Two Servers Required**:
- **`@cpjet64/browser-tools-mcp`** → MCP server for your IDE
- **`@cpjet64/browser-tools-server`** → Local middleware server

**Troubleshooting**:
- Close ALL Chrome windows and restart if having issues
- Restart the browser-tools-server
- Ensure only ONE DevTools panel is open

After those three steps, open up your chrome dev tools and then the BrowserToolsMCP panel.

If you're still having issues try these steps:
- Quit / close down your browser. Not just the window but all of Chrome itself.
- Restart the local node server (browser-tools-server)
- Make sure you only have ONE instance of chrome dev tools panel open

After that, it should work but if it doesn't let me know and I can share some more steps to gather logs/info about the issue!

## 🛠️ Complete Feature Set

This enhanced fork provides **20+ MCP tools** for comprehensive browser automation with **integrated advanced features**:

### **📊 Browser Monitoring**
- **Console Logs** - Capture and analyze browser console output
- **Network Requests** - Monitor XHR/fetch requests and responses
- **Screenshots** - Take high-quality screenshots (works with separate DevTools)
- **Selected Elements** - Inspect currently selected DOM elements

### **🍪 Storage Access** *(Enhanced)*
- **Cookies** - Read and analyze browser cookies
- **localStorage** - Access localStorage data
- **sessionStorage** - Access sessionStorage data

### **🔍 Advanced Element Inspection** *(Enhanced)*
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

### **🔧 Automated Diagnostics** *(New Integrated)*
- **System Diagnostics** - Comprehensive system and environment validation
- **Automated Setup** - Intelligent setup and configuration workflows
- **Installation Validation** - Verify installation integrity and dependencies
- **Platform Detection** - Cross-platform compatibility checking

### **🌐 Network & Proxy Management** *(New Integrated)*
- **Proxy Configuration** - Complete proxy setup and management
- **Network Diagnostics** - Network connectivity and performance testing
- **Proxy Auto-detection** - Automatic system proxy discovery
- **Network Recommendations** - Environment-specific network optimization

### **🛡️ Enhanced Error Handling** *(New Integrated)*
- **Intelligent Error Recovery** - Automatic error detection and recovery
- **Detailed Error Reporting** - Comprehensive error context and solutions
- **Graceful Degradation** - Fallback mechanisms for failed operations

### **🖥️ Platform-Specific Features** *(New Integrated)*
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

These tools can call out to external APIs but in our case, **all logs are stored locally** on your machine and NEVER sent out to any third-party service or API. BrowserTools MCP runs a local instance of a NodeJS API server which communicates with the BrowserTools Chrome Extension.

All consumers of the BrowserTools MCP Server interface with the same NodeJS API and Chrome extension.

#### Chrome Extension

- Monitors XHR requests/responses and console logs
- Tracks selected DOM elements
- Sends all logs and current element to the BrowserTools Connector
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

### **Network & Proxy Management** *(New)*
- *"Configure proxy settings"*
- *"Test network connectivity"*
- *"Auto-detect system proxy"*
- *"Optimize network settings for this environment"*

### **Automated Diagnostics** *(New)*
- *"Run system diagnostics"*
- *"Validate installation"*
- *"Check platform compatibility"*
- *"Setup automated configuration"*

## 🔧 Compatibility

### **MCP Clients**
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

## 🤝 Contributing

This is an independent fork focused on stability and feature completeness.

### **🐛 Issues & Feature Requests**
- Open an issue for bugs or feature requests
- Check existing issues before creating new ones

### **🔄 Updates**
- This fork maintains independence from the original repository
- All valuable community contributions are integrated
- Automated testing ensures stability across platforms

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Original Project**: [AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp)
- **Community Contributors**: All PR authors whose work is integrated in this fork
- **MCP Protocol**: [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/)

---

**Made with ❤️ by cpjet64** | **Enhanced Fork** | **v1.4.0** | **Fully Integrated**
