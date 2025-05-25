#!/usr/bin/env node

/**
 * Simple test runner for Browser Tools MCP integrated main branch
 */

const { execSync } = require('child_process');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  const colorCode = COLORS[color] || COLORS.reset;
  console.log(`${colorCode}${message}${COLORS.reset}`);
}

function showHelp() {
  console.log(`
🧪 Browser Tools MCP - Simple Test Runner

Quick testing options for the integrated main branch:

Usage: node test.js [option]

Options:
  quick          Quick test (skip build)
  full           Full comprehensive test
  verbose        Full test with detailed output
  build-only     Test build process only
  server-only    Test server functionality only
  help           Show this help message

Examples:
  node test.js quick          # Quick validation
  node test.js full           # Complete test suite
  node test.js verbose        # Detailed testing
  node test.js build-only     # Build testing only
  node test.js server-only    # Server testing only

For advanced options, use the integrated test suite directly:
  node test-integrated.js --help
`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('help') || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  const option = args[0];
  let command = 'node test-integrated.js';

  switch (option) {
    case 'quick':
      log('🚀 Running quick test (skipping build)...', 'cyan');
      command += ' --skip-build';
      break;

    case 'full':
      log('🔍 Running full comprehensive test...', 'cyan');
      // Use default settings
      break;

    case 'verbose':
      log('📋 Running full test with detailed output...', 'cyan');
      command += ' --verbose';
      break;

    case 'build-only':
      log('🔧 Testing build process only...', 'cyan');
      command += ' --skip-server';
      break;

    case 'server-only':
      log('🖥️ Testing server functionality only...', 'cyan');
      command += ' --skip-build';
      break;

    default:
      log(`❌ Unknown option: ${option}`, 'red');
      log('Run "node test.js help" to see available options', 'blue');
      process.exit(1);
  }

  // Execute the test
  try {
    log(`Executing: ${command}`, 'blue');
    console.log();
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log();
    log('✅ Test execution completed successfully!', 'green');
    
  } catch (error) {
    console.log();
    log('❌ Test execution failed!', 'red');
    log(`Exit code: ${error.status}`, 'red');
    process.exit(error.status || 1);
  }
}

main();
