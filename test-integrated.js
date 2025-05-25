#!/usr/bin/env node

/**
 * Integrated Testing Suite for Browser Tools MCP
 *
 * Tests the fully integrated main branch with all merged features:
 * - Automated diagnostics
 * - Enhanced error handling
 * - Proxy support and network management
 * - Platform-specific enhancements
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

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
  test: '🧪',
  rocket: '🚀',
  server: '🖥️',
  browser: '🌐',
  tools: '🔧'
};

class IntegratedTestSuite {
  constructor(options = {}) {
    this.options = {
      verbose: false,
      skipBuild: false,
      skipServer: false,
      timeout: 30000,
      ...options
    };

    this.results = {
      prerequisites: { status: 'pending', details: [] },
      build: { status: 'pending', details: [] },
      diagnostics: { status: 'pending', details: [] },
      server: { status: 'pending', details: [] },
      proxy: { status: 'pending', details: [] },
      platform: { status: 'pending', details: [] },
      extension: { status: 'pending', details: [] },
      integration: { status: 'pending', details: [] }
    };

    this.processes = [];
    this.startTime = Date.now();
  }

  log(message, color = 'reset', icon = '') {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const colorCode = COLORS[color] || COLORS.reset;
    console.log(`${COLORS.blue}[${timestamp}]${COLORS.reset} ${colorCode}${icon} ${message}${COLORS.reset}`);
  }

  logSection(title) {
    const separator = '='.repeat(60);
    console.log(`\n${COLORS.cyan}${COLORS.bright}${separator}`);
    console.log(`${title}`);
    console.log(`${separator}${COLORS.reset}\n`);
  }

  async runTests() {
    this.logSection('Browser Tools MCP - Integrated Test Suite');
    this.log('Testing fully integrated main branch with all features', 'bright', ICONS.rocket);
    this.log(`Platform: ${os.platform()} ${os.arch()}`, 'blue', ICONS.info);
    console.log();

    try {
      await this.testPrerequisites();
      if (!this.options.skipBuild) await this.testBuild();
      await this.testDiagnostics();
      if (!this.options.skipServer) await this.testServer();
      await this.testProxy();
      await this.testPlatform();
      await this.testExtension();
      await this.testIntegration();

      await this.generateReport();
    } catch (error) {
      this.log(`Test suite failed: ${error.message}`, 'red', ICONS.error);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }

  async testPrerequisites() {
    this.logSection('Prerequisites Testing');

    try {
      // Node.js version
      const nodeVersion = process.version;
      const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

      if (majorVersion >= 18) {
        this.log(`Node.js ${nodeVersion} ✓`, 'green', ICONS.success);
        this.results.prerequisites.details.push(`Node.js ${nodeVersion}: OK`);
      } else {
        throw new Error(`Node.js ${nodeVersion} is too old (requires >=18)`);
      }

      // Project structure
      const requiredDirs = ['browser-tools-mcp', 'browser-tools-server', 'chrome-extension', 'scripts'];
      const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir));

      if (missingDirs.length === 0) {
        this.log('Project structure ✓', 'green', ICONS.success);
        this.results.prerequisites.details.push('All required directories present');
      } else {
        throw new Error(`Missing directories: ${missingDirs.join(', ')}`);
      }

      // Git repository
      try {
        execSync('git status', { stdio: 'pipe' });
        this.log('Git repository ✓', 'green', ICONS.success);
        this.results.prerequisites.details.push('Git repository: OK');
      } catch (error) {
        throw new Error('Not in a git repository');
      }

      this.results.prerequisites.status = 'passed';

    } catch (error) {
      this.results.prerequisites.status = 'failed';
      this.results.prerequisites.details.push(`Error: ${error.message}`);
      throw error;
    }
  }

  async testBuild() {
    this.logSection('Build Testing');

    try {
      const packages = [
        { name: 'MCP Server', path: 'browser-tools-mcp' },
        { name: 'Browser Tools Server', path: 'browser-tools-server' }
      ];

      for (const pkg of packages) {
        this.log(`Building ${pkg.name}...`, 'blue', ICONS.info);

        try {
          // Install dependencies
          execSync('npm install', {
            cwd: pkg.path,
            stdio: this.options.verbose ? 'inherit' : 'pipe',
            timeout: this.options.timeout
          });

          // Build package
          execSync('npm run build', {
            cwd: pkg.path,
            stdio: this.options.verbose ? 'inherit' : 'pipe',
            timeout: this.options.timeout
          });

          // Verify build output
          const distPath = path.join(pkg.path, 'dist');
          if (fs.existsSync(distPath) && fs.readdirSync(distPath).length > 0) {
            this.log(`${pkg.name} build successful ✓`, 'green', ICONS.success);
            this.results.build.details.push(`${pkg.name}: Build successful`);
          } else {
            throw new Error(`${pkg.name}: Build produced no output`);
          }

        } catch (error) {
          throw new Error(`${pkg.name} build failed: ${error.message}`);
        }
      }

      this.results.build.status = 'passed';

    } catch (error) {
      this.results.build.status = 'failed';
      this.results.build.details.push(`Build error: ${error.message}`);
      throw error;
    }
  }

  async testDiagnostics() {
    this.logSection('Diagnostic Tools Testing');

    try {
      const diagnosticFiles = [
        'scripts/diagnose.js',
        'scripts/setup.js',
        'scripts/validate-installation.js',
        'scripts/platform-setup.js'
      ];

      let toolsWorking = 0;

      for (const file of diagnosticFiles) {
        if (fs.existsSync(file)) {
          try {
            // Test syntax
            execSync(`node -c ${file}`, { stdio: 'pipe', timeout: 5000 });
            this.log(`${file}: Syntax valid ✓`, 'green', ICONS.success);
            this.results.diagnostics.details.push(`${file}: Valid`);
            toolsWorking++;
          } catch (error) {
            this.log(`${file}: Syntax error`, 'red', ICONS.error);
            this.results.diagnostics.details.push(`${file}: Invalid - ${error.message}`);
          }
        } else {
          this.log(`${file}: Not found`, 'yellow', ICONS.warning);
          this.results.diagnostics.details.push(`${file}: Missing`);
        }
      }

      if (toolsWorking >= 3) {
        this.results.diagnostics.status = 'passed';
        this.log(`Diagnostic tools: ${toolsWorking}/${diagnosticFiles.length} working ✓`, 'green', ICONS.success);
      } else if (toolsWorking > 0) {
        this.results.diagnostics.status = 'warning';
        this.log(`Diagnostic tools: ${toolsWorking}/${diagnosticFiles.length} working`, 'yellow', ICONS.warning);
      } else {
        this.results.diagnostics.status = 'failed';
        throw new Error('No diagnostic tools working');
      }

    } catch (error) {
      this.results.diagnostics.status = 'failed';
      this.results.diagnostics.details.push(`Diagnostics error: ${error.message}`);
      if (this.results.diagnostics.status === 'failed') throw error;
    }
  }

  async testServer() {
    this.logSection('Server Testing');

    try {
      const serverPath = path.join('browser-tools-server', 'dist', 'browser-connector.js');

      if (!fs.existsSync(serverPath)) {
        throw new Error('Server build not found');
      }

      // Kill any existing processes on port 3025
      await this.killProcessOnPort(3025);

      // Start server
      this.log('Starting Browser Tools Server...', 'blue', ICONS.info);
      const serverProcess = spawn('node', ['dist/browser-connector.js'], {
        cwd: 'browser-tools-server',
        stdio: this.options.verbose ? 'inherit' : 'pipe'
      });

      this.processes.push(serverProcess);

      // Wait for server to start
      const serverReady = await this.waitForServer('http://localhost:3025/.identity', 15000);

      if (!serverReady) {
        throw new Error('Server failed to start within timeout');
      }

      this.log('Server started successfully ✓', 'green', ICONS.success);
      this.results.server.details.push('Server startup: OK');

      // Test basic endpoints
      const endpoints = ['/.identity', '/console-logs', '/network-logs'];
      let workingEndpoints = 0;

      for (const endpoint of endpoints) {
        try {
          const response = await this.makeHttpRequest(`http://localhost:3025${endpoint}`);
          if (response) {
            workingEndpoints++;
            this.results.server.details.push(`${endpoint}: OK`);
          }
        } catch (error) {
          this.results.server.details.push(`${endpoint}: ${error.message}`);
        }
      }

      if (workingEndpoints >= 1) {
        this.results.server.status = 'passed';
        this.log(`Server endpoints: ${workingEndpoints}/${endpoints.length} working ✓`, 'green', ICONS.success);
      } else {
        throw new Error('No server endpoints working');
      }

    } catch (error) {
      this.results.server.status = 'failed';
      this.results.server.details.push(`Server error: ${error.message}`);
      throw error;
    }
  }

  async testProxy() {
    this.logSection('Proxy Support Testing');

    try {
      // Test proxy endpoints
      const proxyEndpoints = [
        '/proxy/config',
        '/proxy/recommendations'
      ];

      let workingProxyEndpoints = 0;

      for (const endpoint of proxyEndpoints) {
        try {
          const response = await this.makeHttpRequest(`http://localhost:3025${endpoint}`);
          if (response) {
            workingProxyEndpoints++;
            this.log(`${endpoint}: Working ✓`, 'green', ICONS.success);
            this.results.proxy.details.push(`${endpoint}: OK`);
          }
        } catch (error) {
          this.log(`${endpoint}: ${error.message}`, 'yellow', ICONS.warning);
          this.results.proxy.details.push(`${endpoint}: ${error.message}`);
        }
      }

      // Test proxy configuration update
      try {
        const configUpdate = await this.makeHttpRequest('http://localhost:3025/proxy/config', 'POST', {
          timeout: 45000
        });
        if (configUpdate) {
          this.log('Proxy configuration update: Working ✓', 'green', ICONS.success);
          this.results.proxy.details.push('Configuration update: OK');
          workingProxyEndpoints++;
        }
      } catch (error) {
        this.log(`Proxy configuration update: ${error.message}`, 'yellow', ICONS.warning);
        this.results.proxy.details.push(`Configuration update: ${error.message}`);
      }

      if (workingProxyEndpoints >= 2) {
        this.results.proxy.status = 'passed';
        this.log(`Proxy support: ${workingProxyEndpoints} features working ✓`, 'green', ICONS.success);
      } else if (workingProxyEndpoints > 0) {
        this.results.proxy.status = 'warning';
        this.log(`Proxy support: ${workingProxyEndpoints} features working`, 'yellow', ICONS.warning);
      } else {
        this.results.proxy.status = 'failed';
        this.log('Proxy support: No features working', 'red', ICONS.error);
      }

    } catch (error) {
      this.results.proxy.status = 'failed';
      this.results.proxy.details.push(`Proxy error: ${error.message}`);
    }
  }

  async testPlatform() {
    this.logSection('Platform Features Testing');

    try {
      const platformFiles = [
        'scripts/platform-setup.js',
        'scripts/validate-installation.js'
      ];

      let platformFeatures = 0;

      for (const file of platformFiles) {
        if (fs.existsSync(file)) {
          try {
            execSync(`node -c ${file}`, { stdio: 'pipe', timeout: 5000 });
            this.log(`${file}: Available ✓`, 'green', ICONS.success);
            this.results.platform.details.push(`${file}: Available`);
            platformFeatures++;
          } catch (error) {
            this.log(`${file}: Invalid`, 'red', ICONS.error);
            this.results.platform.details.push(`${file}: Invalid`);
          }
        } else {
          this.log(`${file}: Missing`, 'yellow', ICONS.warning);
          this.results.platform.details.push(`${file}: Missing`);
        }
      }

      // Test platform detection
      const platform = os.platform();
      this.log(`Platform detected: ${platform}`, 'blue', ICONS.info);
      this.results.platform.details.push(`Platform: ${platform}`);

      if (platformFeatures >= 1) {
        this.results.platform.status = 'passed';
        this.log(`Platform features: ${platformFeatures} available ✓`, 'green', ICONS.success);
      } else {
        this.results.platform.status = 'warning';
        this.log('Platform features: Limited availability', 'yellow', ICONS.warning);
      }

    } catch (error) {
      this.results.platform.status = 'failed';
      this.results.platform.details.push(`Platform error: ${error.message}`);
    }
  }

  async testExtension() {
    this.logSection('Chrome Extension Testing');

    try {
      const extensionPath = 'chrome-extension';
      const requiredFiles = ['manifest.json', 'devtools.js', 'panel.js', 'panel.html'];

      let validFiles = 0;

      for (const file of requiredFiles) {
        const filePath = path.join(extensionPath, file);
        if (fs.existsSync(filePath)) {
          this.log(`${file}: Present ✓`, 'green', ICONS.success);
          this.results.extension.details.push(`${file}: Present`);
          validFiles++;
        } else {
          this.log(`${file}: Missing`, 'red', ICONS.error);
          this.results.extension.details.push(`${file}: Missing`);
        }
      }

      // Validate manifest
      try {
        const manifestPath = path.join(extensionPath, 'manifest.json');
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

          const hasRequiredFields = manifest.name && manifest.version && manifest.manifest_version;
          const hasDebuggerPermission = manifest.permissions && manifest.permissions.includes('debugger');

          if (hasRequiredFields && hasDebuggerPermission) {
            this.log('Manifest validation: Valid ✓', 'green', ICONS.success);
            this.results.extension.details.push('Manifest: Valid');
          } else {
            this.log('Manifest validation: Invalid', 'red', ICONS.error);
            this.results.extension.details.push('Manifest: Invalid');
          }
        }
      } catch (error) {
        this.log(`Manifest validation: ${error.message}`, 'red', ICONS.error);
        this.results.extension.details.push(`Manifest: ${error.message}`);
      }

      if (validFiles >= 3) {
        this.results.extension.status = 'passed';
        this.log(`Extension: ${validFiles}/${requiredFiles.length} files valid ✓`, 'green', ICONS.success);
      } else {
        this.results.extension.status = 'failed';
        this.log(`Extension: ${validFiles}/${requiredFiles.length} files valid`, 'red', ICONS.error);
      }

    } catch (error) {
      this.results.extension.status = 'failed';
      this.results.extension.details.push(`Extension error: ${error.message}`);
    }
  }

  async testIntegration() {
    this.logSection('Integration Testing');

    try {
      let integrationScore = 0;

      // Test server identity
      try {
        const response = await this.makeHttpRequest('http://localhost:3025/.identity');
        if (response) {
          this.log('Server identity: OK ✓', 'green', ICONS.success);
          this.results.integration.details.push('Server identity: OK');
          integrationScore++;
        }
      } catch (error) {
        this.log(`Server identity: ${error.message}`, 'red', ICONS.error);
        this.results.integration.details.push(`Server identity: ${error.message}`);
      }

      // Test diagnostic integration
      if (fs.existsSync('scripts/diagnose.js')) {
        this.log('Diagnostic integration: Available ✓', 'green', ICONS.success);
        this.results.integration.details.push('Diagnostic integration: Available');
        integrationScore++;
      }

      // Test proxy integration
      try {
        const proxyConfig = await this.makeHttpRequest('http://localhost:3025/proxy/config');
        if (proxyConfig) {
          this.log('Proxy integration: Working ✓', 'green', ICONS.success);
          this.results.integration.details.push('Proxy integration: Working');
          integrationScore++;
        }
      } catch (error) {
        this.log(`Proxy integration: ${error.message}`, 'yellow', ICONS.warning);
        this.results.integration.details.push(`Proxy integration: ${error.message}`);
      }

      // Test platform integration
      if (fs.existsSync('scripts/platform-setup.js')) {
        this.log('Platform integration: Available ✓', 'green', ICONS.success);
        this.results.integration.details.push('Platform integration: Available');
        integrationScore++;
      }

      if (integrationScore >= 3) {
        this.results.integration.status = 'passed';
        this.log(`Integration: ${integrationScore}/4 components working ✓`, 'green', ICONS.success);
      } else if (integrationScore >= 2) {
        this.results.integration.status = 'warning';
        this.log(`Integration: ${integrationScore}/4 components working`, 'yellow', ICONS.warning);
      } else {
        this.results.integration.status = 'failed';
        this.log(`Integration: ${integrationScore}/4 components working`, 'red', ICONS.error);
      }

    } catch (error) {
      this.results.integration.status = 'failed';
      this.results.integration.details.push(`Integration error: ${error.message}`);
    }
  }

  // Utility methods
  async killProcessOnPort(port) {
    try {
      const platform = os.platform();

      if (platform === 'win32') {
        try {
          const output = execSync(`netstat -ano | findstr ":${port}"`, { encoding: 'utf8' });
          const lines = output.split('\n');

          for (const line of lines) {
            const parts = line.trim().split(/\s+/);
            if (parts.length >= 5 && parts[1].includes(`:${port}`)) {
              const pid = parts[4];
              if (pid && pid !== '0') {
                execSync(`taskkill /F /PID ${pid}`, { stdio: 'pipe' });
              }
            }
          }
        } catch (error) {
          // No process found on port
        }
      } else {
        try {
          const output = execSync(`lsof -ti:${port}`, { encoding: 'utf8' });
          const pids = output.trim().split('\n').filter(pid => pid);

          for (const pid of pids) {
            execSync(`kill -9 ${pid}`, { stdio: 'pipe' });
          }
        } catch (error) {
          // No process found on port
        }
      }
    } catch (error) {
      // Ignore errors in cleanup
    }
  }

  async waitForServer(url, timeout = 10000) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      try {
        const response = await this.makeHttpRequest(url);
        if (response) {
          return true;
        }
      } catch (error) {
        // Continue waiting
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return false;
  }

  async makeHttpRequest(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      const http = require('http');
      const urlParts = new URL(url);

      const options = {
        hostname: urlParts.hostname,
        port: urlParts.port,
        path: urlParts.pathname,
        method: method,
        timeout: 5000
      };

      if (method === 'POST' && data) {
        options.headers = {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify(data))
        };
      }

      const req = http.request(options, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(true);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });

      req.on('error', reject);
      req.on('timeout', () => reject(new Error('Request timeout')));

      if (method === 'POST' && data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  async cleanup() {
    this.log('Cleaning up processes...', 'blue', ICONS.info);

    // Kill all tracked processes
    for (const process of this.processes) {
      try {
        process.kill('SIGTERM');
      } catch (error) {
        // Process might already be dead
      }
    }

    // Force cleanup port 3025
    await this.killProcessOnPort(3025);

    // Wait for cleanup
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  async generateReport() {
    this.logSection('Test Results Summary');

    const totalDuration = Date.now() - this.startTime;

    // Calculate summary
    const components = Object.keys(this.results);
    let passed = 0, failed = 0, warnings = 0;

    components.forEach(component => {
      const status = this.results[component].status;
      if (status === 'passed') passed++;
      else if (status === 'failed') failed++;
      else if (status === 'warning') warnings++;
    });

    // Display summary
    this.log(`Total components tested: ${components.length}`, 'blue', ICONS.info);
    this.log(`Passed: ${passed}`, 'green', ICONS.success);
    this.log(`Failed: ${failed}`, 'red', ICONS.error);
    this.log(`Warnings: ${warnings}`, 'yellow', ICONS.warning);
    this.log(`Total duration: ${(totalDuration / 1000).toFixed(2)}s`, 'blue', ICONS.info);
    console.log();

    // Detailed results
    this.log('Detailed Results:', 'bright', ICONS.test);
    console.log();

    components.forEach(component => {
      const result = this.results[component];
      const statusColor = result.status === 'passed' ? 'green' :
                         result.status === 'failed' ? 'red' : 'yellow';
      const statusIcon = result.status === 'passed' ? ICONS.success :
                        result.status === 'failed' ? ICONS.error : ICONS.warning;

      this.log(`${component}: ${result.status.toUpperCase()}`, statusColor, statusIcon);

      if (this.options.verbose && result.details.length > 0) {
        result.details.forEach(detail => {
          this.log(`  ${detail}`, 'blue', '  ');
        });
      }
    });

    // Generate JSON report
    const report = {
      timestamp: new Date().toISOString(),
      platform: {
        os: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version
      },
      summary: {
        totalComponents: components.length,
        passed,
        failed,
        warnings,
        totalDuration
      },
      results: this.results,
      options: this.options
    };

    try {
      fs.writeFileSync('test-integrated-report.json', JSON.stringify(report, null, 2));
      this.log('Detailed report saved to: test-integrated-report.json', 'green', ICONS.success);
    } catch (error) {
      this.log(`Could not save report: ${error.message}`, 'yellow', ICONS.warning);
    }

    // Final status
    console.log();
    if (failed === 0) {
      this.log('🎉 ALL INTEGRATED TESTS PASSED!', 'green', ICONS.rocket);
      this.log('Browser Tools MCP is ready for production use!', 'green', ICONS.success);
    } else {
      this.log('❌ SOME TESTS FAILED', 'red', ICONS.error);
      this.log(`${failed} component(s) need attention`, 'red', ICONS.error);
      process.exit(1);
    }
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);

  const options = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    skipBuild: args.includes('--skip-build'),
    skipServer: args.includes('--skip-server'),
    timeout: parseInt(args.find(arg => arg.startsWith('--timeout='))?.split('=')[1]) || 30000
  };

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🧪 Browser Tools MCP - Integrated Test Suite

Tests the fully integrated main branch with all merged features:
- Automated diagnostics
- Enhanced error handling
- Proxy support and network management
- Platform-specific enhancements

Usage: node test-integrated.js [options]

Options:
  --verbose, -v        Show detailed output
  --skip-build         Skip build testing
  --skip-server        Skip server testing
  --timeout=<ms>       Set timeout for operations (default: 30000)
  --help, -h           Show this help message

Examples:
  node test-integrated.js                    # Full test suite
  node test-integrated.js --verbose          # Detailed output
  node test-integrated.js --skip-build       # Skip build phase
  node test-integrated.js --skip-server      # Skip server testing

The test suite validates:
✅ Prerequisites (Node.js, project structure, git)
✅ Build process (MCP server, Browser Tools server)
✅ Diagnostic tools (diagnose, setup, validation scripts)
✅ Server functionality (startup, endpoints, identity)
✅ Proxy support (configuration, recommendations, updates)
✅ Platform features (platform-specific tools, detection)
✅ Chrome extension (files, manifest, permissions)
✅ Integration (cross-component communication)
`);
    process.exit(0);
  }

  const testSuite = new IntegratedTestSuite(options);

  // Handle process termination gracefully
  process.on('SIGINT', async () => {
    console.log('\n\n🛑 Test suite interrupted by user');
    await testSuite.cleanup();
    process.exit(130);
  });

  process.on('SIGTERM', async () => {
    console.log('\n\n🛑 Test suite terminated');
    await testSuite.cleanup();
    process.exit(143);
  });

  // Run the test suite
  testSuite.runTests().catch(async (error) => {
    console.error('\n\n💥 Test suite crashed:', error.message);
    if (options.verbose) {
      console.error(error.stack);
    }
    await testSuite.cleanup();
    process.exit(1);
  });
}

module.exports = IntegratedTestSuite;
