# Development Branch Strategy

## 🌿 Branch Structure

### **Main Branches**
- **`main`** - Production-ready code, stable releases
- **`dev`** - Development branch, integration of new features

### **Feature Branches**
- **`feature/feature-name`** - Individual feature development
- **`bugfix/issue-description`** - Bug fixes
- **`hotfix/critical-fix`** - Critical production fixes (branch from main)

## 📦 NPM Publishing Strategy

### **NPM Tags**
- **`latest`** - Stable production releases (from `main`)
- **`dev`** - Development releases (from `dev` branch)

### **Version Numbering**
- **Production**: `1.4.0`, `1.4.1`, `1.5.0`
- **Development**: `1.5.0-dev.1`, `1.5.0-dev.2`, `1.5.0-dev.3`

## 🔄 Workflow

### **Development Workflow**
1. **Create feature branch** from `dev`
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/new-feature
   ```

2. **Develop and test** feature
3. **Create PR** to `dev` branch
4. **Merge to dev** after review
5. **Publish dev release** to NPM

### **Release Workflow**
1. **Test dev branch** thoroughly
2. **Create PR** from `dev` to `main`
3. **Merge to main** after final review
4. **Auto-publish stable release** to NPM
5. **Create GitHub release** with changelog

### **Hotfix Workflow**
1. **Create hotfix branch** from `main`
2. **Fix critical issue**
3. **Create PR** to `main`
4. **Merge and publish** hotfix release
5. **Merge main back** to `dev`

## 🚀 Automated Publishing

### **GitHub Actions for Dev Releases**

Create `.github/workflows/dev-release.yml`:

```yaml
name: Dev Release

on:
  push:
    branches: [dev]
  workflow_dispatch:

jobs:
  publish-dev:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: |
          cd browser-tools-server && npm ci
          cd ../browser-tools-mcp && npm ci

      - name: Build packages
        run: |
          cd browser-tools-server && npm run build
          cd ../browser-tools-mcp && npm run build

      - name: Version packages (dev)
        run: |
          cd browser-tools-server
          npm version prerelease --preid=dev --no-git-tag-version
          cd ../browser-tools-mcp
          npm version prerelease --preid=dev --no-git-tag-version

      - name: Publish to NPM (dev tag)
        run: |
          cd browser-tools-server
          npm publish --tag dev
          cd ../browser-tools-mcp
          npm publish --tag dev
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_DEPLOY }}
```

### **GitHub Actions for Beta Releases**

Create `.github/workflows/beta-release.yml`:

```yaml
name: Beta Release

on:
  push:
    branches: [staging]
  workflow_dispatch:

jobs:
  publish-beta:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: |
          cd browser-tools-server && npm ci
          cd ../browser-tools-mcp && npm ci

      - name: Build packages
        run: |
          cd browser-tools-server && npm run build
          cd ../browser-tools-mcp && npm run build

      - name: Version packages (beta)
        run: |
          cd browser-tools-server
          npm version prerelease --preid=beta --no-git-tag-version
          cd ../browser-tools-mcp
          npm version prerelease --preid=beta --no-git-tag-version

      - name: Publish to NPM (beta tag)
        run: |
          cd browser-tools-server
          npm publish --tag beta
          cd ../browser-tools-mcp
          npm publish --tag beta
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_DEPLOY }}
```

## 📋 Branch Protection Rules

### **Main Branch Protection**
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- Restrict pushes to admins only

### **Dev Branch Protection**
- Require pull request reviews
- Allow force pushes (for development flexibility)
- Require status checks to pass

## 🧪 Testing Strategy

### **Branch-Specific Testing**
- **Feature branches**: Unit tests, basic integration
- **Dev branch**: Full test suite, automated testing, manual testing
- **Main branch**: Production validation, smoke tests

## 📖 Usage Instructions

### **For End Users**
```bash
# Install stable version (recommended)
npx @cpjet64/browser-tools-mcp@latest
npx @cpjet64/browser-tools-server@latest

# Install development version (latest features, may be unstable)
npx @cpjet64/browser-tools-mcp@dev
npx @cpjet64/browser-tools-server@dev
```

### **For Contributors**
```bash
# Start development
git clone https://github.com/cpjet64/browser-tools-mcp.git
cd browser-tools-mcp
git checkout dev

# Create feature branch
git checkout -b feature/my-new-feature

# Make changes, commit, push
git add .
git commit -m "feat: add new feature"
git push origin feature/my-new-feature

# Create PR to dev branch
```

## 🔍 Monitoring

### **NPM Package Monitoring**
- Monitor download stats for each tag
- Track version adoption rates
- Monitor for security vulnerabilities

### **GitHub Monitoring**
- Track PR merge rates
- Monitor CI/CD success rates
- Review branch health metrics

### **For Maintainers**
```bash
# Release workflow
git checkout dev
# Test thoroughly, ensure everything works

git checkout main
git merge dev
git push origin main
# This triggers automatic production release

# Sync dev with main
git checkout dev
git merge main
git push origin dev
```

## 🔍 Version Management

### **Development Versions**
- Auto-increment on each dev branch push
- Format: `1.5.0-dev.1`, `1.5.0-dev.2`, etc.
- Published with `dev` tag on NPM

### **Production Versions**
- Manual version bump before merging to main
- Semantic versioning: `major.minor.patch`
- Published with `latest` tag on NPM

## 📝 Documentation Updates

Add to README.md installation section:

```markdown
## 🧪 Development Version

Want to try the latest features before they're released?

```bash
# Install development version (may be unstable)
npx @cpjet64/browser-tools-mcp@dev
npx @cpjet64/browser-tools-server@dev
```

**Note**: Development versions include the latest features but may be unstable. Use `@latest` for production.
```

## 🎯 Benefits

This simplified strategy provides:

1. **Clear separation** - Stable (`main`) vs Development (`dev`)
2. **Simple workflow** - Feature → Dev → Main
3. **Automated publishing** - Push to branch = NPM release
4. **Easy testing** - Users can easily try dev features
5. **Minimal complexity** - Just two main branches to manage
6. **Professional workflow** - Standard for open source projects

## 🚀 Next Steps

1. **Create dev branch** from current main
2. **Set up GitHub Actions** for automated publishing
3. **Configure branch protection** rules
4. **Update documentation** with dev installation instructions
5. **Start using feature branches** for new development
