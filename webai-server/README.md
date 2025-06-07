# @cpjet64/webai-server

WebAI server for capturing and managing browser events, logs, and screenshots

[![npm version](https://badge.fury.io/js/@cpjet64%2Fwebai-server.svg)](https://www.npmjs.com/package/@cpjet64/webai-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start

### Installation & Launch

```bash
# Run directly with npx (recommended)
npx @cpjet64/webai-server

# Or install globally
npm install -g @cpjet64/webai-server
webai-server
```

The server will start on `http://localhost:3025` by default.

### Verify Installation

```bash
# Check server status
curl http://localhost:3025/.identity

# Expected response:
# {"signature": "mcp-browser-connector-24x7", "version": "1.5.1-dev.3"}
```

## 🛠️ Features

- **🌐 Browser Event Capture** - Real-time browser data collection
- **📸 Screenshot Management** - High-quality image capture and processing
- **📊 Network Monitoring** - HTTP request/response logging and analysis
- **🍪 Storage Management** - Cookie, localStorage, and sessionStorage access
- **🔍 Element Inspection** - DOM element analysis with computed styles
- **🧪 Lighthouse Integration** - Performance, accessibility, and SEO audits
- **🌐 Proxy Support** - HTTP/HTTPS and SOCKS proxy configuration
- **🛡️ Enhanced Error Handling** - Intelligent error recovery and reporting

## ⚙️ Configuration

### Environment Variables

```bash
# Server configuration
PORT=3025                    # Server port (default: 3025)
HOST=localhost              # Server host (default: localhost)

# Network configuration
NETWORK_TIMEOUT=30000       # Request timeout in ms
NETWORK_RETRIES=3           # Number of retry attempts
USER_AGENT=WebAI-MCP/1.5.1-dev.3  # Custom user agent

# Proxy configuration (optional)
PROXY_HOST=proxy.example.com
PROXY_PORT=8080
PROXY_PROTOCOL=http         # http, https, socks4, socks5
PROXY_USERNAME=user         # Optional proxy auth
PROXY_PASSWORD=pass         # Optional proxy auth
```

### Command Line Options

```bash
# Start with custom port
webai-server --port 8080

# Start with custom host
webai-server --host 0.0.0.0

# Enable debug mode
webai-server --debug

# Show help
webai-server --help
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/.identity` | GET | Server identity and version |
| `/screenshot` | POST | Capture browser screenshot |
| `/console-logs` | GET | Retrieve console logs |
| `/network-logs` | GET | Get network request logs |
| `/cookies` | GET | Access browser cookies |
| `/storage/local` | GET | Get localStorage data |
| `/storage/session` | GET | Get sessionStorage data |
| `/audit/accessibility` | POST | Run accessibility audit |
| `/audit/performance` | POST | Run performance audit |
| `/audit/seo` | POST | Run SEO audit |

## 🔧 Requirements

- **Node.js**: 18+
- **Browser**: Chrome/Chromium with WebAI Chrome Extension
- **Operating System**: Windows, macOS, or Linux

## 📦 Complete WebAI-MCP Setup

1. **Install MCP Server**:
   ```bash
   npx @cpjet64/webai-mcp
   ```

2. **Install WebAI Server** (this package):
   ```bash
   npx @cpjet64/webai-server
   ```

3. **Install Chrome Extension**:
   - Download from [WebAI-MCP Releases](https://github.com/cpjet64/WebAI-MCP/releases)
   - Load unpacked in Chrome Developer Mode

4. **Configure MCP Client**:
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

## 🌐 Network & Proxy Support

### Automatic Proxy Detection
The server automatically detects system proxy settings.

### Manual Proxy Configuration
```javascript
// Programmatic configuration
const { ProxyManager } = require('@cpjet64/webai-server');

const proxyManager = new ProxyManager({
  proxy: {
    enabled: true,
    protocol: 'http',
    host: 'proxy.example.com',
    port: 8080,
    username: 'user',
    password: 'pass'
  }
});
```

## 🧪 Testing & Diagnostics

```bash
# Run system diagnostics
npx @cpjet64/webai-server --diagnose

# Test server connectivity
curl -f http://localhost:3025/.identity || echo "Server not running"

# Check Chrome extension connection
curl http://localhost:3025/extension-status
```

## 📚 Documentation

- **Main Repository**: [WebAI-MCP](https://github.com/cpjet64/WebAI-MCP)
- **Issues**: [Report bugs](https://github.com/cpjet64/WebAI-MCP/issues)
- **API Documentation**: [Server API Guide](https://github.com/cpjet64/WebAI-MCP#api-reference)

## 🔗 Related Packages

- **[@cpjet64/webai-mcp](https://www.npmjs.com/package/@cpjet64/webai-mcp)** - MCP server for AI clients
- **[WebAI Chrome Extension](https://github.com/cpjet64/WebAI-MCP/releases)** - Browser integration

## 📄 License

MIT License - see [LICENSE](https://github.com/cpjet64/WebAI-MCP/blob/main/LICENSE) for details.

---

**Made with ❤️ by cpjet64** | **v1.5.1-dev.3** | **Independent Project**
