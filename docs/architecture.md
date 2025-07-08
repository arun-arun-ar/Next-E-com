# Project Documentation

## Features
- Modular structure by feature/domain
- Centralized config and types
- Business logic separated from API routes
- Ready for scaling and maintainability

## Structure
- `src/features/` - Feature-based modules (auth, products, users, etc.)
- `src/config/` - Centralized configuration
- `src/hooks/` - Custom React hooks
- `src/types/` - Global and feature-specific types
- `src/lib/` - Shared libraries (database, mailer, etc.)
- `src/app/api/` - API route handlers (thin, call services)
- `public/` - Static assets
- `tests/` - (Recommended) for unit/integration tests

## Getting Started
- Add business logic to `services/` in each feature
- Use hooks for client-side logic
- Add tests in `tests/`
- Update documentation as you scale
