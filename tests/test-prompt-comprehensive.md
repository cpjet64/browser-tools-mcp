# WebAI-MCP Dev Version - Comprehensive Tool Testing Prompt

## Overview
This prompt is designed to systematically test all available tools in the WebAI-MCP dev version. Execute each section sequentially to validate functionality.

## Prerequisites
- WebAI-MCP server running on localhost:3025
- Chrome browser with WebAI extension installed
- Test webpage open in browser (e.g., https://example.com or test-element-interaction.html)

## 1. Basic Browser Information & Screenshots

### Test takeScreenshot
```
Please take a screenshot of the current browser tab to verify the screenshot functionality is working.
```

### Test getSelectedElement
```
Please get information about the currently selected element in the browser.
```

## 2. Console & Network Monitoring

### Test getConsoleLogs
```
Please retrieve the current browser console logs and show me what's been logged.
```

### Test getConsoleErrors
```
Please check for any console errors in the browser and report them.
```

### Test getNetworkLogs
```
Please get all network request logs from the browser.
```

### Test getNetworkErrors
```
Please check specifically for network errors and failed requests.
```

## 3. Element Inspection & Interaction

### Test inspectElementsBySelector
```
Please inspect all div elements on the page using the CSS selector "div" and include computed styles for "display", "position", and "color" properties. Limit results to 3 elements.
```

### Test inspectElementsBySelector (Advanced)
```
Please inspect the first button element on the page using selector "button" and include all computed styles.
```

## 4. Browser Storage Access

### Test getCookies
```
Please retrieve all cookies from the current browser session.
```

### Test getLocalStorage
```
Please get all localStorage data from the current page.
```

### Test getSessionStorage
```
Please access and display all sessionStorage data from the current page.
```

## 5. Comprehensive Audits

### Test runAccessibilityAudit
```
Please run a comprehensive accessibility audit on the current page and provide detailed results including any WCAG violations.
```

### Test runPerformanceAudit
```
Please run a performance audit on the current page and analyze loading times, Core Web Vitals, and optimization opportunities.
```

### Test runSEOAudit
```
Please run an SEO audit on the current page and check for meta tags, headings structure, and SEO best practices.
```

### Test runBestPracticesAudit
```
Please run a best practices audit to check for security, modern web standards, and development best practices.
```

### Test runNextJSAudit (if applicable)
```
Please run a Next.js specific audit if the current page is a Next.js application.
```

## 6. Combined Audit Modes

### Test runAuditMode
```
Please run the comprehensive audit mode that executes all audits (accessibility, performance, SEO, and best practices) in sequence.
```

### Test runDebuggerMode
```
Please run debugger mode to perform comprehensive debugging analysis of the current page.
```

## 7. Utility Functions

### Test wipeLogs
```
Please wipe all browser logs from memory to start with a clean slate.
```

### Test checkVersionCompatibility
```
Please check version compatibility between the MCP server, Browser Tools server, and Chrome extension.
```

## 8. Error Handling & Edge Cases

### Test with Invalid Selector
```
Please try to inspect elements using an invalid CSS selector "invalid>>>selector" to test error handling.
```

### Test Screenshot on Non-existent Page
```
Please navigate to a non-existent page (if possible) and try to take a screenshot to test error handling.
```

## 9. Performance & Load Testing

### Test Multiple Rapid Requests
```
Please execute the following sequence rapidly:
1. Take a screenshot
2. Get console logs
3. Get network logs
4. Inspect div elements
5. Get cookies
```

## 10. Integration Testing

### Test Tool Chaining
```
Please perform this sequence to test tool integration:
1. Take a screenshot
2. Inspect the first button element on the page
3. Get console logs to see if the inspection generated any logs
4. Run an accessibility audit
5. Take another screenshot to compare
```

## Expected Results Validation

For each test, verify:
- ✅ Tool executes without errors
- ✅ Returns expected data format
- ✅ Handles edge cases gracefully
- ✅ Provides meaningful error messages when appropriate
- ✅ Performance is acceptable (< 5 seconds for most operations)
- ✅ No memory leaks or resource issues

## Troubleshooting Commands

If any tests fail, run these diagnostic commands:

### Check Server Status
```
Please check if the WebAI server is running and accessible.
```

### Validate Extension Connection
```
Please verify that the Chrome extension is properly connected to the server.
```

### Test Basic Connectivity
```
Please test basic connectivity between the MCP server and browser tools server.
```

## Advanced Testing Scenarios

### Test with Complex Page
```
Navigate to a complex webpage (like GitHub, Stack Overflow, or a modern web app) and repeat the core tests to ensure they work with real-world complexity.
```

### Test with Different Content Types
```
Test the tools on pages with different content types:
- Static HTML page
- Single Page Application (SPA)
- Page with heavy JavaScript
- Page with forms and interactive elements
```

## Completion Checklist

- [ ] All 20+ tools tested successfully
- [ ] Error handling validated
- [ ] Performance benchmarks met
- [ ] Integration between components verified
- [ ] Edge cases handled appropriately
- [ ] Documentation matches actual behavior

## Notes
- Record any unexpected behavior or performance issues
- Note any tools that consistently fail or have limitations
- Document any browser-specific behaviors observed
- Track response times for performance analysis
