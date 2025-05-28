# 📁 WebAI-MCP Project Structure

```
WebAI-MCP/
├── 📁 .github/
│   └── 📁 workflows/
│       ├── 🧪 test.yml                    # Test automation (9-matrix)
│       ├── 🧪 dev-auto-release.yml        # Dev branch auto-releases
│       ├── 🚀 main-auto-release.yml       # Main branch auto-releases
│       └── 🔧 manual-release.yml          # Manual release workflow
│
├── 📁 webai-mcp/                          # MCP Server Package
│   ├── 📄 mcp-server.ts                   # Main MCP server implementation
│   ├── 📄 version-checker.ts              # Version compatibility checker
│   ├── 📄 error-handler.ts                # Error handling utilities
│   ├── 📄 package.json                    # MCP package configuration
│   ├── 📄 tsconfig.json                   # TypeScript configuration
│   ├── 📁 dist/                           # Compiled JavaScript output
│   ├── 📁 node_modules/                   # Dependencies
│   └── 📁 tests/                          # MCP server tests
│
├── 📁 webai-server/                       # WebAI Server Package
│   ├── 📄 browser-connector.ts            # Main browser connection server
│   ├── 📄 puppeteer-service.ts            # Puppeteer automation service
│   ├── 📄 auto-paste-manager.ts           # Auto-paste functionality
│   ├── 📄 proxy-config.ts                 # Proxy configuration
│   ├── 📄 package.json                    # Server package configuration
│   ├── 📄 tsconfig.json                   # TypeScript configuration
│   ├── 📁 lighthouse/                     # Lighthouse audit modules
│   │   ├── 📄 index.ts                    # Main lighthouse exports
│   │   ├── 📄 accessibility.ts            # Accessibility audits
│   │   ├── 📄 performance.ts              # Performance audits
│   │   ├── 📄 seo.ts                      # SEO audits
│   │   ├── 📄 best-practices.ts           # Best practices audits
│   │   └── 📄 types.ts                    # Lighthouse type definitions
│   ├── 📁 dist/                           # Compiled JavaScript output
│   └── 📁 node_modules/                   # Dependencies
│
├── 📁 chrome-extension/                   # Chrome Extension
│   ├── 📄 manifest.json                   # Extension manifest (v3)
│   ├── 📄 background.js                   # Service worker
│   ├── 📄 devtools.html                   # DevTools page
│   ├── 📄 devtools.js                     # DevTools script
│   ├── 📄 panel.html                      # DevTools panel UI
│   └── 📄 panel.js                        # DevTools panel logic
│
├── 📁 docs/                               # Documentation
│   ├── 📄 INSTALLATION_GUIDE.md           # Installation instructions
│   ├── 📄 RELEASE_SETUP.md                # Release automation setup
│   ├── 📄 CHANGELOG_AUTOMATION.md         # Changelog automation guide
│   ├── 📄 VERSION_TOOLS.md                # Version management tools
│   ├── 📄 mcp-docs.md                     # MCP protocol documentation
│   └── 📁 i18n/                           # Internationalization
│       └── 📄 README_CN.md                # Chinese documentation
│
├── 📁 scripts/                            # Automation Scripts
│   ├── 📄 setup.js                        # Project setup script
│   ├── 📄 diagnose.js                     # Diagnostic utilities
│   ├── 📄 platform-setup.js               # Platform-specific setup
│   ├── 📄 validate-installation.js        # Installation validator
│   ├── 📄 update-changelog.sh             # Changelog update script
│   └── 📄 README.md                       # Scripts documentation
│
├── 📁 tests/                              # Test Suite
│   ├── 📄 test-all.js                     # Comprehensive test runner
│   ├── 📄 test-element-interaction.html   # UI interaction tests
│   ├── 📄 test-prompt-comprehensive.md    # Test prompts and scenarios
│   └── 📄 README.md                       # Testing documentation
│
├── 📁 WebAI-MCP-TESTING/                  # Test Output Data
│   ├── 📁 hidealldata/                    # Maximum privacy tests
│   ├── 📁 hidesensitivedata/              # Sensitive data filtering tests
│   └── 📁 hidenothing/                    # No privacy filtering tests
│
├── 📁 node_modules/                       # Root Dependencies
│   └── 📦 [Various npm packages]          # Changelog automation tools
│
├── 📄 package.json                        # Root package configuration
├── 📄 package-lock.json                   # Dependency lock file
├── 📄 version.json                        # Version tracking
├── 📄 README.md                           # Main project documentation
├── 📄 CHANGELOG.md                        # Project changelog
├── 📄 LICENSE                             # MIT license
│
├── 📄 AUTO_PASTE_GUIDE.md                 # Auto-paste setup guide
├── 📄 WINDOWS_AUTO_PASTE_GUIDE.md         # Windows-specific guide
├── 📄 EXTENSION_TROUBLESHOOTING.md        # Extension troubleshooting
├── 📄 BRANCH_PROTECTION_GUIDE.md          # Branch protection setup
├── 📄 DEV_BRANCH_STRATEGY.md              # Development workflow
├── 📄 GITHUB_ACTIONS_FIXES.md             # CI/CD troubleshooting
├── 📄 MCP_STDIO_LOGGING_FIX.md            # MCP logging fixes
├── 📄 MIDDLEMAN_SERVER_CONNECTION_FIXES.md # Connection troubleshooting
├── 📄 PRIVACY_FILTERING_FIXES.md          # Privacy filtering guide
├── 📄 fix_remaining_connections.md        # Connection fixes
├── 📄 test_privacy_filtering.js           # Privacy filtering tests
└── 📄 webai_mcp_complete_guide.md         # Complete usage guide
```

## 📊 **Project Statistics**

- **🎯 Total MCP Tools**: 18+ browser automation tools
- **🔧 Core Packages**: 2 (webai-mcp, webai-server)
- **🌐 Chrome Extension**: Manifest v3 compatible
- **🧪 Test Coverage**: 9-matrix CI/CD (3 OS × 3 Node.js versions)
- **🚀 Release Automation**: Full automated releases (dev + main)
- **📚 Documentation**: Comprehensive guides in multiple languages
- **🔒 Privacy Levels**: 3 configurable privacy filtering modes

## 🎯 **Key Components**

| Component | Purpose | Language |
|-----------|---------|----------|
| **webai-mcp** | MCP Server with 18+ tools | TypeScript |
| **webai-server** | Browser connector & automation | TypeScript |
| **chrome-extension** | DevTools integration | JavaScript |
| **lighthouse** | Web auditing (SEO, Performance, A11y) | TypeScript |
| **GitHub Actions** | CI/CD automation | YAML |
| **Documentation** | Guides & troubleshooting | Markdown |

## 🔄 **Workflow Overview**

```
Development → Testing → Release
     ↓           ↓        ↓
   dev branch → 9-matrix → auto-release
     ↓           ↓        ↓
   main branch → tests → production
```
