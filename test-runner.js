#!/usr/bin/env node

/**
 * Comprehensive Automated Testing Script for Browser Tools MCP
 *
 * Tests all feature branches and main branch with complete automation.
 * Uses CommonJS for maximum compatibility.
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
  magenta: '\x1b[35m',
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
  tools: '🔧',
  branch: '🌿',
  clock: '⏱️',
  report: '📊'
};

class TestRunner {
  constructor(options = {}) {
    this.options = {
      timeout: 30000,
      serverStartupTimeout: 15000,
      skipCleanup: false,
      verbose: false,
      ...options
    };

    this.branches = [
      'main',
      'feature/automated-diagnostics',
      'feature/enhanced-error-handling',
      'feature/proxy-support',
      'feature/platform-enhancements'
    ];

    this.testResults = new Map();
    this.processes = new Map();
    this.originalBranch = null;
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
    this.log('Browser Tools MCP - Comprehensive Test Suite', 'bright', ICONS.rocket);
    this.log(`Platform: ${os.platform()} ${os.arch()}`, 'blue', ICONS.info);
    this.log(`Testing ${this.branches.length} branches`, 'blue', ICONS.branch);
    console.log();

    try {
      await this.initialize();
      await this.runAllBranchTests();
      await this.generateReport();
    } catch (error) {
      this.log(`Test suite failed: ${error.message}`, 'red', ICONS.error);
      await this.cleanup();
      process.exit(1);
    } finally {
      await this.restoreOriginalState();
    }
  }

  async initialize() {
    this.logSection('Initialization');

    // Store original branch
    try {
      this.originalBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      this.log(`Original branch: ${this.originalBranch}`, 'blue', ICONS.info);
    } catch (error) {
      this.log('Could not determine original branch', 'yellow', ICONS.warning);
    }

    // Check prerequisites
    await this.checkPrerequisites();

    // Initialize test results
    this.branches.forEach(branch => {
      this.testResults.set(branch, {
        overall: 'pending',
        components: {
          prerequisites: { status: 'pending', details: [] },
          build: { status: 'pending', details: [] },
          server: { status: 'pending', details: [] },
          extension: { status: 'pending', details: [] },
          integration: { status: 'pending', details: [] }
        },
        metrics: {
          buildTime: 0,
          serverStartupTime: 0,
          testDuration: 0
        },
        errors: [],
        warnings: []
      });
    });
  }

  async checkPrerequisites() {
    this.log('Checking prerequisites...', 'blue', ICONS.test);

    // Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

    if (majorVersion >= 18) {
      this.log(`Node.js ${nodeVersion} ✓`, 'green', ICONS.success);
    } else {
      throw new Error(`Node.js ${nodeVersion} is too old (requires >=18)`);
    }

    // Git availability
    try {
      execSync('git --version', { stdio: 'pipe' });
      this.log('Git available ✓', 'green', ICONS.success);
    } catch (error) {
      throw new Error('Git is required for branch switching');
    }

    // Check if we're in a git repository
    try {
      execSync('git status', { stdio: 'pipe' });
      this.log('Git repository ✓', 'green', ICONS.success);
    } catch (error) {
      throw new Error('Not in a git repository');
    }

    // Chrome availability check
    await this.checkChromeAvailability();
  }

  async checkChromeAvailability() {
    const platform = os.platform();
    let chromeFound = false;

    try {
      if (platform === 'win32') {
        const chromePaths = [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        ];
        chromeFound = chromePaths.some(chromePath => fs.existsSync(chromePath));
      } else if (platform === 'darwin') {
        chromeFound = fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
      } else {
        try {
          execSync('which google-chrome || which chromium-browser', { stdio: 'pipe' });
          chromeFound = true;
        } catch (error) {
          chromeFound = false;
        }
      }

      if (chromeFound) {
        this.log('Chrome browser found ✓', 'green', ICONS.success);
      } else {
        this.log('Chrome not found - extension tests may be limited', 'yellow', ICONS.warning);
      }
    } catch (error) {
      this.log('Could not verify Chrome availability', 'yellow', ICONS.warning);
    }
  }

  async runAllBranchTests() {
    this.logSection('Branch Testing');

    for (const branch of this.branches) {
      await this.testBranch(branch);
    }
  }

  async testBranch(branch) {
    const branchStartTime = Date.now();
    this.log(`Testing branch: ${branch}`, 'cyan', ICONS.branch);

    const result = this.testResults.get(branch);

    try {
      // Switch to branch
      await this.switchToBranch(branch);

      // Test components
      await this.testPrerequisites(branch);
      await this.testBuildProcess(branch);
      await this.testServer(branch);
      await this.testExtension(branch);
      await this.testIntegration(branch);

      // Calculate overall status
      const componentStatuses = Object.values(result.components).map(c => c.status);
      const hasFailures = componentStatuses.includes('failed');
      const hasWarnings = componentStatuses.includes('warning');

      result.overall = hasFailures ? 'failed' : hasWarnings ? 'warning' : 'passed';

      this.log(`Branch ${branch}: ${result.overall.toUpperCase()}`,
        result.overall === 'passed' ? 'green' : result.overall === 'failed' ? 'red' : 'yellow',
        result.overall === 'passed' ? ICONS.success : result.overall === 'failed' ? ICONS.error : ICONS.warning
      );

    } catch (error) {
      result.overall = 'failed';
      result.errors.push(`Branch testing failed: ${error.message}`);
      this.log(`Branch ${branch} failed: ${error.message}`, 'red', ICONS.error);
    } finally {
      // Cleanup processes for this branch
      await this.cleanupBranchProcesses(branch);

      // Record metrics
      result.metrics.testDuration = Date.now() - branchStartTime;
    }
  }

  async switchToBranch(branch) {
    try {
      this.log(`Switching to branch: ${branch}`, 'blue', ICONS.info);

      // Stash any changes
      try {
        execSync('git stash push -m "Automated test stash"', { stdio: 'pipe' });
      } catch (error) {
        // No changes to stash
      }

      // Switch branch
      execSync(`git checkout ${branch}`, { stdio: 'pipe' });

    } catch (error) {
      throw new Error(`Failed to switch to branch ${branch}: ${error.message}`);
    }
  }

  async testPrerequisites(branch) {
    const result = this.testResults.get(branch);

    try {
      this.log(`Testing prerequisites for ${branch}...`, 'blue', ICONS.test);

      const requiredDirs = ['browser-tools-mcp', 'browser-tools-server', 'chrome-extension'];
      const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir));

      if (missingDirs.length === 0) {
        result.components.prerequisites.status = 'passed';
        result.components.prerequisites.details.push('All required directories present');
      } else {
        result.components.prerequisites.status = 'failed';
        result.components.prerequisites.details.push(`Missing directories: ${missingDirs.join(', ')}`);
      }

    } catch (error) {
      result.components.prerequisites.status = 'failed';
      result.components.prerequisites.details.push(`Prerequisites check failed: ${error.message}`);
    }
  }

  async testBuildProcess(branch) {
    const result = this.testResults.get(branch);
    const buildStartTime = Date.now();

    try {
      this.log(`Testing build process for ${branch}...`, 'blue', ICONS.test);

      const packages = [
        { name: 'MCP Server', path: 'browser-tools-mcp' },
        { name: 'Browser Tools Server', path: 'browser-tools-server' }
      ];

      let allBuildsSuccessful = true;
      const buildDetails = [];

      for (const pkg of packages) {
        try {
          const packagePath = path.join(process.cwd(), pkg.path);

          this.log(`Building ${pkg.name}...`, 'blue', ICONS.info);

          // Install dependencies
          execSync('npm install', {
            cwd: packagePath,
            stdio: this.options.verbose ? 'inherit' : 'pipe',
            timeout: this.options.timeout
          });

          // Build package
          execSync('npm run build', {
            cwd: packagePath,
            stdio: this.options.verbose ? 'inherit' : 'pipe',
            timeout: this.options.timeout
          });

          // Verify build output
          const distPath = path.join(packagePath, 'dist');
          if (fs.existsSync(distPath) && fs.readdirSync(distPath).length > 0) {
            buildDetails.push(`${pkg.name}: Build successful`);
            this.log(`${pkg.name} built successfully`, 'green', ICONS.success);
          } else {
            allBuildsSuccessful = false;
            buildDetails.push(`${pkg.name}: Build produced no output`);
            this.log(`${pkg.name} build failed - no output`, 'red', ICONS.error);
          }

        } catch (error) {
          allBuildsSuccessful = false;
          buildDetails.push(`${pkg.name}: Build failed - ${error.message}`);
          this.log(`${pkg.name} build failed: ${error.message}`, 'red', ICONS.error);
        }
      }

      result.components.build.status = allBuildsSuccessful ? 'passed' : 'failed';
      result.components.build.details = buildDetails;
      result.metrics.buildTime = Date.now() - buildStartTime;

    } catch (error) {
      result.components.build.status = 'failed';
      result.components.build.details.push(`Build process failed: ${error.message}`);
    }
  }

  async testServer(branch) {
    const result = this.testResults.get(branch);
    const serverStartTime = Date.now();

    try {
      this.log(`Testing server for ${branch}...`, 'blue', ICONS.server);

      const serverPath = path.join(process.cwd(), 'browser-tools-server', 'dist', 'browser-connector.js');

      if (!fs.existsSync(serverPath)) {
        result.components.server.status = 'failed';
        result.components.server.details.push('Server build not found');
        return;
      }

      // Kill any existing processes on port 3025
      await this.killProcessOnPort(3025);

      // Start server
      this.log('Starting Browser Tools Server...', 'blue', ICONS.info);
      const serverProcess = spawn('node', ['dist/browser-connector.js'], {
        cwd: path.join(process.cwd(), 'browser-tools-server'),
        stdio: this.options.verbose ? 'inherit' : 'pipe',
        detached: false
      });

      // Store process for cleanup
      this.processes.set(`${branch}-server`, serverProcess);

      // Wait for server to start
      const serverReady = await this.waitForServer('http://localhost:3025/.identity', this.options.serverStartupTimeout);

      if (!serverReady) {
        result.components.server.status = 'failed';
        result.components.server.details.push('Server failed to start within timeout');
        return;
      }

      result.metrics.serverStartupTime = Date.now() - serverStartTime;

      // Test server endpoints
      const endpointResults = await this.testServerEndpoints();

      const allEndpointsWorking = endpointResults.every(r => r.success);
      result.components.server.status = allEndpointsWorking ? 'passed' : 'warning';
      result.components.server.details = [
        'Server started successfully',
        ...endpointResults.map(r => `${r.endpoint}: ${r.success ? 'OK' : r.error}`)
      ];

      this.log('Server testing completed', 'green', ICONS.success);

    } catch (error) {
      result.components.server.status = 'failed';
      result.components.server.details.push(`Server test failed: ${error.message}`);
    }
  }

  async testExtension(branch) {
    const result = this.testResults.get(branch);

    try {
      this.log(`Testing Chrome extension for ${branch}...`, 'blue', ICONS.browser);

      const extensionPath = path.join(process.cwd(), 'chrome-extension');
      const requiredFiles = ['manifest.json', 'devtools.js', 'panel.js', 'panel.html'];

      const fileResults = [];
      let allFilesPresent = true;

      for (const file of requiredFiles) {
        const filePath = path.join(extensionPath, file);
        if (fs.existsSync(filePath)) {
          fileResults.push(`${file}: Present`);
        } else {
          fileResults.push(`${file}: Missing`);
          allFilesPresent = false;
        }
      }

      // Validate manifest
      let manifestValid = false;
      try {
        const manifestPath = path.join(extensionPath, 'manifest.json');
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

          const hasRequiredFields = manifest.name && manifest.version && manifest.manifest_version;
          const hasDebuggerPermission = manifest.permissions && manifest.permissions.includes('debugger');

          manifestValid = hasRequiredFields && hasDebuggerPermission;

          fileResults.push(`Manifest version: ${manifest.manifest_version}`);
          fileResults.push(`Debugger permission: ${hasDebuggerPermission ? 'Yes' : 'No'}`);
        }
      } catch (error) {
        fileResults.push(`Manifest validation failed: ${error.message}`);
      }

      const extensionStatus = allFilesPresent && manifestValid ? 'passed' : 'failed';
      result.components.extension.status = extensionStatus;
      result.components.extension.details = fileResults;

      this.log('Extension testing completed', 'green', ICONS.success);

    } catch (error) {
      result.components.extension.status = 'failed';
      result.components.extension.details.push(`Extension test failed: ${error.message}`);
    }
  }

  async testIntegration(branch) {
    const result = this.testResults.get(branch);

    try {
      this.log(`Testing integration for ${branch}...`, 'blue', ICONS.test);

      const integrationResults = [];

      // Test server connectivity
      const serverConnection = await this.testServerConnection();
      integrationResults.push(`Server connectivity: ${serverConnection.success ? 'OK' : serverConnection.error}`);

      // Test diagnostic tools if available
      const diagnosticFiles = ['scripts/diagnose.js', 'scripts/validate-installation.js'];
      let diagnosticsAvailable = false;

      for (const file of diagnosticFiles) {
        if (fs.existsSync(file)) {
          diagnosticsAvailable = true;
          try {
            // Test if script is syntactically valid
            execSync(`node -c ${file}`, { stdio: 'pipe', timeout: 5000 });
            integrationResults.push(`${file}: Valid`);
          } catch (error) {
            integrationResults.push(`${file}: Invalid - ${error.message}`);
          }
        }
      }

      if (diagnosticsAvailable) {
        integrationResults.push('Diagnostic tools: Available');
      } else {
        integrationResults.push('Diagnostic tools: Not available');
      }

      const allIntegrationTestsPassed = integrationResults.every(r => r.includes('OK') || r.includes('Valid') || r.includes('Available'));
      result.components.integration.status = allIntegrationTestsPassed ? 'passed' : 'warning';
      result.components.integration.details = integrationResults;

      this.log('Integration testing completed', 'green', ICONS.success);

    } catch (error) {
      result.components.integration.status = 'failed';
      result.components.integration.details.push(`Integration test failed: ${error.message}`);
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
                this.log(`Killed process ${pid} on port ${port}`, 'blue', ICONS.info);
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
            this.log(`Killed process ${pid} on port ${port}`, 'blue', ICONS.info);
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
        // Use a simple HTTP request instead of fetch for better compatibility
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

  async makeHttpRequest(url) {
    return new Promise((resolve, reject) => {
      const http = require('http');
      const urlParts = new URL(url);

      const options = {
        hostname: urlParts.hostname,
        port: urlParts.port,
        path: urlParts.pathname,
        method: 'GET',
        timeout: 2000
      };

      const req = http.request(options, (res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });

      req.on('error', reject);
      req.on('timeout', () => reject(new Error('Request timeout')));
      req.end();
    });
  }

  async testServerEndpoints() {
    const endpoints = ['/.identity', '/console-logs', '/network-logs', '/settings'];
    const results = [];

    for (const endpoint of endpoints) {
      try {
        const success = await this.makeHttpRequest(`http://localhost:3025${endpoint}`);
        results.push({ endpoint, success: true, error: null });
      } catch (error) {
        results.push({ endpoint, success: false, error: error.message });
      }
    }

    return results;
  }

  async testServerConnection() {
    try {
      const success = await this.makeHttpRequest('http://localhost:3025/.identity');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async cleanupBranchProcesses(branch) {
    const serverProcess = this.processes.get(`${branch}-server`);

    if (serverProcess) {
      try {
        serverProcess.kill('SIGTERM');
        this.processes.delete(`${branch}-server`);
        this.log(`Stopped server process for ${branch}`, 'blue', ICONS.info);
      } catch (error) {
        // Process might already be dead
      }
    }

    // Wait for processes to clean up
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Force kill any remaining processes on port 3025
    await this.killProcessOnPort(3025);
  }

  async cleanup() {
    this.log('Cleaning up all processes...', 'blue', ICONS.info);

    // Kill all tracked processes
    for (const [key, process] of this.processes) {
      try {
        process.kill('SIGTERM');
        this.log(`Stopped process: ${key}`, 'blue', ICONS.info);
      } catch (error) {
        // Process might already be dead
      }
    }

    this.processes.clear();

    // Force cleanup port 3025
    await this.killProcessOnPort(3025);

    // Wait for cleanup
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  async restoreOriginalState() {
    if (this.originalBranch) {
      try {
        this.log(`Restoring original branch: ${this.originalBranch}`, 'blue', ICONS.info);
        execSync(`git checkout ${this.originalBranch}`, { stdio: 'pipe' });

        // Restore any stashed changes
        try {
          execSync('git stash pop', { stdio: 'pipe' });
        } catch (error) {
          // No stash to pop
        }
      } catch (error) {
        this.log(`Could not restore original branch: ${error.message}`, 'yellow', ICONS.warning);
      }
    }
  }

  async generateReport() {
    this.logSection('Test Results Summary');

    const totalDuration = Date.now() - this.startTime;

    // Calculate summary statistics
    let passed = 0, failed = 0, warnings = 0;

    for (const [branch, result] of this.testResults) {
      if (result.overall === 'passed') passed++;
      else if (result.overall === 'failed') failed++;
      else if (result.overall === 'warning') warnings++;
    }

    // Display overall summary
    this.log(`Total branches tested: ${this.branches.length}`, 'blue', ICONS.info);
    this.log(`Passed: ${passed}`, 'green', ICONS.success);
    this.log(`Failed: ${failed}`, 'red', ICONS.error);
    this.log(`Warnings: ${warnings}`, 'yellow', ICONS.warning);
    this.log(`Total duration: ${(totalDuration / 1000).toFixed(2)}s`, 'blue', ICONS.clock);
    console.log();

    // Display detailed results
    this.log('Detailed Results by Branch:', 'bright', ICONS.branch);
    console.log();

    for (const [branch, result] of this.testResults) {
      const statusColor = result.overall === 'passed' ? 'green' :
                         result.overall === 'failed' ? 'red' : 'yellow';
      const statusIcon = result.overall === 'passed' ? ICONS.success :
                        result.overall === 'failed' ? ICONS.error : ICONS.warning;

      this.log(`${branch}: ${result.overall.toUpperCase()}`, statusColor, statusIcon);

      // Component details
      for (const [componentName, component] of Object.entries(result.components)) {
        const compStatusColor = component.status === 'passed' ? 'green' :
                               component.status === 'failed' ? 'red' : 'yellow';
        const compStatusIcon = component.status === 'passed' ? ICONS.success :
                              component.status === 'failed' ? ICONS.error : ICONS.warning;

        this.log(`  ${componentName}: ${component.status}`, compStatusColor, compStatusIcon);

        if (this.options.verbose && component.details.length > 0) {
          component.details.forEach(detail => {
            this.log(`    ${detail}`, 'blue', '    ');
          });
        }
      }

      // Show errors
      if (result.errors.length > 0) {
        this.log(`  Errors:`, 'red', ICONS.error);
        result.errors.forEach(error => {
          this.log(`    ${error}`, 'red', '    ');
        });
      }

      console.log();
    }

    // Performance metrics
    if (this.options.verbose) {
      this.log('Performance Metrics:', 'bright', ICONS.clock);
      console.log();

      for (const [branch, result] of this.testResults) {
        this.log(`${branch}:`, 'cyan', ICONS.branch);
        this.log(`  Build time: ${(result.metrics.buildTime / 1000).toFixed(2)}s`, 'blue', '  ');
        this.log(`  Server startup: ${(result.metrics.serverStartupTime / 1000).toFixed(2)}s`, 'blue', '  ');
        this.log(`  Test duration: ${(result.metrics.testDuration / 1000).toFixed(2)}s`, 'blue', '  ');
      }
      console.log();
    }

    // Generate JSON report
    await this.generateJSONReport(totalDuration);

    // Final status
    console.log();
    if (failed === 0) {
      this.log('🎉 ALL TESTS PASSED!', 'green', ICONS.rocket);
      this.log('All branches are ready for integration and deployment', 'green', ICONS.success);
    } else {
      this.log('❌ SOME TESTS FAILED', 'red', ICONS.error);
      this.log(`${failed} branch(es) have issues that need attention`, 'red', ICONS.error);
      process.exit(1);
    }
  }

  async generateJSONReport(totalDuration) {
    const report = {
      timestamp: new Date().toISOString(),
      platform: {
        os: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version
      },
      summary: {
        totalBranches: this.branches.length,
        totalDuration: totalDuration
      },
      branches: Object.fromEntries(this.testResults),
      options: this.options
    };

    try {
      const reportPath = path.join(process.cwd(), 'test-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      this.log(`Detailed report saved to: ${reportPath}`, 'green', ICONS.success);
    } catch (error) {
      this.log(`Could not save report: ${error.message}`, 'yellow', ICONS.warning);
    }
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);

  // Parse command line options
  const options = {
    timeout: parseInt(args.find(arg => arg.startsWith('--timeout='))?.split('=')[1]) || 30000,
    serverStartupTimeout: parseInt(args.find(arg => arg.startsWith('--server-timeout='))?.split('=')[1]) || 15000,
    skipCleanup: args.includes('--skip-cleanup'),
    verbose: args.includes('--verbose') || args.includes('-v')
  };

  // Parse branch selection
  const branchArg = args.find(arg => arg.startsWith('--branches='));
  if (branchArg) {
    const selectedBranches = branchArg.split('=')[1].split(',');
    options.selectedBranches = selectedBranches;
  }

  // Help message
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🧪 Browser Tools MCP - Comprehensive Test Runner

Usage: node test-runner.js [options]

Options:
  --timeout=<ms>           Global timeout for operations (default: 30000)
  --server-timeout=<ms>    Server startup timeout (default: 15000)
  --branches=<list>        Comma-separated list of branches to test
  --skip-cleanup           Skip cleanup processes (for debugging)
  --verbose, -v            Show detailed output
  --help, -h               Show this help message

Examples:
  node test-runner.js                                    # Test all branches
  node test-runner.js --verbose                          # Detailed output
  node test-runner.js --branches=main,feature/proxy-support  # Test specific branches
  node test-runner.js --timeout=60000                    # Longer timeout

The script will automatically:
1. Test all specified branches
2. Build and validate all components
3. Start and test servers
4. Validate Chrome extension
5. Test integration
6. Generate comprehensive reports
7. Clean up and restore original state
`);
    process.exit(0);
  }

  // Create and run test suite
  const testRunner = new TestRunner(options);

  // Override branches if specified
  if (options.selectedBranches) {
    testRunner.branches = options.selectedBranches;
  }

  // Handle process termination gracefully
  process.on('SIGINT', async () => {
    console.log('\n\n🛑 Test suite interrupted by user');
    await testRunner.cleanup();
    await testRunner.restoreOriginalState();
    process.exit(130);
  });

  process.on('SIGTERM', async () => {
    console.log('\n\n🛑 Test suite terminated');
    await testRunner.cleanup();
    await testRunner.restoreOriginalState();
    process.exit(143);
  });

  // Run the test suite
  testRunner.runTests().catch(async (error) => {
    console.error('\n\n💥 Test suite crashed:', error.message);
    if (options.verbose) {
      console.error(error.stack);
    }
    await testRunner.cleanup();
    await testRunner.restoreOriginalState();
    process.exit(1);
  });
}

module.exports = TestRunner;
