// Test script for privacy filtering functions
// This can be run in a browser console to verify the filtering works correctly

// Mock settings object for testing
const testSettings = {
  sensitiveDataMode: "hide-sensitive" // Can be changed to test different modes
};

// Copy of the filtering functions from devtools.js for testing
const SENSITIVE_KEY_PATTERNS = [
  /auth/i, /token/i, /jwt/i, /session/i, /api[-_]?key/i, /secret/i, /password/i,
  /ssn/i, /phone/i, /address/i, /credit[-_]?card/i, /bank/i, /private/i
];

const SENSITIVE_VALUE_PATTERNS = [
  /^ey[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
  /^sk-[A-Za-z0-9]{32,}$/,
  /^AKIA[0-9A-Z]{16}$/,
  /^gh[pousr]_[A-Za-z0-9_]{36,255}$/,
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  /^\d{3}-\d{2}-\d{4}$/
];

function calculateNormalizedEntropy(str) {
  const freq = new Map();
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  
  let entropy = 0;
  const len = str.length;
  for (const count of freq.values()) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  
  const uniqueChars = new Set(str).size;
  if (uniqueChars === 0) return 0;
  const maxEntropy = Math.log2(uniqueChars);
  return entropy / maxEntropy;
}

function isSensitiveValue(value) {
  if (typeof value !== "string") return false;
  if (value.length < 8) return false;
  
  if (SENSITIVE_VALUE_PATTERNS.some((pattern) => pattern.test(value))) {
    return true;
  }
  
  if (value.length > 16) {
    const normalizedEntropy = calculateNormalizedEntropy(value);
    if (normalizedEntropy > 0.65) {
      return true;
    }
  }
  
  return false;
}

function isSensitiveKey(key) {
  return SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key));
}

function filterSensitiveInString(text) {
  if (typeof text !== "string") return text;
  
  if (testSettings.sensitiveDataMode === "hide-all") {
    return text
      .replace(/ey[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[JWT_TOKEN_REDACTED]")
      .replace(/sk-[A-Za-z0-9]{32,}/g, "[API_KEY_REDACTED]")
      .replace(/AKIA[0-9A-Z]{16}/g, "[AWS_KEY_REDACTED]")
      .replace(/gh[pousr]_[A-Za-z0-9_]{36,255}/g, "[GITHUB_TOKEN_REDACTED]")
      .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, "[EMAIL_REDACTED]")
      .replace(/\d{3}-\d{2}-\d{4}/g, "[SSN_REDACTED]")
      .replace(/(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})/g, "[CREDIT_CARD_REDACTED]");
  }
  
  if (testSettings.sensitiveDataMode === "hide-sensitive") {
    return text
      .replace(/ey[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[JWT_TOKEN_REDACTED]")
      .replace(/sk-[A-Za-z0-9]{32,}/g, "[API_KEY_REDACTED]")
      .replace(/AKIA[0-9A-Z]{16}/g, "[AWS_KEY_REDACTED]")
      .replace(/gh[pousr]_[A-Za-z0-9_]{36,255}/g, "[GITHUB_TOKEN_REDACTED]")
      .replace(/\d{3}-\d{2}-\d{4}/g, "[SSN_REDACTED]")
      .replace(/(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})/g, "[CREDIT_CARD_REDACTED]");
  }
  
  return text;
}

// Test cases
console.log("=== Privacy Filtering Test Cases ===");

// Test JWT token filtering
const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
console.log("JWT Token Test:");
console.log("Original:", jwtToken);
console.log("Filtered:", filterSensitiveInString(`Bearer ${jwtToken}`));

// Test API key filtering
const apiKey = "sk-1234567890abcdef1234567890abcdef12345678";
console.log("\nAPI Key Test:");
console.log("Original:", apiKey);
console.log("Filtered:", filterSensitiveInString(`API Key: ${apiKey}`));

// Test email filtering
const email = "user@example.com";
console.log("\nEmail Test:");
console.log("Original:", email);
console.log("Filtered:", filterSensitiveInString(`Contact: ${email}`));

// Test SSN filtering
const ssn = "123-45-6789";
console.log("\nSSN Test:");
console.log("Original:", ssn);
console.log("Filtered:", filterSensitiveInString(`SSN: ${ssn}`));

// Test different modes
console.log("\n=== Testing Different Privacy Modes ===");

const testString = `User logged in with token: ${jwtToken} and email: ${email}`;

testSettings.sensitiveDataMode = "show-all";
console.log("Show All Mode:", filterSensitiveInString(testString));

testSettings.sensitiveDataMode = "hide-sensitive";
console.log("Hide Sensitive Mode:", filterSensitiveInString(testString));

testSettings.sensitiveDataMode = "hide-all";
console.log("Hide All Mode:", filterSensitiveInString(testString));

console.log("\n=== Test Complete ===");
