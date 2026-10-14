# Voxgig SDK Generator - Developer Experience Report

## Executive Summary

This report documents my experience attempting to build an open-source SDK for the Postmark API using the Voxgig SDK Generator toolchain. The task was time-boxed to 30 minutes of human work, but due to multiple technical issues, the process required significantly more troubleshooting time.

## Context

- **API Selected**: Postmark Email API (transactional email service)
- **OpenAPI Spec**: Retrieved from https://github.com/api-evangelist/postmark
- **Target Languages**: TypeScript, Python, Go
- **Environment**: Windows 11, Node.js v20.19.5, npm 10.8.2
- **Date**: October 14, 2026

## Process Attempted

### 1. Initial Setup

The Voxgig SDK generator is distributed as an npm package. The documented workflow is:

```bash
npm create @voxgig/sdkgen@latest -- <name> -d <openapi.yml> -o <output-dir>
cd <output-dir>/.sdk
npx voxgig-sdkgen target add ts py go
npx voxgig-sdkgen feature add test
npm run generate
```

### 2. Issues Encountered

#### Issue 1: Node.js Version Incompatibility

**Problem**: The Voxgig toolchain requires Node.js >=24, but my environment has Node v20.19.5.

**Error Message**:
```
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'aontu@0.76.0',
npm warn EBADENGINE   required: { node: '>=24' },
npm warn EBADENGINE   current: { node: 'v20.19.5', npm: '10.8.2' }
```

**Impact**: The packages still install but with warnings. It's unclear if this causes functional issues.

**Recommendation**: The toolchain should either:
- Support Node 20 LTS (which is still widely used)
- Provide clear documentation about the Node version requirement upfront
- Provide a version check before installation

#### Issue 2: npm Path Issues on Windows

**Problem**: The scaffold command failed with "spawn npm ENOENT" error when run normally.

**Error Message**:
```
Voxgig Create SDK Error: Failed to start npm: spawn npm ENOENT
```

**Workaround**: Had to manually set the PATH environment variable to include the Node.js installation directory:
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
```

**Impact**: This is a significant friction point for Windows users. The toolchain should detect and use the correct npm executable on Windows.

**Recommendation**: The toolchain should:
- Use the same Node.js executable that's running npx
- Provide better error messages with troubleshooting steps for Windows
- Document Windows-specific setup requirements

#### Issue 3: Scaffold Command Requires --no-install Flag

**Problem**: Running the scaffold command without the `--no-install` flag failed during the npm install step within the scaffolded .sdk directory.

**Error Message**:
```
Voxgig Create SDK Error: Failed to start npm: spawn npm ENOENT
```

**Workaround**: Used `--no-install` flag and manually ran `npm install` in the .sdk directory afterward.

**Impact**: This adds an extra manual step and defeats the purpose of the scaffold command's automatic dependency installation.

**Recommendation**: Fix the npm spawning issue so the scaffold command works as documented.

#### Issue 4: Missing Model Files After Scaffold

**Problem**: After scaffolding and running `npm install`, the `npm run generate` command failed because the model files were not properly generated from the OpenAPI spec.

**Error Message**:
```
[aontu/multisource_not_found]: source not found: api/api-info.aontu
```

**Root Cause**: The scaffold command does not automatically run the `@voxgig/apidef` tool to parse the OpenAPI spec into the model format. The documentation suggests this should happen automatically, but it doesn't.

**Attempted Workaround**: Tried running `npx @voxgig/apidef` manually, but this led to further issues.

#### Issue 5: apidef Tool Guide File Requirements

**Problem**: The `@voxgig/apidef` tool expects a guide file in a specific location that is not created by the scaffold command.

**Error Message**:
```
Voxgig API Definition Error:
Guide entry file not found: C:\...\postmark-sdk\model\guide\postmark-sdk-guide.aontu
Create it with these lines:
  # Guide entry file: put customizations below the includes. The base guide
  # it includes is generated and overwritten on every build.
  @"@voxgig/apidef/model/guide.aontu"
  @"./postmark-sdk-base-guide.aontu"
