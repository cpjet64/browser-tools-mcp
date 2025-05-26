# WebAI-MCP: Technical Implementation Reference

> **AI Coding Agent Reference Document**  
> Technical specifications for enhancing the existing WebAI-MCP browser analysis platform

## 🎯 Project Context

WebAI-MCP is an established browser analysis platform that provides AI agents with deep insights into browser behavior and user experience. This document serves as a technical reference for implementing new features and enhancements.

**Repository Structure:**
- `main` branch: Production-ready code with auto-versioning
- `dev` branch: Development branch with auto-versioning
- Project has been rebranded from browser-tools-mcp to WebAI-MCP

## 🚀 Development Roadmap

### **Phase 1: Enhanced Core Features (Current Priority)**
1. **Advanced DOM Analysis**
   - Element inspection with CSS selectors and computed styles
   - Interactive element manipulation (click, hover, scroll, fill)
   - Advanced DOM querying with filters and sorting

2. **Browser Storage Enhancement**
   - Secure access to cookies, localStorage, sessionStorage
   - Three-tier privacy system with intelligent sensitive data detection
   - Entropy-based token detection for security

### **Phase 2: Security & Monitoring (Next)**
1. **Authentication Analysis**
   - JWT token analysis from browser storage and headers
   - CSRF protection detection and validation
   - Authentication flow tracking

2. **Real-time Browser Monitoring**
   - Live event streaming (console, network, DOM changes)
   - Performance metrics collection and analysis
   - User interaction pattern tracking

### **Phase 3: Advanced Browser APIs (Future)**
1. **Modern Web Technologies**
   - Service Workers and PWA analysis
   - WebSocket and WebRTC monitoring
   - Advanced storage mechanisms (IndexedDB, Cache API)

2. **Performance & Memory**
   - Memory leak detection and garbage collection analysis
   - Rendering performance optimization
   - Resource loading waterfall analysis

### **Phase 4: AI-Powered Analysis (Future)**
1. **Intelligent Pattern Recognition**
   - Automated issue detection from browser behavior
   - Predictive analysis for performance degradation
   - Natural language query interface for browser state

## 🔧 Core Implementation Specifications

### **1. DOM Manipulation & Inspection**

#### Element Interaction Tools
```typescript
// File: src/tools/dom-interaction.ts
server.tool("clickElement", "Click on an element using CSS selector", {
  selector: z.string().describe("CSS selector for target element"),
  waitForNavigation: z.boolean().optional().default(false).describe("Wait for page navigation after click"),
  timeout: z.number().optional().default(5000).describe("Timeout in milliseconds")
}, async ({ selector, waitForNavigation, timeout }) => {
  return await withBrowserConnection(async () => {
    const result = await chrome.devtools.inspectedWindow.eval(`
      (function() {
        const element = document.querySelector('${selector}');
        if (!element) return { success: false, error: 'Element not found' };
        
        element.click();
        return { success: true, clicked: true };
      })()
    `);
    
    if (waitForNavigation) {
      await new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  });
});

server.tool("fillInput", "Fill input fields with text", {
  selector: z.string().describe("CSS selector for input element"),
  value: z.string().describe("Value to enter into the input"),
  clearFirst: z.boolean().optional().default(true).describe("Clear existing value first")
}, async ({ selector, value, clearFirst }) => {
  return await withBrowserConnection(async () => {
    const result = await chrome.devtools.inspectedWindow.eval(`
      (function() {
        const input = document.querySelector('${selector}');
        if (!input) return { success: false, error: 'Input element not found' };
        
        if (${clearFirst}) input.value = '';
        input.value = '${value}';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        
        return { success: true, value: input.value };
      })()
    `);
    
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  });
});
```

