#!/usr/bin/env node

/**
 * Quick Test Script for Browser Tools MCP
 * 
 * Provides immediate testing of the current setup without
 * requiring branch switching or complex configuration.
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const ICONS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  rocket: '🚀',
  test: '🧪'
};

function log(message, color = 'reset', icon = '') {
  const colorCode = COLORS[color] || COLORS.reset;
  console.log(`${colorCode}${icon} ${message}${COLORS.reset}`);
}

function logSection(title) {
  console.log(`\n${COLORS.cyan}${COLORS.bright}=== ${title} ===${COLORS.reset}`);
}

async function quickTest() {
  log('Browser Tools MCP - Quick Test', 'bright', ICONS.rocket);
  console.log();

  let serverProcess = null;
  let testsPassed = 0;
  let testsFailed = 0;

  try {
    // 1. Check prerequisites
    logSection('Prerequisites Check');
    
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion >= 18) {
      log(`Node.js ${nodeVersion} ✓`, 'green', ICONS.success);
      testsPassed++;
    } else {
      log(`Node.js ${nodeVersion} - requires >=18`, 'red', ICONS.error);
      testsFailed++;
    }

    // 2. Check project structure
    logSection('Project Structure');
    
    const requiredDirs = ['browser-tools-mcp', 'browser-tools-server', 'chrome-extension'];
    for (const dir of requiredDirs) {
      if (fs.existsSync(dir)) {
        log(`${dir} directory ✓`, 'green', ICONS.success);
        testsPassed++;
      } else {
        log(`${dir} directory missing`, 'red', ICONS.error);
        testsFailed++;
      }
    }

    // 3. Check if packages are built
    logSection('Build Status');
    
    const buildDirs = [
      'browser-tools-mcp/dist',
      'browser-tools-server/dist'
    ];
    
    for (const buildDir of buildDirs) {
      if (fs.existsSync(buildDir) && fs.readdirSync(buildDir).length > 0) {
        log(`${buildDir} ✓`, 'green', ICONS.success);
        testsPassed++;
      } else {
        log(`${buildDir} missing or empty`, 'yellow', ICONS.warning);
        log(`  Run: cd ${buildDir.split('/')[0]} && npm run build`, 'blue', ICONS.info);
      }
    }

    // 4. Test server startup
    logSection('Server Test');
    
    if (fs.existsSync('browser-tools-server/dist/browser-connector.js')) {
      log('Starting Browser Tools Server...', 'blue', ICONS.test);
      
      serverProcess = spawn('node', ['dist/browser-connector.js'], {
        cwd: 'browser-tools-server',
        stdio: 'pipe'
      });

      // Wait for server to start
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Test server endpoint
      try {
        const response = await fetch('http://localhost:3025/.identity', {
          signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
          const identity = await response.json();
          if (identity.signature === 'mcp-browser-connector-24x7') {
            log('Server started and responding ✓', 'green', ICONS.success);
            testsPassed++;
          } else {
            log('Server responding but wrong signature', 'yellow', ICONS.warning);
          }
        } else {
          log(`Server returned ${response.status}`, 'yellow', ICONS.warning);
        }
      } catch (error) {
        log('Server not responding', 'red', ICONS.error);
        testsFailed++;
      }
    } else {
      log('Server build not found - run: cd browser-tools-server && npm run build', 'yellow', ICONS.warning);
    }

    // 5. Test Chrome extension
    logSection('Chrome Extension');
    
    const manifestPath = 'chrome-extension/manifest.json';
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        log(`Extension v${manifest.version} ready ✓`, 'green', ICONS.success);
        log('Install: Chrome → chrome://extensions/ → Load unpacked → chrome-extension/', 'blue', ICONS.info);
        testsPassed++;
      } catch (error) {
        log('Extension manifest invalid', 'red', ICONS.error);
        testsFailed++;
      }
    } else {
      log('Extension manifest not found', 'red', ICONS.error);
      testsFailed++;
    }

    // 6. Test diagnostic tools (if available)
    logSection('Diagnostic Tools');
    
    if (fs.existsSync('scripts/diagnose.js')) {
      log('Diagnostic script available ✓', 'green', ICONS.success);
      log('Run: node scripts/diagnose.js', 'blue', ICONS.info);
      testsPassed++;
    } else {
      log('Diagnostic script not available (may be on different branch)', 'yellow', ICONS.warning);
    }

    if (fs.existsSync('scripts/validate-installation.js')) {
      log('Validation script available ✓', 'green', ICONS.success);
      log('Run: node scripts/validate-installation.js', 'blue', ICONS.info);
      testsPassed++;
    } else {
      log('Validation script not available (may be on different branch)', 'yellow', ICONS.warning);
    }

    // 7. Summary and next steps
    logSection('Quick Test Summary');
    
    log(`Tests passed: ${testsPassed}`, 'green', ICONS.success);
    if (testsFailed > 0) {
      log(`Tests failed: ${testsFailed}`, 'red', ICONS.error);
    }

    console.log();
    
    if (testsFailed === 0) {
      log('🎉 Quick test passed! Your setup looks good.', 'green', ICONS.rocket);
    } else {
      log('⚠️ Some issues found. See suggestions above.', 'yellow', ICONS.warning);
    }

    console.log();
    log('Next steps:', 'cyan', ICONS.info);
    
    if (!fs.existsSync('browser-tools-mcp/dist') || !fs.existsSync('browser-tools-server/dist')) {
      log('1. Build packages:', 'blue', '  ');
      log('   cd browser-tools-mcp && npm install && npm run build', 'blue', '     ');
      log('   cd browser-tools-server && npm install && npm run build', 'blue', '     ');
    }
    
    if (serverProcess) {
      log('2. Server is running on http://localhost:3025', 'blue', '  ');
    } else {
      log('2. Start server: npx @cpjet64/browser-tools-server', 'blue', '  ');
    }
    
    log('3. Install Chrome extension from chrome-extension/ folder', 'blue', '  ');
    log('4. Configure your MCP client (Cursor, Claude Desktop, etc.)', 'blue', '  ');
    
    console.log();
    log('For comprehensive testing:', 'cyan', ICONS.info);
    log('  node scripts/test-all.js', 'blue', '  ');
    log('  node scripts/diagnose.js', 'blue', '  ');
    log('  node scripts/validate-installation.js', 'blue', '  ');

  } catch (error) {
    log(`Quick test failed: ${error.message}`, 'red', ICONS.error);
  } finally {
    // Cleanup
    if (serverProcess) {
      log('\nStopping test server...', 'blue', ICONS.info);
      serverProcess.kill();
    }
  }
}

// Run quick test
quickTest().catch(console.error);
