# Oracle Mystique Voyance App

## Overview

Oracle Mystique is a mystical divination web application that provides personalized tarot and oracle card readings. The app guides users through a multi-step consultation process, collecting personal information to generate AI-powered interpretations. Users can select from different oracle types (daily readings, Tarot de Marseille, Angel Oracle, or Nordic Runes) and receive customized spiritual guidance based on their selected cards, birth date, zodiac sign, and gender.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
**React with TypeScript**: Single-page application built with React 18, utilizing TypeScript for type safety. The app uses a step-based navigation system managed through React state, progressing users through name input, date selection, gender selection, oracle type selection, card game, and final revelation pages.

**Component-Based Design**: Modular component library with reusable mystical-themed UI elements including custom buttons, inputs, selects, cards, and interactive elements. All components follow a consistent dark mystical theme with purple gradients and gold accents.

**State Management**: Local React state manages the multi-step flow, user session data, and oracle selection. No external state management library is used, keeping the architecture simple and focused.

**Routing**: Uses Wouter for lightweight client-side routing with minimal configuration.

**Styling System**: Tailwind CSS with extensive customization for mystical theming. Custom CSS classes provide gradient backgrounds, glow effects, card animations, and responsive design. The design follows established guidelines for premium spiritual applications.

### Backend Architecture
**Express.js Server**: Node.js backend using Express with TypeScript, configured for development with Vite integration and production builds. Currently implements basic server structure with placeholder routes.

**Modular Storage Interface**: Abstract storage interface (IStorage) with initial in-memory implementation (MemStorage). Designed to be easily replaced with database persistence later.

**API Structure**: RESTful API design with `/api` prefix for all endpoints. Currently minimal but structured for expansion.

### Data Storage Solutions
**Drizzle ORM**: Database abstraction layer configured for PostgreSQL with schema definitions for consultations and oracle data. Includes proper TypeScript integration and migration support.

**Schema Design**: Structured data models for user consultations, oracle cards, zodiac signs, and user sessions. Uses JSON fields for flexible card data storage.

**Database Configuration**: PostgreSQL setup through Neon Database with environment-based configuration. Migration system ready for schema evolution.

### Authentication and Authorization Mechanisms
**Session-Based**: Currently uses simple session management without complex authentication. Designed for anonymous consultations with optional data persistence.

**No User Accounts**: Architecture supports anonymous usage with temporary session data, focusing on immediate spiritual guidance rather than user management.

### External Dependencies
**UI Components**: Extensive use of Radix UI primitives for accessible, unstyled components. Provides consistent behavior across form elements, dialogs, tooltips, and interactive components.

**Styling Framework**: Tailwind CSS for utility-first styling with significant customization for mystical themes. Includes custom color palettes, animations, and responsive design patterns.

**Build Tools**: Vite for fast development and optimized production builds. ESBuild handles server-side bundling for deployment.

**Form Handling**: React Hook Form with Zod validation for type-safe form management and data validation.

**Query Management**: TanStack Query for server state management and API interactions, though currently minimal due to limited backend implementation.

**Development Tools**: TypeScript for type safety, path aliases for clean imports, and development-specific tooling for the Replit environment.