#### Advanced Element Inspection
```typescript
// File: src/tools/element-inspection.ts
server.tool("inspectElementsBySelector", "Get HTML elements and computed styles", {
  selector: z.string().describe("CSS selector (use $0 for currently selected element)"),
  resultLimit: z.number().optional().default(1).describe("Maximum elements to return"),
  includeComputedStyles: z.array(z.string()).optional().default([]).describe("CSS properties to include"),
  includeEventListeners: z.boolean().optional().default(false).describe("Include event listeners")
}, async ({ selector, resultLimit, includeComputedStyles, includeEventListeners }) => {
  return await withBrowserConnection(async () => {
    const inspectionScript = `
      (function() {
        const elements = document.querySelectorAll('${selector}');
        const results = Array.from(elements).slice(0, ${resultLimit}).map(el => {
          const computedStyles = {};
          ${includeComputedStyles.map(prop => 
            `computedStyles['${prop}'] = getComputedStyle(el).getPropertyValue('${prop}');`
          ).join('\n')}
          
          const rect = el.getBoundingClientRect();
          
          return {
            html: el.outerHTML,
            tagName: el.tagName,
            id: el.id,
            className: el.className,
            computedStyles: computedStyles,
            boundingRect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
            },
            isVisible: rect.width > 0 && rect.height > 0,
            ${includeEventListeners ? 'eventListeners: getEventListeners(el),' : ''}
          };
        });
        
        return { elements: results, count: results.length };
      })()
    `;
    
    const result = await chrome.devtools.inspectedWindow.eval(inspectionScript);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  });
});
```

### **2. Browser Storage with Privacy Controls**

#### Storage Access Implementation
```typescript
// File: src/tools/storage-analysis.ts
import { detectSensitiveData, filterSensitiveContent } from '../utils/privacy-filter';

server.tool("analyzeBrowserStorage", "Analyze all browser storage with privacy controls", {
  storageTypes: z.array(z.enum(['cookies', 'localStorage', 'sessionStorage', 'indexedDB'])).default(['cookies', 'localStorage', 'sessionStorage']),
  privacyMode: z.enum(['hide-all', 'hide-sensitive', 'show-all']).default('hide-sensitive'),
  includeSizes: z.boolean().optional().default(true),
  includeExpiration: z.boolean().optional().default(true)
}, async ({ storageTypes, privacyMode, includeSizes, includeExpiration }) => {
  return await withBrowserConnection(async () => {
    const storageData = {};
    
    for (const storageType of storageTypes) {
      const script = generateStorageScript(storageType, includeSizes, includeExpiration);
      const rawData = await chrome.devtools.inspectedWindow.eval(script);
      
      // Apply privacy filtering
      storageData[storageType] = privacyMode === 'show-all' 
        ? rawData 
        : filterSensitiveContent(rawData, privacyMode);
    }
    
    return {
      content: [{ type: "text", text: JSON.stringify(storageData, null, 2) }]
    };
  });
});

// File: src/utils/privacy-filter.ts
export function detectSensitiveData(key: string, value: string): boolean {
  const SENSITIVE_PATTERNS = {
    keys: [/auth/i, /token/i, /jwt/i, /session/i, /api[-_]?key/i, /secret/i, /password/i],
    values: [
      /^ey[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/, // JWT
      /^sk-[A-Za-z0-9]{32,}$/, // API keys
      /^[A-Za-z0-9]{32,128}$/ // Generic tokens
    ]
  };
  
  // Check key patterns
  if (SENSITIVE_PATTERNS.keys.some(pattern => pattern.test(key))) return true;
  
  // Check value patterns
  if (SENSITIVE_PATTERNS.values.some(pattern => pattern.test(value))) return true;
  
  // Entropy-based detection for strings > 16 chars
  if (value.length > 16) {
    const entropy = calculateNormalizedEntropy(value);
    return entropy > 0.65; // High entropy indicates random data (likely tokens)
  }
  
  return false;
}

function calculateNormalizedEntropy(str: string): number {
  const freq = new Map<string, number>();
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  
  let entropy = 0;
  const len = str.length;
  for (const count of freq.values()) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  
  const uniqueChars = freq.size;
  const maxEntropy = Math.log2(uniqueChars);
  return maxEntropy > 0 ? entropy / maxEntropy : 0;
}
```

