# 🚀 GitHub Workflows Summary

## 📋 Current Workflow Structure

After standardization, we now have **4 streamlined workflows** that provide full automation with manual override capabilities:

### 1. **🧪 Dev Auto Release** (`dev-auto-release.yml`)
**Purpose**: Automatic development releases and PR releases
**Triggers**:
- Test workflow completion on `dev` branch (automatic)
- Pull requests to `dev` branch
- Manual dispatch

**What it does**:
- ✅ **Depends on tests passing** before running
- ✅ Builds and tests packages
- ✅ Auto-increments dev version (`1.4.0-dev.1`, `1.4.0-dev.2`, etc.)
- ✅ **PR versions** (`1.4.0-pr-dev.123` for PR #123)
- ✅ Updates changelog with dev release entry
- ✅ Publishes to NPM with `@dev` tag
- ✅ Creates GitHub prerelease
- ✅ **PR-specific release names** ("🔀 WebAI-MCP v1.4.0-pr-dev.123 (PR #123 to dev)")
- ✅ Commits version changes back to `dev` branch

### 2. **🚀 Main Auto Release** (`main-auto-release.yml`)
**Purpose**: Automatic production releases and PR releases
**Triggers**:
- Test workflow completion on `main` branch (automatic)
- Pull requests to `main` branch
- Manual dispatch

**What it does**:
- ✅ **Depends on tests passing** before running
- ✅ Builds and tests packages
- ✅ Auto-increments patch version or uses existing if no release exists
- ✅ **PR versions** (`1.4.0-pr-main.456` for PR #456)
- ✅ Updates changelog with production release entry
- ✅ Updates documentation (README files)
- ✅ Publishes to NPM with `@latest` tag (or `@dev` for PRs)
- ✅ Creates full GitHub release (prerelease for PRs)
- ✅ **PR-specific release names** ("🔀 WebAI-MCP v1.4.0-pr-main.456 (PR #456 to main)")
- ✅ Commits version changes and creates tags on `main` branch

### 3. **🔧 Manual Release** (`manual-release.yml`)
**Purpose**: Manual release control for both branches
**Triggers**:
- Manual dispatch only

**Options**:
- Choose target branch (`main` or `dev`)
- Choose version type (`patch`, `minor`, `major`)
- Custom version override
- Prerelease option (main branch only)
- Skip tests option

**What it does**:
- ✅ Everything the auto-release workflows do
- ✅ Full control over version and release type
- ✅ Can target either branch
- ✅ Identical functionality to auto workflows except manual trigger

### 4. **🧪 Test** (`test.yml`) - ENHANCED
**Purpose**: Comprehensive testing across all platforms and Node.js versions
**Triggers**:
- Push to `main` or `dev` branches
- Pull requests to `main` and `dev` branches
- Manual dispatch

**What it does**:
- ✅ **Full Matrix Testing**: Ubuntu, Windows, macOS × Node.js 18, 20, 22 (9 combinations)
- ✅ **Enhanced Build Validation**: Verifies build artifacts exist
- ✅ **Improved Startup Tests**: Better cross-platform server testing
- ✅ **Package Integrity**: Validates package.json structure
- ✅ **Advanced Extension Validation**: Comprehensive manifest.json checks
- ✅ **TypeScript Compilation**: Type safety validation
- ✅ **ESLint Integration**: Code quality checks (if configured)
- ✅ **Detailed Reporting**: Environment details and comprehensive summaries
- ✅ **Fail-Safe**: Continues testing other combinations if one fails

## 🔄 Automation Flow

### **Development Workflow (Fully Automated)**
```
Push to dev → Dev Auto Release → NPM @dev + GitHub Prerelease
```

### **Production Workflow (Fully Automated)**
```
Push to main → Main Auto Release → NPM @latest + GitHub Release
```

### **Manual Override (When Needed)**
```
Manual Release → Choose branch + version → Complete Release
```

## 📦 NPM Publishing Strategy

| Branch | NPM Tag | Version Format | Release Type |
|--------|---------|----------------|--------------|
| `dev` | `@dev` | `1.4.0-dev.1` | Prerelease |
| `main` | `@latest` | `1.4.0` | Full Release |

## 🎯 Benefits of New Structure

### ✅ **Fully Automated**
- No manual steps required for normal development
- Push to dev → automatic dev release
- Push to main → automatic production release

### ✅ **Consistent Behavior**
- Same build/test/publish logic across all workflows
- Standardized naming convention
- Identical functionality between auto and manual workflows

### ✅ **Manual Override Available**
- Complete control when needed
- Can choose version type and target branch
- Can skip tests for emergency releases

### ✅ **Simplified Maintenance**
- Reduced from 6 workflows to 4
- No duplicate code
- Clear separation of concerns

## 🚀 Usage Examples

### **Normal Development**
```bash
# Work on feature
git checkout dev
git commit -m "feat: add new feature"
git push origin dev
# → Automatic dev release created
```

### **Production Release**
```bash
# Merge dev to main
git checkout main
git merge dev
git push origin main
# → Automatic production release created
```

### **Emergency Release**
```bash
# Use manual release workflow
# → Choose main branch, patch version, skip tests
```

### **Custom Version Release**
```bash
# Use manual release workflow
# → Choose custom version "2.0.0", major release
```

### **Pull Request Releases**
```bash
# Create PR to dev branch
git checkout -b feature/new-feature
git push origin feature/new-feature
# → Creates PR #123 to dev
# → Automatic test + dev release: v1.4.0-pr-dev.123

# Create PR to main branch
git checkout -b hotfix/critical-fix
git push origin hotfix/critical-fix
# → Creates PR #456 to main
# → Automatic test + main release: v1.4.0-pr-main.456
```

## 🔧 Migration Notes

### **Removed Workflows**
- ❌ `dev-release.yml` → Replaced by `dev-auto-release.yml`
- ❌ `release.yml` → Replaced by `main-auto-release.yml`
- ❌ `version-bump.yml` → Replaced by `manual-release.yml`
- ❌ `complete-release.yml` → Functionality merged into `manual-release.yml`
- ❌ `publish-npm.yml` → NPM publishing integrated into release workflows

### **Kept Workflows**
- ✅ `test.yml` → Still runs on pushes and PRs for quality assurance

## 📋 Next Steps

1. **Test the new workflows** with a dev branch push
2. **Verify NPM publishing** works correctly
3. **Update any documentation** that references old workflow names
4. **Train team** on new manual release options if needed

The new structure provides the full automation you requested while maintaining the flexibility for manual control when needed.
