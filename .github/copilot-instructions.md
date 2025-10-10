# Aid Locator - AI Coding Agent Instructions

## Architecture Overview

This is a **monorepo** with Angular 20 frontend and Spring Boot 3.3.5 backend, designed for aid resource location services.

```
aid-locator/
├── frontend/          # Angular 20 SPA (port 7200)
├── backend/           # Spring Boot REST API (port 8080)
├── package.json       # Root monorepo scripts with concurrently
└── start-dev.sh      # Development startup script
```

## Critical Development Patterns

### Monorepo Script Architecture
- **Root `package.json`** contains all orchestration scripts using `concurrently`
- Use `npm run dev` (not individual starts) to ensure proper proxy/CORS integration
- All scripts work from root directory - never `cd` into subdirectories manually

### Backend Build Requirements
- **ALWAYS use custom `settings.xml`**: `mvn spring-boot:run -s settings.xml`
- Maven requires custom repository configuration due to corporate network conflicts
- Never run Maven commands without the `-s settings.xml` flag

### Frontend-Backend Integration
- **Proxy Configuration**: Angular dev server proxies `/api/*` to `localhost:8080`
- **CORS Setup**: Backend explicitly allows `http://localhost:7200` in controller annotations
- **API Endpoints**: All backend routes use `/api` prefix (e.g., `/api/health`, `/api/info`)

## Essential Commands

```bash
# Start full development environment
npm run dev                    # Starts both apps with proper integration

# Backend startup (critical pattern)
cd backend && mvn spring-boot:run -s settings.xml

# Monorepo operations
npm run install:all           # Install all dependencies
npm run build                 # Build both applications
npm run test                  # Run all tests
```

## Technology Constraints

- **Node.js**: Requires 20.19+ or 22+ (Angular 20 requirement)
- **Java**: Exactly Java 17 (Spring Boot 3.3.5 requirement)
- **Maven**: Custom settings.xml mandatory for repository access
- **Ports**: Frontend 7200, Backend 8080 (hardcoded in proxy config)

## Key Files to Understand

- `frontend/proxy.conf.json` - API proxy configuration
- `backend/settings.xml` - Custom Maven repository configuration
- `frontend/angular.json` - Port and proxy settings (line 58)
- `backend/src/main/java/com/aidlocator/backend/controller/AidLocatorController.java` - API patterns

## Development Workflow

1. **Environment Setup**: Always verify Node.js 20.19+ and Java 17
2. **Dependency Installation**: Use `npm run install:all` from root
3. **Development Start**: Use `npm run dev` or `./start-dev.sh` for integrated development
4. **Testing**: Individual app testing via `npm run test:frontend` / `npm run test:backend`

## Backend Patterns

- **Package Structure**: `com.aidlocator.backend.*`
- **CORS Configuration**: Both annotation-based (`@CrossOrigin`) and properties-based
- **Actuator Endpoints**: Health and info exposed at `/actuator/*`
- **API Versioning**: All endpoints under `/api` prefix

## Frontend Patterns

- **Component Architecture**: Standalone Angular components (no modules)
- **Styling**: Component-scoped CSS with BEM-like naming
- **Landing Page**: Simple header-centered layout in `app.html`
- **API Integration**: Uses Angular proxy for seamless backend communication

## Troubleshooting Notes

- **Maven Build Failures**: Always check settings.xml usage and repository connectivity
- **CORS Issues**: Verify both proxy config and backend CORS settings match
- **Port Conflicts**: Frontend 7200 and Backend 8080 are hardcoded in multiple configs
- **Node Version**: Angular 20 will fail on Node.js < 20.19
