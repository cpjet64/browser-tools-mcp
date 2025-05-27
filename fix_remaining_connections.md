# Remaining Connection Updates Needed

The following methods still need to be updated to use the new multi-connection approach:

## Methods to Update:

1. **getCookies** (line ~1856)
   - Change: `if (!this.activeConnection)` → `const activeConnection = this.getFirstActiveConnection(); if (!activeConnection)`
   - Change: `this.activeConnection.send(message)` → `activeConnection.send(message)`

2. **getLocalStorage** (line ~1928)
   - Same pattern as getCookies

3. **getSessionStorage** (line ~2003)
   - Same pattern as getCookies

4. **refreshBrowser** (line ~2078)
   - Same pattern as getCookies

5. **clickElement** (line ~2159)
   - Same pattern as getCookies

6. **fillInput** (line ~2236)
   - Same pattern as getCookies

7. **selectOption** (line ~2314)
   - Same pattern as getCookies

8. **submitForm** (line ~2400+)
   - Same pattern as getCookies

## Pattern for Each Method:

```typescript
// OLD:
if (!this.activeConnection) {
  return res.status(503).json({ error: "Chrome extension not connected" });
}

// NEW:
const activeConnection = this.getFirstActiveConnection();
if (!activeConnection) {
  return res.status(503).json({ error: "No clients connected" });
}

// OLD:
this.activeConnection.send(message);

// NEW:
activeConnection.send(message);
```

## Error Messages to Update:
- "Chrome extension not connected" → "No clients connected"
- "no response from Chrome extension" → "no response from client"
