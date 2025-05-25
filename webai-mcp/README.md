# WebAI-MCP Server

A Model Context Protocol (MCP) server that provides AI-powered browser integration. This server works in conjunction with the WebAI Server to provide AI capabilities for browser debugging and analysis.

## Features

- MCP protocol implementation
- Get HTML of all matches to a CSS selector (new)
- Browser console log access
- Network request analysis
- Screenshot capture capabilities
- Element selection and inspection
- Browser storage access (cookies, localStorage, sessionStorage)
- Real-time browser state monitoring
- Accessibility, performance, SEO, and best practices audits

## Prerequisites

- Node.js 14 or higher
- WebAI Server running
- Chrome or Chromium browser installed (required for audit functionality)

## Installation

```bash
npx @cpjet64/webai-mcp
```

Or install globally:

```bash
npm install -g @cpjet64/webai-mcp
```

## Usage

1. First, make sure the WebAI Server is running:

```bash
npx @cpjet64/webai-server
```

2. Then start the MCP server:

```bash
npx @cpjet64/webai-mcp
```

3. The MCP server will connect to the WebAI Server and provide the following capabilities:

- Get HTML by selector
- Console log retrieval
- Network request monitoring
- Screenshot capture
- Element selection
- Browser state analysis
- Accessibility and performance audits
- Browser cookies, localStorage, and sessionStorage access

## MCP Functions

The server provides the following MCP functions:

- `mcp_getHtmlBySelector` - Retrieve HTML by CSS selector
- `mcp_getConsoleLogs` - Retrieve browser console logs
- `mcp_getConsoleErrors` - Get browser console errors
- `mcp_getNetworkErrors` - Get network error logs
- `mcp_getNetworkSuccess` - Get successful network requests
- `mcp_getNetworkLogs` - Get all network logs
- `mcp_getSelectedElement` - Get the currently selected DOM element
- `mcp_runAccessibilityAudit` - Run a WCAG-compliant accessibility audit
- `mcp_runPerformanceAudit` - Run a performance audit
- `mcp_runSEOAudit` - Run an SEO audit
- `mcp_runBestPracticesAudit` - Run a best practices audit
- `mcp_getCookies` - Get cookies from the current page
- `mcp_getLocalStorage` - Get localStorage data
- `mcp_getSessionStorage` - Get sessionStorage data

## Integration

This server is designed to work with AI tools and platforms that support the Model Context Protocol (MCP). It provides a standardized interface for AI models to interact with browser state and debugging information.

## License

MIT
