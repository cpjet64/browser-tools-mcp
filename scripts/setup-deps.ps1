# WebAI-MCP Dependency Setup Script
# This script ensures all dependencies are properly installed and lock files are generated

Write-Host "🔧 WebAI-MCP Dependency Setup" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check Node.js and npm
if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js not found. Please install Node.js 20.11.0 or later." -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "❌ npm not found. Please install npm." -ForegroundColor Red
    exit 1
}

$nodeVersion = node --version
Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green

$npmVersion = npm --version
Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green

# Clean existing lock files if requested
if ($args -contains "--clean") {
    Write-Host "🧹 Cleaning existing lock files..." -ForegroundColor Yellow
    
    $lockFiles = @(
        "package-lock.json",
        "webai-mcp\package-lock.json", 
        "webai-server\package-lock.json"
    )
    
    foreach ($lockFile in $lockFiles) {
        if (Test-Path $lockFile) {
            Remove-Item $lockFile -Force
            Write-Host "   Removed: $lockFile" -ForegroundColor Yellow
        }
    }
}

# Function to install dependencies with fallback
function Install-Dependencies($path, $name) {
    Write-Host "📦 Installing dependencies for $name..." -ForegroundColor Blue
    
    Push-Location $path
    
    try {
        # Try npm ci first (faster)
        $ciResult = npm ci --prefer-offline 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ npm ci succeeded for $name" -ForegroundColor Green
        } else {
            Write-Host "⚠️ npm ci failed for $name, falling back to npm install" -ForegroundColor Yellow
            
            # Remove lock file and try npm install
            if (Test-Path "package-lock.json") {
                Remove-Item "package-lock.json" -Force
            }
            
            npm install
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ npm install succeeded for $name" -ForegroundColor Green
            } else {
                Write-Host "❌ npm install failed for $name" -ForegroundColor Red
                Pop-Location
                exit 1
            }
        }
    }
    finally {
        Pop-Location
    }
}

# Install dependencies for each package
Write-Host ""
Install-Dependencies "webai-mcp" "MCP Server"
Install-Dependencies "webai-server" "WebAI Server" 
Install-Dependencies "." "Root Workspace"

# Verify builds work
Write-Host ""
Write-Host "🏗️ Verifying builds..." -ForegroundColor Blue

Push-Location "webai-mcp"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ MCP build failed" -ForegroundColor Red
    Pop-Location
    exit 1
}
Write-Host "✅ MCP build successful" -ForegroundColor Green
Pop-Location

Push-Location "webai-server"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Server build failed" -ForegroundColor Red
    Pop-Location
    exit 1
}
Write-Host "✅ Server build successful" -ForegroundColor Green
Pop-Location

Write-Host ""
Write-Host "🎉 All dependencies installed and builds verified!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Commit the new package-lock.json files" -ForegroundColor White
Write-Host "   2. Push to trigger CI workflows" -ForegroundColor White
Write-Host "   3. Monitor GitHub Actions for successful builds" -ForegroundColor White