### **3. Real-time Browser Monitoring**

#### Event Streaming Implementation
```typescript
// File: src/tools/real-time-monitoring.ts
server.tool("startBrowserMonitoring", "Start real-time browser event monitoring", {
  events: z.array(z.enum(['console', 'network', 'dom-changes', 'errors', 'user-interactions'])),
  duration: z.number().optional().default(30000),
  bufferSize: z.number().optional().default(1000)
}, async ({ events, duration, bufferSize }) => {
  return await withBrowserConnection(async () => {
    const monitoringId = generateMonitoringId();
    
    // Set up event listeners in the browser
    for (const eventType of events) {
      await setupEventListener(eventType, monitoringId, bufferSize);
    }
    
    // Schedule cleanup
    setTimeout(() => cleanupMonitoring(monitoringId), duration);
    
    return {
      content: [{ 
        type: "text", 
        text: JSON.stringify({ 
          monitoringId, 
          status: 'started', 
          events, 
          duration 
        }, null, 2) 
      }]
    };
  });
});

// File: src/monitoring/event-collectors.ts
async function setupEventListener(eventType: string, monitoringId: string, bufferSize: number) {
  const listenerScript = `
    (function() {
      window.webaiMonitors = window.webaiMonitors || {};
      const buffer = [];
      
      function flushBuffer() {
        if (buffer.length > 0) {
          chrome.runtime.sendMessage({
            type: 'monitoring-data',
            monitoringId: '${monitoringId}',
            eventType: '${eventType}',
            events: buffer.splice(0, buffer.length)
          });
        }
      }
      
      ${generateEventListenerCode(eventType)}
      
      // Flush buffer periodically
      setInterval(flushBuffer, 1000);
      
      window.webaiMonitors['${monitoringId}'] = { stop: () => flushBuffer() };
    })()
  `;
  
  await chrome.devtools.inspectedWindow.eval(listenerScript);
}

function generateEventListenerCode(eventType: string): string {
  switch (eventType) {
    case 'console':
      return `
        const originalLog = console.log;
        console.log = function(...args) {
          buffer.push({ type: 'console', level: 'log', args, timestamp: Date.now() });
          if (buffer.length >= ${bufferSize}) flushBuffer();
          originalLog.apply(console, args);
        };
      `;
    
    case 'network':
      return `
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
          const startTime = Date.now();
          buffer.push({ type: 'network', method: 'fetch', url, timestamp: startTime });
          return originalFetch(url, options).then(response => {
            buffer.push({ type: 'network-response', url, status: response.status, duration: Date.now() - startTime });
            return response;
          });
        };
      `;
    
    case 'dom-changes':
      return `
        const observer = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            buffer.push({ type: 'dom-change', mutation: mutation.type, target: mutation.target.tagName, timestamp: Date.now() });
          });
          if (buffer.length >= ${bufferSize}) flushBuffer();
        });
        observer.observe(document, { childList: true, subtree: true, attributes: true });
      `;
    
    default:
      return '';
  }
}
```

### **4. Security Analysis Tools**

