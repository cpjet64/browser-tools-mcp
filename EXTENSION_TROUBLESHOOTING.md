# Chrome Extension Troubleshooting Guide

## 🚨 Common Connection Errors

### **Error: "Failed to fetch" / "Server identity validation failed"**

This error occurs when the Chrome extension cannot connect to the browser-tools-server.

#### **Root Cause:**
The browser-tools-server is not running or not accessible at the expected address.

#### **Solution:**

1. **Start the browser-tools-server:**
   ```bash
   # Make sure you're running the server
   npx @cpjet64/browser-tools-server@latest
   
   # Or for development version
   npx @cpjet64/browser-tools-server@dev
   ```

2. **Verify server is running:**
   - Check terminal output for: `Server running on http://localhost:3025`
   - Open browser to: `http://localhost:3025/.identity`
   - Should show: `{"name":"browser-tools-server","version":"...","signature":"mcp-browser-connector-24x7"}`

3. **Check extension settings:**
   - Open Chrome DevTools → BrowserToolsMCP panel
   - Verify server settings: `localhost:3025` (default)
   - Try clicking "Test Connection" if available

### **Error: "Cannot establish WebSocket" / "Receiving end does not exist"**

This indicates WebSocket connection issues between extension and server.

#### **Solutions:**

1. **Restart the browser-tools-server:**
   ```bash
   # Stop current server (Ctrl+C)
   # Start fresh
   npx @cpjet64/browser-tools-server@latest
   ```

2. **Reload the Chrome extension:**
   - Go to `chrome://extensions/`
   - Find "BrowserTools MCP Fork by cpjet64"
   - Click the reload button (🔄)

3. **Close and reopen DevTools:**
   - Close Chrome DevTools completely
   - Reopen DevTools (F12)
   - Go to BrowserToolsMCP panel

### **Error: "Error wiping logs" / "Cannot send logs"**

The extension cannot communicate with the server for log operations.

#### **Solutions:**

1. **Check server status:**
   ```bash
   # Verify server is responding
   curl http://localhost:3025/.identity
   ```

2. **Restart both server and extension:**
   ```bash
   # Terminal 1: Restart server
   npx @cpjet64/browser-tools-server@latest
   ```
   
   Then reload extension in Chrome.

## 🔧 Step-by-Step Troubleshooting

### **Step 1: Verify Server Installation**

```bash
# Check if packages are installed
npm list -g @cpjet64/browser-tools-server
npm list -g @cpjet64/browser-tools-mcp

# If not installed, install them
npm install -g @cpjet64/browser-tools-server@latest
npm install -g @cpjet64/browser-tools-mcp@latest
```

### **Step 2: Start Server with Verbose Logging**

```bash
# Start server with debug output
DEBUG=* npx @cpjet64/browser-tools-server@latest

# Or just start normally and check output
npx @cpjet64/browser-tools-server@latest
```

**Expected output:**
```
Server running on http://localhost:3025
WebSocket server listening on port 3025
Ready to accept connections...
```

### **Step 3: Test Server Manually**

```bash
# Test identity endpoint
curl http://localhost:3025/.identity

# Expected response:
# {"name":"browser-tools-server","version":"1.4.0","signature":"mcp-browser-connector-24x7"}
```

### **Step 4: Check Chrome Extension**

1. **Go to `chrome://extensions/`**
2. **Enable "Developer mode"** (top right toggle)
3. **Find "BrowserTools MCP Fork by cpjet64"**
4. **Check for errors:**
   - Click "Errors" if there's a red error badge
   - Check console for error messages

### **Step 5: Test Extension Connection**

1. **Open any webpage**
2. **Open Chrome DevTools (F12)**
3. **Go to "BrowserToolsMCP" panel**
4. **Check console for connection messages:**
   - Should see: "WebSocket connected to ws://localhost:3025/extension-ws"
   - Should NOT see: "Server identity validation failed"

## 🛠️ Advanced Troubleshooting

### **Port Conflicts**

If port 3025 is in use:

```bash
# Check what's using port 3025
netstat -an | grep 3025
# or
lsof -i :3025

# Kill process if needed
kill -9 <PID>
```

### **Firewall Issues**

```bash
# Windows: Allow port through firewall
netsh advfirewall firewall add rule name="BrowserTools" dir=in action=allow protocol=TCP localport=3025

# macOS: Check if port is blocked
sudo lsof -i :3025

# Linux: Check iptables
sudo iptables -L | grep 3025
```

### **Network Configuration**

If using custom host/port, update extension settings:

1. **Open DevTools → BrowserToolsMCP panel**
2. **Look for settings/configuration option**
3. **Update server host/port if needed**
4. **Save and reload extension**

## 📋 Complete Reset Procedure

If all else fails, perform a complete reset:

### **1. Stop Everything**
```bash
# Stop server (Ctrl+C in terminal)
# Close all Chrome windows
```

### **2. Clean Installation**
```bash
# Uninstall packages
npm uninstall -g @cpjet64/browser-tools-server
npm uninstall -g @cpjet64/browser-tools-mcp

# Clear npm cache
npm cache clean --force

# Reinstall fresh
npm install -g @cpjet64/browser-tools-server@latest
npm install -g @cpjet64/browser-tools-mcp@latest
```

### **3. Reset Chrome Extension**
1. **Go to `chrome://extensions/`**
2. **Remove "BrowserTools MCP Fork by cpjet64"**
3. **Download fresh extension from GitHub releases**
4. **Load unpacked extension**

### **4. Test Fresh Setup**
```bash
# Start server
npx @cpjet64/browser-tools-server@latest

# Open Chrome → DevTools → BrowserToolsMCP panel
# Should connect without errors
```

## 🔍 Diagnostic Commands

### **Check Installation**
```bash
# Verify packages
which browser-tools-server
npm list -g | grep cpjet64

# Check versions
npx @cpjet64/browser-tools-server@latest --version
```

### **Test Network Connectivity**
```bash
# Test HTTP connection
curl -v http://localhost:3025/.identity

# Test WebSocket (requires wscat)
npm install -g wscat
wscat -c ws://localhost:3025/extension-ws
```

### **Check Chrome Extension Logs**
1. **Go to `chrome://extensions/`**
2. **Enable Developer mode**
3. **Click "background page" or "service worker"**
4. **Check console for errors**

## ✅ Success Indicators

When everything is working correctly, you should see:

### **Server Terminal:**
```
Server running on http://localhost:3025
WebSocket server listening on port 3025
Extension connected via WebSocket
```

### **Chrome DevTools Console:**
```
Chrome Extension: WebSocket connected to ws://localhost:3025/extension-ws
Server identity confirmed: browser-tools-server v1.4.0
```

### **Extension Panel:**
- No error messages
- Connection status shows "Connected"
- Logs and network requests appear

## 🆘 Getting Help

If you're still having issues:

1. **Check GitHub Issues:** [Browser Tools MCP Issues](https://github.com/cpjet64/browser-tools-mcp/issues)
2. **Create new issue** with:
   - Operating system
   - Chrome version
   - Server version
   - Complete error messages
   - Steps to reproduce

3. **Include diagnostic info:**
   ```bash
   # System info
   node --version
   npm --version
   
   # Package versions
   npm list -g @cpjet64/browser-tools-server
   npm list -g @cpjet64/browser-tools-mcp
   
   # Server test
   curl http://localhost:3025/.identity
   ```
