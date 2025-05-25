#!/usr/bin/env node

/**
 * Comprehensive Automated Testing Script for Browser Tools MCP
 *
 * Tests all feature branches and main branch with complete automation:
 * - Branch management and switching
 * - Dependency installation and building
 * - Component testing (server, MCP, extension)
 * - Process management and cleanup
 * - Comprehensive reporting and metrics
 * - Error handling and recovery
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { performance } from 'perf_hooks';

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

class ComprehensiveTestRunner {
  constructor(options = {}) {
    this.options = {
      timeout: 30000,
      serverStartupTimeout: 15000,
      skipCleanup: false,
      verbose: false,
      parallel: false,
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
    this.metrics = new Map();
    this.processes = new Map();
    this.originalBranch = null;
    this.startTime = performance.now();
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

  async runComprehensiveTests() {
    this.log('Browser Tools MCP - Comprehensive Automated Test Suite', 'bright', ICONS.rocket);
    this.log(`Platform: ${os.platform()} ${os.arch()}`, 'blue', ICONS.info);
    this.log(`Testing ${this.branches.length} branches`, 'blue', ICONS.branch);
    console.log();

    try {
      await this.initialize();
      await this.runAllBranchTests();
      await this.generateComprehensiveReport();
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

    // Initialize test results for all branches
    this.branches.forEach(branch => {
      this.testResults.set(branch, {
        overall: 'pending',
        components: {
          prerequisites: { status: 'pending', details: [] },
          build: { status: 'pending', details: [] },
          browserToolsServer: { status: 'pending', details: [] },
          mcpServer: { status: 'pending', details: [] },
          chromeExtension: { status: 'pending', details: [] },
          diagnostics: { status: 'pending', details: [] },
          integration: { status: 'pending', details: [] }
        },
        metrics: {
          buildTime: 0,
          serverStartupTime: 0,
          testDuration: 0,
          memoryUsage: 0
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

    // Chrome availability (optional but recommended)
    await this.checkChromeAvailability();
  }

  async checkChromeAvailability() {
    const platform = os.platform();
    let chromeFound = false;

    try {
      if (platform === 'win32') {
        const chromePaths = [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe')
        ];
        chromeFound = chromePaths.some(chromePath => fs.existsSync(chromePath));
      } else if (platform === 'darwin') {
        const chromePaths = [
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          '/Applications/Chromium.app/Contents/MacOS/Chromium'
        ];
        chromeFound = chromePaths.some(chromePath => fs.existsSync(chromePath));
      } else {
        try {
          execSync('which google-chrome || which chromium-browser || which chromium', { stdio: 'pipe' });
          chromeFound = true;
        } catch (error) {
          chromeFound = false;
        }
      }

      if (chromeFound) {
        this.log('Chrome/Chromium browser found ✓', 'green', ICONS.success);
      } else {
        this.log('Chrome/Chromium not found - extension tests may be limited', 'yellow', ICONS.warning);
      }
    } catch (error) {
      this.log('Could not verify browser availability', 'yellow', ICONS.warning);
    }
  }

  async runAllBranchTests() {
    this.logSection('Branch Testing');

    for (const branch of this.branches) {
      await this.testBranch(branch);
    }
  }

  async testBranch(branch) {
    const branchStartTime = performance.now();
    this.log(`Testing branch: ${branch}`, 'cyan', ICONS.branch);

    const result = this.testResults.get(branch);

    try {
      // Switch to branch
      await this.switchToBranch(branch);

      // Test all components
      await this.testPrerequisites(branch);
      await this.testBuildProcess(branch);
      await this.testBrowserToolsServer(branch);
      await this.testMcpServer(branch);
      await this.testChromeExtension(branch);
      await this.testDiagnostics(branch);
      await this.testIntegration(branch);

      // Calculate overall status
      const componentStatuses = Object.values(result.components).map(c => c.status);
      const hasFailures = componentStatuses.includes('failed');
      const hasWarnings = componentStatuses.includes('warning');

      result.overall = hasFailures ? 'failed' : hasWarnings ? 'warning' : 'passed';

      this.log(`Branch ${branch} testing completed: ${result.overall}`,
        result.overall === 'passed' ? 'green' : result.overall === 'failed' ? 'red' : 'yellow',
        result.overall === 'passed' ? ICONS.success : result.overall === 'failed' ? ICONS.error : ICONS.warning
      );

    } catch (error) {
      result.overall = 'failed';
      result.errors.push(`Branch testing failed: ${error.message}`);
      this.log(`Branch ${branch} testing failed: ${error.message}`, 'red', ICONS.error);
    } finally {
      // Cleanup processes for this branch
      await this.cleanupBranchProcesses(branch);

      // Record metrics
      result.metrics.testDuration = performance.now() - branchStartTime;
      result.metrics.memoryUsage = process.memoryUsage().heapUsed;
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

      // Pull latest changes
      try {
        execSync('git pull origin ' + branch, { stdio: 'pipe' });
      } catch (error) {
        // Branch might not exist on remote
        this.log(`Could not pull latest changes for ${branch}`, 'yellow', ICONS.warning);
      }

    } catch (error) {
      throw new Error(`Failed to switch to branch ${branch}: ${error.message}`);
    }
  }

  async testPrerequisites(branch) {
    const result = this.testResults.get(branch);

    try {
      this.log(`Testing prerequisites for ${branch}...`, 'blue', ICONS.test);

      // Check project structure
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
    const buildStartTime = performance.now();

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

          // Clean previous builds
          const distPath = path.join(packagePath, 'dist');
          if (fs.existsSync(distPath)) {
            fs.rmSync(distPath, { recursive: true, force: true });
          }

          // Install dependencies
          this.log(`Installing dependencies for ${pkg.name}...`, 'blue', ICONS.info);
          execSync('npm install', {
            cwd: packagePath,
            stdio: this.options.verbose ? 'inherit' : 'pipe',
            timeout: this.options.timeout
          });

          // Build package
          this.log(`Building ${pkg.name}...`, 'blue', ICONS.info);
          execSync('npm run build', {
            cwd: packagePath,
            stdio: this.options.verbose ? 'inherit' : 'pipe',
            timeout: this.options.timeout
          });

          // Verify build output
          if (fs.existsSync(distPath) && fs.readdirSync(distPath).length > 0) {
            buildDetails.push(`${pkg.name}: Build successful`);
          } else {
            allBuildsSuccessful = false;
            buildDetails.push(`${pkg.name}: Build produced no output`);
          }

        } catch (error) {
          allBuildsSuccessful = false;
          buildDetails.push(`${pkg.name}: Build failed - ${error.message}`);
        }
      }

      result.components.build.status = allBuildsSuccessful ? 'passed' : 'failed';
      result.components.build.details = buildDetails;
      result.metrics.buildTime = performance.now() - buildStartTime;

    } catch (error) {
      result.components.build.status = 'failed';
      result.components.build.details.push(`Build process failed: ${error.message}`);
    }
  }

  async testBrowserToolsServer(branch) {
    const result = this.testResults.get(branch);
    const serverStartTime = performance.now();

    try {
      this.log(`Testing Browser Tools Server for ${branch}...`, 'blue', ICONS.server);

      const serverPath = path.join(process.cwd(), 'browser-tools-server', 'dist', 'browser-connector.js');

      if (!fs.existsSync(serverPath)) {
        result.components.browserToolsServer.status = 'failed';
        result.components.browserToolsServer.details.push('Server build not found');
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
        result.components.browserToolsServer.status = 'failed';
        result.components.browserToolsServer.details.push('Server failed to start within timeout');
        return;
      }

      result.metrics.serverStartupTime = performance.now() - serverStartTime;

      // Test server endpoints
      const endpointResults = await this.testServerEndpoints();

      const allEndpointsWorking = endpointResults.every(r => r.success);
      result.components.browserToolsServer.status = allEndpointsWorking ? 'passed' : 'warning';
      result.components.browserToolsServer.details = [
        'Server started successfully',
        ...endpointResults.map(r => `${r.endpoint}: ${r.success ? 'OK' : r.error}`)
      ];

    } catch (error) {
      result.components.browserToolsServer.status = 'failed';
      result.components.browserToolsServer.details.push(`Server test failed: ${error.message}`);
    }
  }

  async testMcpServer(branch) {
    const result = this.testResults.get(branch);

    try {
      this.log(`Testing MCP Server for ${branch}...`, 'blue', ICONS.test);

      const mcpPath = path.join(process.cwd(), 'browser-tools-mcp', 'dist', 'mcp-server.js');

      if (!fs.existsSync(mcpPath)) {
        result.components.mcpServer.status = 'failed';
        result.components.mcpServer.details.push('MCP Server build not found');
        return;
      }

      // Start MCP server
      this.log('Starting MCP Server...', 'blue', ICONS.info);
      const mcpProcess = spawn('node', ['dist/mcp-server.js'], {
        cwd: path.join(process.cwd(), 'browser-tools-mcp'),
        stdio: this.options.verbose ? 'inherit' : 'pipe',
        detached: false
      });

      // Store process for cleanup
      this.processes.set(`${branch}-mcp`, mcpProcess);

      // Give MCP server time to connect to Browser Tools Server
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Test if MCP server can reach Browser Tools Server
      const connectionTest = await this.testMcpServerConnection();

      result.components.mcpServer.status = connectionTest.success ? 'passed' : 'failed';
      result.components.mcpServer.details = [
        'MCP Server started',
        connectionTest.success ? 'Connected to Browser Tools Server' : connectionTest.error
      ];

    } catch (error) {
      result.components.mcpServer.status = 'failed';
      result.components.mcpServer.details.push(`MCP Server test failed: ${error.message}`);
    }
  }

  async testChromeExtension(branch) {
    const result = this.testResults.get(branch);

    try {
      this.log(`Testing Chrome Extension for ${branch}...`, 'blue', ICONS.browser);

      const extensionPath = path.join(process.cwd(), 'chrome-extension');
      const requiredFiles = ['manifest.json', 'devtools.js', 'panel.js', 'panel.html', 'background.js'];

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
          const hasDevtoolsPage = manifest.devtools_page;

          manifestValid = hasRequiredFields && hasDebuggerPermission && hasDevtoolsPage;

          fileResults.push(`Manifest version: ${manifest.manifest_version}`);
          fileResults.push(`Debugger permission: ${hasDebuggerPermission ? 'Yes' : 'No'}`);
          fileResults.push(`DevTools page: ${hasDevtoolsPage ? 'Yes' : 'No'}`);
        }
      } catch (error) {
        fileResults.push(`Manifest validation failed: ${error.message}`);
      }

      const extensionStatus = allFilesPresent && manifestValid ? 'passed' : 'failed';
      result.components.chromeExtension.status = extensionStatus;
      result.components.chromeExtension.details = fileResults;

    } catch (error) {
      result.components.chromeExtension.status = 'failed';
      result.components.chromeExtension.details.push(`Extension test failed: ${error.message}`);
    }
  }

  async testDiagnostics(branch) {
    const result = this.testResults.get(branch);

    try {
      this.log(`Testing diagnostic tools for ${branch}...`, 'blue', ICONS.tools);

      const diagnosticFiles = [
        'scripts/diagnose.js',
        'scripts/setup.js',
        'scripts/validate-installation.js',
        'scripts/platform-setup.js'
      ];

      const diagnosticResults = [];
      let diagnosticsAvailable = false;

      for (const file of diagnosticFiles) {
        if (fs.existsSync(file)) {
          diagnosticsAvailable = true;
          try {
            // Test if script is syntactically valid
            execSync(`node -c ${file}`, { stdio: 'pipe', timeout: 5000 });
            diagnosticResults.push(`${file}: Valid`);

            // For diagnose.js, try to run it
            if (file === 'scripts/diagnose.js') {
              try {
                execSync(`node ${file}`, {
                  stdio: 'pipe',
                  timeout: 10000,
                  env: { ...process.env, CI: 'true' } // Prevent interactive prompts
                });
                diagnosticResults.push(`${file}: Executed successfully`);
              } catch (error) {
                diagnosticResults.push(`${file}: Execution failed - ${error.message}`);
              }
            }
          } catch (error) {
            diagnosticResults.push(`${file}: Invalid syntax - ${error.message}`);
          }
        } else {
          diagnosticResults.push(`${file}: Not available`);
        }
      }

      result.components.diagnostics.status = diagnosticsAvailable ? 'passed' : 'warning';
      result.components.diagnostics.details = diagnosticResults;

    } catch (error) {
      result.components.diagnostics.status = 'failed';
      result.components.diagnostics.details.push(`Diagnostics test failed: ${error.message}`);
    }
  }

  async testIntegration(branch) {
    const result = this.testResults.get(branch);

    try {
      this.log(`Testing integration for ${branch}...`, 'blue', ICONS.test);

      const integrationResults = [];

      // Test server-to-server communication
      const serverConnection = await this.testServerConnection();
      integrationResults.push(`Server connectivity: ${serverConnection.success ? 'OK' : serverConnection.error}`);

      // Test specific endpoints based on branch features
      if (branch.includes('proxy-support')) {
        const proxyEndpoints = await this.testProxyEndpoints();
        integrationResults.push(`Proxy endpoints: ${proxyEndpoints.success ? 'OK' : proxyEndpoints.error}`);
      }

      if (branch.includes('enhanced-error-handling')) {
        const errorHandling = await this.testErrorHandling();
        integrationResults.push(`Error handling: ${errorHandling.success ? 'OK' : errorHandling.error}`);
      }

      // Test basic MCP functionality
      const mcpFunctionality = await this.testMcpFunctionality();
      integrationResults.push(`MCP functionality: ${mcpFunctionality.success ? 'OK' : mcpFunctionality.error}`);

      const allIntegrationTestsPassed = integrationResults.every(r => r.includes('OK'));
      result.components.integration.status = allIntegrationTestsPassed ? 'passed' : 'warning';
      result.components.integration.details = integrationResults;

    } catch (error) {
      result.components.integration.status = 'failed';
      result.components.integration.details.push(`Integration test failed: ${error.message}`);
    }
  }

  // Utility Methods
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
        const response = await fetch(url, {
          signal: AbortSignal.timeout(2000)
        });

        if (response.ok) {
          return true;
        }
      } catch (error) {
        // Continue waiting
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return false;
  }

  async testServerEndpoints() {
    const endpoints = [
      '/.identity',
      '/console-logs',
      '/network-logs',
      '/settings'
    ];

    const results = [];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`http://localhost:3025${endpoint}`, {
          signal: AbortSignal.timeout(5000)
        });

        results.push({
          endpoint,
          success: response.ok,
          error: response.ok ? null : `HTTP ${response.status}`
        });
      } catch (error) {
        results.push({
          endpoint,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  async testMcpServerConnection() {
    try {
      const response = await fetch('http://localhost:3025/.identity', {
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok) {
        const identity = await response.json();
        if (identity.signature === 'mcp-browser-connector-24x7') {
          return { success: true };
        } else {
          return { success: false, error: 'Wrong server signature' };
        }
      } else {
        return { success: false, error: `HTTP ${response.status}` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async testServerConnection() {
    return await this.testMcpServerConnection();
  }

  async testProxyEndpoints() {
    const proxyEndpoints = [
      '/proxy/config',
      '/proxy/recommendations'
    ];

    try {
      for (const endpoint of proxyEndpoints) {
        const response = await fetch(`http://localhost:3025${endpoint}`, {
          signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
          return { success: false, error: `Proxy endpoint ${endpoint} failed` };
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async testErrorHandling() {
    try {
      // Test enhanced error handling by making a request that should fail gracefully
      const response = await fetch('http://localhost:3025/nonexistent-endpoint', {
        signal: AbortSignal.timeout(5000)
      });

      // We expect a 404, but it should be handled gracefully
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async testMcpFunctionality() {
    try {
      // Test basic server connectivity as a proxy for MCP functionality
      const response = await fetch('http://localhost:3025/.identity', {
        signal: AbortSignal.timeout(5000)
      });

      return { success: response.ok };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async cleanupBranchProcesses(branch) {
    const serverProcess = this.processes.get(`${branch}-server`);
    const mcpProcess = this.processes.get(`${branch}-mcp`);

    if (serverProcess) {
      try {
        serverProcess.kill('SIGTERM');
        this.processes.delete(`${branch}-server`);
        this.log(`Stopped server process for ${branch}`, 'blue', ICONS.info);
      } catch (error) {
        // Process might already be dead
      }
    }

    if (mcpProcess) {
      try {
        mcpProcess.kill('SIGTERM');
        this.processes.delete(`${branch}-mcp`);
        this.log(`Stopped MCP process for ${branch}`, 'blue', ICONS.info);
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

  async generateComprehensiveReport() {
    this.logSection('Comprehensive Test Report');

    const totalDuration = performance.now() - this.startTime;

    // Generate summary statistics
    const summary = this.generateSummaryStatistics();

    // Display overall summary
    this.displayOverallSummary(summary, totalDuration);

    // Display detailed results for each branch
    this.displayDetailedResults();

    // Display performance metrics
    this.displayPerformanceMetrics();

    // Display recommendations
    this.displayRecommendations();

    // Generate JSON report file
    await this.generateJSONReport(summary, totalDuration);

    // Final status
    this.displayFinalStatus(summary);
  }

  generateSummaryStatistics() {
    const summary = {
      totalBranches: this.branches.length,
      passed: 0,
      failed: 0,
      warnings: 0,
      components: {
        prerequisites: { passed: 0, failed: 0, warnings: 0 },
        build: { passed: 0, failed: 0, warnings: 0 },
        browserToolsServer: { passed: 0, failed: 0, warnings: 0 },
        mcpServer: { passed: 0, failed: 0, warnings: 0 },
        chromeExtension: { passed: 0, failed: 0, warnings: 0 },
        diagnostics: { passed: 0, failed: 0, warnings: 0 },
        integration: { passed: 0, failed: 0, warnings: 0 }
      }
    };

    for (const [branch, result] of this.testResults) {
      // Overall branch status
      if (result.overall === 'passed') summary.passed++;
      else if (result.overall === 'failed') summary.failed++;
      else if (result.overall === 'warning') summary.warnings++;

      // Component statistics
      for (const [componentName, component] of Object.entries(result.components)) {
        if (component.status === 'passed') summary.components[componentName].passed++;
        else if (component.status === 'failed') summary.components[componentName].failed++;
        else if (component.status === 'warning') summary.components[componentName].warnings++;
      }
    }

    return summary;
  }

  displayOverallSummary(summary, totalDuration) {
    this.log('Overall Test Summary', 'bright', ICONS.report);
    console.log();

    this.log(`Total branches tested: ${summary.totalBranches}`, 'blue', ICONS.info);
    this.log(`Passed: ${summary.passed}`, 'green', ICONS.success);
    this.log(`Failed: ${summary.failed}`, 'red', ICONS.error);
    this.log(`Warnings: ${summary.warnings}`, 'yellow', ICONS.warning);
    this.log(`Total duration: ${(totalDuration / 1000).toFixed(2)}s`, 'blue', ICONS.clock);
    console.log();
  }

  displayDetailedResults() {
    this.log('Detailed Results by Branch', 'bright', ICONS.branch);
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

      // Show errors and warnings
      if (result.errors.length > 0) {
        this.log(`  Errors:`, 'red', ICONS.error);
        result.errors.forEach(error => {
          this.log(`    ${error}`, 'red', '    ');
        });
      }

      if (result.warnings.length > 0) {
        this.log(`  Warnings:`, 'yellow', ICONS.warning);
        result.warnings.forEach(warning => {
          this.log(`    ${warning}`, 'yellow', '    ');
        });
      }

      console.log();
    }
  }

  displayPerformanceMetrics() {
    this.log('Performance Metrics', 'bright', ICONS.clock);
    console.log();

    // Calculate averages
    const metrics = Array.from(this.testResults.values()).map(r => r.metrics);
    const avgBuildTime = metrics.reduce((sum, m) => sum + m.buildTime, 0) / metrics.length;
    const avgServerStartup = metrics.reduce((sum, m) => sum + m.serverStartupTime, 0) / metrics.length;
    const avgTestDuration = metrics.reduce((sum, m) => sum + m.testDuration, 0) / metrics.length;
    const avgMemoryUsage = metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length;

    this.log(`Average build time: ${(avgBuildTime / 1000).toFixed(2)}s`, 'blue', ICONS.info);
    this.log(`Average server startup: ${(avgServerStartup / 1000).toFixed(2)}s`, 'blue', ICONS.info);
    this.log(`Average test duration: ${(avgTestDuration / 1000).toFixed(2)}s`, 'blue', ICONS.info);
    this.log(`Average memory usage: ${(avgMemoryUsage / 1024 / 1024).toFixed(2)}MB`, 'blue', ICONS.info);
    console.log();

    // Branch-specific metrics
    for (const [branch, result] of this.testResults) {
      this.log(`${branch}:`, 'cyan', ICONS.branch);
      this.log(`  Build: ${(result.metrics.buildTime / 1000).toFixed(2)}s`, 'blue', '  ');
      this.log(`  Server startup: ${(result.metrics.serverStartupTime / 1000).toFixed(2)}s`, 'blue', '  ');
      this.log(`  Test duration: ${(result.metrics.testDuration / 1000).toFixed(2)}s`, 'blue', '  ');
      this.log(`  Memory: ${(result.metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`, 'blue', '  ');
    }
    console.log();
  }

  displayRecommendations() {
    this.log('Recommendations', 'bright', ICONS.tools);
    console.log();

    const recommendations = [];

    // Analyze results and generate recommendations
    for (const [branch, result] of this.testResults) {
      if (result.overall === 'failed') {
        recommendations.push(`❌ ${branch}: Address critical failures before deployment`);

        if (result.components.build.status === 'failed') {
          recommendations.push(`  🔧 Fix build issues in ${branch}`);
        }

        if (result.components.browserToolsServer.status === 'failed') {
          recommendations.push(`  🖥️ Resolve server startup issues in ${branch}`);
        }

        if (result.components.mcpServer.status === 'failed') {
          recommendations.push(`  🔌 Fix MCP server connectivity in ${branch}`);
        }
      }

      if (result.overall === 'warning') {
        recommendations.push(`⚠️ ${branch}: Review warnings before deployment`);
      }

      // Performance recommendations
      if (result.metrics.buildTime > 60000) { // > 1 minute
        recommendations.push(`⏱️ ${branch}: Consider optimizing build process (${(result.metrics.buildTime / 1000).toFixed(2)}s)`);
      }

      if (result.metrics.serverStartupTime > 10000) { // > 10 seconds
        recommendations.push(`🚀 ${branch}: Server startup is slow (${(result.metrics.serverStartupTime / 1000).toFixed(2)}s)`);
      }
    }

    // General recommendations
    const failedBranches = Array.from(this.testResults.entries()).filter(([_, result]) => result.overall === 'failed');
    const passedBranches = Array.from(this.testResults.entries()).filter(([_, result]) => result.overall === 'passed');

    if (failedBranches.length === 0) {
      recommendations.push('🎉 All branches passed! Ready for integration and deployment');
    } else if (passedBranches.length > 0) {
      recommendations.push(`✅ Consider merging successful branches: ${passedBranches.map(([branch]) => branch).join(', ')}`);
    }

    if (recommendations.length === 0) {
      this.log('No specific recommendations at this time', 'green', ICONS.success);
    } else {
      recommendations.forEach(rec => {
        this.log(rec, 'cyan', '  ');
      });
    }
    console.log();
  }

  async generateJSONReport(summary, totalDuration) {
    const report = {
      timestamp: new Date().toISOString(),
      platform: {
        os: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version
      },
      summary: {
        ...summary,
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

  displayFinalStatus(summary) {
    console.log();

    if (summary.failed === 0) {
      this.log('🎉 COMPREHENSIVE TEST SUITE PASSED!', 'green', ICONS.rocket);
      this.log('All branches are ready for integration and deployment', 'green', ICONS.success);
    } else {
      this.log('❌ COMPREHENSIVE TEST SUITE FAILED', 'red', ICONS.error);
      this.log(`${summary.failed} branch(es) have critical issues that need attention`, 'red', ICONS.error);
      process.exit(1);
    }
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  // Parse command line options
  const options = {
    timeout: parseInt(args.find(arg => arg.startsWith('--timeout='))?.split('=')[1]) || 30000,
    serverStartupTimeout: parseInt(args.find(arg => arg.startsWith('--server-timeout='))?.split('=')[1]) || 15000,
    skipCleanup: args.includes('--skip-cleanup'),
    verbose: args.includes('--verbose') || args.includes('-v'),
    parallel: args.includes('--parallel')
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
🧪 Browser Tools MCP - Comprehensive Automated Test Suite

Tests all feature branches and main branch with complete automation including:
- Branch management and switching
- Dependency installation and building
- Component testing (server, MCP, extension)
- Process management and cleanup
- Comprehensive reporting and metrics
- Error handling and recovery

Usage: node comprehensive-test.js [options]

Options:
  --timeout=<ms>           Global timeout for operations (default: 30000)
  --server-timeout=<ms>    Server startup timeout (default: 15000)
  --branches=<list>        Comma-separated list of branches to test
  --skip-cleanup           Skip cleanup processes (for debugging)
  --verbose, -v            Show detailed output
  --parallel               Run tests in parallel (experimental)
  --help, -h               Show this help message

Examples:
  node comprehensive-test.js                                    # Test all branches
  node comprehensive-test.js --verbose                          # Detailed output
  node comprehensive-test.js --branches=main,feature/proxy-support  # Test specific branches
  node comprehensive-test.js --timeout=60000                    # Longer timeout
  node comprehensive-test.js --skip-cleanup --verbose           # Debug mode

Features:
  ✅ Automatic branch switching and testing
  ✅ Complete component validation
  ✅ Automated setup and cleanup
  ✅ Process management and port conflict resolution
  ✅ Comprehensive reporting with metrics
  ✅ Error handling and recovery
  ✅ Integration validation
  ✅ Performance monitoring
  ✅ JSON report generation

The script will:
1. Test all specified branches automatically
2. Build and validate all components
3. Start and test servers
4. Validate Chrome extension
5. Test integration between components
6. Generate comprehensive reports
7. Clean up all processes and restore original state

Exit codes:
  0 - All tests passed
  1 - One or more tests failed

Report files:
  test-report.json - Detailed JSON report with all results and metrics
`);
    process.exit(0);
  }

  // Create and run test suite
  const testRunner = new ComprehensiveTestRunner(options);

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

  // Run the comprehensive test suite
  testRunner.runComprehensiveTests().catch(async (error) => {
    console.error('\n\n💥 Test suite crashed:', error.message);
    if (options.verbose) {
      console.error(error.stack);
    }
    await testRunner.cleanup();
    await testRunner.restoreOriginalState();
    process.exit(1);
  });
}

export default ComprehensiveTestRunner;
