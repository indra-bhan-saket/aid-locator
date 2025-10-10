# Aid Locator Frontend

Angular 20 frontend application for the Aid Locator project. This is part of a monorepo with an integrated Spring Boot backend.

## Technology Stack

- Angular 20
- TypeScript
- Bootstrap 5.3.8
- Node.js 22+ (required for Angular 20)

## Development Server

**Recommended**: Use NPM scripts from root directory for integrated development:
```bash
# From root directory - starts both frontend and backend
npm run dev

# From root directory - starts only frontend
npm run start:frontend
```

**Alternative**: Start only the frontend:
```bash
# From frontend directory
npm start
# Or
ng serve
```

The frontend runs on `http://localhost:7200` (configured for monorepo integration).
The Angular dev server automatically proxies API calls to the Spring Boot backend at `http://localhost:8080`.

**Note**: The default Angular port has been changed from 4200 to 7200 for monorepo consistency.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

**Recommended**: Use NPM scripts from root directory:
```bash
# Build both frontend and backend
npm run build

# Build only frontend
npm run build:frontend
```

**Alternative**: Build only the frontend:
```bash
# From frontend directory
npm run build
# Or
ng build
```

Build artifacts are stored in the `dist/` directory. Production builds are optimized for performance.

## Running Unit Tests

**Recommended**: Use NPM scripts from root directory:
```bash
# Test both frontend and backend
npm run test

# Test only frontend
npm run test:frontend
```

**Alternative**: Test only the frontend:
```bash
# From frontend directory
npm test
# Or
ng test
```

Tests use the [Karma](https://karma-runner.github.io) test runner.

## Integration with Backend

This frontend is configured to work seamlessly with the Spring Boot backend:

- **Proxy Configuration**: `proxy.conf.json` routes `/api/*` requests to `http://localhost:8080`
- **CORS Setup**: Backend allows requests from `http://localhost:7200`
- **Development**: Use `npm run dev` from root to start both frontend and backend together

## Project Structure

- **Standalone Components**: Uses Angular 20's standalone component architecture (no modules)
- **Bootstrap Integration**: Bootstrap 5.3.8 CSS and JS included via `angular.json`
- **Responsive Design**: Mobile-first design with Bootstrap components

## Running End-to-End Tests

```bash
ng e2e
```

Angular CLI does not include an e2e framework by default. Choose one that fits your testing needs.

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Angular 20 Documentation](https://angular.dev/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)

## Monorepo Information

This frontend is part of the Aid Locator monorepo:
- **Root Commands**: Use `npm run dev` from project root for full-stack development
- **Port**: Runs on 7200 (instead of default 4200) for monorepo consistency
- **Backend Integration**: Automatically proxies to Spring Boot backend on port 8080