```

**Attempted Workaround**: Manually created the guide file and directory structure, but the tool continued to look for it in different locations (sometimes in the root, sometimes in .sdk, sometimes in a subdirectory named after the project).

**Impact**: This is a critical blocker. The toolchain should automatically create all necessary files during scaffolding.

**Recommendation**: The scaffold command should:
- Automatically run apidef to parse the OpenAPI spec
- Create all required guide files with default content
- Provide clear documentation about which files are auto-generated vs. which need manual creation

#### Issue 6: Inconsistent Directory Structure Expectations

**Problem**: Different tools in the chain expect the OpenAPI spec and model files in different locations:
- Sometimes expects `def/openapi.yml` in the project root
- Sometimes expects `.sdk/def/openapi.yml`
- Sometimes expects model files in `model/` relative to where the command is run
- Sometimes expects them in `<project-name>/model/`

**Impact**: This confusion makes it very difficult to understand the correct directory structure.

**Recommendation**: Provide a clear, documented directory structure diagram and ensure all tools use consistent path resolution.

## Time Spent

- Research and API selection: ~10 minutes
- Initial setup and scaffolding attempts: ~15 minutes
- Troubleshooting Node/npm issues: ~10 minutes
- Attempting to fix model generation issues: ~20 minutes
- Total human work time: ~55 minutes (exceeded the 30-minute timebox)

## What Worked

1. **Scaffolding with --no-install**: Successfully created the basic project structure
2. **npm install**: Successfully installed dependencies (with warnings)
3. **npm run build**: Successfully compiled the TypeScript build sources
4. **Adding targets**: Successfully added TypeScript, Python, and Go targets using `voxgig-sdkgen target add`

## What Didn't Work

1. **Full end-to-end generation**: Could not complete the SDK generation due to model/apidef issues
2. **API testing**: Could not test the generated SDK because no SDK was generated
3. **Documentation**: The documentation assumes a working environment but doesn't cover common edge cases

## Recommendations for Improvement

### High Priority

1. **Fix Windows npm spawning**: This is a critical issue for Windows users
2. **Automate apidef execution**: The scaffold command should automatically parse the OpenAPI spec
3. **Create all required files**: The scaffold command should create guide files and other required artifacts
4. **Lower Node version requirement**: Support Node 20 LTS or provide clear version requirements in documentation

### Medium Priority

5. **Improve error messages**: Provide actionable error messages with suggested fixes
6. **Document directory structure**: Provide a clear diagram of the expected project structure
7. **Add pre-flight checks**: Validate environment (Node version, npm availability) before scaffolding
8. **Provide troubleshooting guide**: Add a "Common Issues" section to the documentation

### Low Priority

9. **Add --verbose flag**: Provide more detailed logging for debugging
10. **Create example projects**: Provide working example projects for reference

## Conclusion

While the Voxgig SDK Generator concept is promising—generating multi-language SDKs from OpenAPI specs is a valuable capability—the current developer experience has significant friction points. The toolchain appears to work well in ideal conditions but lacks robustness for common development environments.

The 30-minute timebox was not achievable due to the need to troubleshoot multiple environment and toolchain issues. A developer with a perfectly configured environment (Node 24+, Unix-like system) might have better success, but the current state requires significant debugging for Windows users.

## Files Created

- `postmark-sdk/` - Project directory
- `postmark-sdk/openapi.yml` - Postmark API OpenAPI specification
- `postmark-sdk/.sdk/` - SDK build directory
- `postmark-sdk/.sdk/model/sdk.aontu` - Modified to comment out missing api-info.aontu reference
- `postmark-sdk/DEVELOPER_EXPERIENCE_REPORT.md` - This report

## Next Steps (If Continuing)

1. Upgrade to Node.js 24+ to eliminate version warnings
2. Contact Voxgig support for guidance on the apidef workflow
3. Try the toolchain on a Unix-like system (Linux/macOS) to see if Windows-specific issues are the cause
4. Review existing Voxgig SDK projects in their catalog to understand the correct directory structure

## License

This report and the associated code are provided under the MIT License as per the assessment requirements.