#### JWT and Authentication Analysis
```typescript
// File: src/tools/security-analysis.ts
server.tool("analyzeAuthentication", "Analyze authentication mechanisms in browser", {
  includeJWTAnalysis: z.boolean().optional().default(true),
  includeCSRFCheck: z.boolean().optional().default(true),
  includeSecurityHeaders: z.boolean().optional().default(true),
  checkTokenLeakage: z.boolean().optional().default(true)
}, async ({ includeJWTAnalysis, includeCSRFCheck, includeSecurityHeaders, checkTokenLeakage }) => {
  return await withBrowserConnection(async () => {
    const analysis = {};
    
    if (includeJWTAnalysis) {
      analysis.jwt = await analyzeJWTTokens();
    }
    
    if (includeCSRFCheck) {
      analysis.csrf = await analyzeCSRFProtection();
    }
    
    if (includeSecurityHeaders) {
      analysis.headers = await analyzeSecurityHeaders();
    }
    
    if (checkTokenLeakage) {
      analysis.leakage = await checkForTokenLeakage();
    }
    
    return {
      content: [{ type: "text", text: JSON.stringify(analysis, null, 2) }]
    };
  });
});

async function analyzeJWTTokens() {
  const script = `
    (function() {
      const tokens = [];
      
      // Check localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        if (value && value.match(/^ey[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/)) {
          tokens.push({ source: 'localStorage', key, token: value });
        }
      }
      
      // Check sessionStorage
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        if (value && value.match(/^ey[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/)) {
          tokens.push({ source: 'sessionStorage', key, token: value });
        }
      }
      
      // Analyze each token
      return tokens.map(tokenInfo => {
        try {
          const parts = tokenInfo.token.split('.');
          const header = JSON.parse(atob(parts[0]));
          const payload = JSON.parse(atob(parts[1]));
          
          return {
            ...tokenInfo,
            header,
            payload,
            expired: payload.exp ? Date.now() / 1000 > payload.exp : null,
            expiresAt: payload.exp ? new Date(payload.exp * 1000).toISOString() : null
          };
        } catch (e) {
          return { ...tokenInfo, error: 'Invalid JWT format' };
        }
      });
    })()
  `;
  
  return await chrome.devtools.inspectedWindow.eval(script);
}
```

### **5. Performance Monitoring**

#### Browser Performance Analysis
```typescript
// File: src/tools/performance-monitoring.ts
server.tool("monitorBrowserPerformance", "Monitor comprehensive browser performance", {
  metrics: z.array(z.enum(['memory', 'timing', 'vitals', 'resources', 'user-timing'])).default(['memory', 'timing', 'vitals']),
  interval: z.number().optional().default(1000),
  duration: z.number().optional().default(30000)
}, async ({ metrics, interval, duration }) => {
  return await withBrowserConnection(async () => {
    const performanceData = [];
    const startTime = Date.now();
    
    const collectMetrics = async () => {
      const script = `
        (function() {
          const data = { timestamp: Date.now() };
          
          ${metrics.includes('memory') ? `
            if (performance.memory) {
              data.memory = {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
              };
            }
          ` : ''}
          
          ${metrics.includes('timing') ? `
            data.timing = performance.timing;
          ` : ''}
          
          ${metrics.includes('vitals') ? `
            data.vitals = {};
            // Get Core Web Vitals
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                  data.vitals.lcp = entry.renderTime || entry.loadTime;
                }
                if (entry.entryType === 'first-input') {
                  data.vitals.fid = entry.processingStart - entry.startTime;
                }
                if (entry.entryType === 'layout-shift') {
                  data.vitals.cls = (data.vitals.cls || 0) + entry.value;
                }
              }
            }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
          ` : ''}
          
          ${metrics.includes('resources') ? `
            data.resources = performance.getEntriesByType('resource').slice(-10);
          ` : ''}
          
          return data;
        })()
      `;
      
      const result = await chrome.devtools.inspectedWindow.eval(script);
      performanceData.push(result);
    };
    
    // Collect initial metrics
    await collectMetrics();
    
    // Set up interval collection
    const intervalId = setInterval(collectMetrics, interval);
    
    // Stop after duration
    setTimeout(() => {
      clearInterval(intervalId);
    }, duration);
    
    return {
      content: [{ 
        type: "text", 
        text: JSON.stringify({ 
          status: 'monitoring-started',
          config: { metrics, interval, duration },
          initialData: performanceData[0]
        }, null, 2) 
      }]
    };
  });
});
```

## 🔧 Core Architecture Components

