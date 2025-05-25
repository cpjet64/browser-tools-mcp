#!/usr/bin/env node

/**
 * Simple wrapper for running comprehensive tests
 * Uses CommonJS for maximum compatibility
 */

const { execSync } = require('child_process');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
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
🧪 Browser Tools MCP - Test All Branches

Quick testing presets for common scenarios:

Usage: node run-tests.js [preset] [options]

Presets:
  quick          Test all branches with minimal output
  verbose        Test all branches with detailed output  
  main-only      Test only the main branch
  features-only  Test only feature branches
  single <name>  Test a specific branch
  debug          Test with debug mode (no cleanup)

Options:
  --help, -h     Show this help message

Examples:
  node run-tests.js quick                    # Quick test all branches
  node run-tests.js verbose                  # Detailed test all branches
  node run-tests.js main-only                # Test only main branch
  node run-tests.js features-only            # Test only feature branches
  node run-tests.js single main              # Test specific branch
  node run-tests.js debug                    # Debug mode

For advanced options, use the test runner directly:
  node test-runner.js --help
`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const preset = args[0];
  let command = 'node test-runner.js';

  switch (preset) {
    case 'quick':
      log('🚀 Running quick test of all branches...', 'cyan');
      // Use default settings (no additional flags)
      break;

    case 'verbose':
      log('🔍 Running verbose test of all branches...', 'cyan');
      command += ' --verbose';
      break;

    case 'main-only':
      log('🌿 Testing main branch only...', 'cyan');
      command += ' --branches=main';
      break;

    case 'features-only':
      log('🌿 Testing feature branches only...', 'cyan');
      command += ' --branches=feature/automated-diagnostics,feature/enhanced-error-handling,feature/proxy-support,feature/platform-enhancements';
      break;

    case 'single':
      const branchName = args[1];
      if (!branchName) {
        log('❌ Error: Please specify a branch name for single branch testing', 'red');
        log('Example: node run-tests.js single main', 'blue');
        process.exit(1);
      }
      log(`🌿 Testing single branch: ${branchName}...`, 'cyan');
      command += ` --branches=${branchName}`;
      break;

    case 'debug':
      log('🐛 Running in debug mode (no cleanup)...', 'cyan');
      command += ' --skip-cleanup --verbose';
      break;

    default:
      log(`❌ Unknown preset: ${preset}`, 'red');
      log('Run with --help to see available presets', 'blue');
      process.exit(1);
  }

  // Execute the test runner
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
