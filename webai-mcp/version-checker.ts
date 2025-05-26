/**
 * Version Compatibility Checker for Browser Tools MCP
 *
 * Validates version compatibility between MCP server, Browser Tools server,
 * and Chrome extension components.
 */

import fs from 'fs';
import path from 'path';

export interface VersionInfo {
  component: string;
  version: string;
  path: string;
  isValid: boolean;
}

export interface CompatibilityResult {
  isCompatible: boolean;
  versions: VersionInfo[];
  warnings: string[];
  errors: string[];
  recommendations: string[];
}

export class VersionChecker {
  private static readonly COMPATIBLE_VERSION_RANGES = {
    // Major version must match, minor versions should be within 1 of each other
    major: 'exact', // 1.x.x must match 1.x.x
    minor: 1,       // 1.2.x can work with 1.1.x or 1.3.x
    patch: 'any'    // Patch versions are always compatible
  };

  static async checkVersionCompatibility(): Promise<CompatibilityResult> {
    const result: CompatibilityResult = {
      isCompatible: true,
      versions: [],
      warnings: [],
      errors: [],
      recommendations: []
    };

    try {
      // Get versions from all components
      const mcpVersion = await this.getMcpServerVersion();
      const serverVersion = await this.getBrowserToolsServerVersion();
      const extensionVersion = await this.getChromeExtensionVersion();
      const serverRuntimeVersion = await this.getServerRuntimeVersion();

      result.versions = [mcpVersion, serverVersion, extensionVersion];

      if (serverRuntimeVersion) {
        result.versions.push(serverRuntimeVersion);
      }

      // Check compatibility between components
      this.checkMcpServerCompatibility(mcpVersion, serverVersion, result);
      this.checkExtensionCompatibility(extensionVersion, serverVersion, result);

      if (serverRuntimeVersion) {
        this.checkRuntimeCompatibility(serverRuntimeVersion, serverVersion, result);
      }

      // Generate recommendations
      this.generateRecommendations(result);

    } catch (error) {
      result.isCompatible = false;
      result.errors.push(`Version check failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    return result;
  }

  private static async getMcpServerVersion(): Promise<VersionInfo> {
    try {
      // Try multiple possible paths for the MCP server package.json
      const possiblePaths = [
        path.join(process.cwd(), 'package.json'), // Current directory (when running from webai-mcp)
        path.join(process.cwd(), 'webai-mcp', 'package.json'), // Parent directory structure
        path.join(__dirname, '..', 'package.json'), // Relative to this file
      ];

      for (const packagePath of possiblePaths) {
        try {
          if (fs.existsSync(packagePath)) {
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            // Verify this is the MCP server package
            if (packageJson.name && (packageJson.name.includes('webai-mcp') || packageJson.name.includes('browser-tools-mcp'))) {
              return {
                component: 'MCP Server',
                version: packageJson.version,
                path: packagePath,
                isValid: true
              };
            }
          }
        } catch (pathError) {
          // Continue to next path
          continue;
        }
      }

      // If no valid package.json found, return unknown
      return {
        component: 'MCP Server',
        version: 'unknown',
        path: 'package.json not found',
        isValid: false
      };
    } catch (error) {
      return {
        component: 'MCP Server',
        version: 'unknown',
        path: 'error reading package.json',
        isValid: false
      };
    }
  }

  private static async getBrowserToolsServerVersion(): Promise<VersionInfo> {
    try {
      // Try multiple possible paths for the webai-server package.json
      const possiblePaths = [
        path.join(process.cwd(), 'webai-server', 'package.json'), // Sibling directory
        path.join(process.cwd(), '..', 'webai-server', 'package.json'), // Parent structure
        path.join(__dirname, '..', '..', 'webai-server', 'package.json'), // Relative to this file
        // Legacy paths for backward compatibility
        path.join(process.cwd(), 'browser-tools-server', 'package.json'),
        path.join(process.cwd(), '..', 'browser-tools-server', 'package.json'),
        path.join(__dirname, '..', '..', 'browser-tools-server', 'package.json'),
      ];

      for (const packagePath of possiblePaths) {
        try {
          if (fs.existsSync(packagePath)) {
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            // Verify this is the webai server package
            if (packageJson.name && (packageJson.name.includes('webai-server') || packageJson.name.includes('browser-tools-server'))) {
              return {
                component: 'WebAI Server',
                version: packageJson.version,
                path: packagePath,
                isValid: true
              };
            }
          }
        } catch (pathError) {
          // Continue to next path
          continue;
        }
      }

      // If no valid package.json found, return unknown
      return {
        component: 'WebAI Server',
        version: 'unknown',
        path: 'package.json not found',
        isValid: false
      };
    } catch (error) {
      return {
        component: 'WebAI Server',
        version: 'unknown',
        path: 'error reading package.json',
        isValid: false
      };
    }
  }

  private static async getChromeExtensionVersion(): Promise<VersionInfo> {
    try {
      // Try multiple possible paths for the chrome extension manifest.json
      const possiblePaths = [
        path.join(process.cwd(), 'chrome-extension', 'manifest.json'), // Sibling directory
        path.join(process.cwd(), '..', 'chrome-extension', 'manifest.json'), // Parent structure
        path.join(__dirname, '..', '..', 'chrome-extension', 'manifest.json'), // Relative to this file
      ];

      for (const manifestPath of possiblePaths) {
        try {
          if (fs.existsSync(manifestPath)) {
            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
            // Verify this is the WebAI-MCP extension
            if (manifest.name && (manifest.name.includes('WebAI-MCP') || manifest.name.includes('BrowserTools'))) {
              return {
                component: 'Chrome Extension',
                version: manifest.version,
                path: manifestPath,
                isValid: true
              };
            }
          }
        } catch (pathError) {
          // Continue to next path
          continue;
        }
      }

      // If no valid manifest.json found, return unknown
      return {
        component: 'Chrome Extension',
        version: 'unknown',
        path: 'manifest.json not found',
        isValid: false
      };
    } catch (error) {
      return {
        component: 'Chrome Extension',
        version: 'unknown',
        path: 'error reading manifest.json',
        isValid: false
      };
    }
  }

  private static async getServerRuntimeVersion(): Promise<VersionInfo | null> {
    try {
      // Try to get version from running server
      const response = await fetch('http://localhost:3025/.identity', {
        signal: AbortSignal.timeout(2000)
      });

      if (response.ok) {
        const identity = await response.json();
        if (identity.signature === 'mcp-browser-connector-24x7') {
          return {
            component: 'Running Server',
            version: identity.version || 'unknown',
            path: 'http://localhost:3025',
            isValid: true
          };
        }
      }
    } catch (error) {
      // Server not running or not accessible
    }

    return null;
  }

  private static checkMcpServerCompatibility(
    mcpVersion: VersionInfo,
    serverVersion: VersionInfo,
    result: CompatibilityResult
  ): void {
    if (!mcpVersion.isValid || !serverVersion.isValid) {
      result.errors.push('Cannot determine MCP Server and Browser Tools Server versions');
      result.isCompatible = false;
      return;
    }

    const mcpParts = this.parseVersion(mcpVersion.version);
    const serverParts = this.parseVersion(serverVersion.version);

    if (!mcpParts || !serverParts) {
      result.errors.push('Invalid version format detected');
      result.isCompatible = false;
      return;
    }

    // Check major version compatibility
    if (mcpParts.major !== serverParts.major) {
      result.errors.push(
        `Major version mismatch: MCP Server v${mcpVersion.version} vs Browser Tools Server v${serverVersion.version}`
      );
      result.isCompatible = false;
    }

    // Check minor version compatibility
    const minorDiff = Math.abs(mcpParts.minor - serverParts.minor);
    if (minorDiff > this.COMPATIBLE_VERSION_RANGES.minor) {
      result.warnings.push(
        `Minor version difference may cause issues: MCP Server v${mcpVersion.version} vs Browser Tools Server v${serverVersion.version}`
      );
    }
  }

  private static checkExtensionCompatibility(
    extensionVersion: VersionInfo,
    serverVersion: VersionInfo,
    result: CompatibilityResult
  ): void {
    if (!extensionVersion.isValid || !serverVersion.isValid) {
      result.warnings.push('Cannot verify Chrome Extension compatibility');
      return;
    }

    const extParts = this.parseVersion(extensionVersion.version);
    const serverParts = this.parseVersion(serverVersion.version);

    if (!extParts || !serverParts) {
      result.warnings.push('Cannot parse extension or server version');
      return;
    }

    // Extension should be compatible within the same major version
    if (extParts.major !== serverParts.major) {
      result.warnings.push(
        `Chrome Extension v${extensionVersion.version} may not be compatible with Browser Tools Server v${serverVersion.version}`
      );
    }
  }

  private static checkRuntimeCompatibility(
    runtimeVersion: VersionInfo,
    packageVersion: VersionInfo,
    result: CompatibilityResult
  ): void {
    if (!runtimeVersion.isValid || !packageVersion.isValid) {
      return;
    }

    if (runtimeVersion.version !== packageVersion.version) {
      result.warnings.push(
        `Running server version (${runtimeVersion.version}) differs from package version (${packageVersion.version}). Consider restarting the server.`
      );
    }
  }

  private static parseVersion(version: string): { major: number; minor: number; patch: number } | null {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)/);
    if (!match) return null;

    return {
      major: parseInt(match[1], 10),
      minor: parseInt(match[2], 10),
      patch: parseInt(match[3], 10)
    };
  }

  private static generateRecommendations(result: CompatibilityResult): void {
    if (result.errors.length > 0) {
      result.recommendations.push('Update all components to the same major version');
      result.recommendations.push('Run: npm run build in both webai-mcp and webai-server directories');
    }

    if (result.warnings.length > 0) {
      result.recommendations.push('Consider updating to the latest compatible versions');
    }

    // Check for outdated versions
    const versions = result.versions.filter(v => v.isValid);
    if (versions.length > 1) {
      const latestVersion = versions.reduce((latest, current) => {
        const latestParts = this.parseVersion(latest.version);
        const currentParts = this.parseVersion(current.version);

        if (!latestParts || !currentParts) return latest;

        if (currentParts.major > latestParts.major ||
            (currentParts.major === latestParts.major && currentParts.minor > latestParts.minor) ||
            (currentParts.major === latestParts.major && currentParts.minor === latestParts.minor && currentParts.patch > latestParts.patch)) {
          return current;
        }

        return latest;
      });

      const outdatedComponents = versions.filter(v => v.version !== latestVersion.version);
      if (outdatedComponents.length > 0) {
        result.recommendations.push(
          `Update outdated components to v${latestVersion.version}: ${outdatedComponents.map(c => c.component).join(', ')}`
        );
      }
    }

    if (result.isCompatible && result.warnings.length === 0 && result.errors.length === 0) {
      result.recommendations.push('All components are compatible! 🎉');
    }
  }

  static formatCompatibilityReport(result: CompatibilityResult): string {
    let output = '📋 **Version Compatibility Report**\n\n';

    // Version information
    output += '📦 **Component Versions:**\n';
    result.versions.forEach(version => {
      const status = version.isValid ? '✅' : '❌';
      output += `${status} ${version.component}: ${version.version}\n`;
    });
    output += '\n';

    // Compatibility status
    const compatIcon = result.isCompatible ? '✅' : '❌';
    output += `${compatIcon} **Overall Compatibility:** ${result.isCompatible ? 'Compatible' : 'Issues Found'}\n\n`;

    // Errors
    if (result.errors.length > 0) {
      output += '❌ **Errors:**\n';
      result.errors.forEach(error => {
        output += `   • ${error}\n`;
      });
      output += '\n';
    }

    // Warnings
    if (result.warnings.length > 0) {
      output += '⚠️ **Warnings:**\n';
      result.warnings.forEach(warning => {
        output += `   • ${warning}\n`;
      });
      output += '\n';
    }

    // Recommendations
    if (result.recommendations.length > 0) {
      output += '💡 **Recommendations:**\n';
      result.recommendations.forEach(rec => {
        output += `   • ${rec}\n`;
      });
    }

    return output;
  }
}