### **Browser Connection Management**
```typescript
// File: src/core/browser-connection.ts
export async function withBrowserConnection<T>(operation: () => Promise<T>): Promise<T> {
  if (!chrome?.devtools?.inspectedWindow) {
    throw new Error('Browser connection not available. Ensure Chrome extension is loaded.');
  }
  
  try {
    return await operation();
  } catch (error) {
    console.error('Browser operation failed:', error);
    throw new Error(`Browser operation failed: ${error.message}`);
  }
}

export function generateMonitoringId(): string {
  return `webai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function validateBrowserEnvironment(): Promise<boolean> {
  try {
    const result = await chrome.devtools.inspectedWindow.eval('!!window');
    return result === true;
  } catch {
    return false;
  }
}
```

### **Message Passing System**
```typescript
// File: src/core/message-handler.ts
export class BrowserMessageHandler {
  private listeners = new Map<string, Function[]>();
  
  constructor() {
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
  }
  
  private handleMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: Function) {
    const { type, data } = message;
    const handlers = this.listeners.get(type) || [];
    
    handlers.forEach(handler => {
      try {
        handler(data, sender, sendResponse);
      } catch (error) {
        console.error(`Message handler error for type ${type}:`, error);
      }
    });
  }
  
  public addListener(type: string, handler: Function) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(handler);
  }
  
  public removeListener(type: string, handler: Function) {
    const handlers = this.listeners.get(type);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) handlers.splice(index, 1);
    }
  }
}
```

### **Error Handling Standards**
```typescript
// File: src/utils/error-handling.ts
export class WebAIError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: any
  ) {
    super(message);
    this.name = 'WebAIError';
  }
}

export function handleToolError(error: unknown, context: string): { content: Array<{ type: string; text: string }> } {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  console.error(`${context} error:`, error);
  
  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        success: false,
        error: errorMessage,
        context,
        timestamp: new Date().toISOString(),
        suggestions: generateErrorSuggestions(errorMessage)
      }, null, 2)
    }]
  };
}

function generateErrorSuggestions(errorMessage: string): string[] {
  const suggestions = [];
  
  if (errorMessage.includes('not found')) {
    suggestions.push('Verify the CSS selector is correct');
    suggestions.push('Ensure the element exists on the current page');
  }
  
  if (errorMessage.includes('permission')) {
    suggestions.push('Check browser permissions for the extension');
    suggestions.push('Try refreshing the page and reopening DevTools');
  }
  
  if (errorMessage.includes('timeout')) {
    suggestions.push('Increase the timeout value');
    suggestions.push('Check if the page is fully loaded');
  }
  
  return suggestions;
}
```

## 📋 Implementation Guidelines

### **Code Organization**
```
src/
├── tools/               # MCP tool implementations
│   ├── dom-interaction.ts
│   ├── storage-analysis.ts
│   ├── security-analysis.ts
│   └── performance-monitoring.ts
├── core/               # Core system components
│   ├── browser-connection.ts
│   ├── message-handler.ts
│   └── mcp-server.ts
├── utils/              # Utility functions
│   ├── privacy-filter.ts
│   ├── error-handling.ts
│   └── validation.ts
├── monitoring/         # Real-time monitoring
│   ├── event-collectors.ts
│   └── data-processors.ts
└── types/              # TypeScript definitions
    ├── browser-api.ts
    └── tool-responses.ts
```

### **Testing Strategy**
- Unit tests for utility functions (privacy filtering, validation)
- Integration tests for browser API interactions
- End-to-end tests for complete tool workflows
- Performance tests for real-time monitoring features

### **Development Standards**
- All tools must include comprehensive error handling
- TypeScript interfaces required for all parameters and responses
- Logging must include context and actionable error messages
- Privacy filtering must be applied to all sensitive data access
- Performance monitoring tools must not impact browser performance significantly

This reference document provides the technical foundation for implementing the next phase of WebAI-MCP enhancements.