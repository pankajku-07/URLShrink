# LinkSnap - URL Shortener Service

## Overview

LinkSnap is a modern URL shortening service built with a full-stack TypeScript architecture. The application allows users to convert long URLs into short, shareable links that redirect to the original destination. It features a clean, responsive interface built with React and shadcn/ui components, backed by an Express.js API server with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture  
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas shared between client and server
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for server bundling

### Data Storage
- **Database**: PostgreSQL with Neon serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: @neondatabase/serverless for serverless PostgreSQL connections
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions
- **Fallback Storage**: In-memory storage class for development/testing

### API Design
- **POST /api/shorten**: Creates shortened URLs from original URLs
- **GET /:shortCode**: Redirects to original URL using 6-character alphanumeric codes
- **Validation**: Shared Zod schemas ensure type safety across client and server
- **Error Handling**: Consistent error responses with proper HTTP status codes

### Development Experience
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Type Safety**: Full TypeScript coverage with strict configuration
- **Path Aliases**: Absolute imports using @ prefix for components and utilities
- **Code Quality**: ESLint and TypeScript strict mode for code consistency

### Security and Performance
- **URL Validation**: Strict URL format validation using Zod schemas
- **Short Code Generation**: Cryptographically secure random code generation
- **Duplicate Prevention**: Checks for existing URLs before creating new short codes
- **Performance**: TanStack Query for client-side caching and state management

### Deployment Architecture
- **Build Process**: Separate builds for client (Vite) and server (esbuild)
- **Static Assets**: Client built to dist/public for static serving
- **Server Bundle**: Node.js compatible ESM bundle for production
- **Database**: Configured for PostgreSQL with environment-based connection strings